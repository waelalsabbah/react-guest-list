import './Glist.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function GuestList() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    // Load the guest list from the API when the component mounts
    axios
      .get('http://localhost:4000/api/guests')
      .then((response) => {
        setGuests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching guest list:', error);
      });
  }, []);

  const addGuest = () => {
    if (firstName.trim() === '' || lastName.trim() === '') {
      return;
    }

    const newGuest = {
      firstName,
      lastName,
      attending: true,
    };

    setGuests([...guests, newGuest]);
    setFirstName('');
    setLastName('');
  };

  const handleLastNameKeyPress = (e) => {
    if (e.key === 'Enter') {
      addGuest();
    }
  };

  const removeGuest = (index) => {
    const updatedGuests = [...guests];
    updatedGuests.splice(index, 1);
    setGuests(updatedGuests);
  };

  const toggleAttending = (index) => {
    const updatedGuests = [...guests];
    updatedGuests[index].attending = !updatedGuests[index].attending;
    setGuests(updatedGuests);
  };

  return (
    <div className="guest-list-container">
      <h1>Guest List</h1>
      <div className="input-container">
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <button className="add-button" onClick={addGuest}>
        Add Guest
      </button>
      <ul className="guest-ul">
        {guests.map((guest, index) => (
          <div key={index} data-test-id="guest" className="guest-item">
            <li>
              {guest.firstName} {guest.lastName} -{' '}
              {guest.attending ? 'Attending' : 'Not Attending'}{' '}
              <input
                type="checkbox"
                onChange={() => toggleAttending(index)}
                aria-label={`${guest.firstName} ${guest.lastName} ${
                  guest.attending ? 'attending' : 'not attending'
                } status`}
              />
              <button
                onClick={() => removeGuest(index)}
                aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                className="remove-button"
              >
                Remove
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default GuestList;
