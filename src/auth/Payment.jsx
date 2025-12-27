import React, { useState, useRef, useEffect } from "react";
import { Alert, Button, Form, Spinner, Card, Row, Col, Badge } from "react-bootstrap";
import { DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { ican } from "../api/axios";
import { AlertCircle, Building2, CheckCircle, Copy, CreditCard, ArrowDown, Tag, RefreshCw } from "lucide-react";
import dayjs from "dayjs";

function Payment({
	handleSubmit,
	handleChange,
	inputValue,
	onSuccess,
	onDateChange,
	setStep,
	loading,
	handleFileUpload,
	onRrrGenerated,
	clearRRR // Add this prop
}) {

	// STATE
	const [paymentMethod, setPaymentMethod] = useState("");
	const [generatingRRR, setGeneratingRRR] = useState(false);
	const [rrrGenerated, setRrrGenerated] = useState(inputValue.rrrGenerated || false);
	const [rrrDetails, setRrrDetails] = useState(
		inputValue.tellerNumber
			? { rrr: inputValue.tellerNumber, amount: inputValue.amountPaid || 0 }
			: null
	);
	const [copiedRRR, setCopiedRRR] = useState(false);
	const [verifyingPayment, setVerifyingPayment] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [fileError, setFileError] = useState("");
	const [showBankInstructions, setShowBankInstructions] = useState(false);

	// REF for scrolling
	const bankConfirmRef = useRef(null);

	// Scroll to bank confirmation when it appears
	useEffect(() => {
		if (paymentMethod === "bank-confirm" && bankConfirmRef.current) {
			setTimeout(() => {
				bankConfirmRef.current.scrollIntoView({
					behavior: "smooth",
					block: "center"
				});
			}, 100);
		}
	}, [paymentMethod]);

	// DISCOUNT LOGIC
	const isEarlyBird = () => {
		const deadline = dayjs("2025-12-31").endOf("day");
		const now = dayjs();
		return now.isBefore(deadline) || now.isSame(deadline, "day");
	};

	const calculateBaseAmount = () => {
		if (!inputValue) return 0;

		if (inputValue.venue === "virtual") return 25000;
		if (inputValue.memberStatus === "nonmember") return 70000;

		const memberAmounts = {
			"full-paying member": 60000,
			"young-accountants": 40000,
			"half-paying member": 45000,
			"student-member": 30000,
		};

		return memberAmounts[inputValue.memberCategory] || 0;
	};

	const baseAmount = calculateBaseAmount();
	const hasDiscount = isEarlyBird();
	const discountAmount = hasDiscount ? Math.round(baseAmount * 0.05) : 0;
	const amount = baseAmount - discountAmount;

	// UTILITY FUNCTIONS
	const swalError = (msg) => Swal.fire({ icon: "error", title: "Error", text: msg });
	const swalSuccess = (msg) => Swal.fire({ icon: "success", title: "Success", text: msg });

	// FILE HANDLING
	const handleFileChange = ({ fileList }) => {
		const newList = fileList.slice(-1);
		setFileList(newList);

		if (newList.length === 0) {
			handleFileUpload(null);
			return;
		}

		const file = newList[0].originFileObj;
		const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];

		if (!validTypes.includes(file.type)) {
			setFileError("Please upload only JPG, PNG, WEBP or PDF files");
			return;
		}

		if (file.size > 2 * 1024 * 1024) {
			setFileError("File size must be less than 2MB");
			return;
		}

		setFileError("");
		handleFileUpload(file);
	};

	const beforeUpload = () => false;

	const validateForm = () => {
		if (paymentMethod === "direct" && fileList.length === 0) {
			setFileError("Please upload your payment proof");
			return false;
		}
		return true;
	};

	// INLINE PAYMENT (Remita)
	const proceedWithInlinePayment = () => {
		if (!window.RmPaymentEngine) {
			return swalError("Payment service unavailable. Please refresh and try again.");
		}

		const rrr = rrrGenerated ? inputValue.tellerNumber : rrrDetails?.rrr;

		if (!rrr) return swalError("RRR not found. Please generate RRR first.");

		const paymentEngine = window.RmPaymentEngine.init({
			key: process.env.REACT_APP_REMITA_KEY,
			processRrr: true,
			transactionId: rrr,
			extendedData: { customFields: [{ name: "rrr", value: rrr }] },

			onSuccess: onSuccess,
			onError: () => swalError("Payment error occurred"),
			onClose: () => console.log("Payment closed"),
		});

		paymentEngine.showPaymentWidget();
	};

	// GENERATE RRR
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
			};

			const res = await ican.post("/api/payments/initialize", paymentData);
			const data = res.data.data;

			if (!data.rrr) return swalError("Failed to generate RRR");

			const details = { rrr: data.rrr, amount };
			setRrrDetails(details);
			setRrrGenerated(true);
			onRrrGenerated({ rrr: data.rrr });

			swalSuccess("RRR Generated Successfully!");

		} catch (error) {
			console.error(error);
			swalError("Failed to generate RRR. Please try again.");
		} finally {
			setGeneratingRRR(false);
		}
	};

	// REGENERATE RRR - NEW FUNCTION
	const handleRegenerateRRR = () => {
		Swal.fire({
			title: 'Regenerate RRR?',
			text: 'This will create a new payment reference. Your previous RRR will no longer be valid.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, generate new RRR',
			cancelButtonText: 'Cancel'
		}).then(async (result) => {
			if (result.isConfirmed) {
				// Clear existing RRR state
				setRrrGenerated(false);
				setRrrDetails(null);
				setPaymentMethod("");
				setShowBankInstructions(false);

				// Clear from parent component
				clearRRR();

				// Generate new RRR
				await generateRRR();
			}
		});
	};

	// PAYMENT METHOD SELECTION
	const handlePaymentMethodSelect = async (method) => {
		setPaymentMethod(method);
		if (method === "online" && !rrrGenerated) await generateRRR();
	};

	// COPY RRR TO CLIPBOARD
	const copyRRRToClipboard = () => {
		navigator.clipboard.writeText(rrrDetails.rrr);
		setCopiedRRR(true);
		setTimeout(() => setCopiedRRR(false), 2000);
	};

	// Handle bank branch payment selection
	const handleBankBranchSelection = () => {
		setPaymentMethod("bank-confirm");
		setShowBankInstructions(true);
	};

	// BANK PAYMENT VERIFICATION
	const handleBankBranchPaymentComplete = async () => {
		setVerifyingPayment(true);

		try {
			const reference = inputValue.rrr || rrrDetails.rrr;
			const response = await ican.get(`/api/payments/verify/${reference}`);
			const data = response.data.data;

			console.log(data);

			if (data.status === "01" || data.status === "00") {
				onSuccess({ paymentReference: rrrDetails.rrr, amount });
				swalSuccess("Payment verified!");
				handleSubmit();
			} else {
				swalError("Payment not yet confirmed at the bank.");
			}
		} catch {
			swalError("Failed to verify payment. Please try again.");
		} finally {
			setVerifyingPayment(false);
		}
	};

	// FORM SUBMIT
	const onSubmit = (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		handleSubmit(e);
	};

	return (
		<Form onSubmit={onSubmit}>

			<div className="mb-4">
				<Button variant="outline-primary" onClick={() => setStep(1)} className="d-flex align-items-center gap-2">
					<i className="bi bi-arrow-left"></i> Back to Personal Info
				</Button>
			</div>

			{/* Early Bird Discount Banner */}
			{hasDiscount && (
				<Alert variant="success" className="border-0 shadow-sm mb-4">
					<div className="d-flex align-items-center">
						<Tag size={24} className="me-3 text-success" />
						<div className="flex-grow-1">
							<h6 className="fw-bold mb-1">
								<i className="bi bi-gift-fill me-2"></i>
								Early Bird Discount Active!
							</h6>
							<p className="mb-0 small">
								Register before December 31st and save 5% on your registration fee.
								<strong className="ms-1">You save ₦{discountAmount.toLocaleString()}!</strong>
							</p>
						</div>
					</div>
				</Alert>
			)}

			{/* RRR DISPLAY UI */}
			{!!rrrGenerated && rrrDetails && (
				<div className="mb-4">
					<Card className="border-success shadow-sm">
						<Card.Body className="p-4">
							<div className="d-flex justify-content-between align-items-start mb-4">
								<div className="text-center flex-grow-1">
									<CheckCircle size={48} className="text-success mb-3" />
									<h5 className="fw-bold text-success">RRR Generated Successfully!</h5>
									<p className="text-muted">Your Remita Retrieval Reference is ready</p>
								</div>

								{/* Regenerate Button - NEW */}
								<Button
									variant="outline-secondary"
									size="sm"
									onClick={handleRegenerateRRR}
									className="d-flex align-items-center gap-2"
									title="Generate a new RRR"
								>
									<RefreshCw size={16} />
									<span className="d-none d-md-inline">New RRR</span>
								</Button>
							</div>

							<Alert variant="light" className="border mb-4">
								<div className="d-flex justify-content-between">
									<span className="text-muted small">RRR Number:</span>
									<Badge bg="primary" className="fs-6 py-2 px-3">{rrrDetails.rrr}</Badge>
								</div>
								<div className="d-flex justify-content-between mt-2">
									<span className="text-muted small">Amount:</span>
									<span className="fw-bold">₦{amount.toLocaleString()}</span>
								</div>
								{hasDiscount && (
									<div className="mt-2 pt-2 border-top">
										<small className="text-success">
											<i className="bi bi-gift-fill me-1"></i>
											Early bird discount applied (5% off)
										</small>
									</div>
								)}
							</Alert>

							<Button variant="outline-primary" size="sm" className="w-100 mb-4" onClick={copyRRRToClipboard}>
								<Copy size={16} className="me-2" />
								{copiedRRR ? "Copied!" : "Copy RRR"}
							</Button>

							{/* Payment Method Selection  */}
							{paymentMethod !== "bank-confirm" && (
								<>
									<h6 className="text-center mb-3 text-muted">Choose how to pay</h6>
									<Row className="g-3">
										<Col md={6}>
											<Button variant="primary" size="lg" className="w-100 py-3" onClick={proceedWithInlinePayment}>
												<CreditCard size={24} className="mb-2 d-block mx-auto" />
												<div className="fw-semibold">Pay Online Now</div>
												<small className="d-block opacity-75">Card, Bank Transfer, USSD</small>
											</Button>
										</Col>

										<Col md={6}>
											<Button
												variant="outline-primary"
												size="lg"
												className="w-100 py-3"
												onClick={handleBankBranchSelection}
											>
												<Building2 size={24} className="mb-2 d-block mx-auto" />
												<div className="fw-semibold">Pay at Bank</div>
												<small className="d-block opacity-75">Visit any bank branch</small>
											</Button>
										</Col>
									</Row>
								</>
							)}

							{/* Bank Instructions Preview */}
							{paymentMethod !== "bank-confirm" && (
								<Alert variant="info" className="mt-4 mb-0">
									<div className="d-flex align-items-start">
										<AlertCircle size={18} className="me-2 mt-1 flex-shrink-0" />
										<small>
											<strong>Bank Payment:</strong> Use the RRR above at any bank branch. After payment, return here to verify your transaction.
										</small>
									</div>
								</Alert>
							)}
						</Card.Body>
					</Card>
				</div>
			)}

			{/* BANK CONFIRM UI */}
			{paymentMethod === "bank-confirm" && rrrGenerated && (
				<div
					ref={bankConfirmRef}
					className="mb-4"
					style={{
						animation: "slideIn 0.3s ease-out"
					}}
				>
					<style>
						{`
							@keyframes slideIn {
								from {
									opacity: 0;
									transform: translateY(-20px);
								}
								to {
									opacity: 1;
									transform: translateY(0);
								}
							}
						`}
					</style>

					{/* Visual separator */}
					<div className="text-center mb-3">
						<ArrowDown size={32} className="text-primary animate-bounce" />
					</div>

					<Card className="border-primary shadow">
						<Card.Header className="bg-primary text-white">
							<h5 className="mb-0 d-flex align-items-center">
								<Building2 size={24} className="me-2" />
								Bank Branch Payment Instructions
							</h5>
						</Card.Header>
						<Card.Body className="p-4">
							<Alert variant="info" className="mb-4">
								<h6 className="fw-semibold mb-3">How to Complete Your Payment:</h6>
								<ol className="ps-3 mb-0">
									<li className="mb-2">Visit any bank branch in Nigeria</li>
									<li className="mb-2">Tell the teller you want to make a Remita payment</li>
									<li className="mb-2">Provide your RRR: <Badge bg="dark" className="ms-2">{rrrDetails.rrr}</Badge></li>
									<li className="mb-2">Pay exactly: <strong>₦{amount.toLocaleString()}</strong></li>
									<li className="mb-2">Collect your payment receipt</li>
									<li>Return here and click "I Have Made Payment" below</li>
								</ol>
							</Alert>

							<div className="bg-light p-3 rounded mb-4">
								<Row className="align-items-center">
									<Col xs={4} className="text-muted small">Your RRR:</Col>
									<Col xs={8}>
										<div className="d-flex align-items-center justify-content-between">
											<Badge bg="primary" className="fs-6 py-2 px-3">{rrrDetails.rrr}</Badge>
											<Button
												variant="outline-secondary"
												size="sm"
												onClick={copyRRRToClipboard}
											>
												<Copy size={14} className="me-1" />
												{copiedRRR ? "Copied!" : "Copy"}
											</Button>
										</div>
									</Col>
								</Row>
								<hr className="my-2" />
								<Row className="align-items-center">
									<Col xs={4} className="text-muted small">Amount:</Col>
									<Col xs={8}>
										<span className="fw-bold fs-5">₦{amount.toLocaleString()}</span>
										{hasDiscount && (
											<Badge bg="success" className="ms-2">5% discount applied</Badge>
										)}
									</Col>
								</Row>
							</div>

							<div className="d-grid gap-3">
								<Button
									variant="success"
									size="lg"
									onClick={handleBankBranchPaymentComplete}
									disabled={verifyingPayment}
									className="py-3"
								>
									{verifyingPayment ? (
										<>
											<Spinner animation="border" size="sm" className="me-2" />
											Verifying Payment...
										</>
									) : (
										<>
											<CheckCircle size={20} className="me-2" />
											I Have Made Payment - Verify Now
										</>
									)}
								</Button>

								<Button
									variant="outline-secondary"
									onClick={() => {
										setPaymentMethod("");
										setShowBankInstructions(false);
									}}
								>
									← Back to Payment Options
								</Button>
							</div>

							<Alert variant="warning" className="mt-3 mb-0">
								<small>
									<AlertCircle size={16} className="me-1" />
									<strong>Important:</strong> Bank payments may take a few minutes to reflect in our system. If verification fails, please wait 5-10 minutes and try again.
								</small>
							</Alert>
						</Card.Body>
					</Card>
				</div>
			)}

			{!rrrGenerated && (
				<>
					{/* PAYMENT SUMMARY */}
					<Card className="border-primary mb-4 shadow-sm">
						<Card.Body className="p-4">
							<div className="d-flex justify-content-between">
								<h5 className="fw-semibold">
									<i className="bi bi-receipt me-2 text-primary"></i>
									Payment Summary
								</h5>
								<Badge bg="primary" className="px-3 py-2">
									{inputValue.venue === "virtual" ? "Virtual" : "Physical"} Attendance
								</Badge>
							</div>

							<div className="py-3 border-top">
								{hasDiscount && (
									<>
										<div className="d-flex justify-content-between align-items-center mb-2">
											<span className="text-muted">Original Price</span>
											<span className="text-muted text-decoration-line-through">
												₦{baseAmount.toLocaleString()}
											</span>
										</div>
										<div className="d-flex justify-content-between align-items-center mb-2">
											<span className="text-success fw-semibold">
												<i className="bi bi-gift-fill me-1"></i>
												Early Bird Discount (5%)
											</span>
											<span className="text-success fw-semibold">
												-₦{discountAmount.toLocaleString()}
											</span>
										</div>
										<hr className="my-2" />
									</>
								)}
								<div className="d-flex justify-content-between align-items-center">
									<span className={hasDiscount ? "fw-semibold" : "text-muted"}>
										{hasDiscount ? "Total to Pay" : "Registration Fee"}
									</span>
									<h3 className="fw-bold text-primary mb-0">₦{amount.toLocaleString()}</h3>
								</div>
							</div>

							{inputValue.memberStatus === "member" && (
								<small className="text-muted">
									<i className="bi bi-info-circle me-1"></i>
									{inputValue.memberCategory.replace(/-/g, " ").toUpperCase()} rate
								</small>
							)}
						</Card.Body>
					</Card>

					{/* PAYMENT METHOD SELECTION */}
					<div className="mb-4">
						<h5 className="fw-semibold mb-3 text-dark">
							<i className="bi bi-credit-card me-2 text-primary"></i>
							Choose Payment Method
						</h5>

						<Row className="g-3">
							<Col md={6}>
								<Card
									className={`h-100 ${paymentMethod === "online" ? "border-primary shadow" : "border"}`}
									style={{ cursor: "pointer" }}
									onClick={() => handlePaymentMethodSelect("online")}
								>
									<Card.Body className="text-center p-4">
										<i className="bi bi-credit-card-2-front text-primary" style={{ fontSize: "2.5rem" }}></i>
										<h6 className="fw-semibold mt-3">Online Payment</h6>
										<p className="text-muted small">Pay with card or transfer</p>

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
								<Card className="h-100 border opacity-50" style={{ cursor: "not-allowed" }}>
									<Card.Body className="text-center p-4">
										<i className="bi bi-bank text-muted" style={{ fontSize: "2.5rem" }}></i>
										<h6 className="fw-semibold mt-3 text-muted">Direct Lodgement / Transfer</h6>
										<p className="text-muted small">Pay at the bank</p>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</div>
				</>
			)}

			{/* BANK TRANSFER FORM */}
			{(paymentMethod === "direct" || inputValue.paymentSuccess) && (
				<div className="mb-4">

					{paymentMethod === "direct" && !inputValue.paymentSuccess && (
						<Alert variant="info" className="border-0 shadow-sm">
							<h6 className="fw-semibold mb-2">Bank Account Details</h6>
							<p className="mb-1"><strong>Bank:</strong> Zenith Bank</p>
							<p className="mb-1"><strong>Account Number:</strong> 1015593246</p>
							<p className="mb-1"><strong>Account Name:</strong> ICAN Eastern Zonal District</p>
							<p className="mb-0"><strong>Amount:</strong> ₦{amount.toLocaleString()}</p>
						</Alert>
					)}

					<Card className="border-0 shadow-sm">
						<Card.Body className="p-4">
							<h6 className="fw-semibold mb-3">
								<i className="bi bi-file-earmark-text me-2"></i>Transaction Details
							</h6>

							<Row>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Bank Paid From <span className="text-danger">*</span></Form.Label>
										<Form.Control
											type="text"
											name="bankName"
											value={inputValue.bankName || ""}
											onChange={handleChange}
											placeholder="Enter bank name"
											disabled={inputValue.paymentSuccess}
											required
										/>
									</Form.Group>
								</Col>

								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Transaction ID <span className="text-danger">*</span></Form.Label>
										<Form.Control
											type="text"
											name="tellerNumber"
											value={inputValue.tellerNumber || ""}
											onChange={handleChange}
											placeholder="Teller No. or reference"
											disabled={inputValue.paymentSuccess}
											required
										/>
									</Form.Group>
								</Col>
							</Row>

							<Form.Group className="mb-3">
								<Form.Label>Transaction Date <span className="text-danger">*</span></Form.Label>
								<DatePicker
									showTime
									onChange={onDateChange}
									disabled={inputValue.paymentSuccess}
									className="w-100"
									size="large"
									placeholder="Select date and time"
								/>
							</Form.Group>

							{paymentMethod === "direct" && (
								<Form.Group className="mb-3">
									<Form.Label>Upload Payment Proof <span className="text-danger">*</span></Form.Label>

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
											<Button variant="outline-primary" disabled={inputValue.paymentSuccess}>
												<UploadOutlined /> Select File
											</Button>
										</Upload>

										{fileError && <p className="text-danger small mt-2">{fileError}</p>}

										<p className="text-muted small mt-2">
											<i className="bi bi-info-circle me-1"></i>
											Upload receipt or transfer screenshot (max 2MB)
										</p>
									</div>
								</Form.Group>
							)}
						</Card.Body>
					</Card>
				</div>
			)}

			{/* SUCCESS ALERT */}
			{inputValue.paymentSuccess && (
				<Alert variant="success" className="border-0 shadow-sm mb-4">
					<h6 className="fw-semibold mb-1">Payment Verified!</h6>
					<p className="small mb-0">Click Register to complete your registration.</p>
				</Alert>
			)}

			{/* SUBMIT BUTTON */}
			{(paymentMethod === "direct" || inputValue.paymentSuccess) && (
				<div className="d-grid">
					<Button variant="primary" type="submit" size="lg" disabled={loading} className="py-3">
						{loading ? (
							<>
								<Spinner animation="border" size="sm" className="me-2" />
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