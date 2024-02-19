import React from 'react'
import { Link } from 'react-router-dom';
import PageWrapper from './PageWrapper';
import data from '../../data';

function Presidency() {
    return (
        <PageWrapper>
            <section className="breadcrumbs">
                <div className="container">
                    <ol>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>executives</li>
                    </ol>
                    <h3>ICAN Presidency</h3>
                </div>
            </section>

            <div className="container mt-3">
                <div className="row d-flex flex-wrap justify-content-center align-items-center">
                    {data.presidency.map((member, i) => {
                        return (
                            <div
                                className="col-lg-3 col-md-6 d-flex align-items-stretch"
                                key={i}
                            >
                                <div className="member" data-aos="fade-up" >
                                    <div className="member-img">
                                        <img
                                            src={member.imageURL}
                                            className="img-fluid"
                                            alt="sec"
                                            style={{
                                                height: "250px",
                                                width: "100%",
                                                objectFit: "fill",
                                            }}
                                        />

                                    </div>
                                    <div className="member-info">
                                        <h6>{member.name}</h6>
                                        <span>{member.position}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </PageWrapper>
    )
}

export default Presidency
