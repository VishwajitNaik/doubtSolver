// pages/role-selection.js
import Link from 'next/link';


export default function RoleSelection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className=" text-black text-3xl font-bold mb-8">Choose Your Role</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/roles/dashboard">
          <div className="text-black block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 cursor-pointer">
            <h2 className="text-2xl font-bold mb-2">Doubt Post User</h2>
            <p>Post your doubts and get solutions from experts.</p>
          </div>
        </Link>
        <Link href="/roles/resolver">
          <div className="text-black block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 cursor-pointer">
            <h2 className="text-2xl font-bold mb-2">Doubt Solver User</h2>
            <p>Pick doubts and solve them for a fee.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
