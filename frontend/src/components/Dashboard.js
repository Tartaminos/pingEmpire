import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EndpointForm from './EndpointForm';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [endpoints, setEndpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEndpoint, setCurrentEndpoint] = useState(null);
  const navigate = useNavigate();

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchEndpoints = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/endpoints', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setEndpoints(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error returning endpoints.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEndpoints();
  }, []);

  const handleAdd = () => {
    setCurrentEndpoint(null);
    setIsModalOpen(true);
  };

  const handleEdit = (endpoint) => {
    setCurrentEndpoint(endpoint);
    setIsModalOpen(true);
  };


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`http://localhost:3000/api/endpoints/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setEndpoints(endpoints.filter((ep) => ep.id !== id));
      } catch (err) {
        setError('Delete fail.');
      }
    }
  };

  const addOrUpdateEndpoint = (endpoint) => {
    if (endpoint.id) {
      setEndpoints(
        endpoints.map((ep) => (ep.id === endpoint.id ? endpoint : ep))
      );
    } else {
      setEndpoints([...endpoints, endpoint]);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Add endpoint
        </button>
      </div>

      {endpoints.length === 0 ? (
        <p className="text-center">Nothing here, please add an endpoint.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">URL</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Last check</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((endpoint) => (
                <tr key={endpoint.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{endpoint.url}</td>
                  <td className="py-2 px-4 border-b">
                    {endpoint.status ? (
                      <span className="text-green-500">Active</span>
                    ) : (
                      <span className="text-red-500">Inactive</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(endpoint.last_checked).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEdit(endpoint)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(endpoint.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* enpoint modal */}
      {isModalOpen && (
        <EndpointForm
          endpoint={currentEndpoint}
          onClose={() => setIsModalOpen(false)}
          onSave={addOrUpdateEndpoint}
          token={getToken()}
        />
      )}
    </div>
  );
}

export default Dashboard;