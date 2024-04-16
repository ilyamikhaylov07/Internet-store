import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function CategoryFilterForm() {
    const categories = [
        'Верхняя одежда',
        'Брюки',
        'Обувь',
        'Джинсы',
        'Футболки',
        'Рубашки'
    ];
    const navigate = useNavigate();

    // Состояния для отслеживания выбранной категории и диапазона цен
    const [selectedCategory, setSelectedCategory] = useState('Все категории');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);

    // Обработчики изменения выбранной категории
    const handleCategorySelection = (category) => {
        setSelectedCategory(category);
        
    };

    // Обработчики изменения минимальной и максимальной цены
    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
    };

    // Обработчик применения фильтра
    const applyFilter = () => {
        
        const query = new URLSearchParams({
            category: selectedCategory,
            minPrice: minPrice.toString(),
            maxPrice:maxPrice.toString()
        }).toString();;
        
        navigate(`/catalog/filtered?${query}`);
        location.reload();
        
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '250px', marginRight: '20px' }}>
            <ListGroup>
                <ListGroup.Item
                    action
                    active={selectedCategory === 'Все категории'}
                    onClick={() => handleCategorySelection('Все категории')}
                >
                    Все категории
                </ListGroup.Item>
                {categories.map((category, index) => (
                    <ListGroup.Item
                        key={index}
                        action
                        active={selectedCategory === category}
                        onClick={() => handleCategorySelection(category)}
                    >
                        {category}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Form className="mt-4">
                <Form.Group controlId="formMinPrice">
                    <Form.Label>Цена от</Form.Label>
                    <Form.Control
                        type="number"
                        min={0}
                        value={minPrice}
                        onChange={handleMinPriceChange}
                    />
                </Form.Group>
                <Form.Group controlId="formMaxPrice" className="mt-2">
                    <Form.Label>Цена до</Form.Label>
                    <Form.Control
                        type="number"
                        max={100000}
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                    />
                </Form.Group>
                <Button variant="primary" className="mt-3" onClick={applyFilter}>
                    Применить
                </Button>
            </Form>
        </div>
    );
}

export default CategoryFilterForm;
