import React, { useState } from 'react';
import { Card, CardBody, Container, Row, Col, Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { validateEmail, validateFirstName, validateLastName, validateLogin, validatePassword, validatePhone, validateAddress } from './../utils/validators';
import { signup } from './../utils/api';
import Info from './Info';

const InputForm = ({ name, text, type, set, validate }) => {
    const [isValid, toggleValid] = useState('');
    const [feedback, setFeedback] = useState('');

    const onChange = async (e) => {
        const value = e.target.value;
        const result = await validate(value);

        if (result === 'ok') {
            toggleValid('is-valid');
            set(value);
        } else {
            toggleValid('is-invalid');
            setFeedback(result);
        }
    }

    return (
        <Col>
            <FormGroup>
                <Label className="font-profile-head">
                    {text}
                    <Input
                        type={type}
                        name={name}
                        onChange={onChange}
                        className={isValid}
                        required
                    />
                    <FormFeedback>{feedback}</FormFeedback>
                </Label>
            </FormGroup>
        </Col>
    );
}

const Register = () => {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [lastName, setLastName] = useState();
    const [firstName, setFirstName] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [message, setMessage] = useState();
    const [isSuccess, setSuccess] = useState();

    const submit = async () => {
        const signupBody = {
            firstName: firstName,
            lastName: lastName,
            username: login,
            phone: phone,
            email: email,
            address: address,
            password: password
        }

        const res = await signup(signupBody);

        if (res.status === 201) {
            setSuccess(true);
            setMessage("Вы успешно зарегистрированы!");
        } else {
            setSuccess(false);
            setMessage("Что-то пошло не так. Попробуйте еще раз");
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
                                    <Info message={message} setMessage={setMessage} isSuccess={isSuccess} />
                                }
                                <InputForm name="login" text="Логин" type="text" set={setLogin} validate={validateLogin} />
                                <InputForm name="email" text="Почта" type="email" set={setEmail} validate={validateEmail} />
                                <InputForm name="lastName" text="Фамилия" type="text" set={setLastName} validate={validateLastName} />
                                <InputForm name="firstName" text="Имя" type="text" set={setFirstName} validate={validateFirstName} />
                                <InputForm name="phone" text="Телефон" type="tel" set={setPhone} validate={validatePhone} />
                                <InputForm name="address" text="Адрес" type="text" set={setAddress} validate={validateAddress} />
                                <InputForm name="password" text="Пароль" type="password" set={setPassword} validate={validatePassword} />

                                <Col>
                                    <Button className="login-btn" onClick={submit}>Зарегистрироваться</Button>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Register;
