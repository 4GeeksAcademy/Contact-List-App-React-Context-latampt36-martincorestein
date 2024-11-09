import React from "react";

export const Modal = ({ title, body, onConfirm, onCancel }) => {
    return (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">¿Are you sure?</h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <p>If you delete this thing the entire universe will go down!</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onCancel}>
                            Oh no!
                        </button>
                        <button className="btn btn-primary" onClick={onConfirm}>
                            Yes baby!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
