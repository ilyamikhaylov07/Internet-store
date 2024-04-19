import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import Image from 'react-bootstrap/Image';

function HomePage() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <h1 style={{marginLeft:'150px', marginTop:'60px'}}>Главная</h1>
            <Carousel style={{marginLeft:'150px'}} activeIndex={index} onSelect={handleSelect} >
                <Carousel.Item>
                    <Image style={{height:'700px', width:'1500px'}} src="https://basket-05.wbbasket.ru/vol858/part85854/85854580/images/big/1.webp" />
                    <Carousel.Caption>
                        <h3>У нас самые сильные курьеры</h3>
                        <p>Доставят всё быстро и помогут с тяжёлыми вещами</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image style={{height:'700px', width:'1500px'}} src="https://imgcdn.loverepublic.ru/upload/images/04520/0452009538_31.jpg" />
                    <Carousel.Caption>
                        <h3 style={{color:'black'}}>Новое белое платье</h3>
                        <p style={{color:'black'}}>Самые совершенные из новой коллекции</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image style={{height:'700px', width:'1500px'}} src="https://imgcdn.loverepublic.ru/upload/images/04520/0452009538_50.jpg" />
                    <Carousel.Caption>
                        <h3>Новое чёрное платье</h3>
                        <p style={{color:'black'}}>Самые совершенные из новой коллекции</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div style={{marginTop:'50px', marginLeft:'150px', marginRight:'150px'}}>
                <p>Добро пожаловать на наш сайт! Здесь вы найдете лучшие товары и услуги для себя и своих близких. Мы гарантируем высокое качество продукции, быструю доставку и отличный сервис. Присоединяйтесь к нам прямо сейчас и сделайте свою жизнь ярче!</p>
            </div>
        </>
    );
}

export default HomePage;
