import "../styles/ListingPage.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { useEffect, useState } from "react";
import actions from "../store/redBerryRedux/actions";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../images/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../images/arrow-right.svg";

function Slider() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4;

  const realEstates = useSelector((state) => state.redBerry.realEstates);
  useEffect(() => {
    dispatch(actions.getRealEstates());
  }, [dispatch]);

  const filteredRealEstates = realEstates.filter(
    (item) => item.id !== parseInt(id)
  );

  const handleNext = () => {
    if (currentIndex + itemsToShow < filteredRealEstates.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <div className="slider-wrapper d-flex align-items-center">
      <ArrowLeft
        className="me-4"
        onClick={handlePrev}
        style={{ cursor: "pointer" }}
      />
      <div className="slider-container d-flex">
        {filteredRealEstates
          .slice(currentIndex, currentIndex + itemsToShow)
          .map((item) => (
            <Link
              className="card-link"
              key={item.id}
              to={`/listing/${item.id}`}
            >
              <Card
                key={item.id}
                picture={item.image}
                status={item.is_rental}
                price={item.price}
                address={item.address}
                beds={item.bedrooms}
                area={item.area}
                post={item.zip_code}
              />
            </Link>
          ))}
      </div>
      <ArrowRight
        className="ms-1"
        onClick={handleNext}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
export default Slider;
