import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Registration() {
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Хук для показа пароля
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Хук подтверждения пароля
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Хук на совпадение пароля

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || password !== confirmPassword) { // Проверка на соответсвие пароля
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      setPasswordsMatch(false);
    } else {
      setValidated(true);
      setPasswordsMatch(true);
    }
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

  return (
    <div style={{ backgroundColor: '#e6e6e6', padding: '20px', borderRadius: '10px', maxWidth: '400px', margin: 'auto', marginTop: '120px' }}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              required
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
        <Button type="submit">Зарегистрироваться</Button>
      </Form>
    </div>
  );
}

export default Registration;