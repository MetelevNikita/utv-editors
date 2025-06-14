export const getYGCompany = async (index) => {
    try {

        const responce = await fetch(process.env.REACT_APP_YG_COMPANY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                login: process.env.REACT_APP_YG_LOGIN,
                password: process.env.REACT_APP_YG_PASSWORD
            })
        })


        if (!responce.ok) {
            throw new Error(`Ошибка получение комании Yougile ${responce.status}`);
        }

        const data = await responce.json();
        console.log(data.content[index].name);
        return data.content[index].id;

        
    } catch (error) {
        console.log(error, {status: 500});
    }
}