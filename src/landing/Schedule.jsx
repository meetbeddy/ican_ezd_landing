import React from "react";

function Schedule({ days }) {
  return (
    <section id="schedule" className="portfolio">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Event Schedule</h2>
          <p>Here is our event schedule</p>
        </div>
        <ul
          className="nav nav-tabs"
          role="tablist"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          {days.map((data, i) => {
            return (
              <li className="nav-item" key={i}>
                <a
                  className={i === 0 ? "nav-link active" : "nav-link"}
                  title="Click Me"
                  href={`#${data.day.replace(" ", "_")}`}
                  role="tab"
                  data-bs-toggle="tab"
                >
                  <h3>{data.date}</h3>
                  <span>{data.day}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div
          className="tab-content row justify-content-center"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          {days.map((data, i) => (
            <div
              role="tabpanel"
              className="col-lg-9 tab-pane fade show active"
              id={data.day.replace(" ", "_")}
              key={i}
            >
              {data.schedule.map((schedule, i) => (
                <div className="row schedule-item" key={i}>
                  <div className="col-md-2">
                    <time>{schedule.time}</time>
                  </div>
                  {schedule.imageURL && (
                    <div className="speaker">
                      <img src={schedule.imageURL} alt="speaker" />
                    </div>
                  )}
                  <div className="col-md-10">
                    <h4>{schedule.session}</h4>
                    <p>{schedule.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Schedule;
