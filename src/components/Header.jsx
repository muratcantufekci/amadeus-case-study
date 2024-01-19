import logo from '../images/logo.png'

const Header = () => {
  return (
    <div className='p-5 flex justify-between items-center'>
        <img src={logo} alt="logo" className='w-60 h-10'/>
        <div className='flex gap-2'>
            <a href='/#' className='text-base font-medium text-gray-500'>Uçuşlar</a>
        </div>
    </div>
  )
}

export default Header