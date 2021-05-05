import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const About = () => {

    return (
        <section className="login">
            <Container>
                <Row>
                    <Col md={6} className="m-auto">
                        <p>Информационно-справочная система обработки и доставки заказов пиццерии выполнена студенткой группы ПИ19-3 Хамикоевой Ольгой.
                        Идеальная пицца – залог системы, ведь люди видят, что она вкусная, красивая, ИДЕАЛЬНАЯ, и возвращаются снова.
                        Пицца — это большое дело, которое вдохновляет, заставляет каждое утро просыпаться и с интересом продолжать работу.
                        Если у Вас есть предложения по улучшению системы, обязательно напишите мне
                        - </p>
                        <a href="ohamikoeva@mail.ru">ohamikoeva@mail.ru</a>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default About;
