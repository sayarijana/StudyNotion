import React from 'react';
import IconBtnComm from './IconBtnComm';
import "./ConfirmationModal.css";

const ConfirmationModal = ({modalData}) => {
  return (
    <div className="modal-container">
        <div className="modal-box">
            <p className="modal-heading">{modalData.text1}</p>
            <p className="modal-paragraph">{modalData.text2}</p>
            <div className="modal-button-container">
                <IconBtnComm onclick={modalData?.btn1Handler} 
                text={modalData?.btn1Text}
                />

                <button className="modal-button" onClick={modalData?.btn2Handler}>
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>
      
    </div>
  )
}

export default ConfirmationModal
