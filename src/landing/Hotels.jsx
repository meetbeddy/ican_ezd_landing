import React from "react";

function Hotels({ hotels }) {


  const renderHotels = () => {
    return hotels.map((hotel, index) => (
      <div key={index} className="card my-3">
        <div className="card-header">
          <h5 className="card-title">{hotel.name}</h5>
          <p className="card-text">Phone: {hotel.phoneNumber}</p>
          <p className="card-text">Distance from Venue: {hotel.distanceFromVenue}</p>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Room Type</th>
                <th scope="col">Rate</th>
                <th scope="col">Flat Rate</th>
                <th scope="col">No. of Room Available</th>
              </tr>
            </thead>
            <tbody>
              {hotel.rooms.map((room, roomIndex) => (
                <tr key={roomIndex}>
                  <td>{room.type}</td>
                  <td>{room.rate}</td>
                  <td>{room.flatRate}</td>
                  <td>{room.availableRooms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ));
  };

  return (
    <section id="hotels" className="contact">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Hotels</h2>
        </div>
        <div className="row" data-aos="fade-up" data-aos-delay={100}>
          {renderHotels()}
        </div>
      </div>
    </section>


  );
}

export default Hotels;
