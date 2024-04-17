import { Form, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import CategoryFilterForm from './CategoryFIlterForm';
import {add} from './redux/IdModelSlice';
import { useAppDispatch } from './redux/Hooks';

 function FilteredPage() {
    const navigate = useNavigate(); 
    const location = useLocation();
    interface Product {
        name: string;
        price: string;
        image: string;
        sizes: string[];
        id:string;
    }
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});
    const dispatch=useAppDispatch();
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        let category = query.get('category');
        const minPrice = query.get('minPrice');
        const maxPrice = query.get('maxPrice');
        if(category=="Все категории"){
            category=null;
        }
        
        const requestData = {
            categorie: category,
            from: minPrice || 0,
            to: maxPrice || 100000
        };
        console.log(requestData);
        fetch('https://localhost:7239/Internetstore/Models/CardsWithFilter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
        })
        .then(response => response.json(),)
        .then(data => setProducts(data))
        .catch(error => {
        console.error('Error fetching filtered products:', error);
        });
        }, []);
        const handleSizeSelection = (productIndex: number, size: string) => {
            setSelectedSizes((prevSelectedSizes) => ({
                ...prevSelectedSizes,
                [productIndex]: size
            }));
        };
        
    return (
        <Row className="mt-5 justify-content-center my-2 gx-4" style={{marginLeft:'119px'}}>
            <Col xs={12} md={3} lg={2}>
                <CategoryFilterForm />
            </Col>
            <Col xs={12} md={10} lg={10} style={{paddingLeft:"60px"}}>
                <Row className="gy-4" style={{ gap: '10px' }}>
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
                                    <Button variant="primary" onClick={()=>{if(selectedSizes[index]!=null) dispatch(add([product.id,selectedSizes[index]])) }}>Добавить в корзину</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
}

export default FilteredPage;