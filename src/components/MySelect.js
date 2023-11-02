import './MySelect.css'

const MySelect = (props) => {


  return(
    <div className="form-select-box">
      <div className='form-text'>{props.select}</div>
      <select className="form-select" name="" id="" {...props}>{props.children}</select>
    </div>
  )
}

export default MySelect