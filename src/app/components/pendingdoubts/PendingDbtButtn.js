'use client'

import { useRouter } from "next/navigation"

export default function PendingButton({id}){
    const router = useRouter()

    function handleClick(){
        router.push(`/roles/dashboard/pending-doubts/${id}`)
    }

    return(
        <button onClick={handleClick} className="text-black bg-slate-400">
            see details
        </button>
    )
}