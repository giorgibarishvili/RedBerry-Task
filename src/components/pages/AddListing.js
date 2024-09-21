import "../../styles/AddListing.css";
import { useEffect, useState } from "react";
import Input from "../Input";
import TextArea from "../TextArea";
import { ReactComponent as CirclePlus } from "../../images/circle-plus-solid.svg";
import { ReactComponent as TrashIcon } from "../../images/trash-icon.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../store/redBerryRedux/actions";

function AddListing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const agents = useSelector((state) => state.redBerry.agents);
  const cities = useSelector((state) => state.redBerry.cities);
  const regions = useSelector((state) => state.redBerry.regions);

  const [sellStatus, setSellStatus] = useState(0);
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [description, setDescription] = useState("");
  const [agent, setAgent] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(actions.getAgents());
    dispatch(actions.getCities());
    dispatch(actions.getRegions());
  }, [dispatch]);

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setRegion(selectedRegion);

    const filteredCities = cities.filter(
      (city) => city.region_id === parseInt(selectedRegion)
    );
    if (filteredCities.length > 0) {
      setCity(filteredCities[0].id);
    } else {
      setCity("");
    }
  };

  useEffect(() => {
    if (regions.length > 0) {
      const firstRegionId = regions[0].id;
      setRegion(firstRegionId);

      const filteredCities = cities.filter(
        (city) => city.region_id === firstRegionId
      );
      if (filteredCities.length > 0) {
        setCity(filteredCities[0].id);
      }
    }
  }, [regions, cities]);

  const filteredCities = cities.filter(
    (city) => city.region_id === parseInt(region)
  );

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDeletePhoto = () => {
    setImage(null);
  };

  const handleCreateEstate = (e) => {
    e.preventDefault();
    dispatch(
      actions.getCreateEstate({
        address: address,
        image: image,
        region_id: region,
        description: description,
        city_id: city,
        zip_code: postal,
        price: price,
        area: area,
        bedrooms: bedrooms,
        is_rental: sellStatus,
        agent_id: agent,
        navigate,
      })
    );
  };

  const isFormValid = () => {
    return (
      address.length > 1 &&
      postal &&
      price &&
      area &&
      bedrooms &&
      description.length > 4 &&
      region &&
      city &&
      image
    );
  };

  return (
    <div className="container">
      <h2>ლისტინგის დამატება</h2>
      <form className="form mb-5 mt-5">
        <div className="info-section">
          გარიგების ტიპი
          <div className="d-flex mt-2">
            <div className="form-check me-5">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="sell"
                onChange={() => setSellStatus(0)}
                value="sell"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                იყიდება
              </label>
            </div>
            <div className="form-check me-5">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="rent"
                onChange={() => setSellStatus(1)}
                value="rent"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                ქირავდება
              </label>
            </div>
          </div>
        </div>
        <div className="info-section mt-5 pb-5">
          <div className="mt-3 mb-2">მდებარეობა</div>
          <div className="d-flex mt-3">
            <div className="me-5">
              <Input
                className="listing-input"
                type="text"
                label="მისამართი *"
                state={address}
                setState={setAddress}
                required={true}
                spanText="მინიმუმ ორი სიმბოლო"
              />
            </div>
            <Input
              className="listing-input"
              type="text"
              label="საფოსტო ინდექსი *"
              state={postal}
              setState={setPostal}
              required={true}
              spanText="მინიმუმ ორი სიმბოლო"
            />
          </div>
          <div className="d-flex">
            <div className="me-5">
              <span className="d-flex mb-2">რეგიონი</span>
              <select
                className="form-select listing-input"
                aria-label="Select Region"
                onChange={handleRegionChange}
                value={region}
              >
                {regions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="me-5">
              <span className="d-flex mb-2">ქალაქი</span>
              <select
                className="form-select listing-input"
                aria-label="Select City"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              >
                {filteredCities.length > 0 &&
                  filteredCities.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="info-section mt-5">
          <div className="mt-3 mb-2">ბინის დეტალები</div>
          <div className="d-flex mt-3">
            <div className="me-5">
              <Input
                className="listing-input"
                type="number"
                label="ფასი"
                state={price}
                setState={setPrice}
                spanText="მხოლოდ რიცხვები"
              />
            </div>
            <Input
              className="listing-input"
              type="number"
              label="ფართობი"
              state={area}
              setState={setArea}
              spanText="მხოლოდ რიცხვები"
            />
          </div>
          <div className="d-flex">
            <Input
              className="listing-input"
              type="number"
              label="საძინებლების რაოდენობა*"
              state={bedrooms}
              setState={setBedrooms}
              spanText="მხოლოდ რიცხვები"
            />
          </div>
        </div>
        <div className="info-section mt-5">
          <div className="mt-3 mb-2">აღწერა *</div>
          <div className="d-flex">
            <TextArea
              className="listing-text-area"
              label=""
              state={description}
              setState={setDescription}
              spanText="მინიმუმ ხუთი სიტყვა"
            />
          </div>
        </div>
        <div className="info-section mt-5">
          <div className="mt-3 mb-2">ატვირთეთ ფოტო *</div>
          <div className="d-flex">
            <input
              type="file"
              accept="image/*"
              id="photo-upload"
              style={{ display: "none" }}
              onChange={handlePhotoUpload}
            />
            <div
              className="add-photo d-flex align-items-center justify-content-center"
              onClick={() => document.getElementById("photo-upload").click()}
              style={{ cursor: "pointer" }}
            >
              {!image && <CirclePlus />}
              {image && (
                <div className="image-cont">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Agent Avatar"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    className="trash-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePhoto();
                    }}
                  >
                    <TrashIcon />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="info-section mt-5">
          <div className="mt-3 mb-2">აგენტი</div>
          <div className="d-flex">
            <select
              className="form-select listing-input"
              aria-label="Default select example"
              onChange={(e) => setAgent(e.target.value)}
            >
              {agents.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name + " " + item.surname}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-end ms-auto">
          <button
            className="btn-default btn-cancel mx-3"
            onClick={() => {
              navigate("/");
            }}
          >
            გაუქმება
          </button>
          <button
            className="btn-default btn-create mx-3"
            onClick={(e) => handleCreateEstate(e)}
            disabled={!isFormValid()}
            style={{ opacity: !isFormValid() ? "0.5" : 1 }}
          >
            დაამატე ლისტინგი
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddListing;
