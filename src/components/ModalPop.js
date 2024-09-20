import { ModalBody, ModalHeader } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as XIcon } from "../images/xmark-solid.svg";
import { forwardRef } from "react";
import "../styles/ListingPage.css"

const ModalPop = forwardRef((props, ref) => {
  return (
    <Modal
    className="corp-modal notice-request-modal"
    show
    centered
    size={props.size}
    scrollable
  >
    <div ref={ref}>
      <ModalHeader style={{ background: "white", textAlign: "center" }}>
        <button
          className="corp-modal-x mt-3"
          onClick={() => props.onClose(false)}
        >
          <XIcon width="20" height="20" />
        </button>
      </ModalHeader>
      <ModalBody>
        <div className="container send-status-modal text-start">
          {props.children}
        </div>
      </ModalBody>
    </div>
  </Modal>
  );
});

export default ModalPop;
