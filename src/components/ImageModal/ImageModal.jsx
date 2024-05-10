/* eslint-disable react/prop-types */
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function ImageModal({ imgUrl, isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      onRequestClose={onClose}
      className="fixed bg-white rounded-lg p-6 max-h-[95%] mx-auto"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-85"
    >
      <div className="flex justify-center items-center h-full">
        <img src={imgUrl} className="max-w-full max-h-[80vh] object-contain" />
      </div>
    </Modal>
  );
}
