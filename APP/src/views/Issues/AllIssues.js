import React, { useState } from 'react';

const AllIssues = () => {
  const [bugId, setBugId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace "http://localhost:80/bug/" with the appropriate API endpoint URL
    fetch(`http://localhost:80/bug/${bugId}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed');
      }
    })
    .then((data) => {
      // Handle the API response data here
      console.log('API response data:');
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
};

  const handleInputChange = (e) => {
    setBugId(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="bugIdInput">Bug ID:</label>
      <input
        type="text"
        id="bugIdInput"
        value={bugId}
        onChange={handleInputChange}
        placeholder="Enter Bug ID"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AllIssues;