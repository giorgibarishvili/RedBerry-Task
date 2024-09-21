import "../../styles/HomePage.css";
import { ReactComponent as ArrowDown } from "../../images/chevron-down-solid.svg";
import { ReactComponent as Xmark } from "../../images/xmark-solid.svg";
import ButtonAdd from "../ButtonAdd";
import Card from "../Card";
import { useEffect, useMemo, useRef, useState } from "react";
import CheckBox from "../CheckBox";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../store/redBerryRedux/actions";
import { Link, useNavigate } from "react-router-dom";
import AddAgent from "./AddAgent";

function HomePage() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  const filterRefs = useRef([]);
  const dispatch = useDispatch();

  const regions = useSelector((state) => state.redBerry.regions);
  const filteredList = useSelector((state) => state.redBerry.filteredList);
  const filters = useSelector((state) => state.redBerry.filters);

  const [region, setRegion] = useState(false);
  const [price, setPrice] = useState(false);
  const [area, setArea] = useState(false);
  const [beds, setBeds] = useState(false);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [areaFrom, setAreaFrom] = useState("");
  const [areaTo, setAreaTo] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const [addAgent, setAddAgent] = useState(false);

  const [priceFromError, setPriceFromError] = useState(false);
  const [priceToError, setPriceToError] = useState(false);
  const [areaFromError, setAreaFromError] = useState(false);
  const [areaToError, setAreaToError] = useState(false);

  const [agentName, setAgentName] = useState("");
  const [agentSurName, setAgentSurName] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [agentPhone, setAgentPhone] = useState("");
  const [agentAvatar, setAgentAvatar] = useState(null);

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
  };

  const setPriceFilter = () => {
    dispatch(
      actions.setFilters({
        priceRange: { priceFrom, priceTo },
      })
    );
    dispatch(actions.setFilteredList());
  };
  const setAreaFilter = () => {
    dispatch(
      actions.setFilters({
        areaRange: { areaFrom, areaTo },
      })
    );
    dispatch(actions.setFilteredList());
  };
  const setBedroomsFilter = () => {
    dispatch(
      actions.setFilters({
        bedrooms: beds === "4+" ? 4 : beds,
      })
    );
    dispatch(actions.setFilteredList());
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

      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setAddAgent(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  useEffect(() => {
    dispatch(actions.getRegions());
    dispatch(actions.getRealEstates());
    dispatch(actions.setFilteredList());
  }, [dispatch]);

  useEffect(() => {
    setPriceFromError(priceFrom && parseFloat(priceFrom) > parseFloat(priceTo));
    setPriceToError(priceTo && parseFloat(priceTo) < parseFloat(priceFrom));
  }, [priceFrom, priceTo]);

  useEffect(() => {
    setAreaFromError(areaFrom && parseFloat(areaFrom) > parseFloat(areaTo));
    setAreaToError(areaTo && parseFloat(areaTo) < parseFloat(areaFrom));
  }, [areaFrom, areaTo]);

  const selectedRegions = useMemo(() => {
    return regions
      .filter((region) => filters?.regions?.indexOf(region.id) > -1)
      .map((region) => region.name);
  }, [filters, regions]);
  const selectedPriceRange = useMemo(() => {
    const from = filters?.priceRange?.priceFrom;
    const to = filters?.priceRange?.priceTo;

    if (from && to) {
      return `${from} - ${to}`;
    } else if (from) {
      return from.toString();
    } else if (to) {
      return to.toString();
    }
    return null;
  }, [filters]);
  const selectedAreaRange = useMemo(() => {
    const from = filters?.areaRange?.areaFrom;
    const to = filters?.areaRange?.areaTo;

    if (from && to) {
      return `${from} - ${to}`;
    } else if (from) {
      return from.toString();
    } else if (to) {
      return to.toString();
    }
    return null;
  }, [filters]);

  const selectedBedrooms = useMemo(() => {
    if (filters?.bedrooms) {
      return filters.bedrooms === 4 ? "4+" : filters.bedrooms.toString();
    }
    return null;
  }, [filters]);

  return (
    <div className=" container mt-5 mb-5">
      <div className=" pt-5">
        <div className="d-flex justify-content-between filter-wrap">
          <div className="filter">
            <div
              ref={(e) => (filterRefs.current[0] = e)}
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
              ref={(e) => (filterRefs.current[1] = e)}
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
              ref={(e) => (filterRefs.current[2] = e)}
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
              ref={(e) => (filterRefs.current[3] = e)}
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
          <ButtonAdd
            click={() => navigate("/add-listing")}
            text="ლისტინგის დამატება"
            colored="#F93B1D"
          />
          <ButtonAdd
            click={() => setAddAgent(true)}
            text="აგენტის დამატება"
            colored="transparent"
          />
        </div>
        {addAgent && (
          <AddAgent
            onClose={setAddAgent}
            size="xl"
            ref={modalRef}
            nameInput={agentName}
            setNameInput={setAgentName}
            surnameInput={agentSurName}
            setSurnameInput={setAgentSurName}
            emailInput={agentEmail}
            setEmailInput={setAgentEmail}
            phoneInput={agentPhone}
            setPhoneInput={setAgentPhone}
            setAvatarInput={setAgentAvatar}
            avatarInput={agentAvatar}
          />
        )}

        {region && (
          <div
            ref={dropdownRef}
            className="region-filter default-filter d-flex flex-column align-items-start"
          >
            <h4>რეგიონის მიხედვით</h4>
            <div className="checkbox-container">
              {regions.map((item) => (
                <CheckBox
                  id={item.id}
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
            <div className="row mt-2" style={{ width: "332px" }}>
              <div className="form-floating pb-5 col-6 row-column">
                <input
                  type="text"
                  className={`form-control${
                    priceFromError || priceToError ? " is-invalid" : ""
                  }`}
                  id="priceFromInput"
                  value={priceFrom}
                  placeholder=""
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setPriceFrom(value);
                    }
                  }}
                  autoComplete="off"
                  required
                  pattern="^\d*$"
                />
                <label className="ms-2" htmlFor="priceFromInput">
                  დან
                </label>
                <div>მინ. ფასი</div>
                {["50000", "100000", "150000", "200000", "250000"].map(
                  (price) => (
                    <div
                      key={price}
                      onClick={() => setPriceFrom(price)}
                      style={{ cursor: "pointer" }}
                    >
                      {price} ₾
                    </div>
                  )
                )}
              </div>
              <div className="form-floating pb-5 col-6 row-column">
                <input
                  type="text"
                  className={`form-control${
                    priceFromError || priceToError ? " is-invalid" : ""
                  }`}
                  id="priceToInput"
                  value={priceTo}
                  placeholder=""
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setPriceTo(value);
                    }
                  }}
                  autoComplete="off"
                  required
                  pattern="^\d*$"
                />
                <label className="ms-2" htmlFor="priceToInput">
                  მდე
                </label>
                <div>მაქს. ფასი</div>
                {["50000", "100000", "150000", "200000", "250000"].map(
                  (price) => (
                    <div
                      key={price}
                      onClick={() => setPriceTo(price)}
                      style={{ cursor: "pointer" }}
                    >
                      {price} ₾
                    </div>
                  )
                )}
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn-default btn-choose mx-3"
                  onClick={() => {
                    setPrice(false);
                    handleClick(null);
                    setPriceFilter();
                  }}
                  disabled={priceFromError || priceToError}
                  style={{
                    opacity: priceFromError || priceToError ? "0.5" : "1",
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
            <div className="row mt-2" style={{ width: "332px" }}>
              <div className="form-floating pb-5 col-6 row-column">
                <input
                  type="text"
                  className={`form-control${
                    areaFromError ? " is-invalid" : ""
                  }`}
                  id="areaFromInput"
                  value={areaFrom}
                  placeholder=""
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setAreaFrom(value);
                    }
                  }}
                  autoComplete="off"
                  required
                  pattern="^\d*$"
                />
                <label className="ms-2" htmlFor="areaFromInput">
                  დან
                </label>
                <div>მინ. მ²</div>
                {["50", "100", "150", "200", "250"].map((area) => (
                  <div
                    key={area}
                    onClick={() => setAreaFrom(area)}
                    style={{ cursor: "pointer" }}
                  >
                    {area} მ²
                  </div>
                ))}
              </div>
              <div className="form-floating pb-5 col-6 row-column">
                <input
                  type="text"
                  className={`form-control${areaToError ? " is-invalid" : ""}`}
                  id="areaToInput"
                  value={areaTo}
                  placeholder=""
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setAreaTo(value);
                    }
                  }}
                  autoComplete="off"
                  required
                  pattern="^\d*$"
                />
                <label className="ms-2" htmlFor="areaToInput">
                  მდე
                </label>
                <div>მაქს. მ²</div>
                {["50", "100", "150", "200", "250"].map((area) => (
                  <div
                    key={area}
                    onClick={() => setAreaTo(area)}
                    style={{ cursor: "pointer" }}
                  >
                    {area} მ²
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn-default btn-choose mx-3"
                  onClick={() => {
                    setArea(false);
                    handleClick(null);
                    setAreaFilter();
                  }}
                  disabled={areaFromError || areaToError}
                  style={{
                    opacity: areaFromError || areaToError ? "0.5" : "1",
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
            <div className=" row mt-2 gap-3" style={{ width: "332px" }}>
              <button
                className="beds-counter"
                onClick={() => setBeds(1)}
                style={{ borderColor: beds === 1 ? "green" : "" }}
              >
                1
              </button>
              <button
                className="beds-counter"
                onClick={() => setBeds(2)}
                style={{ borderColor: beds === 2 ? "green" : "" }}
              >
                2
              </button>
              <button
                className="beds-counter"
                onClick={() => setBeds(3)}
                style={{ borderColor: beds === 3 ? "green" : "" }}
              >
                3
              </button>
              <button
                className="beds-counter"
                onClick={() => setBeds("4+")}
                style={{ borderColor: beds === "4+" ? "green" : "" }}
              >
                4+
              </button>
              <div className="d-flex justify-content-end">
                <button
                  className="btn-default btn-choose mx-3"
                  onClick={() => {
                    setBeds(false);
                    handleClick(null);
                    setBedroomsFilter();
                  }}
                >
                  არჩევა
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="d-flex mt-3">
          {selectedRegions.map((regionName, index) => (
            <div key={index} className="param-item me-3">
              {regionName}
              <Xmark
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(actions.clearIndividualFilter("regions"));
                  dispatch(actions.setFilteredList());
                }}
              />
            </div>
          ))}
          {selectedPriceRange && (
            <div className="param-item me-3">
              {selectedPriceRange}
              <Xmark
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(actions.clearIndividualFilter("priceRange"));
                  dispatch(actions.setFilteredList());
                }}
              />
            </div>
          )}
          {selectedAreaRange && (
            <div className="param-item me-3">
              {selectedAreaRange} მ²
              <Xmark
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(actions.clearIndividualFilter("areaRange"));
                  dispatch(actions.setFilteredList());
                }}
              />
            </div>
          )}
          {selectedBedrooms && (
            <div className="param-item me-3">
              {selectedBedrooms}
              <Xmark
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(actions.clearIndividualFilter("bedrooms"));
                  dispatch(actions.setFilteredList());
                }}
              />
            </div>
          )}
          {(selectedRegions.length > 0 ||
            selectedPriceRange ||
            selectedAreaRange ||
            selectedBedrooms) && (
            <button
              onClick={() => {
                dispatch(actions.clearFilters());
                dispatch(actions.setFilteredList());
              }}
              className="btn-clear"
            >
              გასუფთავება
            </button>
          )}
        </div>
      </div>
      <div className="row justify-content-start">
        {filteredList.length > 0 ? (
          filteredList.map((item) => (
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
          ))
        ) : (
          <div className="d-flex mt-3">აღნიშნული მონაცემებით განცხადება არ იძებნება</div>
        )}
      </div>
    </div>
  );
}
export default HomePage;
