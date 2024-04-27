import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cart from "../Carts/MyCart";
import MyCard from "../CARD/Card";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import Pagination from "../pagination/Pagination2";
import { useSelector, useDispatch } from "react-redux";
import { AddToFavorites } from "../Store/action";

function ListProducts() {
  const [dataProduct, setDataProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);
  const [cartItems, setCartItems] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const [favCounter, setFavCounter] = useState(0);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setDataProduct(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = dataProduct.slice(indexOfFirstPost, indexOfLastPost);

  const Search = (e) => {
    const searchOfProduct = e.target.value.toLowerCase();
    if (searchOfProduct === "") {
      axios
        .get("https://dummyjson.com/products")
        .then((res) => setDataProduct(res.data.results))
        .catch((err) => console.log(err));
    } else {
      const filterProduct = dataProduct.filter((product) =>
        product.title?.toLowerCase().includes(searchOfProduct)
      );
      setDataProduct(filterProduct);
    }
  };

  const filterProductsByPrice = (min, max) => {
    const filtered = dataProduct.filter((product) => {
      const productPrice = parseFloat(product.price);
      return productPrice >= min && productPrice <= max;
    });
    setFilteredProducts(filtered);
  };
  

  const addToCart = useSelector((state) => state.cart_Of_P);

  const addToFavoritesHandler = (id) => {
    dispatch(AddToFavorites(id));
    setFavCounter(favCounter + 1); // Increment favorites counter
  };
 
  return (
    <>
      <Row className="my-3">
        <Col xs={12} sm={6} md={3}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search"
              onChange={(e) => Search(e)}
              className="bg-secondary text-white"
            />
          </InputGroup>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <InputGroup>
            <FormControl
              type="number"
              value={minPrice}
              placeholder="Min Price"
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <InputGroup>
            <FormControl
              className="form-control"
              type="number"
              value={maxPrice}
              placeholder="Max Price"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Button onClick={() => filterProductsByPrice(minPrice, maxPrice)}>
            Filter by Price
          </Button>
        </Col>
      </Row>

      <Row>
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((ele) => (
              <MyCard
                xs={1}
                lg={3}
                md={2}
                img={ele.images[0]}
                title={ele.title}
                details={ele.original_title}
                id={ele.id}
                price={ele.price}
                stock={ele.stock}
                addToCart={addToCart}
                addToFavorites={() => addToFavoritesHandler(ele.id)}

              />
            ))
          ) : (
            currentPosts.map((ele) => (
              <MyCard
                img={ele.images[0]}
                title={ele.title}
                details={ele.original_title}
                id={ele.id}
                price={ele.price}
                stock={ele.stock}
                description={ele.description}
                addToCart={() => addToCart(ele)}
                addToFavorites={() => addToFavoritesHandler(ele)}
              />
            ))
          )}
        </div>
      </Row>

      <Cart cartItems={cartItems} />
      <Pagination
        totalPosts={dataProduct.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default ListProducts;
