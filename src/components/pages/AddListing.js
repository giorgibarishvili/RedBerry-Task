import "../../styles/AddListing.css";
import { useState } from "react";
import Input from "../Input";
import TextArea from "../TextArea";
import { ReactComponent as CirclePlus } from "../../images/circle-plus-solid.svg";

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
      <form className="form mb-5">
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
              />
            </div>
            <Input
              className="listing-input"
              type="text"
              label="postal"
              state={postal}
              setState={setPostal}
            />
          </div>
          <div className="d-flex">
            <div className="me-5">
              <span className="d-flex mb-2">რეგიონი</span>
              <select
                className="form-select listing-input"
                aria-label="Default select example"
              >
                <option selected>რეგიონი</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="me-5">
              <span className="d-flex mb-2">ქალაქი</span>
              <select
                className="form-select listing-input"
                aria-label="Default select example"
              >
                <option selected>ქალაქი</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
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
              />
            </div>
            <Input
              className="listing-input"
              type="number"
              label="ფართობი"
              state={area}
              setState={setArea}
            />
          </div>
          <div className="d-flex">
            <Input
              className="listing-input"
              type="number"
              label="საძინებლების რაოდენობა*"
              state={bedrooms}
              setState={setBedrooms}
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
            />
          </div>
        </div>
        <div className="info-section mt-5">
          <div className="mt-3 mb-2">ატვირთეთ ფოტო *</div>
          <div className="d-flex">
            <div className="add-photo d-flex align-items-center justify-content-center">
              <CirclePlus />
            </div>
          </div>
        </div>
        <div className="info-section mt-5">
          <div className="mt-3 mb-2">აგენტი</div>
          <div className="d-flex">
            <select
              className="form-select listing-input"
              aria-label="Default select example"
            >
              <option selected>აირჩიე</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-end ms-auto">
          <button className="btn-default btn-cancel mx-3" onClick={() => {}}>
            გაუქმება
          </button>
          <button className="btn-default btn-create mx-3" onClick={() => {}}>
            დაამატე ლისტინგი
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddListing;
