import React, { useEffect, useState } from "react";
import { getProducts } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts } from "../redux/sliceProducts";
import { Alert, Button, Row } from "react-bootstrap";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import '../assets/css/Home.css'
import { useTranslation } from "react-i18next";

const HomePage = () => {

  const { t, i18n } = useTranslation()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const products = useSelector((state) => state.sliceProducts.products);
  const cart = useSelector((state) => state.sliceProducts.cart);

  const [isLogin, setIsLogin] = useState(false)
  const token = localStorage.getItem('token')


  useEffect(() => {
    const getData = async () => {
      try {
        const productsData = await getProducts();
        dispatch(fetchProducts(productsData));
      } catch (err) {
        console.log('error fetching products', err)
      }
    }
    getData()
    console.log(products)
  }, []);

  const handleUpdate = (id) => {
    if (token) {
      navigate(`/product/${id}`)

    } else {
      setIsLogin(true)
      setTimeout(() => {
        navigate('/login')
      }, 1500)

    }
  }

  const handleAddToCart = (el, index) => {

    if (token) {
      setIsLogin(false)
      dispatch(addToCart(el))
    } else {
      setIsLogin(true)
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    }
  }
  return (
    <div>
      {
        isLogin && (<>
          <Alert variant="danger">
            {t("please_Login")}
          </Alert>
        </>)
      }
      <Row >
        {products.map((product, index) =>
          <div key={index} className="col p-2">
            <img src={product.image} alt={product.name} style={{ width: '200px', height: '200px' }} />
            <h3>{product.title.substring(0, 25)}</h3>
            <p>$ {product.price}</p>
            <Button variant="success" onClick={() => handleAddToCart(product, index)} >
              <MdOutlineLocalGroceryStore /> {t("add_to_cart")}
            </Button>
            <Button className="mt-2" variant="primary" onClick={() => handleUpdate(product.id)} >
              <MdOutlineLocalGroceryStore /> {t("update_product")}
            </Button>
          </div>
        )}
      </Row>
    </div>
  )
};

export default HomePage;
