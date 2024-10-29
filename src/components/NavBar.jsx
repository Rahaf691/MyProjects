import { useState } from 'react'
import { Button, Container, Form, Modal, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { FaBasketShopping } from 'react-icons/fa6'
import { HiBars4 } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { routes } from '../routes/router'
import '../assets/css/navbar.css'
import { BiExit } from 'react-icons/bi'
import { clearCart } from '../redux/sliceProducts'
import { Segment, Flag } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

const NavBar = () => {

    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.sliceProducts.cart)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [Clare, setClare] = useState(false);
    const handleCloseClare = () => setClare(false);
    const handleShowClare = () => setClare(true);
    const token = localStorage.getItem('token')


    const handleSignOut = () => {
        localStorage.clear()
        setClare(false)
        dispatch(clearCart())
        navigate('/')
    }

    const changeLanguage = (e) => {
        const selectedLang = e.target.value
        console.log(selectedLang)
        i18n.changeLanguage(selectedLang)
        localStorage.setItem('language', selectedLang)
    }

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#" onClick={handleShow}>
                        <HiBars4 />
                    </Navbar.Brand>

                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title> {t("pages")} </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="flex-column">
                                {

                                    routes.filter(link => link.hasOwnProperty('name'))
                                        .map((link) =>
                                            <Nav.Link key={link.path}
                                                onClick={() => navigate(link.path) & setShow(false)}
                                                className='linkItems'
                                            >
                                                {link.name}
                                            </Nav.Link>
                                        )
                                }
                            </Nav>
                        </Offcanvas.Body>
                    </Offcanvas>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link onClick={() => navigate('/Cart')}>
                                <FaBasketShopping />
                                {
                                    cart.length
                                }
                            </Nav.Link>

                        </Nav>
                        <Form.Select
                            aria-label="Default select example"
                            style={{ maxWidth: '20%', marginRight: '15px' }}
                            onChange={changeLanguage}
                        >
                            <option value="">
                                {t("language")}
                            </option>
                            <option value="en">
                                <Segment>
                                    <Flag name='us' /> English
                                </Segment>
                            </option>
                            <option value="ar">
                                <Segment>
                                    <Flag name='sy' /> العربية
                                </Segment>
                            </option>
                        </Form.Select>
                        {
                            token ? (
                                <Nav.Link onClick={handleShowClare} style={{ color: 'red', marginRight: '15px' }}>
                                    <BiExit /> {t('logout')}
                                </Nav.Link>
                            )
                                :
                                (
                                    <Nav.Link onClick={() => navigate('/login')} style={{ marginRight: '15px' }}>
                                        {t('login')}
                                    </Nav.Link>
                                )
                        }
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder={t("search")}
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">{t("search")}</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal show={Clare} onHide={handleCloseClare}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("logout")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t("Are_you_sure!")}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseClare}>
                        {t("No")}
                    </Button>
                    <Button variant="danger" onClick={handleSignOut}>
                        {t("logout")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default NavBar
