import React, { useState } from "react";
import { Alert, Button, Form, Spinner, Card, Row, Col, Badge } from "react-bootstrap";
import { DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ican } from "../api/axios";
import { AlertCircle, Building2, CheckCircle, Copy, CreditCard } from "lucide-react";

function Payment({
	handleSubmit,
	handleChange,
	inputValue,
	onSuccess,
	onDateChange,
	setStep,
	loading,
	handleFileUpload,
	onRrrGenerated
}) {

	const [paymentMethod, setPaymentMethod] = useState("");
	const [generatingRRR, setGeneratingRRR] = useState(false);
	const [rrrGenerated, setRrrGenerated] = useState(inputValue.rrrGenerated || false);
	const [rrrDetails, setRrrDetails] = useState(inputValue.tellerNumber ? {
		rrr: inputValue.tellerNumber,
		amount: inputValue.amountPaid || 0
	} : null);
	const [copiedRRR, setCopiedRRR] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [verifyingPayment, setVerifyingPayment] = useState(false);

	const [paymentInitiated, setPaymentInitiated] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [fileError, setFileError] = useState("");


	const calculateAmount = () => {
		if (!inputValue) return 0;

		if (inputValue.venue === "virtual") {
			return 25000;
		}

		if (inputValue.memberStatus === "nonmember") {
			return 70000;
		}

		const memberAmounts = {
			"full-paying member": 60000,
			"young-accountants": 40000,
			"half-paying member": 45000,
			"student-member": 30000,
		};

		return memberAmounts[inputValue.memberCategory] || 0;
	};

	const amount = calculateAmount();

	const proceedWithInlinePayment = () => {
		console.log(inputValue);
		if (!window.RmPaymentEngine) {
			console.error("Remita script not loaded");
			alert("Payment service unavailable. Please refresh and try again.");
			return;
		}

		const rrr = inputValue.rrrGenerated ? inputValue.tellerNumber : rrrDetails.rrr;

		if (!rrr) {
			alert("RRR not found. Please generate RRR first.");
			return;
		}

		const paymentEngine = window.RmPaymentEngine.init({
			key: process.env.REACT_APP_REMITA_KEY,
			processRrr: true,
			transactionId: rrr,
			extendedData: {
				customFields: [{ name: "rrr", value: rrr }]
			},
			onSuccess: (response) => {
				console.log("Remita Success:", response);
				onSuccess(response);
			},
			onError: (response) => {
				console.error("Remita Error:", response);
			},
			onClose: () => {
				console.log("Payment closed");
				setPaymentInitiated(false);
			},
		});

		paymentEngine.showPaymentWidget();
	};


	const handleFileChange = ({ fileList }) => {
		const newFileList = fileList.slice(-1);
		setFileList(newFileList);

		if (newFileList.length > 0) {
			const file = newFileList[0].originFileObj;
			const isValidType = [
				"image/jpeg",
				"image/jpg",
				"image/png",
				"image/webp",
				"application/pdf",
			].includes(file.type);
			if (!isValidType) {
				setFileError("Please upload only JPG, PNG, WEBP or PDF files");
				return;
			}

			if (file.size > 2 * 1024 * 1024) {
				setFileError("File size must be less than 2MB");
				return;
			}

			setFileError("");
			handleFileUpload(file);
		} else {
			handleFileUpload(null);
		}
	};

	const beforeUpload = () => false;

	const validateForm = () => {
		if (paymentMethod === "direct" && fileList.length === 0) {
			setFileError("Please upload your payment proof");
			return false;
		}
		return true;
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		handleSubmit(e);
	};


	const generateRRR = async () => {
		setGeneratingRRR(true);
		try {

			const paymentData = {
				amount,
				orderId: Date.now().toString(),
				payerName: `${inputValue.surname} ${inputValue.otherNames}`,
				payerEmail: inputValue.email,
				payerPhone: inputValue.phone,
				description: "ICAN Conference Registration"
			}
			const res = await ican.post("/api/payments/initialize", paymentData,);

			console.log(res);

			const data = await res.data.data;
			if (!data.rrr) {
				alert("Failed to generate RRR");
				return;
			}

			if (data.rrr) {
				const rrrInfo = {
					rrr: data.rrr,
					amount: amount
				};
				setRrrDetails(rrrInfo);
				setRrrGenerated(true);
				onRrrGenerated({ rrr: data.rrr });
			}
		} catch (error) {
			console.error("Error generating RRR:", error);
			alert("Failed to generate RRR. Please try again.");
		} finally {
			setGeneratingRRR(false);
		}
	};


	const handlePaymentMethodSelect = async (method) => {
		setPaymentMethod(method);

		if (method === "online" && !rrrGenerated) {
			await generateRRR();
		}
	};

	const copyRRRToClipboard = () => {
		navigator.clipboard.writeText(rrrDetails.rrr);
		setCopiedRRR(true);
		setTimeout(() => setCopiedRRR(false), 2000);
	};

	const handleBankBranchPaymentComplete = async () => {
		setVerifyingPayment(true);
		try {
			// Call backend to verify payment
			const response = await fetch("/api/payment/verify-rrr", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					rrr: rrrDetails.rrr,
					email: inputValue.email,
				}),
			});

			const data = await response.json();

			if (data.success && data.paymentStatus === "paid") {
				// Payment verified successfully
				onSuccess({
					paymentReference: rrrDetails.rrr,
					amount: rrrDetails.amount,
				});
				handleSubmit();
			} else {
				alert("Payment not yet confirmed. Please ensure payment has been made at the bank.");
			}
		} catch (error) {
			console.error("Error verifying payment:", error);
			alert("Failed to verify payment. Please try again.");
		} finally {
			setVerifyingPayment(false);
		}
	};


	return (
		<Form onSubmit={onSubmit}>
			{/* Back Button */}
			<div className="mb-4">
				<Button
					variant="outline-primary"
					onClick={() => setStep(1)}
					className="d-flex align-items-center gap-2"
				>
					<i className="bi bi-arrow-left"></i>
					Back to Personal Info
				</Button>
			</div>




			{/* RRR Generated Display */}
			{rrrGenerated && rrrDetails && (
				<div className="mb-4">
					<Card className="border-success shadow-sm">
						<Card.Body className="p-4">
							<div className="text-center mb-4">
								<CheckCircle size={48} className="text-success mb-3" />
								<h5 className="fw-bold text-success mb-2">
									RRR Generated Successfully!
								</h5>
								<p className="text-muted mb-0">
									Your Remita Retrieval Reference has been created
								</p>
							</div>

							<Alert variant="light" className="border mb-4">
								<div className="d-flex justify-content-between align-items-center mb-2">
									<span className="text-muted small">RRR Number:</span>
									<Badge bg="primary" className="fs-6 py-2 px-3">
										{rrrDetails.rrr}
									</Badge>
								</div>
								<div className="d-flex justify-content-between align-items-center">
									<span className="text-muted small">Amount:</span>
									<span className="fw-bold">₦{rrrDetails.amount.toLocaleString()}</span>
								</div>
							</Alert>

							<Button
								variant="outline-primary"
								size="sm"
								className="w-100 mb-4"
								onClick={copyRRRToClipboard}
							>
								<Copy size={16} className="me-2" />
								{copiedRRR ? "Copied!" : "Copy RRR"}
							</Button>

							<h6 className="fw-semibold mb-3">Choose how to pay:</h6>

							<Row className="g-3">
								<Col md={6}>
									<Button
										variant="primary"
										size="lg"
										className="w-100"
										onClick={proceedWithInlinePayment}
									>
										<CreditCard size={20} className="me-2" />
										Pay Online Now
									</Button>
									<small className="text-muted d-block text-center mt-2">
										Instant payment with card
									</small>
								</Col>

								<Col md={6}>
									<Button
										variant="outline-primary"
										size="lg"
										className="w-100"
										onClick={() => setPaymentMethod("bank-confirm")}
									>
										<Building2 size={20} className="me-2" />
										Pay at Bank Branch
									</Button>
									<small className="text-muted d-block text-center mt-2">
										Use this RRR at any bank
									</small>
								</Col>
							</Row>

							<Alert variant="warning" className="mt-4 mb-0">
								<AlertCircle size={18} className="me-2" />
								<small>
									<strong>Bank Branch Payment:</strong> Take this RRR to any bank branch in Nigeria.
									After payment, return here and click "I Have Made Payment" to verify and complete registration.
								</small>
							</Alert>
						</Card.Body>
					</Card>
				</div>
			)}

			{/* Bank Branch Payment Confirmation */}
			{paymentMethod === "bank-confirm" && rrrGenerated && (
				<div className="mb-4">
					<Card className="border-info">
						<Card.Body className="p-4">
							<h6 className="fw-semibold mb-3">
								<Building2 size={20} className="me-2" />
								Complete Bank Branch Payment
							</h6>

							<Alert variant="info" className="mb-4">
								<h6 className="fw-semibold mb-2">Payment Instructions:</h6>
								<ol className="mb-0 ps-3">
									<li>Visit any bank branch in Nigeria</li>
									<li>Provide your RRR: <strong>{rrrDetails.rrr}</strong></li>
									<li>Pay ₦{rrrDetails.amount.toLocaleString()}</li>
									<li>Return here and click "I Have Made Payment"</li>
								</ol>
							</Alert>

							<div className="d-grid gap-3">
								<Button
									variant="success"
									size="lg"
									onClick={handleBankBranchPaymentComplete}
									disabled={verifyingPayment}
								>
									{verifyingPayment ? (
										<>
											<Spinner animation="border" size="sm" className="me-2" />
											Verifying Payment...
										</>
									) : (
										<>
											<CheckCircle size={20} className="me-2" />
											I Have Made Payment
										</>
									)}
								</Button>

								<Button
									variant="outline-secondary"
									onClick={() => setPaymentMethod("online")}
								>
									Changed Mind? Pay Online Instead
								</Button>
							</div>
						</Card.Body>
					</Card>
				</div>
			)}

			{/* Payment Summary Card */}
			<Card className="border-primary mb-4 shadow-sm">
				<Card.Body className="p-4">
					<div className="d-flex justify-content-between align-items-center mb-3">
						<h5 className="mb-0 fw-semibold">
							<i className="bi bi-receipt me-2 text-primary"></i>
							Payment Summary
						</h5>
						<Badge bg="primary" className="px-3 py-2">
							{inputValue.venue === "virtual" ? "Virtual" : "Physical"} Attendance
						</Badge>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3 border-top">
						<span className="text-muted">Registration Fee</span>
						<h3 className="mb-0 fw-bold text-primary">₦{amount.toLocaleString()}</h3>
					</div>
					{inputValue.memberStatus === "member" && (
						<div className="mt-2">
							<small className="text-muted">
								<i className="bi bi-info-circle me-1"></i>
								{inputValue.memberCategory?.replace(/-/g, ' ').toUpperCase()} rate
							</small>
						</div>
					)}
				</Card.Body>
			</Card>

			{/* Payment Method Selection */}
			{!rrrGenerated && (
				<div className="mb-4">
					<h5 className="fw-semibold mb-3 text-dark">
						<i className="bi bi-credit-card me-2 text-primary"></i>
						Choose Payment Method
					</h5>

					<Row className="g-3">
						<Col md={6}>
							<Card
								className={`h-100 cursor-pointer ${paymentMethod === "online" ? "border-primary shadow" : "border"
									}`}
								style={{ cursor: "pointer" }}
								onClick={() => handlePaymentMethodSelect("online")}
							>
								<Card.Body className="text-center p-4">
									<div className="mb-3">
										<i className="bi bi-credit-card-2-front text-primary" style={{ fontSize: '2.5rem' }}></i>
									</div>
									<h6 className="fw-semibold mb-2">Online Payment</h6>
									<p className="text-muted small mb-0">Pay instantly with card or bank transfer</p>
									{generatingRRR && (
										<div className="mt-3">
											<Spinner animation="border" size="sm" className="me-2" />
											<span className="small">Generating RRR...</span>
										</div>
									)}
								</Card.Body>
							</Card>
						</Col>

						<Col md={6}>
							<Card
								className={`h-100 cursor-pointer opacity-50 ${paymentMethod === "bank" ? "border-primary shadow" : "border"
									}`}
								style={{ cursor: 'not-allowed' }}
							>
								<Card.Body className="text-center p-4">
									<div className="mb-3">
										<i className="bi bi-bank text-muted" style={{ fontSize: '2.5rem' }}></i>
									</div>
									<h6 className="fw-semibold mb-2 text-muted">Direct lodgement/transfer</h6>
									<p className="text-muted small mb-0">
										Pay at any bank branch
									</p>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</div>
			)}

			{/* Bank Transfer Details */}
			{(paymentMethod === "direct" || inputValue?.paymentSuccess) && (
				<div className="mb-4">
					{paymentMethod === "direct" && !inputValue?.paymentSuccess && (
						<Alert variant="info" className="border-0 shadow-sm">
							<div className="d-flex align-items-start">
								<i className="bi bi-info-circle-fill me-3 mt-1" style={{ fontSize: '1.5rem' }}></i>
								<div>
									<h6 className="fw-semibold mb-2">Bank Account Details</h6>
									<p className="mb-1"><strong>Bank:</strong> Zenith Bank</p>
									<p className="mb-1"><strong>Account Number:</strong> 1015593246</p>
									<p className="mb-1"><strong>Account Name:</strong> ICAN Eastern Zonal District</p>
									<p className="mb-0"><strong>Amount:</strong> ₦{amount.toLocaleString()}</p>
								</div>
							</div>
						</Alert>
					)}

					{!inputValue?.paymentSuccess && (
						<div className="text-center mb-4">
							<Button
								variant="outline-primary"
								type="button"
								onClick={() => {
									setPaymentMethod("online");
									handlePaymentMethodSelect('online');
								}}
								className="d-inline-flex align-items-center gap-2"
							>
								<i className="bi bi-credit-card"></i>
								Switch to Online Payment
							</Button>
						</div>
					)}

					<Card className="border-0 shadow-sm">
						<Card.Body className="p-4">
							<h6 className="fw-semibold mb-3">
								<i className="bi bi-file-earmark-text me-2"></i>
								Transaction Details
							</h6>

							<Row>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label className="fw-medium">
											Bank Paid From <span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											type="text"
											onChange={handleChange}
											placeholder="Enter bank name"
											name="bankName"
											value={inputValue.bankName || ""}
											disabled={inputValue.paymentSuccess}
											required
										/>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label className="fw-medium">
											Transaction ID <span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											type="text"
											onChange={handleChange}
											placeholder="Transaction ID or payer name"
											name="tellerNumber"
											value={inputValue.tellerNumber || ""}
											disabled={inputValue.paymentSuccess}
											required
										/>
									</Form.Group>
								</Col>
							</Row>

							<Form.Group className="mb-3">
								<Form.Label className="fw-medium">
									Transaction Date <span className="text-danger">*</span>
								</Form.Label>
								<div>
									<DatePicker
										showTime
										onChange={onDateChange}
										disabled={inputValue.paymentSuccess}
										className="w-100"
										size="large"
										placeholder="Select date and time"
									/>
								</div>
							</Form.Group>

							{paymentMethod === "direct" && (
								<Form.Group className="mb-3">
									<Form.Label className="fw-medium">
										Upload Payment Proof <span className="text-danger">*</span>
									</Form.Label>
									<div className="border rounded-3 p-3 bg-light">
										<Upload
											listType="picture"
											fileList={fileList}
											onChange={handleFileChange}
											beforeUpload={beforeUpload}
											maxCount={1}
											accept=".jpg,.jpeg,.png,.webp,.pdf"
											disabled={inputValue.paymentSuccess}
										>
											<Button
												variant="outline-primary"
												disabled={inputValue.paymentSuccess}
												className="d-flex align-items-center gap-2"
											>
												<UploadOutlined />
												Select File
											</Button>
										</Upload>
										{fileError && (
											<div className="text-danger mt-2 small">
												<i className="bi bi-exclamation-circle me-1"></i>
												{fileError}
											</div>
										)}
										<div className="text-muted mt-2 small">
											<i className="bi bi-info-circle me-1"></i>
											Upload payment receipt or transfer screenshot (JPG, PNG, WEBP or PDF, max 2MB)
										</div>
									</div>
								</Form.Group>
							)}
						</Card.Body>
					</Card>
				</div>
			)}

			{/* Success Message */}
			{inputValue?.paymentSuccess && (
				<Alert variant="success" className="border-0 shadow-sm mb-4">
					<div className="d-flex align-items-center">
						<i className="bi bi-check-circle-fill me-3" style={{ fontSize: '2rem' }}></i>
						<div>
							<h6 className="fw-semibold mb-1">Payment Verified!</h6>
							<p className="mb-0 small">Your payment has been recorded. Click Register to complete.</p>
						</div>
					</div>
				</Alert>
			)}

			{/* Submit Button */}
			{(paymentMethod === "direct" || inputValue?.paymentSuccess) && (
				<div className="d-grid gap-2">
					<Button
						variant="primary"
						type="submit"
						size="lg"
						disabled={loading}
						className="py-3 fw-semibold"
					>
						{loading ? (
							<>
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
									className="me-2"
								/>
								Processing...
							</>
						) : (
							<>
								<i className="bi bi-check-circle me-2"></i>
								Complete Registration
							</>
						)}
					</Button>
				</div>
			)}
		</Form>
	);
}

export default Payment;