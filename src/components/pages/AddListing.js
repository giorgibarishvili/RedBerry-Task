import "../../styles/AddListing.css";
import { useState } from "react";
import Input from "../Input";
import TextArea from "../TextArea";

function AddListing() {
  const [sellStatus, setSellStatus] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [description, setDescription] = useState("");

  const handleRadioChange = (e) => {
    setSellStatus(e.target.value);
  };

  return (
    <div className="container">
      <h2>ლისტინგის დამატება</h2>
      <form className="form">
        <div className="info-section">
          გარიგების ტიპი
          <div className="d-flex mt-2">
            <div className="form-check me-5">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="sell"
                onChange={handleRadioChange}
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
                onChange={handleRadioChange}
                value="rent"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                ქირავდება
              </label>
            </div>
          </div>
        </div>
        <div className="info-section mt-5">
          <div className="mt-3 mb-2">მდებარეობა</div>
          <div className="d-flex">
            <Input
              type="text"
              label="address"
              state={address}
              setState={setAddress}
            />
            <Input
              type="text"
              label="postal"
              state={postal}
              setState={setPostal}
            />
          </div>
          <div className="d-flex">
            <select class="form-select" aria-label="Default select example">
              <option selected>რეგიონი</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <select class="form-select" aria-label="Default select example">
              <option selected>ქალაქი</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="info-section mt-5">
          <div className="mt-3 mb-2">ბინის დეტალები</div>
          <div className="d-flex">
            <Input
              type="number"
              label="fasi"
              state={price}
              setState={setPrice}
            />
            <Input type="number" label="area" state={area} setState={setArea} />
          </div>
          <div className="d-flex">
            <Input
              type="number"
              label="beds"
              state={bedrooms}
              setState={setBedrooms}
            />
          </div>
        </div>
        <div className="info-section mt-5">
          <div className="mt-3 mb-2">აღწერა *</div>
          <div className="d-flex">
            <TextArea
              label="texti"
              state={description}
              setState={setDescription}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
export default AddListing;
