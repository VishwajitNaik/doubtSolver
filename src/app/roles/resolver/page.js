import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/roles/dashboard/asked-doubts" className="hover:underline">
            Asked Doubts
          </Link>
        </li>
        <li>
          <Link href="/completed-doubts" className="hover:underline">
            Completed Doubts
          </Link>
        </li>
        <li>
          <Link href="/pending-doubts" className="hover:underline">
            Pending Doubts
          </Link>
        </li>
        <li>
          <Link href="/dashboard/bid-doubts" className="hover:underline">
            Bid Doubts
          </Link>
        </li>
      </ul>
    </nav>
  );
}

