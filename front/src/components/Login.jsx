import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, Container, Row, Col, Button, NavLink } from 'reactstrap';
import InputForm from './InputForm';
import Info from './Info';
import { loginFetch } from './../utils/api';


const Login = () => {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const history = useHistory();

    const submit = async () => {

        const user = {
            usernameOrEmail: login,
            password: password
        }

        const res = await loginFetch(user);


        if (res.status === 401) {
            localStorage.setItem("isLogged", false);
            setMessage("Неверный логин или пароль");
        } else {
            localStorage.setItem("isLogged", true);
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("isAdmin", res.data.roles.includes('ROLE_ADMIN'));
            history.push('/')
            window.location.reload();
        }
    };

    return (
        <section className="login">
            <Container>
                <Row>
                    <Col md={6} className="m-auto">
                        <Card className="mb-4 shadow-sm">
                            <CardBody>
                                {
                                    message &&
                                    <Info message={message} setMessage={setMessage} isSuccess={false} />
                                }
                                <InputForm name="Login" text="Логин или Почта" type="text" set={setLogin} />
                                <InputForm name="Password" text="Пароль" type="password" set={setPassword} />

                                <Col>
                                    <Button className="login-btn" onClick={submit}>Войти</Button>
                                </Col>
                                <Col className="login-btn__link">
                                    <div className="dropdown-divider"></div>
                                    <NavLink href='/register'>Зарегистрироваться</NavLink>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Login;
