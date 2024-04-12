import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface Product {
    name: string;
    price: string;
    image: string;
}

function CatalogPage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('https://localhost:7239/Internetstore/Models/ModelWithCatalog')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <Row className="mt-5 justify-content-center my-2 gx-1">
            {products.map((product, index) => (
                <Col key={index} xs={12} md={6} lg={4} xl={2}>
                    <div style={{ textDecoration: 'none' }}>
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
                                <Button variant="primary">Купить</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            ))}
        </Row>
    );
}

export default CatalogPage;