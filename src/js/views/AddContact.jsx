import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

export const AddContact = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    agenda_slug: store.agenda_slug,
  });

  useEffect(() => {
    if (id) {
      actions.loadContacts(); // Cargar contactos solo si se va a editar
    }
  }, [id]); // Ejecutar solo cuando id esté presente

  // Filtrar el contacto despues que los contactos se carguen
  useEffect(() => {
    if (id && store.contacts.length > 0) {
      const selectedContact = store.contacts.find(contact => contact.id === parseInt(id));
      if (selectedContact) {
        setContact({
          ...selectedContact,
          agenda_slug: store.agenda_slug,
        });
      }
    }
  }, [id, store.contacts]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await actions.updateContact(id, contact);
    } else {
      await actions.addContact(contact);
    }
    navigate("/");
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">
        {id ? "Edit Contact" : "Add a new contact"}
      </h1>
      <form onSubmit={handleSubmit} className="my-5">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            value={contact.address}
            onChange={(e) => setContact({ ...contact, address: e.target.value })}
          />
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            {id ? "Update" : "Save"}
          </button>
          <button 
            type="button" 
            className="btn btn-link" 
            onClick={() => navigate("/")}
          >
            Go back to contacts
          </button>
        </div>
      </form>
    </div>
  );
};
