import './MySelect.css'
import userList from '../userList'

import Select from 'react-select'

const MySelect = (props) => {


  return(
    <div className="form-select-box">
      <div className='form-text'>{props.select}</div>
      <Select className='select' {...props}></Select>
      {/* <select className="form-select" {...props}>{props.children}</select> */}
    </div>
  )
}

export default MySelect