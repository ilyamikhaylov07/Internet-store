import { Button, FloatingLabel, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./redux/Hooks";
import { useNavigate } from "react-router-dom";
import { clearstorage } from "./redux/IdModelSlice";

function Order() {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const navigate = useNavigate();
    const dispatch=useAppDispatch();
    // Определение интерфейса OrderData
    interface OrderData {
        city: string;
        street: string;
        house: string;
        index: string;
        price: number;
        idies: string[];
        sizes: string[];
    }

    // Получение данных из Redux хранилища
    const IdSize = useAppSelector((state) => state.reducer.IdModelContainer.IdContainer);
    let idies: string[] = [];
    let sizes: string[] = [];
    IdSize.forEach(element => {
        idies.push(element[0]);
        sizes.push(element[1]);
    });
    

    // Обработчик выбора метода оплаты
    const handlePaymentSelection = (method) => {
        setPaymentMethod(method);
    };

    // Вычисление суммы заказа
    const query = new URLSearchParams(location.search);
    let sum = query.get('sum');
    let sumdil = 1000;
    if (typeof sum === 'string') {
        sumdil += parseInt(sum);
    }
    const [formData, setFormData] = useState<OrderData>({
        city: '',
        street: '',
        house: '',
        index: '',
        price: sumdil, // Здесь будет установлена сумма заказа
        idies: idies,
        sizes: sizes,
    });

    // Функция для отправки данных на сервер
    const ApllyForm = async () => {
        console.log(formData)
        try {
            const token=localStorage.getItem('accessToken');
            const headers={'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`};
            const response = await axios.post('https://localhost:7239/Internetstore/Models/MakeOrder', formData,{headers});
            alert(response.data)
            dispatch(clearstorage())
            navigate("/profile");

        } catch (error) {
            console.error('Error making order:', error);
        }
    };

    return (
        <div style={{ marginTop: '100px', marginLeft: '500px', maxWidth: '800px', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Оформление заказа</h1>
            <Form style={{ marginTop: "20px" }}>
                <FloatingLabel controlId="City" label="Город доставки" className="mb-3">
                    <Form.Control
                        required
                        style={{ width: '100%' }}
                        type="text"
                        name="City"
                        value={formData.city}
                        onChange={(event) => setFormData({ ...formData, city: event.target.value })}
                        
                    />
                </FloatingLabel>
                <FloatingLabel controlId="Street" label="Улица доставка" className="mb-3">
                    <Form.Control
                        required
                        style={{ width: '100%' }}
                        type="text"
                        name="Street"
                        value={formData.street}
                        onChange={(event) => setFormData({ ...formData, street: event.target.value })}
                    />
                </FloatingLabel>
                <FloatingLabel controlId="House" label="Дом" className="mb-3">
                    <Form.Control
                        required
                        style={{ width: '100%' }}
                        type="text"
                        name="House"
                        value={formData.house}
                        onChange={(event) => setFormData({ ...formData, house: event.target.value })}
                    />
                </FloatingLabel>
                <FloatingLabel controlId="Index" label="Индекс" className="mb-3">
                    <Form.Control
                        required
                        style={{ width: '100%' }}
                        type="text"
                        name="Index"
                        value={formData.index}
                        onChange={(event) => setFormData({ ...formData, index: event.target.value })}
                    />
                </FloatingLabel>
                <FloatingLabel controlId="PriceND" label="Сумма заказа" className="mb-3">
                    <Form.Control
                        required
                        style={{ width: '100%' }}
                        type="text"
                        name="PriceND"
                        disabled
                        value={`${sum} руб.`}
                    />
                </FloatingLabel>
                <FloatingLabel controlId="DPrice" label="Доставка" className="mb-3">
                    <Form.Control
                        required
                        style={{ width: '100%' }}
                        type="text"
                        name="DPrice"
                        disabled
                        value={`1000 руб.`}
                    />
                </FloatingLabel>
                <strong>
                    <FloatingLabel controlId="Price" label="Итого" className="mb-3">
                        <Form.Control
                            required
                            style={{ width: '100%' }}
                            type="text"
                            name="Price"
                            disabled
                            value={`${sumdil} руб.`}
                        />
                    </FloatingLabel>
                </strong>
                <p>Способы оплаты:</p>
                <Button
                    variant={paymentMethod === 'cash' ? 'primary' : 'outline-primary'}
                    onClick={() => handlePaymentSelection('cash')}
                    style={{ marginRight: '10px' }}
                    active
                >
                    Наличные
                </Button>
                <Button
                    variant={paymentMethod === 'card' ? 'primary' : 'outline-primary'}
                    onClick={() => handlePaymentSelection('card')}
                >
                    Банковской картой
                </Button>
                <br />
                <Button variant="primary" style={{ marginTop: '20px', width: '200px', height: '50px', fontSize: '1.2rem' }} onClick={()=>{ApllyForm()}}>
                    Оформить
                </Button>
            </Form>
        </div>
    );
}

export default Order;
