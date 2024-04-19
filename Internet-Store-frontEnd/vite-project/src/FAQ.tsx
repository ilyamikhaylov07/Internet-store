import { Accordion } from "react-bootstrap"

function FAQPage(){
    return(
        <>
        <h1><p style={{marginTop: '70px', marginLeft:'149px'}}>FAQ</p></h1>
        <Accordion style={{marginTop:'10px', marginLeft:'149px', marginRight:'149px'}} defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header><strong>Как выбрать правильный размер?</strong></Accordion.Header>
        <Accordion.Body>
        Ответ: Мы рекомендуем использовать нашу таблицу размеров, которая доступна на странице каждого товара. Вы также можете обратиться к нашей службе поддержки для получения консультации.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header><strong>Как я могу вернуть или обменять товар, если он не подошел мне?</strong></Accordion.Header>
        <Accordion.Body>
        Ответ: Мы предлагаем простую процедуру возврата или обмена товара в течение определенного периода времени после покупки. Пожалуйста, ознакомьтесь с нашей политикой возврата на странице "Условия возврата".
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header><strong>Как узнать состав материала изделия?</strong></Accordion.Header>
        <Accordion.Body>
        Ответ: Информация о составе материала указана на странице каждого товара. Вы также можете связаться с нашей службой поддержки для получения дополнительной информации.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header><strong>Как часто вы обновляете свой ассортимент товаров?</strong></Accordion.Header>
        <Accordion.Body>
        Ответ: Мы постоянно обновляем наш ассортимент новыми коллекциями и моделями. Пожалуйста, следите за нашими обновлениями на сайте или подпишитесь на нашу рассылку, чтобы быть в курсе всех новинок.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header><strong>Какие способы оплаты вы принимаете?</strong></Accordion.Header>
        <Accordion.Body>
        Ответ: Мы принимаем различные способы оплаты, включая кредитные карты, банковские переводы, электронные платежи и другие. Пожалуйста, ознакомьтесь с доступными вариантами оплаты на странице "Способы оплаты".
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header><strong>Сколько времени занимает доставка?</strong></Accordion.Header>
        <Accordion.Body>
        Ответ: Время доставки зависит от вашего местоположения и выбранного вами метода доставки. Мы стремимся обеспечить быструю доставку заказов. Подробности о времени доставки вы можете найти на странице "Информация о доставке".
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6">
        <Accordion.Header><strong>Как я могу отследить мой заказ?</strong></Accordion.Header>
        <Accordion.Body>
        Ответ: После того, как ваш заказ будет отправлен, вы получите электронное уведомление с номером отслеживания. Вы можете использовать этот номер для отслеживания вашего заказа на странице "Отслеживание заказа" или на сайте службы доставки.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="7">
        <Accordion.Header><strong> У меня возникли проблемы с моим заказом, как мне связаться с вашей службой поддержки?</strong></Accordion.Header>
        <Accordion.Body>
        Ответ: Наша служба поддержки доступна для помощи в решении любых вопросов или проблем с вашим заказом. Вы можете связаться с нами по электронной почте, через онлайн-чат на сайте или по телефону. Информация для связи доступна на странице "Контакты".
        </Accordion.Body>
      </Accordion.Item>
      
    </Accordion>
        </>
    )
}

export default FAQPage