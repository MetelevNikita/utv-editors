import './MyCheckBox.css'

const MyCheckBox = ({info, title, ...props}) => {
  return (

    <div className="checkbox-container">
      <span className='checkbox-title'>{title}</span>


      <div className='checkbox-box'>
        <input className="checkbox-input" {...props} type="checkbox" id="checkbox"/>
        <span className="checkbox-info">{info}</span>
      </div>

    </div>

  )
}

export default MyCheckBox
