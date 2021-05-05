import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from 'reactstrap';
import moment from 'moment';
import 'moment/locale/ru';
import ModalAddEmployeeToOrder from './ModalAddEmployeeToOrder';
import { getAllOrders, updateOrderStatus } from './../utils/api';
import Info from './Info';
import { CSVLink } from "react-csv";

const EmployeeDropdown = ({ employee, orderId, setMessage }) => {
    const { firstName, lastName, telephone } = employee;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    if (firstName === null && lastName === null && telephone === null) {
        return (
            <ModalAddEmployeeToOrder setMessage={setMessage} orderId={orderId} buttonLabel="Выбрать" />
        );
    }

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle>
                {telephone}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem text>{`${lastName} ${firstName}`}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

const ClientDropdown = ({ firstName, lastName, phone }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle>
                {phone}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem text>{`${lastName} ${firstName}`}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

const OrderDropdown = ({ orderMenuResponseList }) => {
    const total = orderMenuResponseList.reduce((acc, cur) => acc + cur.subtotal, 0);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const menuList = orderMenuResponseList.map((menu, item) =>
        <DropdownItem key={item} text>{menu.name} x {menu.quantity}</DropdownItem>
    )

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle>
                {total} р.
            </DropdownToggle>
            <DropdownMenu>
                {menuList}
            </DropdownMenu>
        </Dropdown>
    );
}

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState();

    useEffect(() => {

        const getOrders = async () => {
            const res = await getAllOrders();

            if (res.status === 200) {
                console.log(res.data);
                setOrders(res.data);
            }
        };
        
        getOrders();
    }, [message]);

    const listOrders = orders.map(({ orderId, firstName, lastName, phone, address,
        status, orderDate, employee, orderMenuResponseList }) => {

        const submit = async (e) => {
            const { value, id } = e.target;
            const status = (value === 'X') ? 'отменен' : 'выполнен';
            const res = await updateOrderStatus(id, status);

            if (res.status === 200) {
                setMessage("Заказ обновлен");
            }
        }

        return (
            <tr key={orderId}>
                <th scope="row">{orderId}</th>
                <td>{moment(orderDate).locale('ru').format('DD MMMM, h:mm:ss')}</td>
                <td><ClientDropdown firstName={firstName} lastName={lastName} phone={phone} /></td>
                <td><OrderDropdown orderMenuResponseList={orderMenuResponseList} /></td>
                <td><EmployeeDropdown setMessage={setMessage} orderId={orderId} employee={employee} /></td>
                <td>{address}</td>
                <td>{status}</td>
                <td>
                    <ButtonGroup size="sm">
                        {
                            status === 'заказан' &&
                            <input className="btn btn-success" id={orderId} type="button" value="Выполнен" onClick={submit} />
                        }
                        {
                            status !== 'отменен' && status !== 'выполнен' &&
                            <input className="btn btn-danger" id={orderId} type="button" value="X" onClick={submit} />
                        }
                    </ButtonGroup>
                </td>
            </tr>
        );
    })

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
                    <Col className="m-auto">
                        <Table hover dark>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Дата заказа</th>
                                    <th>Клиент</th>
                                    <th>Детали заказа</th>
                                    <th>Курьер</th>
                                    <th>Адрес заказа</th>
                                    <th>Статус</th>
                                    <th><CSVLink headers={[
                                        { label: 'ID', key: 'orderId' },
                                        { label: 'Фамилия', key: 'lastName' },
                                        { label: 'Имя', key: 'firstName' },
                                        { label: 'Номер', key: 'phone' },
                                        { label: 'Адрес', key: 'address' },
                                        { label: 'Статус', key: 'status' },
                                        { label: 'Фамилия курьера', key: 'employee.lastName' },
                                        { label: 'Имя курьера', key: 'employee.firstName' },
                                        { label: 'Номер курьера', key: 'employee.telephone' },
                                    ]}
                                        data={orders}
                                    >Выгрузить в excel</CSVLink></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listOrders}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </section >
    )
}

export default Orders;
