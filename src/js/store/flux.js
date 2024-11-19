const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            currentContact: null,
            loading: false,
            error: null,
            agenda_slug: "Agenda777"
        },
        actions: {
            // Nueva función para verificar y crear la agenda si es necesario
            verifyAndCreateAgenda: async () => {
                const store = getStore();
                setStore({ loading: true, error: null });

                try {
                    const checkResponse = await fetch(`https://playground.4geeks.com/contact/agendas/${store.agenda_slug}`);
                    
                    if (checkResponse.status === 404) {
                        const createResponse = await fetch(`https://playground.4geeks.com/contact/agendas/${store.agenda_slug}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                agenda_slug: store.agenda_slug,
                            }),
                        });

                        if (!createResponse.ok) {
                            throw new Error(`Failed to create agenda: ${createResponse.status}`);
                        }
                        console.log("Agenda created successfully");
                    } else if (!checkResponse.ok) {
                        throw new Error(`Error checking agenda: ${checkResponse.status}`);
                    }

                    console.log("Agenda verified successfully");
                } catch (error) {
                    console.error("Error in verifyAndCreateAgenda:", error);
                    setStore({ error: "Failed to verify or create agenda" });
                } finally {
                    setStore({ loading: false });
                }
            },

            loadContacts: async () => {
                const store = getStore();
                setStore({ loading: true, error: null });
                
                try {
                    
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.agenda_slug}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setStore({ contacts: data.contacts });
                } catch (error) {
                    console.error("Error loading contacts:", error);
                    setStore({ error: "Failed to load contacts" });
                } finally {
                    setStore({ loading: false });
                }
            },

            addContact: async (contact) => {
                const API_BASE_URL = "https://playground.4geeks.com/contact/agendas/Agenda777/contacts";
                
                try {
                    const response = await fetch(API_BASE_URL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(contact)
                    });
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    const data = await response.json();
                    console.log("Contact added:", data);
                    
                } catch (error) {
                    console.error("Error adding contact:", error);
                }
            },

            deleteContact: async (id) => {
                const store = getStore();
                setStore({ loading: true, error: null });

                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.agenda_slug}/contacts/${id}`, {
                        method: 'DELETE'
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    await getActions().loadContacts();
                } catch (error) {
                    console.error("Error deleting contact:", error);
                    setStore({ error: "Failed to delete contact" });
                } finally {
                    setStore({ loading: false });
                }
            },

            updateContact: async (id, updatedContact) => {
                const store = getStore();
                setStore({ loading: true, error: null });
            
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.agenda_slug}/contacts/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedContact) 
                    });
            
                    if (!response.ok) {
                        console.error("HTTP error details:", await response.json());
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
            
                } catch (error) {
                    console.error("Error updating contact:", error);
                    setStore({ error: "Failed to update contact" });
                } finally {
                    setStore({ loading: false });
                }
            }
        }
    };
};

export default getState;
