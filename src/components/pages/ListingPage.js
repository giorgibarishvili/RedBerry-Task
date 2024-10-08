import "../../styles/ListingPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../images/arrow-left.svg";
import { ReactComponent as LocPin } from "../../images/location-ping.svg";
import { ReactComponent as Bed } from "../../images/bed-solid.svg";
import { ReactComponent as Area } from "../../images/area-icon.svg";
import { ReactComponent as Postal } from "../../images/postal-icon.svg";
import { ReactComponent as Mail } from "../../images/mail-icon.svg";
import { ReactComponent as Phone } from "../../images/phone-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import actions from "../../store/redBerryRedux/actions";
import ModalPop from "../ModalPop";
import Slider from "../Slider";
function ListingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const modalRef = useRef(null);

  const [modalClose, setModalClose] = useState(false);

  const selectedEstate = useSelector((state) => state.redBerry.selectedEstate);

  useEffect(() => {
    dispatch(actions.getEstateById({ id }));
  }, [dispatch, id]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalClose(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  if (!selectedEstate) {
    return (
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
    );
  }

  return (
    <div className="container mb-5">
      <div className="d-flex mt-5 mb-4">
        <ArrowLeft className="arrow-back" onClick={() => navigate("/")} />
      </div>
      <div className="d-flex gap-5">
        <div className="position-relative">
          <img
            className="main-img d-flex col-6"
            src={selectedEstate.image}
            alt="house"
          />
          <div className="img-status">
            {selectedEstate.is_rental === 0 ? "იყიდება" : "ქირავდება"}
          </div>
          <div
            className="mt-2 d-flex justify-content-end"
            style={{ color: "#808A93" }}
          >
            გამოქვეყნების თარიღი{" "}
            {selectedEstate && selectedEstate.created_at
              ? formatDate(selectedEstate.created_at)
              : "Loading..."}
          </div>
        </div>
        <div className="col-6 d-flex flex-column align-items-start">
          <h1 className="mt-3 mb-5" style={{ fontWeight: "700" }}>
            {selectedEstate.price.toLocaleString("en-US")} ₾
          </h1>
          <div className="listing-params">
            <p>
              <LocPin /> {selectedEstate.address}
            </p>
            <p>
              <Area /> {selectedEstate.area} მ²
            </p>
            <p>
              <Bed /> {selectedEstate.bedrooms}
            </p>
            <p>
              <Postal /> საფოსტო ინდექსი {selectedEstate.zip_code}
            </p>
            <span className="mt-5">{selectedEstate.description}</span>
          </div>
          <div className="agent-card">
            <div className="mt-4 ms-3 d-flex">
              <img
                className="agent-img "
                src={selectedEstate.agent.avatar}
                alt="agent"
              />
              <div className="ms-3 agent-nametag">
                <p className="mb-1" style={{ color: "#021526" }}>
                  {selectedEstate.agent.name +
                    " " +
                    selectedEstate.agent.surname}
                </p>
                <p className="mb-1">აგენტი</p>
              </div>
            </div>
            <div className="listing-params mt-3 ms-3">
              <p>
                <Mail /> {selectedEstate.agent.email}
              </p>
              <p>
                <Phone /> {selectedEstate.agent.phone}
              </p>
            </div>
            <button
              onClick={() => setModalClose(true)}
              className="btn-delete btn-default mt-3"
            >
              ლისტინგის წაშლა
            </button>
          </div>
        </div>
      </div>
      {modalClose && (
        <ModalPop onClose={setModalClose} size={"md"} ref={modalRef}>
          <div className="row text-center">
            <div className="col-12 mx-auto">
              <div className="modal-text d-flex flex-wrap justify-content-center mt-1">
                <div className="d-flex align-items-center mb-3">
                  გსურთ წაშალოთ ლისტინგი?
                </div>
                <div className="d-flex ">
                  <button
                    className="btn-default btn-cancel mx-3"
                    onClick={() => {
                      setModalClose(false);
                    }}
                  >
                    გაუქმება
                  </button>
                  <button
                    className="btn-default btn-create mx-3"
                    onClick={() => {
                      setModalClose(false);
                      dispatch(actions.deleteEstate({ id }));
                      navigate("/");
                    }}
                  >
                    დადასტურება
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalPop>
      )}
      <h2 className="mt-3 d-flex">ბინები მსგავს ლოკაციაზე</h2>
      <Slider />
    </div>
  );
}
export default ListingPage;
