import React, { useState } from "react";
import PageWrapper from "../landing/pages/PageWrapper";
import { Card, Col, Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Personal from "./Personal";
import Payment from "./Payment";
import dayjs from "dayjs";
import { ican } from "../api/axios";
import data from "../data";
import Swal from "sweetalert2";

function Register() {
	const [inputValue, setInputValue] = useState({
		surname: "",
		otherNames: "",
		email: "",
		password: "",
		bankName: "",
		tellerNumber: "",
		phone: "",
		gender: "",
		tshirtSize: "L",
		memberStatus: "",
		confirm_password: "",
		icanCode: "",
		memberCategory: "",
		memberAcronym: "",
		nameOfSociety: "",
		tellerDate: "",
		venue: "",
	});
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [paymentProofFile, setPaymentProofFile] = useState(null);

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

	const handleFileUpload = (file) => {
		setPaymentProofFile(file);
	};

	const validatePersonalInfo = () => {
		const {
			surname,
			otherNames,
			email,
			phone,
			password,
			confirm_password,
			gender,
			memberStatus,
			venue
		} = inputValue;

		if (!surname || !otherNames || !email || !phone || !password || !confirm_password || !gender || !memberStatus || !venue) {
			Swal.fire({
				icon: "warning",
				title: "Missing Information",
				text: "Please complete all required fields before continuing.",
			});
			return false;
		}

		if (password !== confirm_password) {
			Swal.fire({
				icon: "error",
				title: "Password Mismatch",
				text: "Your passwords do not match.",
			});
			return false;
		}

		// additional checks for members
		if (memberStatus === "member") {
			const { icanCode, memberCategory, memberAcronym, nameOfSociety } = inputValue;
			if (!icanCode || !memberCategory || !memberAcronym || !nameOfSociety) {
				Swal.fire({
					icon: "warning",
					title: "Incomplete Member Details",
					text: "Please fill in all ICAN member details.",
				});
				return false;
			}
		}

		return true;
	};

	const handleNext = () => {
		if (!validatePersonalInfo()) return;
		setStep(2);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		let surname = inputValue.surname.toUpperCase();

		// Format ICAN code if provided
		let formattedIcanCode = inputValue.icanCode;
		if (inputValue.memberStatus === "member" && inputValue.icanCode) {
			let mb = "MB";
			let firstNumIndex = inputValue.icanCode.search(/\d/);
			let slicedCode = inputValue.icanCode.slice(firstNumIndex);
			let sequence = slicedCode + "";
			while (sequence.length < 6) sequence = "0" + sequence;
			formattedIcanCode = mb + sequence;
		}

		// Create FormData object for file upload
		const formData = new FormData();

		// Add all form fields to FormData
		const dataToSend = {
			...inputValue,
			name: `${surname} ${inputValue.otherNames}`,
			icanCode: formattedIcanCode
		};

		Object.keys(dataToSend).forEach(key => {
			formData.append(key, dataToSend[key]);
		});

		// Add the file if it exists
		if (paymentProofFile) {
			formData.append("file", paymentProofFile);
		}

		try {
			const res = await ican.post("/api/user/auth/signup", formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			setLoading(false);

			if (res.data.success) {
				Swal.fire({
					icon: "success",
					title: "Registration Successful",
					text: "You have successfully registered for the conference",
					timer: 3000,
				}).then(() => {
					window.location.href = "https://admin.icanezdconference.org.ng/login";
				});
			}
		} catch (err) {
			setLoading(false);
			const message = err.response?.data?.message || "Registration failed. Please try again.";
			Swal.fire({
				icon: "error",
				title: "Registration failed",
				text: message,
			});
		}
	};

	return (
		<PageWrapper>
			<Container>
				<Row className='d-flex justify-content-center align-items-center text-dark'>
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
												districtSocieties={data.districtSocieties}
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
												handleFileUpload={handleFileUpload}
											/>
										)}
										<div className='mt-3'>
											<p className='mb-0 text-center'>
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