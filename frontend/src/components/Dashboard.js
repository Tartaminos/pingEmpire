import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function Dashboard() {
  const [endpoints, setEndpoints] = useState([]);

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const response = await api.get('/endpoints'); // future request to endpoint, maybe will be other path
        setEndpoints(response.data);
      } catch (error) {
        console.error('Get endpoint failed', error);
      }
    };

    fetchEndpoints();
  }, []);

  return (
    <div>
      <h1>Endpoints</h1>
      {/* insert endpoints here */}
    </div>
  );
}

export default Dashboard;