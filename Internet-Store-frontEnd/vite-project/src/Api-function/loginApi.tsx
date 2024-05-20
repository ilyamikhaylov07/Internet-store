import { useAppDispatch } from "../redux/Hooks";
import { clearstorage } from "../redux/IdModelSlice";


async function loginApi(email, password, setValidated, setPassword) {
   
    const body = JSON.stringify({
        email: email,
        password: password
    });

    try {
        const response = await fetch('https://localhost:7239/Internetstore/Auth/LoginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });

        if (!response.ok) {
            throw new Error('Неверные данные');
        }

        const data = await response.json();
        // Сохраняем токен в localStorage
        localStorage.setItem('accessToken', data.accessToken);
        console.log(localStorage)
        
        setValidated(true);
        setPassword('');
        return true
    } catch (error) {
        setValidated(true);
        alert(error.message);
        return false;
    }
}

export default loginApi;