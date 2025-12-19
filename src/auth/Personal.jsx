
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import Select from "react-select";

function Personal({ handleChange, handleSubmit, inputValue, districtSocieties, handleSocietyChange }) {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const districtSocietyOptions = districtSocieties.map(ds => ({
		value: ds,
		label: ds,
	}));


	return (
		<Form>
			{/* Membership Status Section */}
			<div className="mb-4">
				<h5 className="fw-semibold mb-3 text-dark">
					<i className="bi bi-person-badge me-2 text-primary"></i>
					Membership Status
				</h5>
				<Form.Group className='mb-3'>
					<Form.Label className="fw-medium">
						Are you a member of ICAN? <span className="text-danger">*</span>
					</Form.Label>
					<Form.Select
						onChange={handleChange}
						value={inputValue.memberStatus}
						name='memberStatus'
						className="form-select-lg"
						required
					>
						<option value=''>Select your status</option>
						<option value='member'>ICAN Member</option>
						<option value='nonmember'>Non-ICAN Member</option>
					</Form.Select>
				</Form.Group>
			</div>

			{/* Member Details Section */}
			{inputValue.memberStatus === "member" && (
				<div className="bg-light rounded-3 p-3 p-md-4 mb-4">
					<h6 className="fw-semibold mb-3 text-primary">
						<i className="bi bi-card-checklist me-2"></i>
						Member Details
					</h6>

					<Row>
						<Col md={6}>
							<Form.Group className='mb-3'>
								<Form.Label className="fw-medium">
									Member Category <span className="text-danger">*</span>
								</Form.Label>
								<Form.Select
									onChange={handleChange}
									value={inputValue.memberCategory}
									name='memberCategory'
									required
								>
									<option value=''>Select category</option>
									<option value='full-paying member'>Full-Paying Member</option>
									<option value='young-accountants'>Young Accountant</option>
									<option value='half-paying member'>District Society Chairmen/Secretaries</option>
									<option value='student-member'>Student Member</option>
								</Form.Select>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className='mb-3'>
								<Form.Label className="fw-medium">
									ICAN Membership Number <span className="text-danger">*</span>
								</Form.Label>
								<Form.Control
									type='text'
									onChange={handleChange}
									placeholder='MBXXXXXX'
									name='icanCode'
									value={inputValue.icanCode}
									required
								/>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col md={6}>
							<Form.Group className='mb-3'>
								<Form.Label className="fw-medium">
									Member Acronym <span className="text-danger">*</span>
								</Form.Label>
								<Form.Select
									onChange={handleChange}
									value={inputValue.memberAcronym}
									name='memberAcronym'
									required
								>
									<option value=''>Select acronym</option>
									<option value='ACA'>ACA</option>
									<option value='FCA'>FCA</option>
								</Form.Select>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label className="fw-medium">
									District Society <span className="text-danger">*</span>
								</Form.Label>

								<Select
									name="nameOfSociety"
									options={districtSocietyOptions}
									placeholder="Start typing your district or chapter..."
									isSearchable
									isClearable
									menuPlacement="auto"
									menuPortalTarget={document.body}
									styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
									value={
										districtSocietyOptions.find(
											opt => opt.value === inputValue.nameOfSociety
										) || null
									}
									onChange={handleSocietyChange
									}
								/>
							</Form.Group>
						</Col>
					</Row>
				</div>
			)}

			{/* Personal Information Section */}
			<div className="mb-4">
				<h5 className="fw-semibold mb-3 text-dark">
					<i className="bi bi-person-fill me-2 text-primary"></i>
					Personal Information
				</h5>

				<Row>
					<Col md={6}>
						<Form.Group className='mb-3'>
							<Form.Label className="fw-medium">
								Surname <span className="text-danger">*</span>
							</Form.Label>
							<Form.Control
								type='text'
								onChange={handleChange}
								placeholder='Enter surname'
								name='surname'
								value={inputValue.surname}
								required
							/>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group className='mb-3'>
							<Form.Label className="fw-medium">
								Other Names <span className="text-danger">*</span>
							</Form.Label>
							<Form.Control
								type='text'
								onChange={handleChange}
								placeholder='Enter other names'
								name='otherNames'
								value={inputValue.otherNames}
								required
							/>
						</Form.Group>
					</Col>
				</Row>

				<Form.Group className='mb-3'>
					<Form.Label className="fw-medium">
						Email Address <span className="text-danger">*</span>
					</Form.Label>
					<InputGroup>
						<InputGroup.Text>
							<i className="bi bi-envelope"></i>
						</InputGroup.Text>
						<Form.Control
							type='email'
							onChange={handleChange}
							placeholder='your.email@example.com'
							name='email'
							value={inputValue.email}
							required
						/>
					</InputGroup>
				</Form.Group>

				<Row>
					<Col md={6}>
						<Form.Group className='mb-3'>
							<Form.Label className="fw-medium">
								Gender <span className="text-danger">*</span>
							</Form.Label>
							<Form.Select
								onChange={handleChange}
								value={inputValue.gender}
								name='gender'
								required
							>
								<option value=''>Select gender</option>
								<option value='male'>Male</option>
								<option value='female'>Female</option>
							</Form.Select>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group className='mb-3'>
							<Form.Label className="fw-medium">
								Phone Number <span className="text-danger">*</span>
							</Form.Label>
							<InputGroup>
								<InputGroup.Text>
									<i className="bi bi-telephone"></i>
								</InputGroup.Text>
								<Form.Control
									type='tel'
									onChange={handleChange}
									placeholder='(+234) 000 000 0000'
									name='phone'
									value={inputValue.phone}
									required
								/>
							</InputGroup>
						</Form.Group>
					</Col>
				</Row>
			</div>

			{/* Attendance & Preferences Section */}
			<div className="mb-4">
				<h5 className="fw-semibold mb-3 text-dark">
					<i className="bi bi-geo-alt-fill me-2 text-primary"></i>
					Attendance & Preferences
				</h5>

				<Row>
					<Col md={6}>
						<Form.Group className='mb-3'>
							<Form.Label className="fw-medium">
								How are you attending? <span className="text-danger">*</span>
							</Form.Label>
							<Form.Select
								onChange={handleChange}
								value={inputValue.venue}
								name='venue'
								required
							>
								<option value=''>Select venue</option>
								<option value='virtual'>Virtual</option>
								<option value='physical'>Physical</option>
							</Form.Select>
						</Form.Group>
					</Col>

					{((inputValue.memberStatus === "member") || (inputValue.venue === "physical")) && (
						<Col md={6}>
							<Form.Group className='mb-3'>
								<Form.Label className="fw-medium">
									Shirt Size <span className="text-danger">*</span>
								</Form.Label>
								<Form.Select
									onChange={handleChange}
									value={inputValue.tshirtSize}
									name='tshirtSize'
									disabled
									required
								>
									<option value=''>Select size</option>
									<option value='S'>Small (S)</option>
									<option value='M'>Medium (M)</option>
									<option value='L'>Large (L)</option>
									<option value='XL'>Extra-Large (XL)</option>
									<option value='XXL'>Extra-Extra-Large (XXL)</option>
								</Form.Select>
								<Form.Text className="text-muted">
									<i className="bi bi-info-circle me-1"></i>
									Shirt size selection is currently disabled
								</Form.Text>
							</Form.Group>
						</Col>
					)}
				</Row>
			</div>

			{/* Security Section */}
			<div className="mb-4">
				<h5 className="fw-semibold mb-3 text-dark">
					<i className="bi bi-shield-lock-fill me-2 text-primary"></i>
					Account Security
				</h5>

				<Form.Group className="mb-3">
					<Form.Label className="fw-medium">
						Password <span className="text-danger">*</span>
					</Form.Label>
					<InputGroup>
						<InputGroup.Text>
							<i className="bi bi-lock"></i>
						</InputGroup.Text>
						<Form.Control
							type={showPassword ? "text" : "password"}
							onChange={handleChange}
							placeholder="Create a strong password"
							name="password"
							value={inputValue.password}
							required
						/>
						<Button
							variant="outline-secondary"
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="d-flex align-items-center"
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</Button>
					</InputGroup>
					<Form.Text className="text-muted">
						Use at least 8 characters with a mix of letters and numbers
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label className="fw-medium">
						Confirm Password <span className="text-danger">*</span>
					</Form.Label>
					<InputGroup>
						<InputGroup.Text>
							<i className="bi bi-lock-fill"></i>
						</InputGroup.Text>
						<Form.Control
							type={showConfirm ? "text" : "password"}
							onChange={handleChange}
							placeholder="Re-enter your password"
							name="confirm_password"
							value={inputValue.confirm_password}
							required
						/>
						<Button
							variant="outline-secondary"
							type="button"
							onClick={() => setShowConfirm(!showConfirm)}
							className="d-flex align-items-center"
						>
							{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
						</Button>
					</InputGroup>
				</Form.Group>
			</div>

			{/* Submit Button */}
			<div className='d-grid gap-2'>
				<Button
					variant='primary'
					size="lg"
					onClick={handleSubmit}
					className="py-3 fw-semibold"
				>
					Continue to Payment
					<i className="bi bi-arrow-right ms-2"></i>
				</Button>
			</div>
		</Form>
	);
}

export default Personal;