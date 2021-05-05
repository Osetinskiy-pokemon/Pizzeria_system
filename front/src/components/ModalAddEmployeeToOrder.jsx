import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Input, Label, FormGroup } from 'reactstrap';
import { addEmployeeToOrder, getAllEmployees } from './../utils/api';

const ModalAddEmployeeToOrder = ({ orderId, buttonLabel, setMessage }) => {
    const [modal, setModal] = useState(false);
    const [employee, setEmployee] = useState();
    const [employees, setAllEmployees] = useState([]);
    let listEmployees;

    const toggle = () => setModal(!modal);

    const submit = async () => {
        if (employee) {
            const res = await addEmployeeToOrder(orderId, employee);

            if (res.status === 200) {
                toggle();
                setMessage("Заказ обновлен");
            }
        }
    }

    useEffect(() => {
        const setEmployees = async () => {
            const res = await getAllEmployees();

            if (res.status === 200) {
                setAllEmployees(res.data);
            }
        };

        setEmployees();
    }, [])

    if (employees) {
        listEmployees = employees.map((employee, item) =>
            <option key={item} value={employee.id}>
                {employee.firstName} {employee.lastName}
            </option>
        )
    }

    return (
        <Col>
            <Button onClick={toggle} color="success" block>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} />
                <ModalBody>
                    <FormGroup>
                        <Label for="exampleSelect">Курьеры</Label>
                        <Input type="select" name="select" onChange={(e) => setEmployee(e.target.value)}>
                            {listEmployees}
                        </Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={submit}>Назначить</Button>{' '}
                </ModalFooter>
            </Modal>
        </Col>
    );
}

export default ModalAddEmployeeToOrder;