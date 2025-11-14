import React, { useState } from "react";
import { Alert, Button, Form, Spinner, Card, Row, Col, Badge } from "react-bootstrap";
import { DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function Payment({
	handleSubmit,
	handleChange,
	inputValue,
	onSuccess,
	onDateChange,
	setStep,
	loading,
	handleFileUpload,
}) {
	const [paymentMethod, setPaymentMethod] = useState(undefined);
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

	const handleRemitaPayment = () => {
		if (!window.RmPaymentEngine) {
			console.error("Remita script not loaded");
			alert("Payment service unavailable. Please refresh and try again.");
			return;
		}

		const paymentEngine = window.RmPaymentEngine.init({
			key: process.env.REACT_APP_REMITA_KEY,
			transactionId: Date.now().toString(),
			customerId: inputValue.email,
			firstName: inputValue.otherNames || "Guest",
			lastName: inputValue.surname || "",
			email: inputValue.email,
			amount,
			narration: "ICAN Conference Registration",
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

	const handlePaymentMethod = (e) => {
		const selectedMethod = e.target.value;
		setPaymentMethod(selectedMethod);
		setFileError("");

		if (selectedMethod === "online") {
			setPaymentInitiated(true);
			handleRemitaPayment();
		}
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
			<div className="mb-4">
				<h5 className="fw-semibold mb-3 text-dark">
					<i className="bi bi-credit-card me-2 text-primary"></i>
					Select Payment Method
				</h5>

				<Form.Group>
					<Row className="g-3">
						<Col md={6}>
							<Card
								className={`h-100 cursor-pointer border-2 ${paymentMethod === 'online' ? 'border-primary' : ''}`}
								onClick={() => !inputValue?.paymentSuccess && handlePaymentMethod({ target: { value: 'online' } })}
								style={{ cursor: inputValue?.paymentSuccess ? 'not-allowed' : 'pointer' }}
							>
								<Card.Body className="text-center p-4">
									<div className="mb-3">
										<i className="bi bi-credit-card-2-front text-primary" style={{ fontSize: '2.5rem' }}></i>
									</div>
									<h6 className="fw-semibold mb-2">Online Payment</h6>
									<p className="text-muted small mb-0">Pay securely with Remita</p>
								</Card.Body>
							</Card>
						</Col>
						<Col md={6}>
							<Card
								className="h-100 border-2 opacity-50"
								style={{ cursor: 'not-allowed' }}
							>
								<Card.Body className="text-center p-4 position-relative">
									<div className="position-absolute top-0 end-0 m-2">
										<Badge bg="secondary" className="px-2 py-1">
											<small>Disabled</small>
										</Badge>
									</div>
									<div className="mb-3">
										<i className="bi bi-bank text-muted" style={{ fontSize: '2.5rem' }}></i>
									</div>
									<h6 className="fw-semibold mb-2 text-muted">Bank Transfer</h6>
									<p className="text-muted small mb-0">Direct lodgement/transfer</p>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Form.Group>
			</div>

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
									handlePaymentMethod({ target: { value: "online" } });
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