import React from "react";
import PageWrapper from "../landing/pages/PageWrapper";
import { Card, Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Spin } from "antd";

import { Link, useNavigate } from "react-router-dom";
import Personal from "./Personal";
import Payment from "./Payment";
import dayjs from "dayjs";
import { ican } from "../api/axios";

function Register() {
	const [inputValue, setInputValue] = React.useState({
		surname: "",
		otherNames: "",
		email: "",
		password: "",
		bankName: "",
		tellerNumber: "",
		phone: "",
		gender: "",
		tshirtSize: "",
		memberStatus: "",
		confirm_password: "",
		icanCode: "",
		memberCategory: "",
		memberAcronym: "",
		nameOfSociety: "",
		tellerDate: "",
		venue: "",
	});
	const [step, setStep] = React.useState(1);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState();
	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;

		setInputValue((values) => ({ ...values, [name]: value }));
	};
	const onDateChange = (date, dateString) => {
		setInputValue({ ...inputValue, tellerDate: dateString, date });
	};

	const onPaymentSuccess = (res) => {
		setInputValue({
			...inputValue,

			bankName: "paystack transaction",
			tellerNumber: res.reference,
			tellerDate: dayjs().format("YYYY-MM-DD H:mm:ss"),
			paymentSuccess: true,
		});
	};
	const handleNext = () => {
		setStep(2);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		let surname = inputValue.surname.toUpperCase();
		let dataToSend = {
			...inputValue,
			name: `${surname} ${inputValue.otherNames}`,
		};

		let mb = "MB";
		let firstNumIndex = dataToSend.icanCode.search(/\d/);
		let slicedCode = dataToSend.icanCode.slice(firstNumIndex);

		let sequence = slicedCode + "";
		while (sequence.length < 6) sequence = "0" + sequence;
		dataToSend.icanCode = mb + sequence;

		try {
			const res = await ican.post("/api/user/auth/signup", dataToSend);
			if (res.data.success) setLoading(false);
			toast.success(res.data.message);
			navigate("/reg-success");
		} catch (err) {
			// console.log(err.response);
			setLoading(false);
			toast.error(err.response.data.message);
		}
	};

	return (
		<PageWrapper>
			<Container>
				<Row className=' d-flex justify-content-center align-items-center text-dark'>
					<Col sm={7} md={7} lg={6} xl={4} xs={12}>
						<Card className='shadow'>
							<Card.Body>
								<div className='mb-3 mt-md-4'>
									<div className='text-center'>
										<h3 className='mt-3 mb-4 text-dark'>
											Register for Conference
										</h3>
									</div>
									<div className='mb-3'>
										{step === 1 && (
											<Personal
												inputValue={inputValue}
												handleChange={handleChange}
												handleSubmit={handleNext}
											/>
										)}
										{step === 2 && (
											<Payment
												inputValue={inputValue}
												handleChange={handleChange}
												handleSubmit={handleSubmit}
												onSuccess={onPaymentSuccess}
												onDateChange={onDateChange}
												setStep={setStep}
												loading={loading}
											/>
										)}
										<div className='mt-3'>
											<p className='mb-0  text-center'>
												Already have an account?{" "}
												<Link to='/login' className='text-primary fw-bold'>
													Login
												</Link>
											</p>
										</div>
									</div>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
			<ToastContainer position='bottom-right' />
		</PageWrapper>
	);
}

export default Register;
