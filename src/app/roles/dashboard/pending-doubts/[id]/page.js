import Product from "../../../../components/pendingdoubts/PendingDoubts"

export async function generateStaticParams() {
    const res = await fetch('https://dummyjson.com/products?limit=5&skip=10&select=title,price')
    const data = await res.json();
    
    return data.products.map((product) =>({
        id: product.id.toString()
    }))
}

async function getPending(id) {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    const data = await res.json();
    return data;
}

export default async function PendingDoubt({params}){
    const product = await getPending(params.id)

    return (
        <>
            <h1>Pending Doubts</h1>
            <Product noButton title={product.title} price={product.price} />
        </>
    )
}