import PageWrapper from "./PageWrapper";
import { useState, useEffect } from "react";

function AllSpeakers() {
    const [isLoading, setIsLoading] = useState(true);

    // Sessions data
    const sessions = [
        {
            id: "keynote",
            title: "Key Note Speaker",
            speakers: [
                {
                    name: "Lady Ada Chukwudozie",
                    credentials: "NPOM, MNSE, FCSN, FIOD",
                    position: "Chairman, Board of Directors KeyStone Bank Ltd",
                    imageURL: "assets/images/speakers/ada-chukwudozie.jpg"
                }
            ]
        },
        {
            id: "plenary1",
            title: "Plenary 1: Entrepreneurial Innovation: Driving Economic Recovery and Sustainable Growth in Nigeria",
            mainSpeaker: {
                name: "Prof. Wilberforce Oti",
                position: "Lead Speaker",
                imageURL: "assets/images/speakers/wilberforce-oti.png"
            },
            chairman: {
                name: "Dr. Mrs. Njum Onyemenam, FCA",
                position: "Chairman of Session",
                imageURL: "assets/images/speakers/njum-onyemenam.jpg"
            },
            discussants: [
                {
                    name: "Mr. Emmanuel Nnamani, FCA",
                    position: "Discussant 1",
                    imageURL: "assets/images/speakers/emmanuel-nnamani.jpg"
                },
                {
                    name: "Prof. Kenneth Kalu",
                    position: "Discussant 2",
                    imageURL: "assets/images/speakers/kenneth-kalu.jpg"
                },
                {
                    name: "Dr. Ngozi Ogwo",
                    position: "Discussant 3",
                    imageURL: "assets/images/speakers/ngozi-ngwo.png"
                }
            ]
        },
        {
            id: "plenary2",
            title: "Plenary 2: Strategic Economic Clusters: Pathway to Sustainable Growth and Development in Nigeria",
            mainSpeaker: {
                name: "Dr. Vincent Nwani",
                position: "Lead Speaker",
                imageURL: "assets/images/speakers/vincent-nwani.jpg"
            },
            chairman: {
                name: "Austin Irem, FCA",
                position: "Chairman of Session",
                imageURL: "assets/images/speakers/austin-irem.jpg"
            },
            discussants: [
                {
                    name: "Prof. Leonard C. Uguru, FCA",
                    position: "Discussant 1",
                    imageURL: "assets/images/speakers/leonard-uguru.jpg"
                },
                {
                    name: "Prof. Luke Chukwu, FCA",
                    position: "Discussant 2",
                    imageURL: "assets/images/speakers/luke-chukwu.jpg"
                },
                {
                    name: "Prof. Udochukwu Ogbonna",
                    position: "Discussant 3",
                    imageURL: "assets/images/speakers/udochukwu-ogbonnaya.jpg"
                }
            ]
        },
        {
            id: "plenary3",
            title: "Plenary 3: Future Forward: Unlocking the Economic Potentialities through Accounting for Sustainable Development",
            mainSpeaker: {
                name: "Prof. G. N. Ogbonnaya",
                position: "Lead Speaker",
                imageURL: "assets/images/speakers/gabriel-nkwazema.jpg"
            },
            chairman: {
                name: "Mr. Jude Egbo Mni FCA",
                position: "Chairman of Session",
                imageURL: "assets/images/speakers/jude-egbo.jpg"
            },
            discussants: [
                {
                    name: "Dapo Ogunkola",
                    position: "Discussant 1",
                    imageURL: "assets/images/speakers/dapo-ogunkola.jpg"
                },
                {
                    name: "Dr. Sir. Linus Okafor",
                    position: "Discussant 2",
                    imageURL: "assets/images/speakers/linus-okafor.jpg"
                },
                {
                    name: "Prof. Uche Lucy",
                    position: "Discussant 3",
                    imageURL: "assets/images/speakers/uche-lucy.jpg"
                },
                {
                    name: "Prof. Dibia",
                    position: "Discussant 4",
                    imageURL: "assets/images/speakers/dibia.jpg"
                }
            ]
        },
        {
            id: "health",
            title: "Health Talk",
            speakers: [
                {
                    name: "Dr. Maduka Chiedozie James",
                    position: "Consultant Physician and Cardiologist",
                    imageURL: "assets/images/speakers/maduka-chiedozie.jpg"
                }
            ]
        }
    ];

    // Simulate loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    // Speaker card component with proper image handling
    const SpeakerCard = ({ speaker, role }) => (
        <div className="speaker-card h-100 shadow-sm rounded overflow-hidden">
            <div className="image-container position-relative" style={{ height: "250px" }}>
                <img
                    src={speaker.imageURL}
                    alt={speaker.name}
                    className="w-100 h-100 object-cover"
                    style={{ objectPosition: "center top" }}
                    onError={(e) => {
                        e.target.src = "assets/images/speakers/placeholder.jpg";
                        e.target.onerror = null;
                    }}
                />
                <div className="overlay position-absolute bottom-0 start-0 w-100 p-2 bg-dark bg-opacity-75 text-white">
                    <p className="small mb-0">{speaker.position || role}</p>
                </div>
            </div>
            <div className="card-body p-3">
                <h4 className="speaker-name fs-5 mb-1">{speaker.name}</h4>
                {speaker.credentials && (
                    <p className="credentials small text-primary mb-0">{speaker.credentials}</p>
                )}
            </div>
        </div>
    );

    // Section component to standardize each session type
    const SpeakerSection = ({ title, speakers, sectionClass, colClass = "col-lg-3 col-md-4 col-sm-6" }) => (
        <div className={`${sectionClass} mb-4`}>
            {title && <h3 className="text-primary mb-3 fs-4">{title}</h3>}
            <div className="row g-4">
                {speakers.map((speaker, index) => (
                    <div className={colClass} key={index}>
                        <SpeakerCard speaker={speaker} role={title ? title.replace('s', '') : "Speaker"} />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <PageWrapper>
            <section id="all-speakers" className="py-5">
                <div className="container">
                    <div className="section-title text-center mb-5">
                        <h1 className="display-4 fw-bold">Conference Speakers & Discussants</h1>
                        <p className="lead text-muted">Complete listing of all our distinguished speakers and session participants</p>
                        <div className="divider my-4 mx-auto" style={{ height: "3px", width: "80px", background: "#007bff" }}></div>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Quick navigation */}
                            <div className="quick-nav mb-5 sticky-top bg-white pt-3 pb-3 shadow-sm" style={{ top: "0" }}>
                                <div className="d-flex flex-wrap justify-content-center gap-2">
                                    {sessions.map((session) => (
                                        <a
                                            key={session.id}
                                            href={`#${session.id}`}
                                            className="btn btn-outline-primary btn-sm"
                                        >
                                            {session.title.split(":")[0]}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Sessions listing */}
                            {sessions.map((session, sessionIndex) => (
                                <div
                                    id={session.id}
                                    className="session-container mb-5 pb-4 border-bottom"
                                    key={sessionIndex}
                                >
                                    <h2 className="session-title mb-4 fw-bold">
                                        {session.title}
                                    </h2>

                                    {/* For sessions with speakers array */}
                                    {session.speakers && session.speakers.length > 0 && (
                                        <SpeakerSection
                                            speakers={session.speakers}
                                            sectionClass="speakers-list"
                                        />
                                    )}

                                    {/* For sessions with main speaker */}
                                    {session.mainSpeaker && (
                                        <SpeakerSection
                                            title="Main Speaker"
                                            speakers={[session.mainSpeaker]}
                                            sectionClass="main-speaker"
                                            colClass="col-lg-3 col-md-4 col-sm-6"
                                        />
                                    )}

                                    {/* For sessions with chairman */}
                                    {session.chairman && (
                                        <SpeakerSection
                                            title="Session Chair"
                                            speakers={[session.chairman]}
                                            sectionClass="chairman"
                                            colClass="col-lg-3 col-md-4 col-sm-6"
                                        />
                                    )}

                                    {/* For sessions with discussants */}
                                    {session.discussants && session.discussants.length > 0 && (
                                        <SpeakerSection
                                            title="Discussants"
                                            speakers={session.discussants}
                                            sectionClass="discussants"
                                        />
                                    )}
                                </div>
                            ))}

                            {/* Back to top button - fixed position */}
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 mb-4 me-4 shadow"
                                style={{ width: "50px", height: "50px", zIndex: 1000 }}
                                aria-label="Back to top"
                            >
                                <i className="bi bi-arrow-up"></i>
                            </button>
                        </>
                    )}
                </div>
            </section>
        </PageWrapper>
    );
}

export default AllSpeakers;