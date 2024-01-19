import { useEffect, useState } from 'react';
import background from '../images/search-bg.webp'
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getAirports, getFlights } from '../services/Services';
import { Formik } from 'formik';
import * as Yup from 'yup'
import FlightResults from './FlightResults';
import { CircularProgress } from '@mui/material';


const Search = () => {
    const [value, setValue] = useState(dayjs());
    const [minReturnDate, setMinReturnDate] = useState(value)
    const [airports, setAirports] = useState([])
    const [returnFlights, setReturnFlights] = useState([])
    const [departureFlights, setDepartureFlights] = useState([])
    const [isOneDirection, setIsOneDirection] = useState(false)
    const [hasNoData, setHasNoData] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getAirports().then(resp => { setAirports(resp) })
    }, [])

    const filterFlights = (resp, formData) => {
        if (isOneDirection) {
            const departure = resp.filter(item => item.from === formData.from && item.to === formData.where && item.flight_day === formData.departure_date)
            setDepartureFlights(departure)

            departure.length === 0 ? setHasNoData(true) : setHasNoData(false)
            setIsLoading(false)
        } else {
            const departure = resp.filter(item => item.from === formData.from && item.to === formData.where && item.flight_day === formData.departure_date)
            const turn = resp.filter(item => item.from === formData.where && item.to === formData.from && item.flight_day === formData.return_date)
            setReturnFlights(turn)
            setDepartureFlights(departure)

            departure.length === 0 ? setHasNoData(true) : setHasNoData(false)
            setIsLoading(false)
        }
    }

    return (
        <section>
            <img src={background} alt="Search background" className='w-full' />
            <div className='py-10 px-5 flex flex-col gap-3 w-4/5 mx-auto relative bg-white -top-14 shadow-xl rounded-md'>
                <div className='flex items-center gap-5'>
                    <div className='flex items-center gap-2'>
                        <input type="radio" name='route' defaultChecked onClick={() => setIsOneDirection(false)} />
                        <span>Gidiş-Dönüş</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="radio" name='route' onClick={() => setIsOneDirection(true)} />
                        <span>Tek Yön</span>
                    </div>
                </div>
                <Formik
                    initialValues={{ from: "", where: "" }}
                    validationSchema={Yup.object({
                        from: Yup.string().required("Bu alan boş bırakılamaz"),
                        where: Yup.string().required("Bu alan boş bırakılamaz"),
                    })}
                    onSubmit={(values) => {
                        setIsLoading(true)
                        const formData = {
                            from: localStorage.getItem('from'),
                            where: localStorage.getItem('where'),
                            departure_date: dayjs(minReturnDate).format('MM/DD/YYYY'),
                            return_date: isOneDirection ? null : dayjs(value).format('MM/DD/YYYY')
                        }
                        getFlights().then(resp => filterFlights(resp, formData))
                    }}
                >
                    {({ handleSubmit, handleChange, errors, touched }) => (
                        <form onSubmit={handleSubmit} className='flex flex-col gap-2 justify-between xl:flex-row'>
                            <CustomInput placeholder="Nereden" data={airports} name="from" onChange={handleChange} errors={errors.from} touched={touched.from} />
                            <CustomInput placeholder="Nereye" data={airports} name="where" onChange={handleChange} errors={errors.where} touched={touched.where} />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker label="Gidiş Tarihi" defaultValue={dayjs()} onChange={(newValue) => setMinReturnDate(newValue)} disablePast className='flex-auto' />
                                    <DatePicker label="Dönüş Tarihi" value={value} onChange={(newValue) => setValue(newValue)} disablePast minDate={minReturnDate} className={`flex-auto ${isOneDirection ? '!hidden' : 'block'}`} />
                                </DemoContainer>
                            </LocalizationProvider>
                            <CustomButton>Uçuş Ara</CustomButton>
                        </form>
                    )}

                </Formik>
            </div>
            {
                departureFlights.length > 0 &&
                <FlightResults departureFlights={departureFlights} isOneDirection={isOneDirection} returnFlights={returnFlights} />
            }
            {
                hasNoData &&
                <h4 className="text-center mb-4 font-extrabold">Uygun Uçuş bulunamadı...</h4>
            }
            {
                isLoading &&
                <div className='flex items-center justify-center fixed top-0 left-0 w-full h-full bg-gray-300/[.60] z-10'>
                    <CircularProgress />
                </div>
            }
        </section>
    )
}

export default Search