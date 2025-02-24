import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { DatePicker, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';

function Payment({
	handleSubmit,
	handleChange,
	inputValue,
	onSuccess,
	onDateChange,
	setStep,
	loading,
	handleFileUpload, // New prop for handling file upload
}) {
	const [paymentMethod, setPaymentMethod] = useState(undefined);
	const [paymentInitiated, setPaymentInitiated] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [fileError, setFileError] = useState("");

	const calculateAmount = () => {
		if (!inputValue) return 0;

		if (inputValue.venue === "virtual") {
			return 30000;
		}

		if (inputValue.memberStatus === "nonmember") {
			return 60000;
		}

		const memberAmounts = {
			"full-paying member": 50000,
			"young-accountants": 35000,
			"half-paying member": 30000
		};

		return memberAmounts[inputValue.memberCategory] || 0;
	};

	const amount = calculateAmount();

	const config = {
		reference: new Date().getTime().toString(),
		email: inputValue?.email,
		amount: amount * 100,
		publicKey: process.env.REACT_APP_PAYSTACK,
	};

	const initializePayment = usePaystackPayment({
		...config,
	});

	const onClose = () => {
		// Reset payment method and initiated state when modal is closed
		setPaymentMethod(undefined);
		setPaymentInitiated(false);
	};

	const handlePaymentMethod = (e) => {
		const selectedMethod = e.target.value;
		setPaymentMethod(selectedMethod);
		setFileError("");

		if (selectedMethod === "online") {
			setPaymentInitiated(true);
			initializePayment((res) => {
				onSuccess(res);
			}, onClose);
		}
	};

	// Handle file change
	const handleFileChange = ({ fileList }) => {
		const newFileList = fileList.slice(-1);
		setFileList(newFileList);

		if (newFileList.length > 0) {
			const file = newFileList[0].originFileObj;
			// Validate file type
			const isValidType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'].includes(file.type);
			if (!isValidType) {
				setFileError("Please upload only JPG, PNG, WEBP or PDF files");
				return;
			}

			// Validate file size (max 2MB)
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

	const beforeUpload = (file) => {
		// This prevents auto upload and lets us handle it manually
		return false;
	};

	const validateForm = () => {
		// Check if payment proof is required and uploaded
		if (paymentMethod === "direct" && fileList.length === 0) {
			setFileError("Please upload your payment proof");
			return false;
		}
		return true;
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (!validateForm()) {
			return;
		}
		handleSubmit(e);
	};

	return (
		<Form onSubmit={onSubmit}>
			<div className="mb-3">
				<Button variant="success" onClick={() => setStep(1)}>
					back
					<span className="ms-2">
						<i className="bi bi-skip-backward"></i>
					</span>
				</Button>
			</div>
			<Form.Group className="mb-3">
				<Form.Label htmlFor="paymentMethod">Payment Channel</Form.Label>
				<Form.Select
					onChange={handlePaymentMethod}
					value={paymentMethod || ''}
					name="paymentMethod"
					disabled={paymentInitiated && inputValue?.paymentSuccess}
					required
				>
					<option value="">-SELECT PAYMENT METHOD-</option>
					<option value="direct">Direct Lodgement/Transfer</option>
					<option value="online">Online Payment</option>
				</Form.Select>
			</Form.Group>
			{(paymentMethod === "direct" || inputValue?.paymentSuccess) && (
				<>
					<div className="mb-3 row">
						<Button
							variant="secondary"
							type="button"
							value="online"
							onClick={() => {
								setPaymentMethod("online");
								handlePaymentMethod({ target: { value: "online" } });
							}}
							disabled={inputValue?.paymentSuccess}
						>
							Use Online payment Instead{" "}
							<span className="ms-2">
								<i className="bi bi-credit-card"></i>
							</span>
						</Button>
						{paymentMethod === "direct" && (
							<Alert variant="info" className="mt-2">
								Please Pay <em>₦{amount.toLocaleString()}</em> to Zenith Bank, Account Number
								1015593246, Account Name: ICAN Eastern Zonal District
							</Alert>
						)}
					</div>
					<Form.Group className="mb-3" controlId="bankName">
						<Form.Label>Bank Paid From</Form.Label>
						<Form.Control
							type="text"
							onChange={handleChange}
							placeholder="enter name of bank"
							name="bankName"
							value={inputValue.bankName || ''}
							disabled={inputValue.paymentSuccess}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="tellerNumber">
						<Form.Label>Transaction ID</Form.Label>
						<Form.Control
							type="text"
							onChange={handleChange}
							placeholder="transaction id or name of payer"
							name="tellerNumber"
							value={inputValue.tellerNumber || ''}
							disabled={inputValue.paymentSuccess}
							required
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="tellerDate">
						<Form.Label>Teller/Transfer Date</Form.Label>
						<DatePicker
							showTime
							onChange={onDateChange}
							disabled={inputValue.paymentSuccess}
						/>
					</Form.Group>

					{/* Payment Proof Upload */}
					{paymentMethod === "direct" && (
						<Form.Group className="mb-3" controlId="paymentProof">
							<Form.Label>Upload Payment Proof</Form.Label>
							<div className="upload-container">
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
										icon={<UploadOutlined />}
										disabled={inputValue.paymentSuccess}
									>
										Select File
									</Button>
								</Upload>
							</div>
							{fileError && <div className="text-danger mt-2">{fileError}</div>}
							<div className="form-text">
								Upload payment receipt or transfer screenshot (JPG, PNG, WEBP or PDF, max 2MB)
							</div>
						</Form.Group>
					)}

					<div className="d-grid">
						<Button variant="primary" type="submit">
							{loading && (
								<Spinner
									as="span"
									animation="grow"
									size="sm"
									role="status"
									aria-hidden="true"
								/>
							)}
							Register
						</Button>
					</div>
				</>
			)}
		</Form>
	);
}

export default Payment;