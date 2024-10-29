import axios from 'axios';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import * as yup from 'yup'
import { LoginToken } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Login = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        usn: '',
        pwd: ''
    })
    const [isLogin, setIsLogin] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLogin(true)
        LoginToken(userData)

        setTimeout(() => {
            setIsLogin(false)
            navigate('/')
        }, 3000)
    };

    const [error, setError] = useState({})


    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData(pre => ({ ...pre, [name]: value })
        )
    }


    return (
        <div>
            <Container>
                <h2 className="my-4 p-5">{t("login")}</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>
                            {t("email")}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={t("email")}
                            value={userData.usn}
                            name="usn"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>
                            {t("password")}
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder={t("password")}
                            value={userData.pwd}
                            name="pwd"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {!isLogin ? <>{t("login")}</> : <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}
                    </Button>
                </Form>
            </Container>
        </div>)
}

export default Login
