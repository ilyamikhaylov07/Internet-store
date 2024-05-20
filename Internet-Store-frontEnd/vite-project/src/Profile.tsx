import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';

interface User {
  name: string;
  numberPhone: string;
  email: string;
}

interface Model {
  modelName: string;
  modelSize: string;
  modelColor: string;
  modelPrice: string;
  modelImageUrl: string;
}

interface Order {
  price: number;
  priceWithDelivery: number;
  city: string;
  street: string;
  house: string;
  index: string;
  state: string;
  models: Model[];
}

function Profile() {
  const history = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]); // хук для вытягивания заказов, типизированый интерфейсом
  const [user, setUser] = useState<User | null>(null); // хук для вытягивания user, типизированый интерфейсом
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false); // Хук для изменения состояний
  const [phoneNumber, setPhoneNumber] = useState('');// хук для изменения номера телефона

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      history('login');
      return;
    }

    fetch('https://localhost:7239/Internetstore/Profile/GetUserInProfile', { // Получения данных user для личного кабинета
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(data => {
        setUser(data);
        setPhoneNumber(data.numberPhone);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });

    fetch('https://localhost:7239/Internetstore/Profile/GetOrdersUser', { // Получение заказов данного user
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setOrders)
      .catch(error => {
        console.error('Fetch orders error:', error);
      });
  }, []);

  const SaveNumberSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) {
      history('login');
      return;
    }

    fetch(`https://localhost:7239/Internetstore/Profile/UpdateNumberPhoneUser?numberphone=${phoneNumber}`, { // Изменение номера телефона
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ numberphone: phoneNumber })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update number phone');
        }
        setIsEditingPhoneNumber(false);
      })
      .catch(error => {
        console.error('Update number phone error:', error);
      });
    location.reload();
  };

  if (!user) {
    return <div style={{paddingBlock:'500px'}}>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={9}>
          <Card className="mx-auto" style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>Имя:</Card.Title>
              <Card.Text>{user.name}</Card.Text>
            </Card.Body>
          </Card>
          <Card className="mx-auto mt-3" style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>Номер телефона:</Card.Title>
              {isEditingPhoneNumber ? (
                <Form onSubmit={SaveNumberSubmit}>
                  <Form.Control
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                  <Button variant="primary" type="submit">Сохранить</Button>
                  <Button variant="secondary" onClick={() => setIsEditingPhoneNumber(false)}>Отмена</Button>
                </Form>
              ) : (
                <Row>
                  <Col xs={8}>
                    <Card.Text>{user.numberPhone}</Card.Text>
                  </Col>
                  <Col xs={4}>
                    <Button variant="primary" className="float-end" onClick={() => setIsEditingPhoneNumber(true)}>Изменить</Button>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
          <Card className="mx-auto mt-3" style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>Email:</Card.Title>
              <Card.Text>{user.email}</Card.Text>
            </Card.Body>
          </Card>
          {orders.length > 0 && (
            <div>
              <h2 style={{paddingTop: '100px'}}>Ваши заказы:</h2>
              {orders.map((order, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <Card.Title>Заказ №{index + 1}</Card.Title>
                    <Row>
                      <Col md={8}>
                        <Card.Text><strong>Цена: </strong>{order.price} руб.</Card.Text>
                        <Card.Text><strong>Цена с доставкой: </strong> {order.priceWithDelivery} руб.</Card.Text>
                        <Card.Text><strong>Город: </strong>{order.city}</Card.Text>
                        <Card.Text><strong>Индекс: </strong>{order.index}</Card.Text>
                        <Card.Text><strong>Статус заказа: </strong>{order.state}</Card.Text>
                      </Col>
                      
                    </Row>
                    <h5 style={{paddingTop:'50px'}}>Модели:</h5>
                    {order.models.map((model, modelIndex) => (
                      <Row key={modelIndex} className="mb-3">
                        <Col md={8}>
                          <p><strong>Наименование:</strong> {model.modelName}</p>
                          <p><strong>Размер: </strong>{model.modelSize}</p>
                          <p><strong>Цвет: </strong>{model.modelColor}</p>
                        </Col>
                        <Col md={4}>
                          <Image src={`data:image/jpeg;base64,${model.modelImageUrl}`} thumbnail style={{ height: '100px' }} />
                        </Col>
                      </Row>
                    ))}

                    
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Col>
        <Col xs={3} className="d-flex justify-content-end">
          <Image src="https://cdn.pixabay.com/photo/2016/10/26/22/02/dog-1772759_1280.jpg" style={{ width: '250px', height: '250px' }} roundedCircle />
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
