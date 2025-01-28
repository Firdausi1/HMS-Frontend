import React from "react";

function Modal({ children, close }) {
  return (
    <div className="fixed inset-0 bg-gray-500/75 transition-opacity flex justify-center items-center">
      <div onClick={close}>close</div>
      <div className="rounded-md px-4 py-6 bg-white w-[300px] flex  justify-center items-center">
        {" "}
        {children}
      </div>
    </div>
  );
}

export default Modal;
