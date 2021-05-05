import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "reactstrap";

const Info = ({ isSuccess, message, setMessage, styled }) => {
    const [isVisible, setClose] = useState(true);
    const color = isSuccess ? 'success' : 'danger';

    useEffect(() => {
        if (isVisible) {
            window.setTimeout(() => {
                setClose(!isVisible);
                setMessage(null);
            }, 5000);
        }
    }, [isVisible, setMessage]);

    if (!styled) {
        return (
            <Alert className="text-center" isOpen={isVisible} color={color}>{message}</Alert>
        )
    }

    return (
        <section className="page-state">
            <Container>
                <Row>
                    <Col>
                        <Alert className="text-center" isOpen={isVisible} color={color}>{message}</Alert>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Info;
