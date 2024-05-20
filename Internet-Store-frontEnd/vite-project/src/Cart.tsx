import React, { useEffect, useState } from "react";
import { useAppSelector } from "./redux/Hooks";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./redux/Hooks";
import axios from "axios";
import { clearstorage, remove } from "./redux/IdModelSlice";

interface Product {
  brand: string;
  id: string;
  image: string;
  materials: string;
  name: string;
  price: string;
  size: string;
}

function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();
  const IdSize = useAppSelector((state) => state.reducer.IdModelContainer.IdContainer); // Функция, которая достаёт всё из redux хранилища
  const dispatch = useAppDispatch();

  useEffect(() => {
    let totalPrice = 0;
    IdSize.forEach((element) => {
      const ModelInfo = {
        id: element[0],
        size: element[1],
      };
      axios
        .post("https://localhost:7239/Internetstore/Models/GetCardModelsByIdSize", ModelInfo)
        .then((response) => {
          console.log(response.data); 
          const { id, name, price, materials, brand, size, image } = response.data;

          // Создаем объект продукта на основе полученных данных
          const product = {
            id,
            name,
            price,
            materials,
            brand,
            size,
            image,
          };

          // Вычисляем общую цену товаров
          totalPrice += parseFloat(price);

          setProducts((prevProducts) => [...prevProducts, product]);
          setTotalPrice(totalPrice);
        })
        .catch((error) => {
          console.error("Error fetching filtered products:", error);
        });
    });
  }, []);

  const handleRemoveItem = (productId: string, size: string) => {
    dispatch(remove([productId, size]));
    // После удаления товара пересчитываем общую цену
    setTotalPrice((prevTotalPrice) =>
      prevTotalPrice - parseFloat(products.find((product) => product.id === productId && product.size === size)?.price || "0")
    
    );
    // После удаления товара обновляем список товаров
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId || product.size !== size));
    location.reload()
  };

  return (
    
    <Row className="mt-5 justify-content-center my-2 gx-4" style={{ width: "100%" }}>
      
      <Col xs={12} md={9} lg={10}>
      <h1 style={{marginBottom:"15px"}}>Корзина</h1>
      <Button style={{paddingBottom:"10px",marginBottom:"15px"}} variant="outline-danger" onClick={()=>{
        dispatch(clearstorage());
        location.reload();
      }}>Удалить все товары</Button>
        <Row>
          <Col xs={12} md={9} lg={8}>
            {products.map((product, index) => (
              <Card key={index} className="mb-4">
                <Card.Body className="d-flex align-items-center">
                  <div className="me-4" style={{ width: "250px", height: "200px", overflow: "hidden", borderRadius: "10px" }}>
                    <img
                      src={`data:image/jpeg;base64,${product.image}`}
                      alt={product.name}
                      style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "10px" }}
                      onClick={() => navigate(`/catalog/id?id=${product.id}`)}
                    />
                  </div>
                  <div>
                    <h3>{product.name}</h3>
                    <p>
                      <strong>Бренд:</strong> {product.brand}
                    </p>
                    <p>
                      <strong>Цена:</strong> {product.price} руб.{" "}
                    </p>
                    <p>
                      <strong>Материалы:</strong> {product.materials}
                    </p>
                    <p>
                      <strong>Размер:</strong> {product.size}
                    </p>
                    <Button variant="primary" onClick={() => handleRemoveItem(product.id, product.size)}>
                      Удалить
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col xs={12} md={3} lg={2}>
            <Card className="mb-4" style={{position:"fixed", paddingBottom:"3px"}}>
              <Card.Body>
                <h4>Общая цена товаров:</h4>
                <p>{totalPrice} руб.</p>
                <h4>Количество товаров:</h4>
                <p>{products.length}</p>
                <Button style={{paddingBottom:"10px",marginTop:"57px"}} variant="success" onClick={()=>{if(localStorage.getItem("accessToken")!=null && products.length>0 && localStorage.getItem("isAdmin")=="false")
                {const query = new URLSearchParams({
                    sum: totalPrice.toString()
                }).toString(); navigate(`/cart/order?${query}`)}
                else if(localStorage.getItem("isAdmin")=="true"){
                  alert("Администратор не может делать заказы")
                }
                else if(localStorage.getItem("accessToken")!=null){
                  alert("сначала добавьте товар в корзину")
                }
                else{alert("сначала войдит в систему")}}}>Оформить заказ</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Cart;
