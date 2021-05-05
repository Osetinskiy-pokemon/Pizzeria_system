import React, { useEffect, useState } from 'react';
import {
    Card, CardBody, Container, Row, Col, Button, ListGroup,
    ListGroupItem, Badge, CardTitle, CardFooter, CardText, CardHeader, Alert
} from 'reactstrap';
import Info from './Info';
import ModalAddOrder from './ModalAddOrder';

const RemoveFromBasketButton = ({ id, basket, setBasket, setMessage }) => {
    const handle = () => {
        let removeIndex = basket.map((item) => item.id).indexOf(id);

        let tmp = basket;
        tmp.splice(removeIndex, 1)
        setBasket(tmp);
        localStorage.setItem("basket", JSON.stringify(tmp));
        setMessage("Корзина изменена");
    }

    return (
        <Button onClick={handle}>Убрать</Button>
    );
}

const BasketBody = ({ basket, setBasket, setMessage }) => {
    let listItems = [];
    let mapItems = new Map();

    if (basket) {
        basket.forEach(menu => {
            const { id, name, price } = menu;
            let item;

            if (mapItems.has(id)) {
                item = mapItems.get(id);
                item.subtotal += price;
                item.quantity += 1;
            } else {
                item = {};
                item.name = name;
                item.subtotal = price;
                item.quantity = 1;
            }
            mapItems.set(id, item);
        });

        mapItems.forEach(({ name, quantity, subtotal }, key) =>
            listItems.push(<ListGroupItem key={key}>
                <Row>
                    <Col md={8}>
                        {name}
                    </Col>
                    <Col md={2}>
                        <Badge pill>{quantity}</Badge> {subtotal}р
                    </Col>
                    <Col md={2}>
                        <RemoveFromBasketButton
                            id={key}
                            basket={basket}
                            setBasket={setBasket}
                            setMessage={setMessage}
                        />
                    </Col>
                </Row>
            </ListGroupItem>)
        );
    }

    return (
        <CardBody>
            <ListGroup>
                {listItems}
            </ListGroup>
        </CardBody>
    )
};

const Basket = () => {
    const [isLogged, setLogged] = useState();
    const [basket, setBasket] = useState([]);
    const [message, setMessage] = useState();

    let total = basket.reduce((sum, cur) => sum + cur.price, 0);

    useEffect(() => {
        const logged = (localStorage.getItem('isLogged') === 'true') ? true : false;
        let basket = localStorage.getItem("basket");

        try {
            basket = (basket) ? JSON.parse(basket) : [];
        } catch {
            basket = [];
        }

        setLogged(logged);
        setBasket(basket);
    }, [setBasket, message]);

    const clearBasket = () => {
        setBasket([]);
        localStorage.setItem("basket", []);
    }

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
                    <Col md={12} className="m-auto">
                        <Card className="mb-4 shadow-sm">
                            <CardHeader>
                                {
                                    !isLogged &&
                                    <Alert>Чтобы заказать авторизуйтесь или зарегистрируйтесь</Alert>
                                }
                                <CardTitle tag="h5">Корзина</CardTitle>
                                <CardText>Сумма заказа: {total}</CardText>
                            </CardHeader>
                            <BasketBody
                                basket={basket}
                                setBasket={setBasket}
                                setMessage={setMessage}
                            />
                            <CardFooter className="text-muted">
                                <Row>
                                    <Col>
                                        <Button onClick={clearBasket}>Очистить</Button>
                                    </Col>
                                    {
                                        isLogged && basket.length > 0 &&
                                        <ModalAddOrder
                                            basket={basket}
                                            clearBasket={clearBasket}
                                        />
                                    }
                                </Row>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Basket;
