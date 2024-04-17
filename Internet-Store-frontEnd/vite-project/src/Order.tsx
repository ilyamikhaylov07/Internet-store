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
                    <FloatingLabel controlId="Name" label="Город доставки" className="mb-3">
                        <Form.Control
                            required
                            style={{ width: '100%' }}
                            type="text"
                            name="name"
                        />
                    </FloatingLabel>
                        <FloatingLabel controlId="Material" label="Улица доставка" className="mb-3">
                            <Form.Control 
                            required
                            style={{ width: '100%' }} 
                            type="text"
                            name="material"
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="Price" label="Дом" className="mb-3">
                            <Form.Control  
                            required
                            style={{ width: '100%' }}
                            type="text"
                            name="price"
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="Colour" label="Индекс" className="mb-3">
                            <Form.Control 
                            required
                            style={{ width: '100%' }} 
                            type="text"
                            name="colour"
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="Colour" label="Сумма заказа" className="mb-3">
                            <Form.Control 
                            required
                            style={{ width: '100%' }} 
                            type="text"
                            name="colour"
                            disabled
                            value={`${sum} руб.`}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="Colour" label="Доставка" className="mb-3">
                            <Form.Control 
                            required
                            style={{ width: '100%' }} 
                            type="text"
                            name="colour"
                            disabled
                            value={`1000 руб.`}
                            />
                        </FloatingLabel>
                        <strong>
                        <FloatingLabel controlId="Colour" label="Итого" className="mb-3">
                            <Form.Control 
                            required
                            style={{ width: '100%' }} 
                            type="text"
                            name="colour"
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