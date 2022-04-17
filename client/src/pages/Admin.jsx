import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCar } from "../redux/actions/carActions";
import Layout from "../components/Layout";
import "../styles/Admin.scss";

const Admin = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    image: "",
    capacity: 0,
    fuelType: "",
    feePerHour: 0,
  });

  // Destructure formData object
  const { brand, model, image, capacity, fuelType, feePerHour } = formData;

  const { user } = useSelector((state) => state.userReducer);

  const brandRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Add input to formData state
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const carData = {
      brand,
      model,
      image,
      capacity,
      fuelType,
      feePerHour,
    };

    dispatch(createCar(carData, user.token, navigate));
  };

  // Focus brand input upon initial render
  useEffect(() => {
    brandRef.current.focus();
  }, []);

  return (
    <Layout>
      <form className="add-car" onSubmit={handleSubmit}>
        <h2 className="add-car-heading">Add Car</h2>
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          name="brand"
          ref={brandRef}
          value={brand}
          onChange={handleChange}
          required
          placeholder="Suzuki"
        />
        <label htmlFor="model">Model</label>
        <input
          type="text"
          name="model"
          value={model}
          onChange={handleChange}
          required
          placeholder="Swift"
        />
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          name="image"
          value={image}
          onChange={handleChange}
          required
          placeholder="https://upload.wikimedia.org/wikipedia/commons/b/b1/Suzuki_Swift_Sport_2017.jpg"
        />
        <label htmlFor="capacity">Capacity</label>
        <input
          type="number"
          name="capacity"
          value={capacity}
          onChange={handleChange}
          required
        />
        <label htmlFor="fuelType">Fuel Type</label>
        <input
          type="text"
          name="fuelType"
          value={fuelType}
          onChange={handleChange}
          required
          placeholder="Petrol"
        />
        <label htmlFor="feePerHour">Fee Per Hour</label>
        <input
          type="number"
          name="feePerHour"
          value={feePerHour}
          onChange={handleChange}
          required
        />
        <button type="submit" className="create-btn">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Admin;
