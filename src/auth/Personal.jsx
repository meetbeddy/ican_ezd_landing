import React from "react";
import { Button, Form } from "react-bootstrap";

function Personal({ handleChange, handleSubmit, inputValue, districtSocieties }) {
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className='mb-3'>
				<Form.Label htmlFor='memberStatus'>
					Are you a member of ICAN?
				</Form.Label>
				<Form.Select
					onChange={(e) => {
						handleChange(e);
					}}
					value={inputValue.memberStatus}
					name='memberStatus'
					required>
					<option value=''>-SELECT STATUS-</option>
					<option value='member'>ICAN MEMBER</option>
					<option value='nonmember'>NON ICAN MEMBER</option>
				</Form.Select>
			</Form.Group>
			{inputValue.memberStatus === "member" && (
				<>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>ICAN Membership Number</Form.Label>
						<Form.Control
							type='text'
							onChange={handleChange}
							placeholder='MBXXXXXX'
							name='icanCode'
							value={inputValue.icanCode}
							required
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label htmlFor='memberCategory'>Member Category</Form.Label>
						<Form.Select
							onChange={handleChange}
							value={inputValue.memberCategory}
							name='memberCategory'
							required>
							<option value=''>-SELECT MEMBER CATEGORY-</option>
							<option value='full-paying member'>FULL-PAYING MEMBER</option>
							<option value='young-accountants'>YOUNG ACCOUNTANT</option>
							<option value='half-paying member'>
								DISTRICT SOCIETY CHAIRMEN /SECRETARIES
							</option>
						</Form.Select>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label htmlFor='memberAcronym'>Member Acronym</Form.Label>
						<Form.Select
							onChange={handleChange}
							type='select'
							value={inputValue.memberAcronym}
							name='memberAcronym'
							required>
							<option value=''>-SELECT THE SUITABLE ACRONYM-</option>
							<option value='ACA'>ACA</option>
							<option value='FCA'>FCA</option>
						</Form.Select>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label htmlFor='districtSociety'>
							Member District Society
						</Form.Label>
						<Form.Select
							onChange={handleChange}
							value={inputValue.nameOfSociety}
							name='nameOfSociety'
							required
						>
							{districtSocieties.map((districtSociety, index) => (
								<option key={index} value={districtSociety}>
									{districtSociety}
								</option>
							))}
						</Form.Select>
					</Form.Group>
				</>
			)}
			<Form.Group className='mb-3' controlId='validationCustom02'>
				<Form.Label>Surname</Form.Label>
				<Form.Control
					type='text'
					onChange={handleChange}
					placeholder='Enter Surname'
					name='surname'
					value={inputValue.surname}
					required
				/>
			</Form.Group>
			<Form.Group className='mb-3' controlId='validationCustom01'>
				<Form.Label>Other Names</Form.Label>
				<Form.Control
					type='text'
					onChange={handleChange}
					placeholder='Enter other names'
					name='otherNames'
					value={inputValue.otherNames}
					required
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='formBasicEmail'>
				<Form.Label>Email</Form.Label>
				<Form.Control
					type='email'
					onChange={handleChange}
					placeholder='Enter email'
					name='email'
					value={inputValue.email}
					required
				/>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label htmlFor='memberCategory'>Gender</Form.Label>
				<Form.Select
					onChange={handleChange}
					value={inputValue.gender}
					name='gender'
					required>
					<option value=''>SELECT GENDER</option>
					<option value='male'>Male</option>
					<option value='female'>Female</option>
				</Form.Select>
			</Form.Group>

			<Form.Group className='mb-3' controlId='validationCustom04'>
				<Form.Label>Phone Number</Form.Label>
				<Form.Control
					type='tel'
					onChange={handleChange}
					placeholder='(+234) 000 000 0000'
					name='phone'
					value={inputValue.phone}
					required
				/>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label htmlFor='memberCategory'>How are attending?</Form.Label>
				<Form.Select
					onChange={handleChange}
					value={inputValue.venue}
					name='venue'
					required>
					<option value=''>-SELECT VENUE-</option>
					<option value='virtual'>Virtual</option>
					<option value='physical'>Physical</option>
				</Form.Select>
			</Form.Group>

			{((inputValue.memberStatus === "member") || (inputValue.venue === "physical")) && (
				<Form.Group className='mb-3'>
					<Form.Label htmlFor='memberCategory'>Shirt Size</Form.Label>
					<Form.Select
						onChange={handleChange}
						value={inputValue.tshirtSize}
						name='tshirtSize'
						required>
						<option value=''>-SELECT SHIRT SIZE-</option>
						<option value='S'>Small (S)</option>
						<option value='M'>Medium (M)</option>
						<option value='L'>Large (L)</option>
						<option value='XL'>Extra-Large (XL)</option>
						<option value='XXL'>Extra-Extra-Large (XXL)</option>
					</Form.Select>
				</Form.Group>
			)}

			<Form.Group className='mb-3' controlId='formBasicPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type='password'
					onChange={handleChange}
					placeholder='Password'
					name='password'
					value={inputValue.password}
					required
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='formBasicPasswordconfirm'>
				<Form.Label>Confirm Password</Form.Label>
				<Form.Control
					type='password'
					onChange={handleChange}
					placeholder='Confirm Password'
					name='confirm_password'
					value={inputValue.confirm_password}
					required
				/>
			</Form.Group>
			<div className='d-grid'>
				<Button variant='primary' type='submit'>
					Continue To Payment
				</Button>
			</div>
		</Form>
	);
}

export default Personal;
