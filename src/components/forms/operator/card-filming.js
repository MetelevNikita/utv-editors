import './filming.css'


const CardFilming = (props) => {


  return(
    <li className="card-filming-container">
      <div className="card-filming-date">{props.date}</div>
        <div className="card-filming-box">

          <div className="card-filming-title">{props.title}</div>

          <div className="card-filming-author">{props.author}</div>

          <div className="card-filming-place">{props.place}</div>

          <div className="card-filming-conditions">{props.conditions}</div>

          <div className='card-filming-time'>{props.time}</div>

          <div className="card-filming-user">{props.user}</div>


        </div>
    </li>
  )
}

export default CardFilming