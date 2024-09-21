import Input from "../Input";
import ModalPop from "../ModalPop";
import { ReactComponent as CirclePlus } from "../../images/circle-plus-solid.svg";
import { useDispatch } from "react-redux";
import actions from "../../store/redBerryRedux/actions";
import { forwardRef } from "react";

const AddAgent = forwardRef(
  (
    {
      onClose,
      size,
      nameInput,
      setNameInput,
      surnameInput,
      setSurnameInput,
      emailInput,
      setEmailInput,
      phoneInput,
      setPhoneInput,
      avatarInput,
      setAvatarInput,
    },
    ref
  ) => {
    const dispatch = useDispatch();

    const handlePhotoUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        setAvatarInput(file);
      }
    };
    const handleCreateAgent = () => {
      dispatch(
        actions.getCreateAgent({
          name: nameInput,
          surname: surnameInput,
          email: emailInput,
          phone: phoneInput,
          avatar: avatarInput,
        })
      );
    };
    return (
      <ModalPop onClose={onClose} size={size} ref={ref}>
        <div className="row text-center">
          <div className="col-12 mx-auto">
            <div className="modal-text d-flex flex-wrap justify-content-center mt-1">
              <div className="d-flex align-items-center mb-3">
                <h1>აგენტის დამატება</h1>
              </div>
              <div className="info-section mt-5 ">
                <div className="mt-3 mb-2">მდებარეობა</div>
                <div className="d-flex mt-3">
                  <div className="me-5">
                    <Input
                      className="listing-input"
                      type="text"
                      label="სახელი *"
                      state={nameInput}
                      setState={setNameInput}
                      required={true}
                      spanText="მინიმუმ ორი სიმბოლო"
                    />
                  </div>
                  <Input
                    className="listing-input"
                    type="text"
                    label="გვარი"
                    state={surnameInput}
                    setState={setSurnameInput}
                    spanText="მინიმუმ ორი სიმბოლო"
                  />
                </div>
                <div className="d-flex">
                  <div className="me-5">
                    <Input
                      className="listing-input"
                      type="text"
                      label="ელ-ფოსტა*"
                      state={emailInput}
                      setState={setEmailInput}
                      required={true}
                      spanText="გამოიყენეთ @redberry.ge ფოსტა"
                    />
                  </div>
                  <div className="me-5">
                    <Input
                      className="listing-input"
                      type="number"
                      label="ტელეფონის ნომერი"
                      state={phoneInput}
                      setState={setPhoneInput}
                      spanText="მხოლოდ რიცხვები"
                    />
                  </div>
                </div>
              </div>
              <div className="info-section mb-3">
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
                    onClick={() =>
                      document.getElementById("photo-upload").click()
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {!avatarInput && <CirclePlus />}
                    {avatarInput && (
                      <div className="ml-2">
                        <img
                          src={URL.createObjectURL(avatarInput)}
                          alt="Agent Avatar"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex ">
                <button
                  className="btn-default btn-cancel mx-3"
                  onClick={() => {
                    onClose(false);
                  }}
                >
                  გაუქმება
                </button>
                <button
                  className="btn-default btn-create mx-3"
                  onClick={() => {
                    onClose(false);
                    handleCreateAgent();
                  }}
                >
                  დადასტურება
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalPop>
    );
  }
);
export default AddAgent;
