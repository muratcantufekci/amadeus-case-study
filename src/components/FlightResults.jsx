import { useState } from "react";
import FlightResultItem from "./FlightResultItem"

const FlightResults = ({ isOneDirection, departureFlights, returnFlights }) => {
    const [sortedDepartureFlights, setSortedDepartureFlights] = useState(departureFlights)
    const [sortedReturnFlights, setSortedReturnFlights] = useState(returnFlights)
    const [isSuggestedActive, setIsSuggestedActive] = useState(true)
    const [isFlightTimeActive, setFlightTimeActive] = useState(false)
    const [isDurationActive, setIsDurationActive] = useState(false)
    const [isPriceActive, setIsPriceActive] = useState(false)

    const suggestedClickHandler = () => {
        setSortedDepartureFlights(departureFlights)
        setSortedReturnFlights(returnFlights)
        setIsSuggestedActive(true)
        setFlightTimeActive(false)
        setIsDurationActive(false)
        setIsPriceActive(false)
    }

    const flightTimeClickHandler = () => {
        const copyDepartureData = [...sortedDepartureFlights]
        const copyReturnData = [...sortedReturnFlights]
        setSortedDepartureFlights(copyDepartureData.sort((a, b) => a.flight_time - b.flight_time))
        setSortedReturnFlights(copyReturnData.sort((a, b) => a.flight_time - b.flight_time))
        setIsSuggestedActive(false)
        setFlightTimeActive(true)
        setIsDurationActive(false)
        setIsPriceActive(false)
    }

    const durationClickHandler = () => {
        const copyDepartureData = [...sortedDepartureFlights]
        const copyReturnData = [...sortedReturnFlights]
        setSortedDepartureFlights(copyDepartureData.sort((a, b) => a.flight_duration - b.flight_duration))
        setSortedReturnFlights(copyReturnData.sort((a, b) => a.flight_duration - b.flight_duration))
        setIsSuggestedActive(false)
        setFlightTimeActive(false)
        setIsDurationActive(true)
        setIsPriceActive(false)
    }

    const priceClickHandler = () => {
        const copyDepartureData = [...sortedDepartureFlights]
        const copyReturnData = [...sortedReturnFlights]
        setSortedDepartureFlights(copyDepartureData.sort((a, b) => a.price - b.price))
        setSortedReturnFlights(copyReturnData.sort((a, b) => a.price - b.price))
        setIsSuggestedActive(false)
        setFlightTimeActive(false)
        setIsDurationActive(false)
        setIsPriceActive(true)
    }

    return (
        <div className="px-2 lg:px-16">
            <div className="flex items-center justify-center gap-2 mb-4 md:gap-4">
                <span className={`p-2 border-2 text-sm border-sky-600 rounded-xl cursor-pointer font-semibold ${isSuggestedActive ? 'bg-sky-600 text-white' : ''} md:font-bold`} onClick={suggestedClickHandler}>Önerilen</span>
                <span className={`p-2 border-2 text-sm border-sky-600 rounded-xl cursor-pointer font-semibold ${isFlightTimeActive ? 'bg-sky-600 text-white' : ''} md:font-bold`} onClick={flightTimeClickHandler}>Kalkış Saati</span>
                <span className={`p-2 border-2 text-sm border-sky-600 rounded-xl cursor-pointer font-semibold ${isDurationActive ? 'bg-sky-600 text-white' : ''} md:font-bold`} onClick={durationClickHandler}>Uçuş Süresi</span>
                <span className={`p-2 border-2 text-sm border-sky-600 rounded-xl cursor-pointer font-semibold ${isPriceActive ? 'bg-sky-600 text-white' : ''} md:font-bold`} onClick={priceClickHandler}>Fiyat</span>
            </div>
            <div className={`flex flex-col p-4 mx-16 bg-white shadow-xl gap-4 border-2 justify-center xl:flex-row`}>
                <div className={` w-full xl:w-1/2 ${!isOneDirection ? 'xl:border-r-2 xl:border-black' : ''}`}>
                    <h4 className="text-center mb-4 font-extrabold">GİDİŞ</h4>
                    {
                        sortedDepartureFlights.map(item => (
                            <FlightResultItem key={item.id} airline={item.airline} arrivalCode={item.arrival_code} departureCode={item.departure_code} duration={item.flight_duration} from={item.from} to={item.to} price={item.price} departureTime={item.flight_time}/>
                        ))
                    }
                </div>
                {
                    !isOneDirection &&
                    <div className=" w-full xl:w-1/2">
                        <h4 className="text-center mb-4 font-extrabold">DÖNÜŞ</h4>
                        {
                            sortedReturnFlights.map(item => (
                                <FlightResultItem key={item.id} airline={item.airline} arrivalCode={item.arrival_code} departureCode={item.departure_code} duration={item.flight_duration} from={item.from} to={item.to} price={item.price} departureTime={item.flight_time}/>
                            ))
                        }
                    </div>

                }
            </div>
        </div>
    )
}

export default FlightResults