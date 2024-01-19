const CustomButton = ({children}) => {


  return (
    <button type="submit" className="bg-sky-600 p-4 rounded-sm text-white" id="submit-btn">{children}</button>
  )
}

export default CustomButton