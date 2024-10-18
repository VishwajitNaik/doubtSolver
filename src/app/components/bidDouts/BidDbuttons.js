'use client'

import { useRouter } from "next/navigation"

export default function CompletedButton({id}){
    const router = useRouter()

    function handleClick(){
        router.push(`/roles/dashboard/bid-doubts/${id}`)
    }

    return(
        <button onClick={handleClick} className="text-black bg-slate-400">
            see details 
        </button>
    )
}