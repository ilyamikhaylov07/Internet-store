import { useState } from 'react';
import { Row, Col, Button, FloatingLabel, Form } from 'react-bootstrap';
import AdminDashboard from '../AdminDashboard';
import axios from 'axios';
function AdminAddNewModelPage() {
    const [selectedTab, setSelectedTab] = useState(null); // Управление выбранной вкладкой

    const [formData, setFormData] = useState({
        name: '',
        materials: '',
        price: '',
        colour: '',
        brand: '',
        image_url: '',
        category_id: '',
        modelWithSize: [{ size: '', amount: '' }], // Начальное значение для одной пары размера и количества
    });

    // Обработчик изменения полей ввода для размера и количества
    const handleInputChange = (index: any, event: any) => {
        const { name, value } = event.target;
        const list = [...formData.modelWithSize];
        list[index][name] = value;
        setFormData({ ...formData, modelWithSize: list });
    };

    // Добавление новой пары размера и количества
    const handleAddSizeAmountPair = () => {
        setFormData({
            ...formData,
            modelWithSize: [...formData.modelWithSize, { size: '', amount: '' }],
        });
    };

    // Удаление пары размера и количества
    const handleRemoveSizeAmountPair = (index : any) => {
        const list = [...formData.modelWithSize];
        list.splice(index, 1);
        setFormData({ ...formData, modelWithSize: list });
    };

    // Обработчик отправки формы
    const SaveHandler = async (event : any) => {
        const token = localStorage.getItem('accessToken');
        const headers ={
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        event.preventDefault();
        try {
            // Отправка данных на сервер
            const response = await axios.post('https://localhost:7239/Internetstore/Admin/AddModel', formData, {headers});
            console.log('Ответ от сервера:', response.data);
            // Очистка формы после успешной отправки
            setFormData({
                name: formData.name,
                materials: formData.materials,
                price: formData.price,
                colour: formData.colour,
                brand: formData.brand,
                image_url: formData.image_url,
                category_id: formData.category_id,
                modelWithSize: formData.modelWithSize.map(pair => ({
                size: pair.size,
                amount: pair.amount
            }))
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
            <div style={{ marginTop: '100px', marginLeft: '500px',maxWidth: '800px' , justifyContent: 'center', alignItems: 'center'}}>
                
            <h1>Добавление нового товара</h1>
            <Form onSubmit={SaveHandler}>
                <FloatingLabel controlId="Name" label="Название товара" className="mb-3">
                    <Form.Control
                        required
                        style={{ width: '100%' }}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    />
                </FloatingLabel>
                    <FloatingLabel controlId="Material" label="Материал" className="mb-3">
                        <Form.Control 
                        required
                        style={{ width: '100%' }} 
                        type="text"
                        name="material"
                        value={formData.materials}
                        onChange={(event) => setFormData({ ...formData, materials: event.target.value })}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="Price" label="Цена товара, без указания валюты" className="mb-3">
                        <Form.Control  
                        required
                        style={{ width: '100%' }}
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={(event) => setFormData({ ...formData, price: event.target.value })} />
                    </FloatingLabel>
                    <FloatingLabel controlId="Colour" label="Цвет товара" className="mb-3">
                        <Form.Control 
                        required
                        style={{ width: '100%' }} 
                        type="text"
                        name="colour"
                        value={formData.colour}
                        onChange={(event) => setFormData({ ...formData, colour: event.target.value })}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="Brand" label="Название бренда" className="mb-3">
                        <Form.Control  
                        required
                        style={{ width: '100%' }} 
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={(event) => setFormData({ ...formData, brand: event.target.value })}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="Image" label="Название картинки с указанием расширения" className="mb-3">
                        <Form.Control 
                        required
                        style={{ width: '100%' }} 
                        type="text"
                        name="image"
                        value={formData.image_url}
                        onChange={(event) => setFormData({ ...formData, image_url: event.target.value })}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="Category" label="Id категории товара" className="mb-3">
                        <Form.Control  
                        required
                        style={{ width: '100%' }} 
                        type="text"
                        name="category"
                        value={formData.category_id}
                        onChange={(event) => setFormData({ ...formData, category_id: event.target.value })}/>
                    </FloatingLabel>
                    {formData.modelWithSize.map((pair, index) => (
                    <div key={index}>
                        <FloatingLabel controlId={`Size-${index}`} label={`Размер ${index + 1}`} className="mb-3">
                            <Form.Control
                                required
                                type="text"
                                name="size"
                                value={pair.size}
                                onChange={(event) => handleInputChange(index, event)}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId={`Amount-${index}`} label={`Количество ${index + 1}`} className="mb-3">
                            <Form.Control
                                required
                                type="text"
                                name="amount"
                                value={pair.amount}
                                onChange={(event) => handleInputChange(index, event)}
                            />
                        </FloatingLabel>
                        {index > 0 && (
                            <Button variant="danger" onClick={() => handleRemoveSizeAmountPair(index)}>
                                Удалить
                            </Button>
                        )}
                    </div>
                ))}
                <Button variant="primary" onClick={handleAddSizeAmountPair}>
                    Добавить размер и количество
                </Button>

                <Button type="submit" style={{marginLeft: '440px'}} onClick={SaveHandler}>
                    Сохранить
                </Button>
            </Form>
        </div>
        </>
    );
}

export default AdminAddNewModelPage;