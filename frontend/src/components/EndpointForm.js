import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

function EndpointForm({ endpoint, onClose, onSave, token }) {
  const [url, setUrl] = useState(endpoint ? endpoint.url : '');
  const [status, setStatus] = useState(endpoint ? endpoint.status : true);
  const [errors, setErrors] = useState([]);

  const isEditMode = Boolean(endpoint);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      url,
      status,
    };

    try {
      if (isEditMode) {
        const response = await axios.put(
          `http://localhost:3000/api/endpoints/${endpoint.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onSave(response.data);
      } else {
        const response = await axios.post(
          'http://localhost:3000/api/endpoints',
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onSave(response.data);
      }
      onClose();
    } catch (err) {
      setErrors(['Saving error.']);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="bg-white rounded-lg max-w-md mx-auto p-6 z-20">
          <Dialog.Title className="text-xl font-bold mb-4">
            {isEditMode ? 'Editar Endpoint' : 'Adicionar Endpoint'}
          </Dialog.Title>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="url" className="block text-gray-700 mb-2">
                URL
              </label>
              <input
                id="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://exemple.com/api"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value === 'true')}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>

            {errors.length > 0 && (
              <div className="mb-4 text-red-500">
                {errors.map((err, index) => (
                  <p key={index}>{err}</p>
                ))}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                {isEditMode ? 'Update' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}

export default EndpointForm;