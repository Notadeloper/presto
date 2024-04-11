import React from 'react';

export function NewPresentationModal ({ onSubmit, onClose }) {
  const [presentationName, setPresentationName] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(presentationName);
  };

  return (
    <div className="presentation-modal">
      <form onSubmit={handleSubmit}>
        <label>
          Presentation Name:
          <input type="text" value={presentationName} onChange={(e) => setPresentationName(e.target.value)} />
        </label>
        <button type="submit">Create</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
