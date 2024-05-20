import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CategoryFilterForm from './CategoryFIlterForm';
import { useNavigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import {add} from './redux/IdModelSlice';
import { useAppDispatch } from './redux/Hooks';


interface Product {
    name: string;
    price: string;
    image: string;
    sizes: string[];
    id:string;
}

function CatalogPage() {

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});
    const navigate = useNavigate(); 

    const dispatch=useAppDispatch(); // react-redux - вызываем функцию dispatch, с помощью которой вызываем нужную функцию slicer и вызываем нужный нам метод, в этом случае добавление товара с размером в redux хранилище
    useEffect(() => {
        fetch('https://localhost:7239/Internetstore/Models/ModelWithCatalog')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const handleSizeSelection = (productIndex: number, size: string) => { // Функция для закрепления размера под индексом
        setSelectedSizes((prevSelectedSizes) => ({
            ...prevSelectedSizes,
            [productIndex]: size
        }));
    };

    return (
        <Row className="mt-5 justify-content-center my-2 gx-4">
            {/* Форма с категориями и фильтром по цене */}
            <Col xs={12} md={3} lg={2}>
                <CategoryFilterForm />
            </Col>

            {/* Карточки товаров */}
            <Col xs={12} md={9} lg={8} style={{paddingLeft:"40px"}}>
                <Row className="gy-4" style={{ }}>
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
                                        onClick={() => navigate(`/catalog/id?id=${product.id}`)}
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>Цена: {product.price} руб.</Card.Text>

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
                                    <Button variant="primary" onClick={()=>{if(selectedSizes[index]!=null) dispatch(add([product.id,selectedSizes[index]])) }} /*Вызов dispath при нажатии добавить в корзину */>Добавить в корзину</Button>
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
