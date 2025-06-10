export const getYGKey = async (companyId) => {
    try {
        const responce = await fetch(process.env.REACT_APP_YG_KEY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                login: process.env.REACT_APP_YG_LOGIN,
                password: process.env.REACT_APP_YG_PASSWORD,
                companyId: companyId
            })
        })

        if (!responce.ok) {
            throw new Error(`Ошибка получения ключа YG ${responce.status}`)
        } 

        const data = await responce.json()
        return data;

    } catch (error) {
        console.log(error, {status: 500});
    }
}