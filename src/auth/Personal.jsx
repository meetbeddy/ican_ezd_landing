import React from "react";
import { Button, Form } from "react-bootstrap";

function Personal({ handleChange, handleSubmit, inputValue }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="memberStatus">
          Are you a member of ICAN?
        </Form.Label>
        <Form.Select
          onChange={(e) => {
            handleChange(e);
          }}
          value={inputValue.memberStatus}
          name="memberStatus"
          required
        >
          <option value="">-SELECT STATUS-</option>
          <option value="member">ICAN MEMBER</option>
          <option value="nonmember">NON ICAN MEMBER</option>
        </Form.Select>
      </Form.Group>
      {inputValue.memberStatus === "member" && (
        <>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ICAN Membership Number</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="MBXXXXXX"
              name="icanCode"
              value={inputValue.icanCode}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="memberCategory">Member Category</Form.Label>
            <Form.Select
              onChange={handleChange}
              value={inputValue.memberCategory}
              name="memberCategory"
              required
            >
              <option value="">-SELECT MEMBER CATEGORY-</option>
              <option value="full-paying member">FULL-PAYING MEMBER</option>
              <option value="young-accountants">YOUNG ACCOUNTANT</option>
              <option value="half-paying member">
                DISTRICT SOCIETY CHAIRMEN /SECRETARIES
              </option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="memberAcronym">Member Acronym</Form.Label>
            <Form.Select
              onChange={handleChange}
              type="select"
              value={inputValue.memberAcronym}
              name="memberAcronym"
              required
            >
              <option value="">-SELECT THE SUITABLE ACRONYM-</option>
              <option value="ACA">ACA</option>
              <option value="FCA">FCA</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="districtSociety">
              Member District Society
            </Form.Label>
            <Form.Select
              onChange={handleChange}
              value={inputValue.nameOfSociety}
              name="nameOfSociety"
              required
            >
              <option value="">-NAME OF DISTRICT SOCIETY-</option>
              <option value="ABA &amp; DISTRICT">ABA &amp; DISTRICT</option>
              <option value="ABAKALIKI &amp; DISTRICT ">
                ABAKALIKI &amp; DISTRICT{" "}
              </option>
              <option value="ABEOKUTA &amp; DISTRICT ">
                ABEOKUTA &amp; DISTRICT{" "}
              </option>
              <option value="ABUJA &amp; DISTRICT ">
                ABUJA &amp; DISTRICT{" "}
              </option>
              <option value="ABRAKA &amp; DISTRICT">
                ABRAKA &amp; DISTRICT
              </option>
              <option value="Afikpo &amp; District Society">
                Afikpo &amp; District Society
              </option>
              <option value="ADO-EKITI &amp; DISTRICT">
                ADO-EKITI &amp; DISTRICT
              </option>
              <option value="AKURE &amp; DISTRICT">AKURE &amp; DISTRICT</option>
              <option value="ALIMOSHO &amp; DISTRICT">
                ALIMOSHO &amp; DISTRICT
              </option>
              <option value="AMUWO &amp; DISTRICT">AMUWO &amp; DISTRICT</option>
              <option value="ASABA &amp; DISTRICT">ASABA &amp; DISTRICT</option>
              <option value="AUCHI &amp; DISTRICT ">
                AUCHI &amp; DISTRICT{" "}
              </option>
              <option value="AWKA &amp; DISTRICT">AWKA &amp; DISTRICT</option>
              <option value="BAUCHI &amp; DISTRICT">
                BAUCHI &amp; DISTRICT
              </option>
              <option value="BENIN &amp; DISTRICT">BENIN &amp; DISTRICT</option>
              <option value="BONNY KINGDOM &amp; DISTRICT">
                BONNY KINGDOM &amp; DISTRICT
              </option>
              <option value="CALABAR &amp; DISTRICT">
                CALABAR &amp; DISTRICT
              </option>
              <option value="CAMEROUN &amp; DISTRICT">
                CAMEROUN &amp; DISTRICT
              </option>
              <option value="CANADA &amp; DISTRICT SOCIETY">
                CANADA &amp; DISTRICT SOCIETY
              </option>
              <option value="EKPOMA & DISTRICT">EKPOMA & DISTRICT</option>
              <option value="ENUGU &amp; DISTRICT">ENUGU &amp; DISTRICT</option>
              <option value="EKET &amp; DISTRICT SOCIETY">
                EKET &amp; DISTRICT SOCIETY
              </option>
              <option value="EPE &amp; DISTRICT">EPE &amp; DISTRICT</option>
              <option value="FIDELITY BANK PLC CHAPTER">
                FIDELITY BANK PLC &amp; DISTRICT
              </option>
              <option value="GOMBE &amp; DISTRICT">GOMBE &amp; DISTRICT</option>
              <option value="GWAGWALADA &amp; DISTRICT">
                GWAGWALADA &amp; DISTRICT
              </option>
              <option value="IBADAN &amp; DISTRICT">
                {" "}
                IBADAN &amp; DISTRICT
              </option>
              <option value="IJEBU-ODE &amp; DISTRICT">
                IJEBU-ODE &amp; DISTRICT
              </option>
              <option value="IKEJA &amp; DISTRICT">IKEJA &amp; DISTRICT</option>
              <option value="IKORODU &amp; DISTRICT">
                IKORODU &amp; DISTRICT
              </option>
              <option value="ILARO &amp; DISTRICT SOCIETY">
                ILARO &amp; DISTRICT SOCIETY
              </option>
              <option value="ILESA &amp; DISTRICT">ILESA &amp; DISTRICT</option>
              <option value="ILORIN &amp; DISTRICT ">
                ILORIN &amp; DISTRICT{" "}
              </option>
              <option value="Ilupeju/Gbagada &amp; District Society">
                Ilupeju/Gbagada &amp; District Society
              </option>
              <option value="JALINGO &amp; DISTRICT SOCIETY">
                JALINGO &amp; DISTRICT SOCIETY
              </option>
              <option value="JOS &amp; DISTRICT">JOS &amp; DISTRICT</option>
              <option value="KADUNA &amp; DISTRICT">
                KADUNA &amp; DISTRICT
              </option>
              <option value="KANO &amp; DISTRICT">KANO &amp; DISTRICT</option>
              <option value="KATSINA &amp; DISTRICT SOCIETY">
                KATSINA &amp; DISTRICT SOCIETY
              </option>
              <option value="LAFIA &amp; DISTRICT">LAFIA &amp; DISTRICT</option>
              <option value="LAGOS &amp; DISTRICT">LAGOS &amp; DISTRICT</option>
              <option value="LAGOS MAINLAND &amp; DISTRICT">
                LAGOS MAINLAND &amp; DISTRICT
              </option>
              <option value="LAGOS STATE PUBLIC SERVICE CHAPTER">
                LAGOS STATE PUBLIC SERVICE CHAPTER
              </option>
              <option value="LOKOJA &amp; DISTRICT">
                LOKOJA &amp; DISTRICT
              </option>
              <option value="MAIDUGURI/DAMATURU &amp; DISTRICT">
                MAIDUGURI/DAMATURU &amp; DISTRICT
              </option>
              <option value="MAKURDI &amp; DISTRICT">
                MAKURDI &amp; DISTRICT
              </option>
              <option value="MALAYSIA &amp; DISTRICT">
                MALAYSIA &amp; DISTRICT
              </option>
              <option value="MINNA &amp; DISTRICT">MINNA &amp; DISTRICT</option>
              <option value="MOWE &amp; DISTRICT SOCIETY">
                MOWE &amp; DISTRICT SOCIETY
              </option>
              <option value="NNPC CHAPTER ">NNPC CHAPTER</option>
              <option value="NSUKKA &amp; DISTRICT SOCIETY">
                NSUKKA &amp; DISTRICT SOCIETY
              </option>
              <option value="NYAYA-MARARABA &amp; DISTRICT">
                NYAYA-MARARABA &amp; DISTRICT
              </option>
              <option value="OFFA &amp; DISTRICT">OFFA &amp; DISTRICT</option>
              <option value="OFFICE OF THE ACCOUNTANT GENERAL OF THE FEDERATION CHAPTER ">
                OFFICE OF THE ACCOUNTANT GENERAL OF THE FEDERATION CHAPTER
              </option>
              <option value="OFFICE OF THE AUDITOR-GENERAL FOR THE FEDERATION CHAPTER ">
                OFFICE OF THE AUDITOR-GENERAL FOR THE FEDERATION CHAPTER
              </option>
              <option value="OGBOMOSHO/OYO &amp; DISTRICT">
                OGBOMOSHO/OYO &amp; DISTRICT
              </option>
              <option value="OGUN STATE PUBLIC SERVICE CHAPTER ">
                OGUN STATE PUBLIC SERVICE CHAPTER
              </option>
              <option value="OJO, BADAGRY,AGBARA &amp; DISTRICT (O.B.A)">
                OJO, BADAGRY,AGBARA &amp; DISTRICT (O.B.A)
              </option>
              <option value="ONITSHA &amp; DISTRICT">
                ONITSHA &amp; DISTRICT
              </option>
              <option value="OSOGBO &amp; DISTRICT">
                OSOGBO &amp; DISTRICT
              </option>
              <option value="OSUN &amp; DISTRICT">OSUN &amp; DISTRICT</option>
              <option value="OTA &amp; DISTRICT SOCIETY">
                OTA &amp; DISTRICT SOCIETY
              </option>
              <option value="OWERRI &amp; DISTRICT ">
                OWERRI &amp; DISTRICT{" "}
              </option>
              <option value="PORT HARCOURT &amp; DISTRICT">
                PORT HARCOURT &amp; DISTRICT
              </option>
              <option value="SOKOTO &amp;  DISTRICT ">
                SOKOTO &amp; DISTRICT{" "}
              </option>
              <option value="UMUAHIA &amp; DISTRICT">
                UMUAHIA &amp; DISTRICT
              </option>
              <option value="UNITED KINGDOM &amp;DISTRICT">
                UNITED KINGDOM &amp;DISTRIC
              </option>
              <option value="USA &amp; DISTRICT">USA &amp; DISTRICT</option>
              <option value="UYO &amp; DISTRICT">UYO &amp; DISTRICT</option>
              <option value="WARRI &amp; DISTRICT">WARRI &amp; DISTRICT</option>
              <option value="YOLA &amp; DISTRICT">YOLA &amp; DISTRICT</option>
              <option value="YENAGOA &amp; DISTRICT">
                YENAGOA &amp; DISTRICT
              </option>
              <option value="ZARIA &amp; DISTRICT">ZARIA &amp; DISTRICT</option>
              <option value="CBN CHAPTER ">CBN CHAPTER </option>
              <option value="PHCN CHAPTER ">PHCN CHAPTER </option>
              <option value="FIDELITY BANK PLC CHAPTER ">
                FIDELITY BANK PLC CHAPTER{" "}
              </option>
              <option value="LAGOS STATE PUBLIC SERVICE CHAPTER">
                LAGOS STATE PUBLIC SERVICE CHAPTER
              </option>
              <option value="SOCIETY OF WOMEN   ACCOUNTANTS OF NIGERIA (SWAN)">
                SOCIETY OF WOMEN ACCOUNTANTS OF NIGERIA (SWAN)
              </option>
            </Form.Select>
          </Form.Group>
        </>
      )}
      <Form.Group className="mb-3" controlId="validationCustom02">
        <Form.Label>Surname</Form.Label>
        <Form.Control
          type="text"
          onChange={handleChange}
          placeholder="Enter Surname"
          name="surname"
          value={inputValue.surname}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="validationCustom01">
        <Form.Label>Other Names</Form.Label>
        <Form.Control
          type="text"
          onChange={handleChange}
          placeholder="Enter other names"
          name="otherNames"
          value={inputValue.otherNames}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          onChange={handleChange}
          placeholder="Enter email"
          name="email"
          value={inputValue.email}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="memberCategory">Gender</Form.Label>
        <Form.Select
          onChange={handleChange}
          value={inputValue.gender}
          name="gender"
          required
        >
          <option value="">SELECT GENDER</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="validationCustom04">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          onChange={handleChange}
          placeholder="(+234) 000 000 0000"
          name="phone"
          value={inputValue.phone}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="memberCategory">Shirt Size</Form.Label>
        <Form.Select
          onChange={handleChange}
          value={inputValue.tshirtSize}
          name="tshirtSize"
          required
        >
          <option value="">-SELECT SHIRT SIZE-</option>
          <option value="S">Small (S)</option>
          <option value="M">Medium (M)</option>
          <option value="L">Large (L)</option>
          <option value="XL">Extra-Large (XL)</option>
          <option value="XXL">Extra-Extra-Large (XXL)</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="memberCategory">How are attending?</Form.Label>
        <Form.Select
          onChange={handleChange}
          value={inputValue.venue}
          name="venue"
          required
        >
          <option value="">-SELECT VENUE-</option>
          <option value="virtual">Virtual</option>
          <option value="physical">Physical</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={handleChange}
          placeholder="Password"
          name="password"
          value={inputValue.password}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPasswordconfirm">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          onChange={handleChange}
          placeholder="Confirm Password"
          name="confirm_password"
          value={inputValue.confirm_password}
          required
        />
      </Form.Group>
      <div className="d-grid">
        <Button variant="primary" type="submit">
          Continue To Payment
        </Button>
      </div>
    </Form>
  );
}

export default Personal;
