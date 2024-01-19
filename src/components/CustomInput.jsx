import { useRef, useState } from "react"

const CustomInput = ({ placeholder, data, name, onChange, errors, touched, }) => {
  const [departureAirport, setDepartureAirport] = useState([])
  const [isActive, setIsActive] = useState(true)
  const inputRef = useRef(null);

  const searchResultHandler = (e) => {
    inputRef.current.value = e.currentTarget.innerText
    setIsActive(false)
    localStorage.setItem(`${name}`,e.currentTarget.innerText)
  }

  const inputChangeHandler = (e) => {
    setIsActive(true)
    setDepartureAirport([])
    data.forEach(item => {
      if (e.currentTarget.value !== '' && (item.name.toUpperCase().includes(e.currentTarget.value.toUpperCase()) || item.code.toUpperCase().includes(e.currentTarget.value.toUpperCase())) ) {
        setDepartureAirport(prevState => prevState.includes(item.name) ? prevState : [...prevState, item.name])
      }
    })
  }

  return (
    <div className="w-full flex-auto relative xl:w-1/5">
      <input placeholder={placeholder} name={name} autoComplete="off" className={`bg-slate-200 py-2 px-4 text-slate-400 rounded-sm h-full w-full ${errors ? 'border-2 border-rose-600' : ''}`} onInput={inputChangeHandler} ref={inputRef} onChange={onChange} />
      {errors && touched &&
        <div className="text-rose-600">{errors}</div>
      }
      {departureAirport && departureAirport.length > 0 &&
        <div className={`absolute top-9 z-10 bg-slate-100 w-full rounded-sm shadow-xl p-2 ${isActive ? 'block' : 'hidden'} xl:top-16`}>
          {departureAirport.map((item, i) => (
            <p key={i} className="text-black font-semibold py-2 cursor-pointer border-b-2 border-black" onClick={searchResultHandler}>{item}</p>
          ))}
        </div>
      }
    </div>
  )
}

export default CustomInput