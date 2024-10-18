'use client'

import { useRouter } from "next/navigation"

export default function ProductButton({id}){
    
const router = useRouter()

    function handleClick(){
        router.push(`/roles/dashboard/asked-doubts/${id}`)
    }

    return(
        <button onClick={handleClick} className="text-black bg-slate-400">
            see details
        </button>
    )
}