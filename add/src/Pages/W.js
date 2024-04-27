import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { RemoveFromWishList } from "../Store/action";
import MyCard from "../CARD/Card";

function Wishlist(props) {
    const [wishData, setWishData] = useState([]);
    const param = useParams();
    const id = param.id; 
    const dispatch = useDispatch();
    const Products_Id = useSelector((state) => state.Wish_Of_P);
   
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
          setWishData(products);
        };
        fetchProducts();
      }, [Products_Id]); 
     
      const RemoveProductFromWishlist = (id) => {
        const confirmed = window.confirm("Are you sure you want to remove this item from the WidhList?");
        if (confirmed) {
          dispatch(RemoveFromWishList(id));
        }
      };

      return (
        <>
          {wishData.length === 0 && <MyTitle textColor="primary" testTitle="No products In WishList">
            </MyTitle>}
          <div className="container-fluid bg-white">
            {wishData.map((product, index) => (
              <Row key={index} className="mb-3">
                {[0, 1, 2, 3].map((colIndex) => {
                  const dataIndex = index * 4 + colIndex;
                  const currentProduct = wishData[dataIndex];
                  if (!currentProduct) return null; 
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
                      <Button onClick={() => RemoveProductFromWishlist(currentProduct.id)}
                       style={{ width: "100%" }} className="btn btn-danger mt-2">
                        Remove</Button>
                    </Col>
                  );
                })}
              </Row>
            ))}
          </div>
        </>
      );
    }
export default Wishlist;
