import "../../styles/ListingPage.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../images/arrow-left.svg";
import Kitchen from "../../images/kitchen.jpg";
import { ReactComponent as LocPin } from "../../images/location-ping.svg";
import { ReactComponent as Bed } from "../../images/bed-solid.svg";
import { ReactComponent as Area } from "../../images/area-icon.svg";
import { ReactComponent as Postal } from "../../images/postal-icon.svg";
import { ReactComponent as Mail } from "../../images/mail-icon.svg";
import { ReactComponent as Phone } from "../../images/phone-icon.svg";
function ListingPage() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="d-flex mt-5 mb-4">
        <ArrowLeft onClick={() => navigate("/")} />
      </div>
      <div className="d-flex gap-5">
        <div className="position-relative">
          <img className="main-img d-flex col-6" src={Kitchen} alt="kitchen" />
          <div className="img-status">status</div>
          <div
            className="mt-2 d-flex justify-content-end"
            style={{ color: "#808A93" }}
          >
            გამოქვეყნების თარიღი 08/08/24
          </div>
        </div>
        <div className="col-6 d-flex flex-column align-items-start">
          <h1 className="mt-3 mb-5">80, 458 ₾</h1>
          <div className="listing-params">
            <h5>
              <LocPin /> თბილისი, ი. ჭავჭავაძის 53
            </h5>
            <h5>
              <Area /> საძინებელი 2
            </h5>
            <h5>
              <Bed /> ფართი 55 მ²
            </h5>
            <h5>
              <Postal /> საფოსტო ინდექსი 2525
            </h5>
            <span className="mt-5">
              იყიდება ბინა ჭავჭავაძის ქუჩაზე, ვაკეში. ბინა არის ახალი რემონტით,
              ორი საძინებლითა და დიდი აივნებით. მოწყობილია ავეჯითა და ტექნიკით.
            </span>
          </div>
          <div className="agent-card">
            <div className="mt-4 ms-3 d-flex">
              <img
                className="agent-img "
                src={Kitchen}
                alt="agent"
              />
              <div className="ms-3 agent-nametag">
                  <p className="mb-1" style={{color: "#021526"}}>სოფიო გელოვანი</p>
                  <p className="mb-1">აგენტი</p>
              </div>
            </div>
            <div className="listing-params mt-3 ms-3">
            <p>
              <Mail /> sophio.gelovani@redberry.ge
            </p>
            <p>
              <Phone /> 577 777 777
            </p>
          </div>
          <button className="btn-delete btn-default mt-3">ლისტინგის წაშლა</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListingPage;
