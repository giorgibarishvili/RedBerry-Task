import "../../styles/HomePage.css";
import { ReactComponent as ArrowDown } from "../../images/chevron-down-solid.svg";
import { ReactComponent as Xmark } from "../../images/xmark-solid.svg";
import ButtonAdd from "../ButtonAdd";
import Card from "../Card";
import House from "../../images/image.png";

function HomePage() {
  return (
    <div className=" container mt-5">
      <div className=" pt-5">
        <div className="d-flex justify-content-between">
          <div className="filter">
            <div>
              რეგიონი <ArrowDown />
            </div>
            <div>
              საფასო კატეგორია <ArrowDown />
            </div>
            <div>
              ფართობი <ArrowDown />
            </div>
            <div>
              საძინებლის რაოდენობა <ArrowDown />
            </div>
          </div>
          <ButtonAdd text="ლისტინგის დამატება" colored="#F93B1D" />
          <ButtonAdd text="ლისტინგის დამატება" colored="transparent" />
        </div>
        <div className="d-flex mt-3">
          <div className="param-item me-3">
            თბილისი
            <Xmark />
          </div>
          <div className="param-item me-3">
            55 მ² - 90 მ²
            <Xmark />
          </div>
          <button className="btn-clear">გასუფთავება</button>
        </div>
      </div>
      <div className="row justify-content-start">
        <Card
          picture={House}
          status="იყიდება"
          price="80 000"
          address="თბილისი, ი. ჭავჭავაძის 53"
          beds="2"
          area="55"
          post="0131"
        />
      </div>
    </div>
  );
}
export default HomePage;
