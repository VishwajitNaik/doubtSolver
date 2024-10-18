import Pending from "../../../components/pendingdoubts/PendingDoubts"

async function getPending(){
  const res = await fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
  const data = await res.json();
  return data.products
}

export default async function PendingDoubts() {

  const pendingDoubts = await getPending();

  return (
    <>
        <h1 className="text-2xl font-bold mb-4">Completed Doubts</h1>
            {pendingDoubts.lenght === 0 ? (
              <p>No completed doubts yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingDoubts.map((doubts)=>(
                    <Pending key = {doubts.id} id = {doubts.id} title = {doubts.title} price={doubts.price} />
                  ))}
              </div>
            )}
    </>
  );
}
