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
      alert("Пользователь с такой почтой уже существует")
    }

    const data = await response.json();


    setValidated(true);
    setPassword('');
    setConfirmPassword('');
    setPasswordsMatch(true);
    window.location.reload();
  } catch (error) {
    setValidated(true);
    setPasswordsMatch(false);
    window.location.reload();
  }
}
export default registrationApi