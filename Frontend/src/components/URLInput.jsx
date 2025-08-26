import React, { useState } from 'react';
import "../style/URLInput.css";

const URLInput = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ fixed capital D
    if (url.trim()) {
      onSubmit(url);
    }
  };

  return (
    <div className='main-class'>
      <form onSubmit={handleSubmit} className='form_main'>
        <label htmlFor="website" className='form_label'>Enter Website</label>
        <input
          id="website"
          type="text"
          placeholder='https://xyz.com'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='form_input'
          required
        />
        <button type='submit' className='btn'>Check Accessibility</button>
      </form>
    </div>
  );
};

export default URLInput;
