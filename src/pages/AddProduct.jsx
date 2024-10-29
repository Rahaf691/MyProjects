import  { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { postProduct } from '../api/api'
import { useTranslation } from 'react-i18next'

const AddProduct = () => {

    const { t } = useTranslation()

    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            setIsLogin(false)
        } else {
            setIsLogin(true)
            setTimeout(() => {
                navigate('/login')
            }, 1500)
        }

    }, [])


    const [addProduct, setAddProduct] = useState({
        title: '',
        description: '',
        price: '',
        category: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setAddProduct((pre) => ({
            ...pre, [name]: value
        }))
    }

    const navigate = useNavigate()

    const handleSubmit = () => {
        postProduct(addProduct)
        navigate('/')
    }


    return (
        <div>
            {isLogin && <Alert variant="danger" className="mt-5 p-5">
                {t("please_Login")}
            </Alert>}
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>
                        {t("title_of_product")}
                    </Form.Label>
                    <Form.Control type="text" name='title' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>
                        {t("price")}
                    </Form.Label>
                    <Form.Control type="text" name='price' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
                    <Form.Label>
                        {t("category")}
                    </Form.Label>
                    <Form.Control type="text" name='category' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{t("description")}</Form.Label>
                    <Form.Control as="textarea" rows={3} name='description' onChange={handleChange} />
                </Form.Group>
                <Button variant='success' onClick={handleSubmit} >
                    {t("add_product")}
                </Button>
            </Form>
        </div>
    )
}

export default AddProduct
