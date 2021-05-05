import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Table, Input } from 'reactstrap';
import { getAllProducts } from './../utils/api';
import Info from './Info';
import { createProduct, deleteProduct } from './../utils/api';
import { CSVLink } from "react-csv";

const ProductAddRow = ({ products, setMessage, setSuccess }) => {
    const [name, setName] = useState();

    const create = async () => {
        if (name.length > 0) {
            const checkExist = products.filter((product) => product.name === name);

            if (checkExist.length > 0) {
                setMessage("Такой продукт уже есть в наличии");
                setSuccess(false);
            } else {
                const res = await createProduct(name);

                if (res.status === 201) {
                    setMessage("Продукт добавлен");
                    setSuccess(true);
                }
            }
        }
    }

    return (
        <tr>
            <th>Новый</th>
            <th><Input onChange={(e) => setName(e.target.value)} /></th>
            <th><Button color='success' onClick={create}>Добавить</Button></th>
        </tr>
    );
}

const Products = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            const res = await getAllProducts();

            if (res.status === 200) {
                setProducts(res.data);
            }
        };

        getProducts();
    }, [message]);

    const submit = async (e) => {
        const res = await deleteProduct(e.target.id);

        if (res.status === 200) {
            setSuccess(true);
            setMessage("Продукт удален");
        }
    };

    const listProducts = products.map(({ id, name }) =>
        <tr key={id}>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td><input className="btn btn-danger" id={id} type="button" value="Удалить" onClick={submit} /></td>
        </tr>)

    return (
        <section className="login">
            <Container>
                <Row>
                    <Col md={12} className="m-auto">
                        {
                            message &&
                            <Info
                                styled={false}
                                isSuccess={success}
                                message={message}
                                setMessage={setMessage}
                            />
                        }
                        <Table hover dark>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product name</th>
                                    <th>
                                        <CSVLink data={products}>Выгрузить в excel</CSVLink>
                                    </th>
                                </tr>
                                <ProductAddRow products={products} setMessage={setMessage} setSuccess={setSuccess} />
                            </thead>
                            <tbody>
                                {listProducts}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Products;
