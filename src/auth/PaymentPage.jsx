import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useSearchParams, Link } from "react-router-dom";
import PageWrapper from "../landing/pages/PageWrapper";
import Payment from "./Payment";
import { ican } from "../api/axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const PaymentPage = () => {
    const [searchParams] = useSearchParams();
    const [reference, setReference] = useState(searchParams.get("rrr") || "");
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState("");
    const [paymentLoading, setPaymentLoading] = useState(false);

    // Fetch details if RRR is in URL
    useEffect(() => {
        const rrr = searchParams.get("rrr");
        if (rrr) {
            handleLookup(rrr);
        }
    }, [searchParams]);

    const handleLookup = async (lookupRef = reference) => {
        if (!lookupRef) return;

        setLoading(true);
        setError("");
        setUserDetails(null);

        try {
            const res = await ican.get(`/api/payments/details/${lookupRef}`);
            if (res.data.success) {
                const data = res.data.data;
                if (data.confirmedPayment) {
                    Swal.fire({
                        icon: "info",
                        title: "Already Paid",
                        text: "This registration has already been confirmed. You can sign in to access your account.",
                    });
                } else {
                    setUserDetails({
                        ...data,
                        surname: data.name.split(' ')[0],
                        otherNames: data.name.split(' ').slice(1).join(' '),
                        tellerNumber: data.rrr,
                        rrrGenerated: true
                    });
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration not found. Please check your Email or RRR.");
        } finally {
            setLoading(false);
        }
    };

    const handleSuccess = (res) => {
        Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: "Your registration has been confirmed. You can now sign in to your dashboard.",
            timer: 5000
        }).then(() => {
            window.location.href = "https://admin.icanezdconference.org.ng/login";
        });
    };

    const handleSubmitPayment = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setPaymentLoading(true);

        try {
            // Re-submit the signup as an update (idempotent)
            const formData = new FormData();
            Object.keys(userDetails).forEach(key => {
                formData.append(key, userDetails[key]);
            });

            const res = await ican.post("/api/user/auth/signup", formData);

            if (res.data.success) {
                // If it's a bank teller upload or something manual, show success
                if (!userDetails.paymentSuccess) {
                    Swal.fire({
                        icon: "success",
                        title: "Registration Updated",
                        text: "Your registration details have been updated. It will be fully activated once verified.",
                    });
                }
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: err.response?.data?.message || "Failed to update registration.",
            });
        } finally {
            setPaymentLoading(false);
        }
    };

    return (
        <PageWrapper>
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={userDetails ? 8 : 6}>
                        {!userDetails ? (
                            <Card className="shadow-lg border-0 rounded-4">
                                <Card.Body className="p-4 p-md-5">
                                    <div className="text-center mb-4">
                                        <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
                                            <i className="bi bi-credit-card text-primary" style={{ fontSize: '32px' }}></i>
                                        </div>
                                        <h2 className="fw-bold">Complete Your Payment</h2>
                                        <p className="text-muted">Enter your Email or RRR number to continue</p>
                                    </div>

                                    {error && <Alert variant="danger">{error}</Alert>}

                                    <Form onSubmit={(e) => { e.preventDefault(); handleLookup(); }}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="fw-semibold">Email Address or RRR</Form.Label>
                                            <Form.Control
                                                size="lg"
                                                type="text"
                                                placeholder="e.g. johndoe@example.com or 1234-5678-9012"
                                                value={reference}
                                                onChange={(e) => setReference(e.target.value)}
                                                required
                                            />
                                        </Form.Group>

                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="w-100 py-3"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? <Spinner animation="border" size="sm" /> : "Lookup Registration"}
                                        </Button>
                                    </Form>

                                    <div className="text-center mt-4">
                                        <p className="mb-0 text-muted">
                                            Haven't registered yet? <Link to="/register" className="text-primary fw-semibold text-decoration-none">Register Now</Link>
                                        </p>
                                    </div>
                                </Card.Body>
                            </Card>
                        ) : (
                            <div className="fade-in">
                                <div className="d-flex align-items-center mb-4 cursor-pointer" onClick={() => setUserDetails(null)}>
                                    <i className="bi bi-arrow-left me-2"></i>
                                    <span>Back to Lookup</span>
                                </div>

                                <Card className="shadow-lg border-0 rounded-4 mb-4">
                                    <Card.Body className="p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4 className="fw-bold mb-0">Registration Details</h4>
                                            <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">Payment Pending</span>
                                        </div>
                                        <Row>
                                            <Col md={6} className="mb-2">
                                                <small className="text-muted d-block">Full Name</small>
                                                <span className="fw-semibold">{userDetails.name}</span>
                                            </Col>
                                            <Col md={6} className="mb-2">
                                                <small className="text-muted d-block">Email</small>
                                                <span className="fw-semibold">{userDetails.email}</span>
                                            </Col>
                                            <Col md={6} className="mb-2">
                                                <small className="text-muted d-block">Member Status</small>
                                                <span className="fw-semibold text-capitalize">{userDetails.memberStatus}</span>
                                            </Col>
                                            <Col md={6} className="mb-2">
                                                <small className="text-muted d-block">Amount Due</small>
                                                <span className="fw-bold text-primary fs-5">₦{userDetails.amount?.toLocaleString()}</span>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <Payment
                                    inputValue={userDetails}
                                    handleChange={(e) => {
                                        const { name, value } = e.target;
                                        setUserDetails(prev => ({ ...prev, [name]: value }));
                                    }}
                                    handleSubmit={handleSubmitPayment}
                                    onSuccess={handleSuccess}
                                    onDateChange={(date, dateString) => {
                                        setUserDetails(prev => ({ ...prev, tellerDate: dateString, date }));
                                    }}
                                    setStep={() => { }} // Not needed here
                                    loading={paymentLoading}
                                    handleFileUpload={(file) => {
                                        // Handle file upload if needed, though for RRR payments it might not be
                                    }}
                                    onRrrGenerated={() => { }} // RRR already exists
                                    clearRRR={() => { }} // Should not clear in this mode
                                    isPaymentPage={true}
                                />
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </PageWrapper>
    );
};

export default PaymentPage;
