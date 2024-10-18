'use client'
import { useParams } from 'next/navigation'; // Import useParams for accessing route parameters
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SingleDoubt() {
  const { id } = useParams(); // Extract id (doubtId) from the URL
  const [doubt, setDoubt] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (id) {
      async function fetchDoubt() {
        try {
          const res = await axios.get(`/api/users/userdoubts/${id}`);
          setDoubt(res.data.data);
          console.log(res.data.data);
          setLoading(false);
        } catch (error) {
          console.log("Failed to fetch doubt: ", error.message);
          setLoading(false);
        }
      }

      fetchDoubt();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!doubt) {
    return <p>Doubt not found.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{doubt.title}</h1>
      <p>{doubt.description}</p>
      <p>Type: {doubt.type}</p>
      <p>Bid Range: {doubt.bidRange}</p>
      <h1>hello</h1>
      {/* Add more fields as necessary */}
    </div>
  );
}
