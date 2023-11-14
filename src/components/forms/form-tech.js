import { useEffect } from 'react'


const FormTech = () => {





  const fetchIdKey = () => {
    fetch('https://yougile.com/api-v2/auth/companies', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({login: 'Kyle.B@mail.ru', password: 'Metelev1989'})
    }).then(responce => responce.json())
      .then(data => {
        console.log(data.content)
        return fetch('https://yougile.com/api-v2/auth/keys/get', {
            method: 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({login: 'Kyle.B@mail.ru', password: 'Metelev1989', companyId: data.content[0].id})
          })
        }).then(responce => responce.json())
          .then(data => {
            console.log(data)
            return localStorage.setItem('keyTech', data[0].key)
          })

  }



  













  useEffect(() => {

    // fetchIdKey()
  }, [])


  const keyTech = localStorage.getItem('keyTech')
  console.log(keyTech)





  return(

    <>

        <div>ТЕХНИЧЕСКИЙ</div>



    </>

  )
}


export default FormTech


