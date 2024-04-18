import { Button, FloatingLabel, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";


function Order(){
    const [paymentMethod, setPaymentMethod] = useState(null);

    const handlePaymentSelection = (method) => {
        setPaymentMethod(method);
    };
    const query = new URLSearchParams(location.search);
    let sum = query.get('sum');
    let sumdil=1000;
    if(typeof sum === 'string' ){
        sumdil+=parseInt(sum);
    }
    
    return(
        
<div style={{ marginTop: '100px', marginLeft: '500px',maxWidth: '800px' , justifyContent: 'center', alignItems: 'center'}}>
                
                <h1>Оформление заказа</h1>
                <Form style={{marginTop:"20px"}}>
                    <FloatingLabel controlId="City" label="Город доставки" className="mb-3">
                        <Form.Control
                            required
                            style={{ width: '100%' }}
                            type="text"
                            name="City"
                        />
                    </FloatingLabel>
                        <FloatingLabel controlId="Street" label="Улица доставка" className="mb-3">
                            <Form.Control 
                            required
                            style={{ width: '100%' }} 
                            type="text"
                            name="Street"
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="House" label="Дом" className="mb-3">
                            <Form.Control  
                            required
                            style={{ width: '100%' }}
                            type="text"
                            name="House"
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="Index" label="Индекс" className="mb-3">
                            <Form.Control 
                            required
                            style={{ width: '100%' }} 
                            type="text"
                            name="Index"
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
                            value={ `${sumdil} руб.`}
                            />
                        
                        </FloatingLabel>
                        </strong>
                    <p>Способы оплаты:</p>
                    <Button
                        variant={paymentMethod === 'cash' ? 'primary' : 'outline-primary'}
                        onClick={() => handlePaymentSelection('cash')}
                        style={{ marginRight: '10px'}}
                    >
                        Наличные
                    </Button>

                    <Button
                        variant={paymentMethod === 'card' ? 'primary' : 'outline-primary'}
                        onClick={() => handlePaymentSelection('card')}
                        style={{  }}
                    >
                        Банковской картой      
                    </Button>
                    <br></br>
                    <Button variant="primary" style={{ marginTop: '20px', width: '200px', height: '50px', fontSize: '1.2rem' }}>
                    Оформить
                    </Button>
    
                </Form>
                
            </div>
    )

}
export default Order;