import React, { useState } from 'react';

const URLInput = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);
    }
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit} className={`relative flex flex-col md:flex-row items-center gap-4 p-2 transition-all duration-300 ${isFocused ? 'scale-105' : 'scale-100'}`}>

        <div className={`relative w-full flex-grow group rounded-2xl transition-all duration-300 ${isFocused ? 'p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : 'p-[1px] bg-slate-700'}`}>
          <div className="relative flex items-center bg-slate-900 rounded-2xl overflow-hidden">
            <span className="pl-4 text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </span>
            <input
              id="website"
              type="text"
              placeholder="Enter website URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-transparent text-white px-4 py-4 focus:outline-none placeholder:text-slate-600 font-medium"
              required
            />
          </div>
        </div>

        <button
          type='submit'
          className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all duration-200 whitespace-nowrap"
        >
          Check Accessibility
        </button>
      </form>
    </div>
  );
};

export default URLInput;
