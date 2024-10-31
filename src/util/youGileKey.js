export const YouGileAuth = async (name) => {


  try {

    const responceId = await fetch('https://yougile.com/api-v2/auth/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({login: process.env.REACT_APP_YOUGILE_LOGIN, password: process.env.REACT_APP_YOUGILE_PASSWORD})
    })

    const dataId = await responceId.json()

    const newArray = dataId.content.filter((item) => {
      return name === item.name
    })

    // key

    const responceKey = await fetch('https://yougile.com/api-v2/auth/keys/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({login: process.env.REACT_APP_YOUGILE_LOGIN, password: process.env.REACT_APP_YOUGILE_PASSWORD, companyId: newArray[0].id})
    })

      const dataKey = await responceKey.json()
      return dataKey[0].key



  } catch (error) {
    console.error(`ОШИБКА Получения ключа YouGile - ${error}`)
  }
}
