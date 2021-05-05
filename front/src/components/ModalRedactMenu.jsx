import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import InputForm from './InputForm';
import { updateMenu } from './../utils/api';

const ModalAddRedactMenu = ({ id, defaultName, defaultPrice, defaultWeight, defaultProducts, allProducts, setMessage }) => {
    const [modal, setModal] = useState(false);
    const [chosenProducts, setProducts] = useState([]);
    const [defaultChosen, setChosen] = useState();
    const [name, setName] = useState(defaultName);
    const [price, setPrice] = useState(defaultPrice);
    const [weight, setWeight] = useState(defaultWeight);
    const toggle = () => setModal(!modal);
    let listProducts = [];

    useEffect(() => {
        const set = async () => {
            setChosen(defaultProducts.map((product) => product.id.toString()));
        }

        set();
    }, [defaultProducts])

    if (allProducts) {
        listProducts = allProducts.map((product, item) =>
            <option key={item} value={product.id}>
                {product.name}
            </option>
        );
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

    const update = async () => {
        let productList;

        if (chosenProducts.length === 0)
            productList = defaultProducts.map((item) => parseInt(item))
        else
            productList = chosenProducts.map((item) => parseInt(item))

        const menuRequest = {
            name: name,
            price: parseInt(price),
            weight: parseInt(weight),
            productList: productList
        }

        const res = await updateMenu(id, menuRequest);

        if (res.status === 200) {
            setMessage("Блюдо в меню обновлено");
            toggle();
        }
    }

    return (
        <div>
            <Button onClick={toggle} color="success" block>Редактировать</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} />
                <ModalBody>
                    <InputForm name="name" text="Название" type="text" set={setName} defaultValue={defaultName} horizontal />
                    <InputForm name="price" text="Стоимость" type="number" set={setPrice} defaultValue={defaultPrice} horizontal />
                    <InputForm name="weight" text="Вес" type="number" set={setWeight} defaultValue={defaultWeight} horizontal />
                    <Label className="font-profile-head">Ингридиенты</Label>
                    <Input type='select' defaultValue={defaultChosen} multiple className="text-capitalize" onChange={e => multipleHandle(e, allProducts, chosenProducts)}>
                        {listProducts}
                    </Input>

                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={update}>Сохранить</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalAddRedactMenu;