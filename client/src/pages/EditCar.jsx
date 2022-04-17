import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCar, editCar } from "../redux/actions/carActions";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import "../styles/EditCar.scss";

const EditCar = () => {
  // Access state in redux store
  const { user } = useSelector((state) => state.userReducer);
  const { car } = useSelector((state) => state.carReducer);
  const { isLoading } = useSelector((state) => state.alertReducer);

  // Destructure car object
  const { brand, model, image, feePerHour, fuelType, capacity } = car;

  const { carId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Input refs
  const brandRef = useRef(null);
  const modelRef = useRef(null);
  const imageRef = useRef(null);
  const capacityRef = useRef(null);
  const fuelTypeRef = useRef(null);
  const feePerHourRef = useRef(null);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const carData = {
      brand: brandRef.current.value,
      model: modelRef.current.value,
      image: imageRef.current.value,
      capacity: capacityRef.current.value,
      fuelType: fuelTypeRef.current.value,
      feePerHour: feePerHourRef.current.value,
    };

    dispatch(editCar(carData, user.token, carId, navigate));
  };

  useEffect(() => {
    // Focus brand input upon initial render
    brandRef.current.focus();

    // Invoke getCar upon initial render
    dispatch(getCar(carId));
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <Spinner />
      ) : (
        <form className="edit-car" onSubmit={handleSubmit}>
          <h2>Edit Car</h2>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            name="brand"
            ref={brandRef}
            defaultValue={brand}
            required
          />
          <label htmlFor="model">Model</label>
          <input
            type="text"
            name="model"
            ref={modelRef}
            defaultValue={model}
            required
          />
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            name="image"
            ref={imageRef}
            defaultValue={image}
            required
          />
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            name="capacity"
            ref={capacityRef}
            defaultValue={capacity}
            required
          />
          <label htmlFor="fuelType">Fuel Type</label>
          <input
            type="text"
            name="fuelType"
            ref={fuelTypeRef}
            defaultValue={fuelType}
            required
          />
          <label htmlFor="feePerHour">Fee Per Hour</label>
          <input
            type="number"
            name="feePerHour"
            ref={feePerHourRef}
            defaultValue={feePerHour}
            required
          />
          <button type="submit" className="edit-btn">
            Submit
          </button>
        </form>
      )}
    </Layout>
  );
};

export default EditCar;
