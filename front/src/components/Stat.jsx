import React, { useEffect, useState } from 'react';
import { Card, CardBody, Container, Row, Col } from 'reactstrap';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    DiscreteColorLegend
} from 'react-vis';
import { getAllMenu } from './../utils/api';

const BarChar = ({ prices, weights, angle }) => {
    return (
        <XYPlot margin={{ bottom: 70 }} xType="ordinal" width={1100} height={450}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <DiscreteColorLegend
                style={{ position: 'absolute', left: '90px', top: '5px' }}
                orientation="horizontal"
                items={[
                    {
                        title: 'Цена',
                        color: '#12939A'
                    },
                    {
                        title: 'Вес',
                        color: '#79C7E3'
                    }
                ]}
            />
            <XAxis top={30} tickLabelAngle={angle} />
            <YAxis left={15}/>
            <VerticalBarSeries
                data={prices}
            />
            <VerticalBarSeries
                data={weights}
            />
        </XYPlot>
    );
}

const Stat = () => {
    const [prices, setPrices] = useState([]);
    const [weights, setWeights] = useState([]);
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        const getStat = async () => {
            let basket = localStorage.getItem("basket");

            try {
                basket = (basket) ? JSON.parse(basket) : [];
            } catch {
                basket = [];
            }

            if (basket.length === 0) {
                const res = await getAllMenu();

                if (res.status === 200) {
                    basket = res.data;
                    setAngle(-90);
                }
            }

            const prices = basket.map((item) => {
                return {
                    x: item.name,
                    y: item.price
                }
            })
            const weights = basket.map((item) => {
                return {
                    x: item.name,
                    y: item.weight
                }
            })
            setPrices(prices);
            setWeights(weights);

        }

        getStat()
    }, []);

    return (
        <section className="login">
            <Container>
                <Row>
                    <Col md={12} className="m-auto">
                        <Card className="mb-4 shadow-sm">
                            <CardBody>
                                <BarChar
                                    prices={prices}
                                    weights={weights}
                                    angle={angle}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Stat;
