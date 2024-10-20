"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';  // Make sure Axios is imported
import Product from '../../../../components/completedComp/CompltedDoubts'; // Ensure the import path is correct

export default function CompletedDoubts({ params }) {
  const [doubt, setDoubt] = useState(null);
  const router = useRouter();
  const { id } = params; // Get the id from params

  useEffect(() => {
    // Fetch the doubt details using the id
    const getDoubtDetails = async () => {
      if (!id) return;  // Avoid API call if `id` is not available
      try {
        const res = await axios.get(`/api/users/doubts/${id}`);
        setDoubt(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log("Failed to fetch doubt details: ", error.message);
      }
    };

    getDoubtDetails(); // Call the function
  }, [id]);

  // Display loading state
  if (!doubt) {
    return <p>Loading...</p>;
  }

  // Render the doubt details when data is available
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{doubt.title}</h1>
      <p className="mb-2">{doubt.description}</p>
      <p className="mb-2">Bid Range: {doubt.bidRange}</p>
      {/* Add more fields as necessary */}
    </div>
  );
}
