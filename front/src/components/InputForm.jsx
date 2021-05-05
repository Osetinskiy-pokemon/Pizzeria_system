import React from 'react';
import { Col, FormGroup, Label, Input, Row } from 'reactstrap';

const Horizontal = ({ name, text, type, set, defaultValue }) => {
    return (
        <Row>
            <Col xs='4'>
                {text}
            </Col>
            <Col xs='8'>
                <Input
                    type={type}
                    name={name}
                    defaultValue={"" || defaultValue}
                    onChange={e => set(e.target.value)}
                    required
                />
            </Col>
        </Row>
    )
}

const Vertical = ({ name, text, type, set, defaultValue }) => {
    return (
        <div>
            { text}
            < Input
                type={type}
                name={name}
                defaultValue={"" || defaultValue}
                onChange={e => set(e.target.value)}
                required
            />
        </div>
    )
}

const InputForm = ({ name, text, type, set, horizontal, defaultValue }) => {


    return (
        <Col>
            <FormGroup>
                <Label className="font-profile-head">
                    {
                        (horizontal) ?
                            <Horizontal
                                name={name}
                                text={text}
                                type={type}
                                set={set}
                                defaultValue={defaultValue}
                            />
                            :
                            <Vertical
                                name={name}
                                text={text}
                                type={type}
                                set={set}
                                defaultValue={defaultValue}
                            />
                    }
                </Label>
            </FormGroup>
        </Col>
    );
}

export default InputForm;