import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { add } from './redux/IdModelSlice';
import { useAppDispatch } from './redux/Hooks';
import { Card, FloatingLabel, Form } from 'react-bootstrap';
import axios from 'axios';

interface ModelData {
    id: string;
    name: string;
    price: string;
    image: string;
    colour: string;
    brand: string;
    materials: string;
    sizes: string[];
}

interface Reaction {
    name: string;
    text: string;
}

function ModelPage() {
    const [modelData, setModelData] = useState<ModelData | null>(null); // хук для вытаскивания моделей типизируем интерфейсом
    const [selectedSize, setSelectedSize] = useState<string | null>(null); // хук для вытаскивания размеров моделей типизируем интерфейсом
    const [reactions, setReactions] = useState<Reaction[]>([]); // хук для вытаскивания отзывов моделей типизируем интерфейсом
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<string>('');

    useEffect(() => { // Обращаемся к серверу
        const query = new URLSearchParams(location.search);
        const modelName = query.get('id');

        // Получение данных о модели
        fetch(`https://localhost:7239/Internetstore/Models/GetModelInfo?id=${modelName}`, { // Достаём из бд ту модель которая передаётся по query
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setModelData(data);
            })
            .catch(error => {
                console.error('Error fetching model data:', error);
            });

        // Получение реакций на модель
        fetch(`https://localhost:7239/Internetstore/Models/GetReactionsForModel?modelId=${modelName}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setReactions(data);
            })
            .catch(error => {
                console.error('Error fetching reactions:', error);
            });
    }, [location.search]);

    // Обработчик выбора размера
    const handleSizeSelection = (size: string) => {
        setSelectedSize(size);
    };

    const handleLeaveReview = async () => {
        try {
            const token=localStorage.getItem('accessToken');
            const headers={'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`};
            const response = await axios.post('https://localhost:7239/Internetstore/Models/PostReaction', { // с помощью axios обновление отзыва на товар после отправки 
                text: formData,
                modelId: modelData?.id,
            },{headers});
            console.log('Review posted:', response.data);
            setFormData('');
            window.location.reload()
        } catch (error) {
            console.error('Error posting review:', error);
        }
    };

    if (!modelData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '10px' }}>
            <Row>
                {/* Изображение продукта */}
                <Col md={6} lg={6} style={{ padding: '5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            src={`data:image/jpeg;base64,${modelData.image}`}
                            rounded
                            style={{ maxWidth: '40%', height: 'auto' }}
                        />
                    </div>
                </Col>

                {/* Информация о продукте */}
                <Col md={6} lg={6} style={{ padding: '5px' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', margin: '0' }}>{modelData.name}</h2>
                        <p style={{ fontSize: '1.5rem', margin: '10px 0' }}>Цена: {modelData.price} руб.</p>
                        <p style={{ fontSize: '1.5rem', margin: '10px 0' }}>Цвет: {modelData.colour}</p>
                        <p style={{ fontSize: '1.5rem', margin: '10px 0' }}>Материалы: {modelData.materials}</p>
                        <p style={{ fontSize: '1.5rem', margin: '10px 0' }}>Бренд: {modelData.brand}</p>

                        {/* Кнопки размеров */}
                        <div style={{ marginBottom: '10px' }}>
                            <ButtonGroup>
                                {modelData.sizes.map((size) => (
                                    <Button
                                        key={size}
                                        variant={selectedSize === size ? 'primary' : 'secondary'}
                                        onClick={() => handleSizeSelection(size)}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </div>

                        {/* Кнопка "Купить" */}
                        <Button
                            variant="primary"
                            size="lg"
                            style={{ marginTop: '10px', fontSize: '1.25rem' }}
                            onClick={() => { if (selectedSize != null) dispatch(add([modelData.id, selectedSize])) }}
                        >
                            Добавить в корзину
                        </Button>
                    </div>
                </Col>
            </Row>

            
            <div style={{ maxWidth: '1000px', marginTop:"30px"}}>
                <h2 style={{ marginBottom: '10px', marginLeft:"220px"}}>Отзывы</h2>
                <h5 style={{ marginBottom: '10px', marginLeft:"220px"}}> Оставьте свой отзыв</h5>
                <FloatingLabel controlId="City" label="Ваш отзыв" className="mb-3" style={{ marginBottom: '10px', marginLeft:"220px",fontSize:"16px", height:"120px"}}>
                     <Form.Control
                        required
                        style={{ width: '100%', height:"80px",fontSize:"15px",lineClamp:"3", textWrap:"wrap"}}
                        type="text"
                        name="text"
                        value={formData}
                        onChange={(event)=>{setFormData(event.target.value)}}  
                        
                    />
                    
                    <Button
                            variant="primary"
                            size="lg"
                            style={{ marginTop: '10px', fontSize: '0.9rem' }}
                            onClick={handleLeaveReview}>
                            Оставить отзыв
                        </Button>
                </FloatingLabel>
                {reactions.map((reaction, index) => (
                    <Card key={index} style={{ marginBottom: '10px', marginLeft:"220px",height:"120px", background:"#fcf2f8", marginTop:"20px" }}>
                        <Card.Body >
                            <Card.Title style={{fontSize:"17px" }}>{reaction.name}</Card.Title>
                            <Card.Text style={{fontSize:"14px"}}>{reaction.text}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default ModelPage
