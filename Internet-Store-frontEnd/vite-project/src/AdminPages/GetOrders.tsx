import React, { useEffect, useState } from "react";
import AdminDashboard from "../AdminDashboard";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";

function GetOrdersPage() {
    const [selectedTab, setSelectedTab] = useState(null); // Управление выбранной вкладкой
    const [orders, setOrders] = useState([]);
    const [editRowId, setEditRowId] = useState(null); // Состояние для отслеживания редактируемой строки
    const [newState, setNewState] = useState(""); // Состояние для нового статуса заказа

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('https://localhost:7239/Internetstore/Admin/GetAllOrders', { // Метод получения всех заказов 
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Fetch ошибка:', error);
        }
    };

    const handleUpdateState = async (orderId : any) => {
        try {
            await axios.post(`https://localhost:7239/Internetstore/Admin/UpdateState?state=${newState}&orderId=${orderId}`, null, { // метод api для обновления статуса заказа, параметры передаются по query
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            // Обновить состояние заказов после успешного обновления
            fetchOrders();
            // Сбросить состояние редактируемой строки и нового статуса
            setEditRowId(null);
            setNewState("");
        } catch (error) {
            console.error('ошибка обновить статус:', error);
        }
    };

    return (
        <>
            <AdminDashboard selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div  className="container mt-5">
                <h1 style={{ marginTop:'100px'}}>Заказы</h1>
                <Table style={{width:'270px'}} striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Цена</th>
                            <th>Цена с доставкой</th>
                            <th>Город</th>
                            <th>Улица</th>
                            <th>Дом</th>
                            <th>Индекс</th>
                            <th>Статус</th>
                            <th>User ID</th>
                            <th>Действия</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.price}</td>
                                <td>{order.priceWithDelivery}</td>
                                <td>{order.city}</td>
                                <td>{order.street}</td>
                                <td>{order.house}</td>
                                <td>{order.index}</td>
                                <td>
                                    {editRowId === order.id ? (
                                        // Отображать поле ввода только для редактируемой строки
                                        <Form.Control
                                            type="text"
                                            value={newState}
                                            onChange={(e) => setNewState(e.target.value)}
                                            placeholder="Enter new state"
                                        />
                                    ) : (
                                        // Отображать статус заказа для всех остальных строк
                                        order.state
                                    )}
                                </td>
                                <td>{order.userId}</td>
                                <td>
                                    {editRowId === order.id ? (
                                        // Отображать кнопку "Сохранить" только для редактируемой строки
                                        <Button onClick={() => handleUpdateState(order.id)}>Сохранить</Button>
                                    ) : (
                                        // Отображать кнопку "Edit" для всех остальных строк
                                        <Button onClick={() => setEditRowId(order.id)}>Изменить</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default GetOrdersPage;
