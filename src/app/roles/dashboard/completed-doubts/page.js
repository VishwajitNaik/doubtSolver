import Complete from "../../../components/completedComp/CompltedDoubts"

async function getCompleted(){
  const res = await fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
  const data = await res.json();
  return data.products
}

export default async function CompletedDoubts() {
const completedDoubts = await getCompleted();
  return (

    <>
            <h1 className="text-2xl font-bold mb-4">Completed Doubts</h1>
            {completedDoubts.lenght === 0 ? (
              <p>No completed doubts yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedDoubts.map((doubts)=>(
                    <Complete key = {doubts.id} id = {doubts.id} title = {doubts.title} price={doubts.price} />
                  ))}
              </div>
            )}
      
    </>

  );
}
