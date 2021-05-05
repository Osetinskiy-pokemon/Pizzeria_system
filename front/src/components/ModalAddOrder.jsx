import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col } from 'reactstrap';
import InputForm from './InputForm';
import { getCurrentUser, createOrder } from './../utils/api';

const ModalAddOrder = ({ basket, clearBasket }) => {
    const [modal, setModal] = useState(false);
    const [address, setAddress] = useState();
    const [defaultAdress, setDefaultAdress] = useState();
    const [clientId, setId] = useState();
    const [defaultPhone, setDefaultPhone] = useState();
    const [phone, setPhone] = useState();
    const [orderTime, setOrderTime] = useState();

    useEffect(() => {
        const setDefault = async () => {
            const res = await getCurrentUser();

            if (res.status === 200) {
                setDefaultPhone(res.data.phone);
                setDefaultAdress(res.data.address);
                setId(res.data.id)
            }
        }

        setDefault();
    }, []);

    const toggle = () => setModal(!modal);


    const order = async () => {

        let mapItems = new Map();
        let requestListMenus = [];

        basket.forEach(menu => {
            const { id, price } = menu;
            let item;

            if (mapItems.has(id)) {
                item = mapItems.get(id);
                item.subtotal += price;
                item.quantity += 1;
            } else {
                item = {};
                item.subtotal = price;
                item.quantity = 1;
            }
            mapItems.set(id, item);
        });

        mapItems.forEach((item, key) => {
            requestListMenus.push({ id: key, ...item })
        })

        const orderRequest = {
            clientId: clientId,
            phone: phone || defaultPhone,
            address: address || defaultAdress,
            orderDate: orderTime,
            orderMenuRequestList: requestListMenus
        }

        const res = await createOrder(orderRequest);

        if (res.status === 201) {

            toggle();
            clearBasket();
        }

    }

    return (
        <Col>
            <Button onClick={toggle} color="success">Оформить заказ</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} />
                <ModalBody>
                    <InputForm name="address" text="Адрес доставки" type="text" set={setAddress} horizontal />
                    <InputForm name="phone" text="Номер телефона" type="tel" defaultValue={defaultPhone} set={setPhone} horizontal />
                    <InputForm name="orderTime" text="Время доставки" type="datetime-local" set={setOrderTime} horizontal />

                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={order}>Заказать</Button>{' '}
                </ModalFooter>
            </Modal>
        </Col>
    );
}

export default ModalAddOrder;