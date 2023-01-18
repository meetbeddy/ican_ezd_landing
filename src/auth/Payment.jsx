import React from "react";
import { usePaystackPayment } from "react-paystack";
import { Alert, Button, Form } from "react-bootstrap";
import { DatePicker } from "antd";
// import "antd/dist/reset.css";

function Payment({
	handleSubmit,
	handleChange,
	inputValue,
	onSuccess,
	onDateChange,
	setStep,
}) {
	const [paymentMethod, setPaymentMethod] = React.useState(undefined);
	let amount;
	if (inputValue.venue === "virtual") {
		amount = 20000;
	} else {
		if (inputValue.memberStatus === "nonmember") {
			amount = 45000;
		} else {
			switch (inputValue.memberCategory) {
				case "full-paying member":
					amount = 40000;

					break;
				case "young-accountants":
					amount = 30000;

					break;
				case "half-paying member":
					amount = 20000;

					break;
				default:
					amount = 10;
					break;
			}
		}
	}

	const config = {
		reference: new Date().getTime().toString(),
		email: inputValue.email,
		amount: amount * 100,
		publicKey: process.env.REACT_APP_PAYSTACK,
	};

	const initializePayment = usePaystackPayment({
		...config,
	});

	const onClose = () => {
		setPaymentMethod("direct");
	};

	const handlePaymentMethod = (e) => {
		setPaymentMethod(e.target.value);

		if (e.target.value === "online") {
			initializePayment((res) => {
				onSuccess(res);
			}, onClose);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<div className='mb-3'>
				<Button variant='success' onClick={() => setStep(1)}>
					back
					<span className='ms-2'>
						<i className='bi bi-skip-backward'></i>
					</span>
				</Button>
			</div>
			<Form.Group className='mb-3'>
				<Form.Label htmlFor='memberStatus'>Payment Channel</Form.Label>
				<Form.Select
					onChange={(e) => {
						handlePaymentMethod(e);
					}}
					value={paymentMethod}
					name='paymentMethod'
					disabled={paymentMethod}
					required>
					<option value=''>-SELECT STATUS-</option>
					<option value='direct'>Direct Lodgement/Transfer</option>
					<option value='online'>Online Payment</option>
				</Form.Select>
			</Form.Group>
			{(paymentMethod === "direct" || inputValue?.paymentSuccess) && (
				<>
					<div className='mb-3 row'>
						<Button
							variant='secondary'
							type='button'
							value='online'
							onClick={handlePaymentMethod}
							disabled={inputValue.paymentSuccess}>
							Use Online payment Instead{" "}
							<span className='ms-2'>
								<i class='bi bi-credit-card'></i>
							</span>
						</Button>
						{paymentMethod === "direct" && (
							<Alert variant='info' className='mt-2'>
								Please Pay <em>₦{amount}</em> to Zenith Bank, Account Number
								1015593246
							</Alert>
						)}
					</div>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>Bank Paid From</Form.Label>
						<Form.Control
							type='text'
							onChange={handleChange}
							placeholder='enter name of bank'
							name='bankName'
							value={inputValue.bankName}
							disabled={inputValue.paymentSuccess}
							required
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>Transaction ID</Form.Label>
						<Form.Control
							type='text'
							onChange={handleChange}
							placeholder='transaction id or name of payer'
							name='tellerNumber'
							value={inputValue.tellerNumber}
							disabled={inputValue.paymentSuccess}
							required
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>Teller/Transfer Date</Form.Label>
						<DatePicker
							showTime
							onChange={onDateChange}
							disabled={inputValue.paymentSuccess}
						/>
					</Form.Group>

					<div className='d-grid'>
						<Button variant='primary' type='submit'>
							Register
						</Button>
					</div>
				</>
			)}
		</Form>
	);
}

export default Payment;
