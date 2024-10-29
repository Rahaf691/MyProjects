import React, { useEffect, useState } from 'react'
import { getProduct, putProduct } from '../api/api';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Product = () => {
    const { t } = useTranslation()
    const [updateProduct, setUpdateProduct] = useState({
        title: '',
        description: '',
        price: '',
        category: ''
    })

    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            try {
                const productData = await getProduct(id);
                setUpdateProduct(productData);
            } catch (err) {
                console.log('error fetching products', err)
            }
        }

        getData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdateProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const navigate = useNavigate()
    const handleSubmit = () => {
        putProduct(id, updateProduct)
        // navigate('/')
    }


    return (
        <div>

            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label> {t("title_of_product")}</Form.Label>
                    <Form.Control type="email" value={updateProduct.title} onChange={handleChange} name='title' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label> {t("description")}</Form.Label>
                    <Form.Control as="textarea" rows={3} value={updateProduct.description} onChange={handleChange} name='description' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label> {t("price")}</Form.Label>
                    <Form.Control type="email" value={updateProduct.price} onChange={handleChange} name='price' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label> {t("category")}</Form.Label>
                    <Form.Control type="email" value={updateProduct.category} onChange={handleChange} name='category' />
                </Form.Group>
                <Button variant='success' onClick={handleSubmit}>
                    {t("update_product")}
                </Button>
            </Form>
        </div>
    )
}

export default Product
