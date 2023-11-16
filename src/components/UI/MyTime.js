import './MyTime.css'

const MyTime = (props) => {

  return(
    <div className="form-time-box">


        <div className="form-time-title">{props.title}</div>
        <input className="form-time-input" type="time" {...props}/>

    </div>

  )
}

export default MyTime