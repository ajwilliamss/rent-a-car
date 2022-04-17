import { useState, useEffect } from "react";
import { getBookings, cancelBooking } from "../redux/actions/bookingActions";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import moment from "moment";
import Spinner from "../components/Spinner";
import "../styles/Bookings.scss";

const Bookings = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { bookings } = useSelector((state) => state.bookingReducer);
  const { isLoading } = useSelector((state) => state.alertReducer);

  const { token } = user;

  const [numBookings, setNumBookings] = useState(3);
  const slicedBookings = bookings.slice(0, numBookings);

  const dispatch = useDispatch();

  // Invoke getBookings upon initial render
  useEffect(() => {
    dispatch(getBookings(token));
  }, []);

  return (
    <Layout>
      <h2 className="my-bookings">My Bookings</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        slicedBookings.map((obj) => {
          // Destructure bookings object
          const { _id, car, totalHours, totalAmount, transactionId, booking } =
            obj;
          return (
            <div className="booking" key={_id}>
              <div className="booking-info">
                <h4>
                  {car.brand} {car.model}
                </h4>
                <p>
                  Duration: {moment(booking.from).format("MMM DD yyyy HH:mm")}{" "}
                  to {moment(booking.to).format("MMM DD yyyy HH:mm")}
                </p>
                <p>Hours: {totalHours}</p>
                <p>Amount: R{totalAmount}</p>
                <p>Transaction ID: {transactionId}</p>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => dispatch(cancelBooking(token, _id))}
                >
                  Cancel Booking
                </button>
              </div>
              <div className="booking-section">
                <img src={car.image} alt={car.model} className="booking-img" />
              </div>
            </div>
          );
        })
      )}
      <div className="load-more-btn">
        {bookings.length > 4 && (
          <button
            type="button"
            onClick={() => setNumBookings((prevState) => prevState + 2)}
          >
            Load More
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Bookings;
