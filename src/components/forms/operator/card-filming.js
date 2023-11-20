// css

import './filming.css'

//

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'



const CardFilming = (props) => {


  const [cardList, setCardList] = useState('')

  const params = useParams()
  const id = params.id

  console.log(id)


  return(
    <li className="card-filming-container">
      <div className="card-filming-date">{props.date}</div>
        <div className="card-filming-box">

          <div className="card-filming-title">{props.title}</div>
          <div className="card-filming-author">{props.author}</div>
          <div className="card-filming-place">{props.place}</div>
          <div className="card-filming-conditions">{props.conditions}</div>
          <div className='card-filming-time'>{props.time}</div>

          <hr></hr>

          <div className="card-filming-user">{props.user}</div>


        </div>
    </li>
  )
}

export default CardFilming