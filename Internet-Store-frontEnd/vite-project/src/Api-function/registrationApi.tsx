async function registrationApi(name, email, password, setValidated, setPassword, setConfirmPassword, setPasswordsMatch) {
  const body = JSON.stringify({
    name: name,
    email: email,
    password: password
  });

  try {
    const response = await fetch('https://localhost:7239/Internetstore/Auth/Register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    });

    if (!response.ok) {
      throw new Error('Ошибка при регистрации');
    }

    const data = await response.json();


    setValidated(true);
    setPassword('');
    setConfirmPassword('');
    setPasswordsMatch(true);
    alert('Ваша учетная запись была успешно создана. Теперь вы можете войти.');
  } catch (error) {
    setValidated(true);
    setPasswordsMatch(false);
    
  }
}
export default registrationApi