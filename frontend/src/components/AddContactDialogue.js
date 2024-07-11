import React, { useState } from 'react';

const AddContactDialogue = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    // Submit the form data to the API
    onSubmit({ name, email, phone });
    // Close the dialogue
    onClose();
  };

  const handleCancel = () => {
    // Close the dialogue without submitting
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Contact</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-1">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block font-semibold mb-1">Phone</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded" />
        </div>
        <div className="flex justify-end">
          <button onClick={handleCancel} className="px-4 py-2 mr-2 bg-red-500 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create</button>
        </div>
      </div>
    </div>
  );
};

export default AddContactDialogue;
