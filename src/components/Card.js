import "../styles/Card.css";
import { ReactComponent as LocPin } from "../images/location-ping.svg";
import { ReactComponent as Bed } from "../images/bed-solid.svg";
import { ReactComponent as Area } from "../images/area-icon.svg";
import { ReactComponent as Postal } from "../images/postal-icon.svg";
function Card({ picture, status, price, address, beds, area, post }) {
  return (
    <div className="product-card mt-5 me-4 p-0">
      <div className="product-img">
        <img src={picture} alt="Product" />
        <div className="img-logo">{status}</div>
      </div>
      <div className="product-content">
        <h3>{price} ₾</h3>
        <div className="gap-2 d-flex">
          <LocPin /> {address}
        </div>
        <div className="gap-4 d-flex">
          <p>
            <Bed /> {beds}
          </p>
          <p>
            <Area /> {area} მ²
          </p>
          <p>
            <Postal /> {post}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Card;
