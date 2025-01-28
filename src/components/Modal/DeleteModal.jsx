import React from "react";
import Modal from "./Modal";

function DeleteModal({ close, proceed }) {
  return (
    <Modal close={close}>
      <div>
        <h1>Are you sure you want to delete this?</h1>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            onClick={proceed}
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Proceed
          </button>
          <button
            type="button"
            onClick={close}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
