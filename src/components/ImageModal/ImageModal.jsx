/* eslint-disable react/prop-types */
import Modal from "react-modal";
Modal.setAppElement("#root")

export default function ImageModal({ imgUrl, isOpen, onClose }) {
    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        onRequestClose={onClose}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
      >
        <div className="bg-white rounded-lg p-4 max-w-full w-3/5 max-h-screen h-[95%] ">
          <img src={imgUrl} className="mx-auto w-full h-full object-cover " />
        </div>
      </Modal>
    );
}