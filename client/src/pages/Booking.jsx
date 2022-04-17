import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCar } from "../redux/actions/carActions";
import { addBooking } from "../redux/actions/bookingActions";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import "../styles/Booking.scss";

const Booking = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { isLoading } = useSelector((state) => state.alertReducer);
  const { car } = useSelector((state) => state.carReducer);

  // Destructure car object
  const { brand, model, image, feePerHour, fuelType, capacity, bookings } = car;

  const { carId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [totalHours, setTotalHours] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showButton, setShowButton] = useState(false);

  // Rent duration
  const rentDuration = () => {
    let fromDate = moment(new Date(from));
    let toDate = moment(new Date(to));

    setTotalHours(toDate.diff(fromDate, "hours"));
  };

  // Book car
  const bookCar = () => {
    const bookingData = {
      user: user._id,
      car: car._id,
      totalHours,
      totalAmount,
      transactionId: uuidv4(),
      booking: {
        from,
        to,
      },
    };

    dispatch(addBooking(bookingData, user.token, navigate));
  };

  // Invoke getCar upon initial render
  useEffect(() => {
    dispatch(getCar(carId));
  }, []);

  // Invoke rentDuration when from or to state changes
  useEffect(() => {
    rentDuration();
  }, [from, to]);

  // Calculate total amount
  useEffect(() => {
    setTotalAmount(totalHours * feePerHour);
  }, [totalHours, feePerHour]);

  return (
    <Layout>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="single-car">
          <div className="single-car-intro">
            <img src={image} alt={model} className="single-car-img" />
            <button
              type="button"
              className="show-btn"
              onClick={() => setShowButton((prevState) => !prevState)}
            >
              Show Bookings
            </button>
            {showButton && (
              <>
                <h6>
                  Bookings for {brand} {model}:
                </h6>
                <ul className="car-bookings">
                  {bookings.map((booking) => {
                    const { _id, from, to } = booking;
                    return (
                      <li key={_id}>
                        {moment(from).format("MMM DD yyyy HH:mm")} to{" "}
                        {moment(to).format("MMM DD yyyy HH:mm")}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
          <div className="single-car-info">
            <h3>Car Information:</h3>
            <p>Brand: {brand}</p>
            <p>Model: {model}</p>
            <p>Capacity: {capacity}</p>
            <p>Fuel Type: {fuelType}</p>
            <h3>Make a Booking: </h3>
            <div className="range-picker">
              {/* From date */}
              <label htmlFor="from">From</label>
              <input
                type="datetime-local"
                name="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                min={from}
              />
              {/* To date */}
              <label htmlFor="to">To</label>
              <input
                type="datetime-local"
                name="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                min={from}
              />
            </div>
            {from && to && (
              <div className="car-amount-info">
                <h3>
                  Cost Per Hour:{" "}
                  <span style={{ fontWeight: "normal" }}>R{feePerHour}</span>
                </h3>
                <h3>
                  Total Hours:{" "}
                  <span style={{ fontWeight: "normal" }}>{totalHours}</span>
                </h3>
                <h3>
                  Total Cost:{" "}
                  <span style={{ fontWeight: "normal" }}>R{totalAmount}</span>
                </h3>
                <button
                  type="button"
                  className="pay-btn"
                  disabled={!from || !to ? true : false}
                  onClick={bookCar}
                >
                  Pay Amount
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Booking;
