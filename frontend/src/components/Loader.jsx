import { FaSpinner } from "react-icons/fa"

const Loader = () => {
  return <>
  <FaSpinner 
  animation= 'border'
  role="status"
  style={{
    height :'100px',
    width : '100px',
    margin: 'auto',
    display : 'block',
  }}
  />
  </>

  
}

export default Loader