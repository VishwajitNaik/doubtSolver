import BidDouts from '../../../../components/bidDouts/BidDoubts'; // Ensure the import path is correct

export async function generateStaticParams() {
  const res = await fetch('https://dummyjson.com/products?limit=5&skip=10&select=title,price');
  const data = await res.json();

  return data.products.map((product) => ({
    id: product.id.toString(),
  }));
}

async function getBids(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  return data;
}

export default async function BidDoubts({ params }) {
  const product = await getBids(params.id);
  
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Bid Doubts</h1>
      <BidDouts noButton title={product.title} price={product.price} />
    </>
  );
}
