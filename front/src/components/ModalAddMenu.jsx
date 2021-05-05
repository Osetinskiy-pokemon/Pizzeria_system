import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Input, Label } from 'reactstrap';
import InputForm from './InputForm';
import { createMenu } from './../utils/api';

const ModalAddMenu = ({ buttonLabel, products, setMessage }) => {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [weight, setWeight] = useState();
    const [chosenProducts, setProducts] = useState();
    let listProducts;

    const toggle = () => setModal(!modal);

    if (products) {
        listProducts = products.map((product, item) =>
            <option key={item} value={product.id}>
                {product.name}
            </option>
        )
    }

    const multipleHandle = (e) => {
        let opts = [],
            opt;
        for (let i = 0, len = e.target.options.length; i < len; i++) {
            opt = e.target.options[i];
            if (opt.selected) {
                opts = [...opts, opt.value];
            }
        }
        setProducts(opts);
    }

    const add = async () => {
        const menuRequest = {
            name: name,
            price: parseInt(price),
            weight: parseInt(weight),
            productList: chosenProducts.map((item) => parseInt(item))
        }

        const res = await createMenu(menuRequest);

        if (res.status === 201) {
            setMessage("Блюдо в меню добавлено");
            toggle();
        }
    }

    return (
        <Col xs='2'>
            <Button onClick={toggle} block color="success">{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} />
                <ModalBody>
                    <InputForm name="name" text="Название" type="text" set={setName} horizontal />
                    <InputForm name="price" text="Цена" type="number" set={setPrice} horizontal />
                    <InputForm name="weight" text="Вес" type="number" set={setWeight} horizontal />
                    <Label className="font-profile-head">Продукты</Label>
                    <Input type='select' multiple className="text-capitalize" onChange={e => multipleHandle(e, products, chosenProducts)}>
                        {listProducts}
                    </Input>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={add}>Добавить</Button>{' '}
                </ModalFooter>
            </Modal>
        </Col>
    );
}

export default ModalAddMenu;