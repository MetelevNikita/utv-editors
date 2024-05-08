import './MyTime.css'

const MyTime = (props) => {

  return(
    <div>

        <div className="form-time-title">{props.title}</div>
        <input defaultValue className="form-time-input" type="time" {...props}/>

    </div>

  )
}

export default MyTime