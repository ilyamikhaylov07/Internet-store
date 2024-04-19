import React from 'react';
import Card from 'react-bootstrap/Card';

function Blog() {
    return (
        <>
            {/* Первая карточка */}
            <Card
                style={{ margin: 'auto', marginTop: '100px', display: 'flex', flexDirection: 'row', marginLeft: '149px', marginRight: '149px' }}
                onClick={() => window.open("https://www.alltime.ru/blog/?page=post&blog=watchblog&post_id=moda-v-odezhde-dlya-zhenshchin-na-leto-v-thisyear-godu-trendy-tsveta", "_blank")}
            >
                <Card.Img src="https://img2.joyreactor.cc/pics/post/%D0%BD%D0%B5%D0%B3%D1%80-%D0%BA%D0%B0%D1%87%D0%B0%D0%BB%D0%BA%D0%B0-%D0%B4%D0%BB%D1%8F-%D0%BB%D0%BE%D1%85%D0%BE%D0%B2-%D0%BF%D1%83%D1%85%D0%BE%D0%B2%D0%B8%D0%BA-%D0%B4%D0%BB%D1%8F-%D0%BF%D0%BE%D1%86%D0%B0%D0%BD%D0%BE%D0%B2-%D0%BF%D1%83%D1%85%D0%BE%D0%B2%D0%B8%D0%BA-2152940.png" 
                    style={{ width: '400px', height: '300px', objectFit: 'cover' }} 
                    alt="Blog Image"
                />
                <Card.Body style={{ width: '500px' }}>
                    <Card.Title>Что носить летом 2024</Card.Title>
                    <Card.Text>
                        В этом году летний сезон представлен разнообразными стилями и трендами. 
                        От ярких цветов до минималистичных образов — в 2024 году вы найдете стиль, который подходит именно вам.
                    </Card.Text>
                </Card.Body>
            </Card>

            {/* Вторая карточка */}
            <Card
                style={{ margin: 'auto', marginTop: '20px', display: 'flex', flexDirection: 'row', marginLeft: '149px', marginRight: '149px' }}
                onClick={() => window.open("https://caprice.by/pokupatelu/ukhod-za-obuvju/", "_blank")}
            >
                <Card.Img src="https://img.gazeta.ru/files3/765/15874765/1a1vv-3-pic_32ratio_1200x800-1200x800-96587.jpg" 
                    style={{ width: '400px', height: '300px', objectFit: 'cover' }} 
                    alt="Blog Image"
                />
                <Card.Body style={{ width: '500px' }}>
                    <Card.Title>Как ухаживать за обувью</Card.Title>
                    <Card.Text>
                        Поддерживайте вашу обувь в хорошем состоянии с нашими советами по уходу. 
                        От чистки до хранения - узнайте, как ухаживать за своей обувью, чтобы она долго служила вам.
                    </Card.Text>
                </Card.Body>
            </Card>

            {/* Третья карточка */}
            <Card
                style={{ margin: 'auto', marginTop: '20px', display: 'flex', flexDirection: 'row', marginLeft: '149px', marginRight: '149px' }}
                onClick={() => window.open("https://trofey.ru/docs/size/", "_blank")}
            >
                <Card.Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP_ywoUdLw6NT6dVJtJgDHtNePWDmLZR9smDFzgsWPVQ&s" 
                    style={{ width: '400px', height: '300px', objectFit: 'cover' }} 
                    alt="Blog Image"
                />
                <Card.Body style={{ width: '500px' }}>
                    <Card.Title>Как подобрать размеры одежды</Card.Title>
                    <Card.Text>
                        Выбор правильного размера одежды может быть сложной задачей. 
                        Узнайте наши советы по выбору правильного размера для вашего идеального образа.
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default Blog;
