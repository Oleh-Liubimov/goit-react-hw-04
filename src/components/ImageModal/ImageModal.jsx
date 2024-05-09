/* eslint-disable react/prop-types */
import Modal from "react-modal";

export default function ImageModal({ children }) {
    return (
      <Modal>
        {children}
      </Modal>
    );
}