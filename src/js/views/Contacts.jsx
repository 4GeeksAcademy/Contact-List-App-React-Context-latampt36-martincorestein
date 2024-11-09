import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/ContactCard.jsx";
import { Link } from "react-router-dom";

export const Contacts = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.loadContacts();
  }, []); 
  
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-4">
        <Link to="/add-contact" className="btn btn-success">
          Add new contact
        </Link>
      </div>
      <div className="list-group">
        {Array.isArray(store.contacts) ? (
          store.contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        ) : (
          <p>No contacts available</p>
        )}
      </div>
    </div>
  );
};