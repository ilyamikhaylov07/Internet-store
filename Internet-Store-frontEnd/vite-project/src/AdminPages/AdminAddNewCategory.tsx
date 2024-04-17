import { Button, FloatingLabel, Form } from "react-bootstrap";
import AdminDashboard from "../AdminDashboard";
import { useState } from "react";
import axios from "axios";

function AdminAddNewCategoryPage() {

    const [selectedTab, setSelectedTab] = useState(null); // Управление выбранной вкладкой

    const [formData, setFormData] = useState({
        title: '',  // Начальное значение для одной пары размера и количества
    });

    const SaveHandler = async (event: any) => {
        const token = localStorage.getItem('accessToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        event.preventDefault();
        try {
            // Отправка данных на сервер
            const response = await axios.post('https://localhost:7239/Internetstore/Admin/AddCategory', formData, { headers });
            console.log('Ответ от сервера:', response.data);
            // Очистка формы после успешной отправки
            setFormData({
                title: formData.title,
            })
            location.reload();
        } catch (error) {
            alert('Ошибка при отправке данных:')
            console.error('Ошибка при отправке данных:', error);
        }
    };


    return (
        <>
            <AdminDashboard selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div style={{ marginTop: '100px', marginLeft: '500px', maxWidth: '800px', justifyContent: 'center', alignItems: 'center' }}>

                <h1>Добавление новой категории товара</h1>
                <Form onSubmit={SaveHandler}>
                    <FloatingLabel controlId="Title" label="Название категории" className="mb-3">
                        <Form.Control
                            style={{ width: '100%' }}
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                        />
                    </FloatingLabel>


                    <Button type="submit" style={{ marginLeft: '700px' }} onClick={SaveHandler}>
                        Сохранить
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default AdminAddNewCategoryPage;