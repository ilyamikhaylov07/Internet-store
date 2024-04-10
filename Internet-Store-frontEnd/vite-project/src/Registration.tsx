import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


async function registrationApi(name, email, password, setValidated,setPassword, setConfirmPassword, setPasswordsMatch ) {
  
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

    setValidated(true);
    setPassword('');
    setConfirmPassword('');
    setPasswordsMatch(true);
    alert('Ваша учетная запись была успешно создана. Теперь вы можете войти.');
  } catch (error) {
    setValidated(true);
    setPasswordsMatch(false);
    alert(error.message);
  }
}

function Registration() {
  

  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Хук для показа пароля
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Хук подтверждения пароля
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Хук на совпадение пароля
  const [activeTab, setActiveTab] = useState('registration'); // Состояние для отслеживания текущей активной вкладки
 let password1 : any
 let email1 : any
 let name1 : any
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
   name1 = formData.get('name');
   email1 = formData.get('email');
   password1 = formData.get('password');

    if (password !== confirmPassword) {
      setValidated(true);
      setPasswordsMatch(false);
    } else {
      setValidated(true);
      setPasswordsMatch(true);
    }

    registrationApi(name1, email1, password1, setValidated, setPassword, setConfirmPassword, setPasswordsMatch);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ backgroundColor: '#e6e6e6', padding: '20px', borderRadius: '10px', maxWidth: '400px', margin: 'auto', marginTop: '120px' }}>
      <Tabs
        activeKey={activeTab}
        onSelect={handleTabChange}
        transition={false}
        id="noanim-tab-example"
        className="mb-3 justify-content-center" // Центрирование вкладок
        style={{ textAlign: 'center' }} // Выравнивание текста во вкладках по центру
      >
        <Tab eventKey="registration" title="Регистрация">
          <Form noValidate validated={validated} id = "myForm" onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  required
                  name = "name"
                  type="text"
                  placeholder="Введите ваше имя"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  name = "email"
                  type="email"
                  placeholder="Введите ваш email"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustomPassword">
                <Form.Label>Пароль</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Введите ваш пароль"
                    required
                    name = "password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    Пожалуйста, введите пароль.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustomConfirmPassword">
                <Form.Label>Подтвердите пароль</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    placeholder="Подтвердите ваш пароль"
                    required
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Пожалуйста, подтвердите пароль.
                  </Form.Control.Feedback>
                </InputGroup>
                {!passwordsMatch && (
                  <Form.Text className="text-danger">
                    Пароли не совпадают.
                  </Form.Text>
                )}
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group>
                <Form.Check
                  required
                  label="Согласие на обработку данных"
                  feedback="Вы не можете продолжить регистрацию пока не согласитесь с обработкой данных"
                  feedbackType="invalid"
                />
              </Form.Group>
            </Row>
            <Button type = "submit" >Зарегистрироваться</Button>
          </Form>
        </Tab>
        <Tab eventKey="login" title="Вход">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Введите ваш email"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustomPassword">
                <Form.Label>Пароль</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Введите ваш пароль"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    Пожалуйста, введите пароль.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group>
                <Form.Check
                  label="Администратор"
                />
              </Form.Group>
            </Row>
            <Button type="submit">Войти</Button>
          </Form>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Registration;