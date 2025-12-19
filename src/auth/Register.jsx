import React, { useState } from "react";
import PageWrapper from "../landing/pages/PageWrapper";
import { Card, Col, Container, Row, ProgressBar } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Personal from "./Personal";
import Payment from "./Payment";
import dayjs from "dayjs";
import { ican } from "../api/axios";
import data from "../data";
import Swal from "sweetalert2";

function Register() {
	const [inputValue, setInputValue] = useState(() => {
		const saved = localStorage.getItem("ican_registration");
		return saved
			? JSON.parse(saved)
			: {
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
			};
	});

	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [paymentProofFile, setPaymentProofFile] = useState(null);

	React.useEffect(() => {
		const savedData = localStorage.getItem("ican_registration");
		if (savedData) {
			const parsed = JSON.parse(savedData);
			setInputValue(parsed);
		}
	}, []);

	React.useEffect(() => {
		localStorage.setItem("ican_registration", JSON.stringify(inputValue));
	}, [inputValue]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setInputValue((values) => ({ ...values, [name]: value }));
	};

	const handleSocietyChange = (selectedOption) => {
		setInputValue(values => ({
			...values,
			nameOfSociety: selectedOption?.value || "",
		}));
	}

	const onDateChange = (date, dateString) => {
		setInputValue({ ...inputValue, tellerDate: dateString, date });
	};

	const onPaymentSuccess = (res) => {
		setInputValue({
			...inputValue,
			bankName: "remita transaction",
			tellerNumber: res.paymentReference,
			tellerDate: dayjs().format("YYYY-MM-DD H:mm:ss"),
			paymentSuccess: true,
			amountPaid: res.amount,
		});
	};

	const rrrGenerated = (data) => {
		setInputValue({
			...inputValue,
			tellerNumber: data.rrr,
			rrrGenerated: true,
		});
	}

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

		let formattedIcanCode = inputValue.icanCode;
		if (inputValue.memberStatus === "member" && inputValue.icanCode) {
			let mb = "MB";
			let firstNumIndex = inputValue.icanCode.search(/\d/);
			let slicedCode = inputValue.icanCode.slice(firstNumIndex);
			let sequence = slicedCode + "";
			while (sequence.length < 6) sequence = "0" + sequence;
			formattedIcanCode = mb + sequence;
		}

		const formData = new FormData();

		const dataToSend = {
			...inputValue,
			name: `${surname} ${inputValue.otherNames}`,
			icanCode: formattedIcanCode
		};

		Object.keys(dataToSend).forEach(key => {
			formData.append(key, dataToSend[key]);
		});

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
					localStorage.removeItem("ican_registration");
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

	const progress = (step / 2) * 100;

	return (
		<PageWrapper>
			<Container className="py-4 py-md-5">
				<Row className='d-flex justify-content-center'>
					<Col xs={12} sm={11} md={10} lg={8} xl={6}>
						<Card className='border-0 shadow-lg rounded-4'>
							<Card.Body className="p-4 p-md-5">
								{/* Header */}
								<div className='text-center mb-4'>
									<div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
										<i className="bi bi-calendar-event text-primary" style={{ fontSize: '32px' }}></i>
									</div>
									<h2 className='fw-bold text-dark mb-2'>
										Conference Registration
									</h2>
									<p className="text-muted mb-0">
										Complete your registration in 2 simple steps
									</p>
								</div>

								{/* Progress Indicator */}
								<div className="mb-4">
									<div className="d-flex justify-content-between align-items-center mb-2">
										<span className={`badge ${step === 1 ? 'bg-primary' : 'bg-success'} rounded-pill px-3 py-2`}>
											<i className="bi bi-person-fill me-1"></i>
											Personal Info
										</span>
										<div className="flex-grow-1 mx-3">
											<ProgressBar
												now={progress}
												className="rounded-pill"
												style={{ height: '6px' }}
											/>
										</div>
										<span className={`badge ${step === 2 ? 'bg-primary' : 'bg-secondary'} rounded-pill px-3 py-2`}>
											<i className="bi bi-credit-card-fill me-1"></i>
											Payment
										</span>
									</div>
								</div>

								{/* Form Content */}
								<div className='mb-4'>
									{step === 1 && (
										<Personal
											inputValue={inputValue}
											handleChange={handleChange}
											handleSubmit={handleNext}
											districtSocieties={data.districtSocieties}
											handleSocietyChange={handleSocietyChange}
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
											onRrrGenerated={rrrGenerated}
										/>
									)}
								</div>

								{/* Footer */}
								<div className='text-center pt-3 border-top'>
									<p className='mb-0 text-muted'>
										Already have an account?{" "}
										<Link to='/login' className='text-primary fw-semibold text-decoration-none'>
											Sign in here
										</Link>
									</p>
								</div>
							</Card.Body>
						</Card>

						{/* Help Text */}
						<div className="text-center mt-3">
							<small className="text-muted">
								<i className="bi bi-shield-check me-1"></i>
								Your information is secure and encrypted
							</small>
						</div>
					</Col>
				</Row>
			</Container>
			<ToastContainer position='bottom-right' />
		</PageWrapper>
	);
}

export default Register;