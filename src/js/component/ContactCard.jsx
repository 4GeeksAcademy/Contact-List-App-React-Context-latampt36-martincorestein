import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Modal } from "../component/Modal.jsx";

export const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        await actions.deleteContact(contact.id);
        setShowModal(false);
    };

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-2 d-flex align-items-center">
                    <img 
                        src={`https://avatar.iran.liara.run/username?username=${contact.name}`}
                        className="img-fluid rounded-circle m-2" 
                        alt={contact.name}
                    />
                </div>
                <div className="col-md-8 d-flex align-items-center">
                    <div className="card-body">
                        <h5 className="card-title">{contact.name}</h5>
                        <p className="card-text">
                            <i className="fas fa-map-marker-alt me-2"></i>
                            {contact.address}
                        </p>
                        <p className="card-text">
                            <i className="fas fa-phone me-2"></i>
                            {contact.phone}
                        </p>
                        <p className="card-text">
                            <i className="fas fa-envelope me-2"></i>
                            {contact.email}
                        </p>
                    </div>
                </div>
                <div className="col-md-2 d-flex align-items-center justify-content-end p-3">
                    <Link to={`/edit/${contact.id}`} className="btn btn-warning me-2">
                        <i className="fas fa-pencil-alt"></i>
                    </Link>
                    <button 
                        className="btn btn-danger"
                        onClick={() => setShowModal(true)}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>

            {showModal && (
                <Modal 
                    title="Delete Contact"
                    message="Are you sure you want to delete this contact?"
                    onConfirm={handleDelete}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default ContactCard;
