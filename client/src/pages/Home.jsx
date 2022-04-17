import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { getCars, deleteCar } from "../redux/actions/carActions";
import Spinner from "../components/Spinner";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import "../styles/Home.scss";

const Home = () => {
  const { cars } = useSelector((state) => state.carReducer);
  const { isLoading } = useSelector((state) => state.alertReducer);
  const { user } = useSelector((state) => state.userReducer);

  const carBrands = ["All", ...new Set(cars.map((car) => car.brand))];

  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  // Filter by price
  const filterByPrice = () => {
    if (price === "hightolow") {
      const highToLow = []
        .concat(cars)
        .sort(({ feePerHour: a }, { feePerHour: b }) => b - a);
      setFilteredCars(highToLow);
    } else if (price === "lowtohigh") {
      const lowToHigh = []
        .concat(cars)
        .sort(({ feePerHour: a }, { feePerHour: b }) => a - b);
      setFilteredCars(lowToHigh);
    } else if (price === "all") {
      setFilteredCars(cars);
    }
  };

  // Filter by brand
  const filterByBrand = () => {
    if (brand === "All") {
      setFilteredCars(cars);
    } else {
      const matchedCars = cars.filter((car) => car.brand === brand);
      setFilteredCars(matchedCars);
    }
  };

  // Search for brand or model
  const handleSearch = () => {
    const carSearch = cars.filter(
      (car) =>
        car.brand.toLowerCase().includes(search) ||
        car.model.toLowerCase().includes(search)
    );
    setFilteredCars(carSearch);
  };

  // Invoke getCars upon initial render
  useEffect(() => {
    dispatch(getCars());
  }, []);

  useEffect(() => {
    setFilteredCars(cars);
  }, [cars]);

  useEffect(() => {
    filterByPrice();
  }, [price]);

  useEffect(() => {
    filterByBrand();
  }, [brand]);

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <Layout>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="filters">
            <div className="category-filter">
              <h5>Filter by price</h5>
              <select
                name="price-filter"
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="all">All</option>
                <option value="hightolow">Price: High to Low</option>
                <option value="lowtohigh">Price: Low to High</option>
              </select>
            </div>
            <div className="brand-filter">
              <h5>Filter by brand</h5>
              <select
                name="brand-filter"
                onChange={(e) => setBrand(e.target.value)}
              >
                {carBrands.map((brand, index) => {
                  return (
                    <option value={brand} key={index}>
                      {brand}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="search-filter">
              <h5>Search for car</h5>
              <div className="search-input">
                <FaSearch style={{ fontSize: "1.15rem" }} />
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Type to search..."
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
              </div>
            </div>
          </div>
          <div className="cars">
            {filteredCars.map((car) => {
              const { _id, brand, model, image, feePerHour } = car;
              return (
                <div className="car" key={_id}>
                  <img src={image} alt={model} className="car-img" />
                  <h4>{`${brand} ${model}`}</h4>
                  <p>Cost per hour: R{feePerHour}</p>
                  <div className="car-actions">
                    <Link to={`/booking/${_id}`}>
                      <button type="button" className="book-btn">
                        Book Now
                      </button>
                    </Link>
                    {user && user.role === "admin" && (
                      <div className="car-icons">
                        <Link to={`/edit/${_id}`}>
                          <FaEdit
                            className="car-icon"
                            style={{ color: "teal" }}
                          />
                        </Link>
                        <button
                          type="button"
                          onClick={() => dispatch(deleteCar(user.token, _id))}
                          className="delete-btn"
                        >
                          <FaTrash
                            className="car-icon"
                            style={{ color: "red" }}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
