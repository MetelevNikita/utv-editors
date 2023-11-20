import './filming.css'

//

import crossOpen from './../../../asset/cross-open.svg'


const ListFilmingDate = (props) => {


  return(
    <div className="list-filming-top" {...props}>

    <div className="list-filming-title">{props.date}</div>
    <button className='list-filming-btn'><img src={crossOpen} alt="cross-open" /></button>

    </div>

  )
}

export default ListFilmingDate