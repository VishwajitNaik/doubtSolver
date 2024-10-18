"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Product from '../../../../components/completedComp/CompltedDoubts'; // Ensure the import path is correct


export default async function CompletedDoubts({ params }) {
  const [doubt, setDoubt] = useState(null);
  const router = useRouter();
  const id  = router.query;

  useEffect(() => {
    async function getDoubtDetails() {
      try {
        const res = await axios.get(`/api/users/doubts/${id}`);
        setDoubt(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log("Failed to fetch doubt details: ", error.message);
      }
    }
    if (id) {
      getDoubtDetails();
    }
  }, [id]);

  if (!doubt) {
    return <p>Loading...</p>;
  }
  return (
    <>
    <div>
      <h1 className="text-2xl font-bold mb-4">{doubt.title}</h1>
      <p className="mb-2">{doubt.description}</p>
      <p className="mb-2">Bid Range: {doubt.bidRange}</p>
      {/* Add more fields as necessary */}
    </div>
    </>
  );
}
