import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RemoveFromCart } from "../Store/action";
import { RemoveFromWishList } from "../Store/action";
import { RemoveFromFavorites } from "../Store/action";
import MyCard from "../CARD/Card";
import MyTitle from "../Pages/MyTitle";

function Cart_Shop(props) {
  const [cartData, setCartData] = useState([]);
  const param = useParams();
  const id = param.id;
  const dispatch = useDispatch();

  const Products_Id = useSelector((state) => state.cart_Of_P);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = [];
      for (const id of Products_Id) {
        try {
          const res = await axios.get(`https://dummyjson.com/products/${id}`);
          products.push(res.data);
        } catch (error) {
          console.error(`Error Fetching Product With ID ${id}:`, error);
        }
      }
      setCartData(products);
    };
    fetchProducts();
  }, [Products_Id]); 

  const RemoveProduct = (id) => {
    const confirmed = window.confirm("Are you sure you want to remove this item from the cart?");
    if (confirmed) {
      dispatch(RemoveFromCart(id));
    }
  };

  const RemoveFromFavorites = (id) => {
    const confirmed = window.confirm("Are you sure you want to remove this item from the cart?");
    if (confirmed) {
      dispatch(RemoveFromFavorites(id));
    }
  };

  return (
    <>
      {cartData.length === 0 && <MyTitle textColor="primary" testTitle="No products In Cart">
        </MyTitle>}
      <div className="container-fluid bg-white">
        {cartData.map((product, index) => (
          <Row key={index} className="mb-3">
            {[0, 1, 2, 3].map((colIndex) => {
              const dataIndex = index * 4 + colIndex;
              const currentProduct = cartData[dataIndex];
              if (!currentProduct) return null; // Handle case where there are less than 4 products in the last row
              return (
                <Col key={currentProduct.id} md={3}>
                  <MyCard
                    img={currentProduct.thumbnail}
                    title={currentProduct.original_title}
                    details={currentProduct.overview}
                    id={currentProduct.id}
                    price={currentProduct.price}
                    stock={currentProduct.stock}
                    description={currentProduct.description}
                  />
                  <Button onClick={() => RemoveProduct(currentProduct.id)} style={{ width: "100%" }} className="btn btn-danger mt-2">Remove</Button>
                </Col>
              );
            })}
          </Row>
        ))}
      </div>
    </>
  );
}
export default Cart_Shop;
