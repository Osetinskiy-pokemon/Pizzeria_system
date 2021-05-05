import React, { useState, useEffect } from 'react';
import { Card, CardBody, Container, Row, Col, Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { validateEmail, validateFirstName, validateLastName, validateLogin, validatePassword, validatePhone, validateAddress } from './../utils/validators';
import { getCurrentUser, updateUser } from './../utils/api';
import Info from './Info';

const InputForm = ({ name, defaultValue, text, type, set, validate }) => {
    const [isValid, toggleValid] = useState('');
    const [feedback, setFeedback] = useState('');

    const onChange = async (e) => {
        const value = e.target.value;
        if (value !== defaultValue) {
            const result = await validate(value);

            if (result === 'ok') {
                toggleValid('is-valid');
                set(value);
            } else {
                toggleValid('is-invalid');
                setFeedback(result);
            }
        } else {
            toggleValid('is-valid');
            set(value);
        }
    }

    return (
        <Col>
            <FormGroup>
                <Label className="font-profile-head">
                    {text}
                    <Input
                        defaultValue={defaultValue}
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

const Profile = () => {
    const [login, setLogin] = useState();
    const [email, setEmail] = useState();
    const [lastName, setLastName] = useState();
    const [firstName, setFirstName] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [password, setPassword] = useState();
    const [defId, setId] = useState();
    const [defaultLogin, setDefaultLogin] = useState();
    const [defaultEmail, setDefaultEmail] = useState();
    const [defaultLastName, setDefaultLastName] = useState();
    const [defaultFirstName, setDefaultFirstName] = useState();
    const [defaultPhone, setDefaultPhone] = useState();
    const [defaultAddress, setDefaultAddress] = useState();
    const [message, setMessage] = useState();

    useEffect(() => {

        const getInfo = async () => {
            const res = await getCurrentUser();

            if (res.status === 200) {
                const { id, username, firstName, lastName, email, address, phone } = res.data;

                setId(id);
                setDefaultLogin(username);
                setDefaultFirstName(firstName);
                setDefaultLastName(lastName);
                setDefaultEmail(email);
                setDefaultAddress(address);
                setDefaultPhone(phone);
            }
        };

        getInfo();
    }, [message]);

    const submit = async () => {
        const user = {
            firstName: firstName || defaultFirstName,
            lastName: lastName || defaultLastName,
            username: login || defaultLogin,
            email: email || defaultEmail,
            address: address || defaultAddress,
            phone: phone || defaultPhone,
            password: password || null
        }

        const res = await updateUser(defId, user);

        if (res.status === 200) {
            setMessage("Профиль обновлен")
        }
    };

    return (
        <section className="login">
            <Container>
                {
                    message &&
                    <Row>
                        <Col>
                            <Info message={message} setMessage={setMessage} isSuccess={true} />
                        </Col>
                    </Row>
                }
                <Row>
                    <Col md={6} className="m-auto">
                        <Card className="mb-4 shadow-sm">
                            <CardBody>
                                <InputForm name="login" text="Логин" type="text" set={setLogin}
                                    validate={validateLogin} defaultValue={defaultLogin} />
                                <InputForm name="email" text="Почта" type="email" set={setEmail}
                                    validate={validateEmail} defaultValue={defaultEmail} />
                                <InputForm name="lastName" text="Фамилия" type="text" set={setLastName}
                                    validate={validateLastName} defaultValue={defaultLastName} lastName />
                                <InputForm name="firstName" text="Имя" type="text" set={setFirstName}
                                    validate={validateFirstName} defaultValue={defaultFirstName} />
                                <InputForm name="phone" text="Телефон" type="tel" set={setPhone}
                                    validate={validatePhone} defaultValue={defaultPhone} />
                                <InputForm name="address" text="Адрес" type="text" set={setAddress}
                                    validate={validateAddress} defaultValue={defaultAddress} />
                                <InputForm name="password" text="Пароль" type="password" set={setPassword}
                                    validate={validatePassword} defaultValue='' />

                                <Col>
                                    <Button className="login-btn" onClick={submit}>Редактировать</Button>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Profile;
