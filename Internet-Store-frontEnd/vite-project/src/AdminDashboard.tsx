import { ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function AdminDashboard({ selectedTab, setSelectedTab }) { // Можно сказать второй навбар, только для админа, в нём реализованы все функции админа
  // Получаем текущий путь
  const location = useLocation();

  // Обработчик клика по вкладке
  const handleTabClick = (path) => {
    setSelectedTab(path); // Обновляем выбранную вкладку
  };

  return (
    <div style={{marginTop: '150px',marginLeft:'150px' ,width: '325px', float: 'left' }}>
      <ListGroup activeKey={selectedTab}>
        <ListGroup.Item
          action
          as={Link}
          to="/admin-dashboard/add-product"
          eventKey="/admin-dashboard/add-product"
          onClick={() => handleTabClick('/admin-dashboard/add-product')}
          active={location.pathname === '/admin-dashboard/add-product' || location.pathname === '/admin-dashboard'}
        >
          Добавление нового товара
        </ListGroup.Item>
        <ListGroup.Item
          action
          as={Link}
          to="/admin-dashboard/add-category"
          eventKey="/admin-dashboard/add-category"
          onClick={() => handleTabClick('/admin-dashboard/add-category')}
          active={location.pathname === '/admin-dashboard/add-category'}
        >
          Добавление новой категории товара
        </ListGroup.Item>
        <ListGroup.Item
          action
          as={Link}
          to="/admin-dashboard/get-orders"
          eventKey="/admin-dashboard/get-orders"
          onClick={() => handleTabClick('/admin-dashboard/get-orders')}
          active={location.pathname === '/admin-dashboard/get-orders'}
        >
          Заказы
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default AdminDashboard;