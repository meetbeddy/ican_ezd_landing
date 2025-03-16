import React, { useState } from "react";
import { Container, Row, Col, Card, Form, InputGroup, Table, Badge, Button, Alert } from "react-bootstrap";
import { Search } from "lucide-react";

function Hotels({ hotels }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("price-asc");

  // Price ranges for filtering
  const priceRanges = {
    "all": { min: 0, max: Infinity },
    "budget": { min: 0, max: 15000 },
    "mid-range": { min: 15001, max: 35000 },
    "luxury": { min: 35001, max: Infinity }
  };

  // Filter and sort hotels
  const filteredHotels = hotels.filter(hotel => {
    // Search by hotel name
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.address.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by price range if not "all"
    const hasRoomsInPriceRange = hotel.rooms.some(room =>
      room.rate >= priceRanges[priceFilter].min &&
      room.rate <= priceRanges[priceFilter].max
    );

    return matchesSearch && (priceFilter === "all" || hasRoomsInPriceRange);
  });

  // Sort hotels
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    const aMinPrice = Math.min(...a.rooms.map(room => room.rate));
    const bMinPrice = Math.min(...b.rooms.map(room => room.rate));

    if (sortOrder === "price-asc") {
      return aMinPrice - bMinPrice;
    } else if (sortOrder === "price-desc") {
      return bMinPrice - aMinPrice;
    } else if (sortOrder === "distance") {
      // Convert distance strings to numbers for comparison
      // This is an approximation since the data format is inconsistent
      const aDistance = parseFloat(a.distanceFromVenue) || 10;
      const bDistance = parseFloat(b.distanceFromVenue) || 10;
      return aDistance - bDistance;
    }
    return 0;
  });

  // Function to get the hotel's lowest price
  const getLowestPrice = (rooms) => {
    return Math.min(...rooms.map(room => room.rate));
  };

  // Function to get the hotel's highest price
  const getHighestPrice = (rooms) => {
    return Math.max(...rooms.map(room => room.rate));
  };

  // Function to create hotels.ng search URL
  const createHotelsNgUrl = (hotelName) => {
    return `https://hotels.ng/hotels/search?query=${encodeURIComponent(hotelName)}`;
  };

  return (
    <section id="hotels" className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold">Available Hotels in Umuahia</h2>
          <p className="text-muted">Find and book the perfect accommodation for your stay</p>
        </div>

        {/* Search and Filter Controls */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="g-3">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text>
                    <Search size={18} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search hotels by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={3}>
                <Form.Select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Budget (Up to ₦15,000)</option>
                  <option value="mid-range">Mid-range (₦15,001 - ₦35,000)</option>
                  <option value="luxury">Luxury (₦35,001+)</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="distance">Distance to Venue</option>
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Results count */}
        <div className="mb-3 text-muted">
          Showing {sortedHotels.length} of {hotels.length} hotels
        </div>

        {/* Hotel cards */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {sortedHotels.map((hotel, index) => (
            <Col key={index}>
              <Card className="h-100 shadow-sm hover-shadow transition">
                <Card.Header className="bg-primary text-white">
                  <h5 className="card-title mb-0 text-truncate">{hotel.name}</h5>
                </Card.Header>

                <Card.Body>
                  <div className="mb-2">
                    <small className="text-primary fw-bold">Location:</small>
                    <small className="ms-1 text-muted">{hotel.address}</small>
                  </div>

                  <div className="mb-2">
                    <small className="text-primary fw-bold">Distance:</small>
                    <Badge bg="info" className="ms-2">{hotel.distanceFromVenue}</Badge>
                  </div>

                  <div className="mb-3">
                    <small className="text-primary fw-bold">Contact:</small>
                    <small className="ms-1 text-muted">{hotel.phoneNumber}</small>
                  </div>

                  <Card className="mb-3 bg-light border-0">
                    <Card.Body className="p-2">
                      <div className="d-flex justify-content-between mb-1">
                        <small className="fw-bold">Price Range:</small>
                        <small className="text-success fw-bold">
                          ₦{getLowestPrice(hotel.rooms).toLocaleString()} - ₦{getHighestPrice(hotel.rooms).toLocaleString()}
                        </small>
                      </div>
                      <div className="d-flex justify-content-between">
                        <small className="fw-bold">Room Types:</small>
                        <small>{hotel.rooms.length} options</small>
                      </div>
                    </Card.Body>
                  </Card>

                  <div className="accordion mb-3" id={`hotelAccordion${index}`}>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded="false"
                          aria-controls={`collapse${index}`}
                        >
                          <small className="fw-bold text-primary">Available Rooms</small>
                        </button>
                      </h2>
                      <div
                        id={`collapse${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading${index}`}
                        data-bs-parent={`#hotelAccordion${index}`}
                      >
                        <div className="accordion-body p-2">
                          <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                            <Table striped hover size="sm" className="mb-0">
                              <thead>
                                <tr>
                                  <th>Room</th>
                                  <th className="text-end">Rate</th>
                                  <th className="text-end">Available</th>
                                </tr>
                              </thead>
                              <tbody>
                                {hotel.rooms.map((room, roomIndex) => (
                                  <tr key={roomIndex}>
                                    <td>{room.type}</td>
                                    <td className="text-end">₦{room.rate.toLocaleString()}</td>
                                    <td className="text-end">{room.availableRooms}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    className="w-100"
                    href={createHotelsNgUrl(hotel.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {sortedHotels.length === 0 && (
          <Alert variant="info" className="text-center my-5">
            <Alert.Heading>No hotels found matching your criteria</Alert.Heading>
            <p>Try adjusting your search filters</p>
          </Alert>
        )}
      </Container>
    </section>
  );
}

export default Hotels;