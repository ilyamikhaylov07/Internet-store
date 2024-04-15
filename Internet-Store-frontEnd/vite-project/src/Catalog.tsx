import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CategoryFilterForm from './CategoryFIlterForm';

interface Product {
    name: string;
    price: string;
    image: string;
    sizes: string[];
}

function CatalogPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        fetch('https://localhost:7239/Internetstore/Models/ModelWithCatalog')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const handleSizeSelection = (productIndex: number, size: string) => {
        setSelectedSizes((prevSelectedSizes) => ({
            ...prevSelectedSizes,
            [productIndex]: size
        }));
    };

    const handlePriceChange = (price: string) => {
        // Ваша логика фильтрации по цене
    };
    const handleCategoryChange = (minPrice:number,maxPrice:number) => {
        // Ваша логика фильтрации по цене
    };

    return (
        <Row className="mt-5 justify-content-center my-2 gx-4">
            {/* Форма с категориями и фильтром по цене */}
            <Col xs={12} md={3} lg={2}>
                <CategoryFilterForm onPriceChange={handlePriceChange} onCategoryChange={handleCategoryChange}/>
            </Col>

            {/* Карточки товаров */}
            <Col xs={12} md={9} lg={10}>
                <Row className="gy-4">
                    {products.map((product, index) => (
                        <Col key={index} xs={12} md={6} lg={4} xl={3}>
                            <Card
                                style={{
                                    width: '232px',
                                    height: '422px',
                                    cursor: 'pointer',
                                    transition: 'box-shadow 0.3s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                            >
                                <div style={{ maxHeight: '200px', overflow: 'hidden' }}>
                                    <Card.Img
                                        variant="top"
                                        src={`data:image/jpeg;base64,${product.image}`}
                                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>Цена: {product.price}</Card.Text>

                                    {/* Кнопки размеров */}
                                    <div style={{ marginBottom: '10px', maxWidth: '100%', overflowX: 'auto', scrollbarWidth: 'thin' }}>
                                        <ButtonGroup style={{ flexWrap: 'nowrap' }}>
                                            {product.sizes.map((size) => (
                                                <Button
                                                    key={size}
                                                    variant={selectedSizes[index] === size ? 'primary' : 'secondary'}
                                                    onClick={() => handleSizeSelection(index, size)}
                                                    style={{ marginRight: '5px' }}
                                                >
                                                    {size}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </div>

                                    {/* Кнопка "Купить" */}
                                    <Button variant="primary">Купить</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
}

export default CatalogPage;
