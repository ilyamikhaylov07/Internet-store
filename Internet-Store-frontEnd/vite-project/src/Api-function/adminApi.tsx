async function adminApi(email, password, setValidated,setPassword) {
  
    const body = JSON.stringify({
      email: email,
      password: password
    });
  
    try {
      const response = await fetch('https://localhost:7239/Internetstore/Auth/LoginAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      });
      console.log(response.json())
      if (!response.ok) {
        throw new Error('Неверные данные админа');
      }
  
      setValidated(true);
      setPassword('');
      alert('Вы вошли как админ');
    } catch (error) {
      setValidated(true);
      alert(error.message);
    }
  }

  export default adminApi