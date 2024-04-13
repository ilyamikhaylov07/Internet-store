import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

function CategoryFilterForm({ onPriceChange }) {
    const categories = [
        "Верхняя одежда",
        "Брюки",
        "Обувь",
        "Джинсы",
        "Футболки",
        "Рубашки"
    ];

    const handlePriceChange = (e) => {
        onPriceChange(e.target.value);
    };

    return (
        <div>
            <ListGroup>
                <ListGroup.Item action active>Все категории</ListGroup.Item>
                {categories.map((category, index) => (
                    <ListGroup.Item key={index} action>{category}</ListGroup.Item>
                ))}
            </ListGroup>
            <Form className="mt-4">
                <Form.Group controlId="formPriceFilter">
                    <Form.Label>Фильтр по цене</Form.Label>
                    <Form.Control type="range" min={0} max={1000} onChange={handlePriceChange} />
                </Form.Group>
            </Form>
        </div>
    );
}

export default CategoryFilterForm;