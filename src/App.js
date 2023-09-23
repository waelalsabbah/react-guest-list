import React, { useState } from 'react';

function GuestList() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

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
    <div>
      <h1>Guest List</h1>
      <div>
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <button onClick={addGuest}>Return</button>
      <ul>
        {guests.map((guest, index) => (
          <div key={index} data-test-id="guest">
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
