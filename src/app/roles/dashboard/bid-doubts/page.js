import Bids from "../../../components/bidDouts/BidDoubts"

async function getBids(){
  const res = await fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
  const data = await res.json();
  return data.products
}

export default async function BidDoubts() {
const bidDoubts = await getBids();
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Bid Doubts</h1>
      {bidDoubts.length === 0 ? (
        <p>No completed doubts yet.</p>
      ):(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bidDoubts.map((doubts)=>(
              <Bids key = {doubts.id} id = {doubts.id} title = {doubts.title} price={doubts.price} />
            ))}
        </div>
      )}
    </>
  );
}
