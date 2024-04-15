import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

interface ModelData {
    name: string;
    price: string;
    category: string;
    image: string;
    colour: string;
    brand: string;
    materials: string;
    sizes: string[];
}

function ModelPage() {
    const [modelData, setModelData] = useState<ModelData | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const modelName = query.get('id');

        // POST-запрос к API
        fetch(`https://localhost:7239/Internetstore/Models/GetModelInfo?id=${modelName}`, {
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
    }, [location.search]);

    if (!modelData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '10px' }}>
            <Row>
                {/* Изображение продукта */}
                <Col md={6} lg={6} style={{ padding: '5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* Уменьшите изображение */}
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
                        {/* Увеличьте размер шрифта */}
                        <h2 style={{ fontSize: '2rem', margin: '0' }}>{modelData.name}</h2>
                        <h3 style={{ fontSize: '2rem', margin: '0' }}>Категория: {modelData.category}</h3>
                        <p style={{ fontSize: '1.5rem', margin: '10px 0' }}>Цена: {modelData.price}</p>
                        <p style={{ fontSize: '1.5rem', margin: '10px 0' }}>Цвет: {modelData.colour}</p>
                        <p style={{ fontSize: '1.5rem', margin: '10px 0' }}>Материалы: {modelData.materials}</p>
                        <p style={{ fontSize: '1.5rem', margin: '10px 0' }}>Бренд: {modelData.brand}</p>

                        {/* Кнопки размеров */}
                        <div style={{ marginBottom: '10px' }}>
                            <ButtonGroup>
                                {modelData.sizes.map((size) => (
                                    <Button
                                        key={size}
                                        variant={size === selectedSize ? 'primary' : 'secondary'}
                                        onClick={() => setSelectedSize(size)}
                                        style={{ marginRight: '5px' }}
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
                        >
                            Купить
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default ModelPage;
