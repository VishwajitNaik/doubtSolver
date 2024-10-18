import Link from 'next/link';

export default function Product({ id, title, price, description }) {
  return (
    <div className="border p-4 rounded">
      <h2 className="text-lg font-bold">{title}</h2>
      <p>{description}</p>
      <p>Bid Range: {price}</p>
      <Link href={`/roles/dashboard/asked-doubts/${id}`}>
        See details
      </Link>
    </div>
  );
}

  