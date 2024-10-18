import BiddoutsButton from "./BidDbuttons"
export default function Completed({ id, title, price, noButton = false }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
            <p className="text-gray-700">${price}</p>
            {
                !noButton && <BiddoutsButton id={id} />
            }
        </div>
    )
}