import React from "react";
import { Card } from "react-bootstrap";
import "./registration-success.css";
import PageWrapper from "../landing/pages/PageWrapper";

function RegSuccess() {
  return (
    <PageWrapper>
      <div id='reg-confirm'>
        <div className='container'>
          <Card className='card-confirm text-center'>
            <div className='card-head'>
              <div className='icon-box'>
                <i className='bi bi-check-circle' />
              </div>
            </div>

            <Card.Body>
              <h4 className='text-success'>Your registration was successful</h4>
            </Card.Body>
            <Card.Footer>
              <a
                href='https://admin.icanezdconference.org.ng/login'
                classname='btn btn-success btn-block'>
                Login to dashboard
              </a>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}

export default RegSuccess;
