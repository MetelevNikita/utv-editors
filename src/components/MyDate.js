import './MyDate.css'

const MyDate = (props) => {


  return(
    <div className="form-date-box">
      <div className='form-text'>{props.date}</div>
      <input className='form-date' type="date" name="date" id="date" value={props.insertDate} {...props}/>
    </div>
  )
}


export default MyDate