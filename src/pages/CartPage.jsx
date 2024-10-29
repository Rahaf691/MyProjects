import React, { useEffect } from 'react'
import { Button, Col, ListGroup, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, deleteFromCart } from '../redux/sliceProducts'
import { MdDeleteForever } from 'react-icons/md'
import { deleteProduct } from '../api/api'
import { t } from 'i18next'

const CartPage = () => {

  const cart = useSelector(state => state.sliceProducts.cart)

  const dispatch = useDispatch()

  const handleDelete = (index) => {
    dispatch(deleteFromCart(index))
    deleteProduct(index)
  }
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  return (
    <Row className="d-flex p-3">
      {
        cart && cart.length == 0 ? <div>
          <h1>{t("Cart_is_empty")}</h1>
        </div> :
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{t("product_image")}</th>
                <th>{t("product_title")}</th>
                <th>{t("price")}</th>
                <th>
                  <Button variant='danger' onClick={() => handleClearCart()}>
                    {t("clear_cart")}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>

              {cart.map((el, index) =>
                <tr key={index}>
                  <td><img src={el.image} alt={el.title} style={{ width: '100px', height: '150px' }} /></td>
                  <td>{el.title}</td>
                  <td>{el.price}</td>
                  <td>
                    <Button variant='danger' onClick={() => handleDelete(index)}>
                      <MdDeleteForever />
                    </Button>
                  </td>
                </tr>
              )
              }
            </tbody>
          </Table>
      }
    </Row >

  );
}

export default CartPage