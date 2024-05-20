import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Card, Button, Image } from 'react-bootstrap'; // Удалены импорты Row и Col

interface Admin {
  id: number;
  name: string;
  surname: string;
  otchestvo: string;
  numberPhone: string;
  email: string;
}

function AdminProfile() {
  const history = useNavigate();
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      history('login');
      return;
    }

    fetch('https://localhost:7239/Internetstore/Admin/GetAdminInProfile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Unauthorized'); // Обработка ошибки 401 Unauthorized
        }
        return res.json();
      })
      .then(data => setAdmin(data))
      .catch(error => {
        console.error('Fetch error:', error);

      });
  }, []);

  if (!admin) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Image src="https://cdn.pixabay.com/photo/2016/10/26/22/02/dog-1772759_1280.jpg" style={{ width: '250px', height: '250px' }} roundedCircle /> {/* Изображение админа в правом верхнем углу */}
        <Button variant="primary" onClick={() => history('/admin-dashboard/add-product')}>
          Вернуться на панель администратора
        </Button>
      </div>
      <Card className="mx-auto" style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>Имя:</Card.Title>
          <Card.Text>{admin.name}</Card.Text>
        </Card.Body>
      </Card>

      <Card className="mx-auto mt-3" style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>Фамилия:</Card.Title>
          <Card.Text>{admin.surname}</Card.Text>
        </Card.Body>
      </Card>

      <Card className="mx-auto mt-3" style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>Отчество:</Card.Title>
          <Card.Text>{admin.otchestvo}</Card.Text>
        </Card.Body>
      </Card>

      <Card className="mx-auto mt-3" style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>Номер телефона:</Card.Title>
          <Card.Text>{admin.numberPhone}</Card.Text>
        </Card.Body>
      </Card>

      <Card className="mx-auto mt-3" style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>Email:</Card.Title>
          <Card.Text>{admin.email}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminProfile;