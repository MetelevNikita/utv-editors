import './filming.css'


const ListFilmingDate = (props) => {


  return(
    <div className="list-filming-top" {...props}>

    <div className="list-filming-title">{props.date}</div>

    </div>

  )
}

export default ListFilmingDate