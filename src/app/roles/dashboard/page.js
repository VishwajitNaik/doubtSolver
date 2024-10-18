'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doubt, setDoubt] = useState({
    title: '',
    type: '',
    description: '',
    image: '',
    video: '',
    bidRange: '',
  });

  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/home/login');
    } catch (error) {
      console.log("Logout failed: ", error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me');
      setData(res.data.data._id);
    } catch (error) {
      console.log("Failed to fetch user details: ", error.message);
    }
  };

  const handleAddDoubt = async () => {
    try {
      // Check if required fields are filled
      setLoading(true);
      const res = await axios.post('/api/users/doubts', doubt);
      console.log("Doubt created successfully: ", res.data.data);
      router.push("/roles/dashboard/asked-doubts")
      setIsModalOpen(false);
      // Add logic to refresh the doubts list if necessary
    } catch (error) {
      console.log("Add doubt failed: ", error.message);
    }
  };

  const solutionTypes = ['Live', 'Recorded', 'Image']; // Define your options here

  return (
    <>
      <nav className="bg-blue-500 text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/roles/dashboard/asked-doubts" className="hover:underline">
              Asked Doubts
            </Link>
          </li>
          <li>
            <Link href="/roles/dashboard/completed-doubts" className="hover:underline">
              Completed Doubts
            </Link>
          </li>
          <li>
            <Link href="/roles/dashboard/pending-doubts" className="hover:underline">
              Pending Doubts
            </Link>
          </li>
          <li>
            <Link href="/roles/dashboard/bid-doubts" className="hover:underline">
              Bid Doubts
            </Link>
          </li>
          <li>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md">
              Add New Doubt
            </button>
          </li>
          <li>
            <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md">
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <div>
        <h2 className=' bg-green-300 text-black p-3 rounded-md'>
          {data === 'nothing' ? "Nothing" : <Link href={`/roles/dashboard/asked-doubts/${data}`} className='text-black'>{data}</Link>}
        </h2>
        <button onClick={getUserDetails} className="bg-green-500 hover:bg-blue-700 text-white font-bold rounded-md">
          Get User Details
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-xl text-black text-center font-bold mb-4">Add New Doubt</h2>
            <input
              className="p-2 text-black border border-gray-300 rounded-lg mb-4 w-full outline-none"
              type="text"
              placeholder="Title"
              value={doubt.title}
              onChange={(e) => setDoubt({ ...doubt, title: e.target.value })}
            />
            <select
              className="text-gray-400 p-2 border border-gray-300 rounded-lg mb-4 w-full"
              value={doubt.type}
              onChange={(e) => setDoubt({ ...doubt, type: e.target.value })}
            >
              <option value="" disabled>Solution Type</option>
              {solutionTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <textarea
              className="p-2 border text-black border-gray-300 rounded-lg mb-4 w-full"
              placeholder="Description"
              value={doubt.description}
              onChange={(e) => setDoubt({ ...doubt, description: e.target.value })}
            ></textarea>
            <label className="block mb-2 text-gray-600" htmlFor="imageUpload">
              Select doubt image (Optional)
            </label>
            <input
              placeholder='select doubt image if any'
              className="p-2 border border-gray-300 rounded-lg mb-4 w-full"
              type="file"
              accept="image/*"
              onChange={(e) => setDoubt({ ...doubt, image: e.target.files[0] })}
            />
            <div className="mb-4">
              <label htmlFor="video" className="block font-medium text-gray-500 mb-1">
                Add short video (Optional)
              </label>
              <input
                id="video"
                className="p-2 border border-gray-300 rounded-lg w-full"
                type="file"
                accept="video/*"
                onChange={(e) => setDoubt({ ...doubt, video: e.target.files[0] })}
              />
            </div>

            <input
              className="p-2 border text-black border-gray-300 rounded-lg mb-4 w-full"
              type="text"
              placeholder="Enter bid range (₹)"
              value={doubt.bidRange}
              onChange={(e) => setDoubt({ ...doubt, bidRange: e.target.value })}
            />

            <button onClick={handleAddDoubt} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
            <button onClick={() => setIsModalOpen(false)} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
