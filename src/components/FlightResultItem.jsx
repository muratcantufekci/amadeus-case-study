import { IoArrowForwardOutline } from "react-icons/io5";
const FlightResultItem = ({ airline, departureCode, from, to, arrivalCode, duration, price, departureTime }) => {
    return (
        <div className="pb-4">
            <h5 className="text-center mb-4 font-bold">{airline}</h5>
            <div className="flex gap-3 items-center justify-center">
                <div className="flex flex-col items-center">
                    <span className="font-bold text-sm">{departureCode}</span>
                    <span className="text-sm">{from}</span>
                </div>
                <IoArrowForwardOutline />
                <div className="flex flex-col items-center">
                    <span className="font-bold text-sm">{arrivalCode}</span>
                    <span className="text-sm">{to}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-sm">Uçuş Süresi</span>
                    <span className="text-sm">{duration}dk</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-sm">Kalkış Saati</span>
                    <span className="text-sm">{departureTime}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-sm">Fiyat</span>
                    <span className="text-sm">{price}TL</span>
                </div>
            </div>
        </div>
    )
}

export default FlightResultItem