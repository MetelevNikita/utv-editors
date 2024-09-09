import './MyTextArea.css'


const MyTextArea = (props) => {


  return(

        <div>
          <textarea className='form-area-input' value={props.insertArea} {...props}></textarea>
        </div>
  )
}

export default MyTextArea