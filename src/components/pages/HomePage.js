import "../../styles/HomePage.css";
import { ReactComponent as ArrowDown } from "../../images/chevron-down-solid.svg";
import { ReactComponent as Xmark } from "../../images/xmark-solid.svg";
import ButtonAdd from "../ButtonAdd";
import Card from "../Card";
import House from "../../images/image.png";
import { act, useEffect, useRef, useState } from "react";
import CheckBox from "../CheckBox";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../store/redBerryRedux/actions";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const dropdownRef = useRef(null);
  const filterRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cities = useSelector((state) => state.redBerry.cities);
  const regions = useSelector((state) => state.redBerry.regions);
  const realEstates = useSelector((state) => state.redBerry.realEstates);
  const agents = useSelector((state) => state.redBerry.agents);
  const filteredList = useSelector((state) => state.redBerry.filteredList);

  const [region, setRegion] = useState(false);
  const [price, setPrice] = useState(false);
  const [area, setArea] = useState(false);
  const [beds, setBeds] = useState(false);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [areaFrom, setAreaFrom] = useState("");
  const [areaTo, setAreaTo] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);

  const handleClick = (filter) => {
    setActiveFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };
  const setRegionsFilter = () => {
    dispatch(
      actions.setFilters({
        regions: regions
          .filter(({ isSelected }) => isSelected)
          .map(({ id }) => id),
      })
    );
    dispatch(actions.setFilteredList());
    console.log(regions);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !filterRefs.current.some((ref) => ref && ref.contains(event.target))
      ) {
        setActiveFilter(null);
        setRegion(false);
        setPrice(false);
        setArea(false);
        setBeds(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    dispatch(actions.getRegions());
    dispatch(actions.getRealEstates());
    dispatch(actions.getCities());
    dispatch(actions.getAgents());
  }, [dispatch]);
  // console.log(realEstates);

  return (
    <div className=" container mt-5">
      <div className=" pt-5">
        <div className="d-flex justify-content-between">
          <div className="filter">
            <div
              ref={(el) => (filterRefs.current[0] = el)}
              className="filter-item d-flex align-items-center gap-1"
              onClick={() => {
                handleClick("region");
                setRegion(!region);
                setBeds(false);
                setArea(false);
                setPrice(false);
              }}
            >
              რეგიონი
              <ArrowDown
                className={activeFilter === "region" ? "rotated" : ""}
              />
            </div>
            <div
              ref={(el) => (filterRefs.current[1] = el)}
              className="filter-item d-flex align-items-center gap-1"
              onClick={() => {
                handleClick("price");
                setPrice(!price);
                setRegion(false);
                setBeds(false);
                setArea(false);
              }}
            >
              საფასო კატეგორია
              <ArrowDown
                className={activeFilter === "price" ? "rotated" : ""}
              />
            </div>
            <div
              ref={(el) => (filterRefs.current[2] = el)}
              className="filter-item d-flex align-items-center gap-1"
              onClick={() => {
                handleClick("area");
                setArea(!area);
                setRegion(false);
                setBeds(false);
                setPrice(false);
              }}
            >
              ფართობი
              <ArrowDown className={activeFilter === "area" ? "rotated" : ""} />
            </div>
            <div
              ref={(el) => (filterRefs.current[3] = el)}
              className="filter-item d-flex align-items-center gap-1"
              onClick={() => {
                handleClick("beds");
                setBeds(!beds);
                setRegion(false);
                setArea(false);
                setPrice(false);
              }}
            >
              საძინებლის რაოდენობა
              <ArrowDown className={activeFilter === "beds" ? "rotated" : ""} />
            </div>
          </div>
          <ButtonAdd text="ლისტინგის დამატება" colored="#F93B1D" />
          <ButtonAdd text="ლისტინგის დამატება" colored="transparent" />
        </div>
        {region && (
          <div
            ref={dropdownRef}
            className="region-filter default-filter d-flex flex-column align-items-start"
          >
            <h4>რეგიონის მიხედვით</h4>
            <div className="checkbox-container">
              {regions.map((item) => (
                <CheckBox
                  change={(e) => {
                    dispatch(
                      actions.updateRegion({
                        id: item.id,
                        isSelected: e.target.checked,
                      })
                    );
                  }}
                  key={item.id}
                  text={item.name}
                  isSelected={item.isSelected}
                />
              ))}
            </div>
            <div className="d-flex justify-content-end ms-auto">
              <button
                className="btn-default btn-choose mx-3"
                onClick={() => {
                  setRegion(false);
                  handleClick(null);
                  setRegionsFilter();
                }}
              >
                არჩევა
              </button>
            </div>
          </div>
        )}
        {price && (
          <div
            ref={dropdownRef}
            className="price-filter default-filter d-flex flex-column align-items-start"
          >
            <h4>ფასის მიხედვით</h4>
            <div className=" row mt-2" style={{ width: "332" }}>
              <div className="form-floating   pb-5 col-6 row-column">
                <input
                  type="text"
                  className={`form-control${!priceFrom ? " is-invalid" : ""}`}
                  id="floatingInput"
                  value={priceFrom}
                  placeholder=""
                  onChange={(e) => setPriceFrom(e.target.value)}
                  autoComplete="off"
                  required
                />
                <label htmlFor="floatingInput">nameInput</label>
                {!priceFrom && (
                  <span className="text-danger error-validation-text">
                    mandatory
                  </span>
                )}
                <div>მინ. ფასი</div>
                <div>50,000 ₾</div>
                <div>50,000 ₾</div>
                <div>50,000 ₾</div>
                <div>50,000 ₾</div>
                <div>50,000 ₾</div>
              </div>
              <div className="form-floating   pb-5 col-6 row-column">
                <input
                  type="text"
                  className={`form-control${!priceTo ? " is-invalid" : ""}`}
                  id="floatingInput"
                  value={priceTo}
                  placeholder=""
                  onChange={(e) => setPriceTo(e.target.value)}
                  autoComplete="off"
                  required
                />
                <label htmlFor="floatingInput">nameInput</label>
                {!priceTo && (
                  <span className="text-danger error-validation-text">
                    mandatory
                  </span>
                )}
                <div>მაქს. ფასი</div>
                <div>50,000 ₾</div>
                <div>50,000 ₾</div>
                <div>50,000 ₾</div>
                <div>50,000 ₾</div>
                <div>50,000 ₾</div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn-default btn-choose mx-3"
                  onClick={() => {
                    setPrice(false);
                    handleClick(null);
                  }}
                >
                  არჩევა
                </button>
              </div>
            </div>
          </div>
        )}
        {area && (
          <div
            ref={dropdownRef}
            className="price-filter default-filter d-flex flex-column align-items-start"
          >
            <h4>ფართობის მიხედვით</h4>
            <div className=" row mt-2" style={{ width: "332" }}>
              <div className="form-floating   pb-5 col-6 row-column">
                <input
                  type="text"
                  className={`form-control${!areaFrom ? " is-invalid" : ""}`}
                  id="floatingInput"
                  value={areaFrom}
                  placeholder=""
                  onChange={(e) => setAreaFrom(e.target.value)}
                  autoComplete="off"
                  required
                />
                <label htmlFor="floatingInput">nameInput</label>
                {!areaFrom && (
                  <span className="text-danger error-validation-text">
                    mandatory
                  </span>
                )}
                <div>მინ. მ²</div>
                <div>50,000 მ²</div>
                <div>50,000 მ²</div>
                <div>50,000 მ²</div>
                <div>50,000 მ²</div>
                <div>50,000 მ²</div>
              </div>
              <div className="form-floating   pb-5 col-6 row-column">
                <input
                  type="text"
                  className={`form-control${!areaTo ? " is-invalid" : ""}`}
                  id="floatingInput"
                  value={areaTo}
                  placeholder=""
                  onChange={(e) => setAreaTo(e.target.value)}
                  autoComplete="off"
                  required
                />
                <label htmlFor="floatingInput">nameInput</label>
                {!areaTo && (
                  <span className="text-danger error-validation-text">
                    mandatory
                  </span>
                )}
                <div>მაქს. მ²</div>
                <div>50,000 მ²</div>
                <div>50,000 მ²</div>
                <div>50,000 მ²</div>
                <div>50,000 მ²</div>
                <div>50,000 მ²</div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn-default btn-choose mx-3"
                  onClick={() => {
                    setArea(false);
                    handleClick(null);
                  }}
                >
                  არჩევა
                </button>
              </div>
            </div>
          </div>
        )}
        {beds && (
          <div
            ref={dropdownRef}
            className="beds-filter default-filter d-flex flex-column align-items-start"
          >
            <h4>საძინებლების რაოდენობა</h4>
            <div className=" row mt-2" style={{ width: "332px" }}>
              <button className="beds-counter">2</button>
              <div className="d-flex justify-content-end">
                <button
                  className="btn-default btn-choose mx-3"
                  onClick={() => {
                    setBeds(false);
                    handleClick(null);
                  }}
                >
                  არჩევა
                </button>
              </div>
            </div>
          </div>
        )}
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
        {filteredList.map((item) => (
          <Link className="card-link" key={item.id} to={`/listing/${item.id}`}>
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
    </div>
  );
}
export default HomePage;
