import React, { useEffect, useState } from 'react';
import {
    Container, Row, Col, Button, Card, CardBody,
    CardImg, CardTitle, Badge, ListGroup, ListGroupItem, Input, FormGroup
} from 'reactstrap';
import ModalAddMenu from './ModalAddMenu';
import Info from './Info';
import ModalAddRedactMenu from './ModalRedactMenu';
import { getAllMenu, getAllProducts, deleteMenu, restoreMenu } from './../utils/api';

const ProductList = ({ products }) => {
    let listItems;

    if (products && products.length > 0) {
        listItems = products.map((product, item) =>
            <span key={item}>{product.name}{' '}</span>
        );
    }
    return (
        <ListGroupItem className="product-list">{listItems}</ListGroupItem>
    );
}

const Filter = ({ content, setFilteredContent, isAdmin, allProducts, setMessage }) => {
    const [search, setSearch] = useState("");
    const [sortOption, setOption] = useState("priceDesc");
    const size = (isAdmin) ? '2' : '4';

    useEffect(() => {
        let filtered;
        let sortFunc;

        if (content) {
            filtered = content.filter((item) => item.name.toLowerCase().includes(search))

            switch (sortOption) {
                case "priceAsc":
                    sortFunc = (a, b) => {
                        if (a.price > b.price)
                            return 1;
                        if (a.price < b.price)
                            return -1;
                        return 0;
                    };
                    break
                case "weightDesc":
                    sortFunc = (a, b) => {
                        if (a.weight < b.weight)
                            return 1;
                        if (a.weight > b.weight)
                            return -1;
                        return 0;
                    };
                    break
                case "weightAsc":
                    sortFunc = (a, b) => {
                        if (a.weight > b.weight)
                            return 1;
                        if (a.weight < b.weight)
                            return -1;
                        return 0;
                    };
                    break
                case "nameAsc":
                    sortFunc = (a, b) => {
                        if (a.name > b.name)
                            return 1;
                        if (a.name < b.name)
                            return -1;
                        return 0;
                    };
                    break
                case "nameDesc":
                    sortFunc = (a, b) => {
                        if (a.name < b.name)
                            return 1;
                        if (a.name > b.name)
                            return -1;
                        return 0;
                    };
                    break
                default:
                    sortFunc = (a, b) => {
                        if (a.price < b.price)
                            return 1;
                        if (a.price > b.price)
                            return -1;
                        return 0;
                    };
                    break
            }

            filtered.sort(sortFunc);

            setFilteredContent(filtered);
        }
    }, [search, sortOption, setFilteredContent])

    return (
        <Row className="catalog-sort-filter">
            <Col xs='8'>
                <Input
                    type="text"
                    placeholder="search"
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Col>

            <Col xs={size}>
                <FormGroup>
                    <Input
                        type="select"
                        onChange={(e) => setOption(e.target.value)}
                    >
                        <option value="priceDesc">Цена ↓</option>
                        <option value="priceAsc">Цена ↑</option>
                        <option value="weightDesc">Вес ↓</option>
                        <option value="weightAsc">Вес ↑</option>
                        <option value="nameDesc">Название ↓</option>
                        <option value="nameAsc">Название ↑</option>
                    </Input>
                </FormGroup>

            </Col>

            {
                isAdmin &&
                <ModalAddMenu
                    buttonLabel="Добавить пиццу"
                    products={allProducts}
                    setMessage={setMessage}
                />
            }
        </Row>
    );
}

const DeleteMenuButton = ({ id, setMessage }) => {
    const submit = async (e) => {
        const res = await deleteMenu(e.target.id);

        if (res.status === 200) {
            setMessage("Товар снят с продажи");
        }
    };

    return (
        <input className="btn btn-danger btn-block" id={id} type="button" value="Изъять с продажи" onClick={submit} />
    );
}

const RestoreMenuButton = ({ id, setMessage }) => {
    const submit = async (e) => {
        const res = await restoreMenu(e.target.id);

        if (res.status === 200) {
            setMessage("Товар возвращен в продажу");
        }
    };

    return (
        <input className="btn btn-info btn-block" id={id} type="button" value="Вернуть в продажу" onClick={submit} />
    );
}

const AdditionalInfo = ({ basket, setBasket, id, name, price, weight, products, status, isAdmin, setMessage, allProducts }) => {
    let additionalInfo;

    const addToBasket = () => {
        let orderItem = {};
        orderItem.id = id;
        orderItem.name = name;
        orderItem.price = price;
        orderItem.weight = weight;

        setBasket([...basket, orderItem]);
        setMessage(`Пицца "${name}" добавлена в корзину`);
    }

    if (isAdmin && !status) {
        additionalInfo = <DeleteMenuButton id={id} setMessage={setMessage} />;
    } else if (isAdmin && status) {
        additionalInfo = <RestoreMenuButton id={id} setMessage={setMessage} />;
    } else if (!status) {
        additionalInfo = <Button onClick={addToBasket} block>Добавить в корзину</Button>;
    } else {
        additionalInfo = <p>Товар закончился :(</p>
    }

    return (
        <ListGroupItem>
            {
                isAdmin &&
                <ModalAddRedactMenu
                    id={id}
                    defaultName={name}
                    defaultPrice={price}
                    defaultWeight={weight}
                    defaultProducts={products}
                    clearBasket={setBasket}
                    allProducts={allProducts}
                    setMessage={setMessage}
                />
            }
            {additionalInfo}
        </ListGroupItem>
    )
}

const MenuCards = ({ content, basket, setBasket, isAdmin, setMessage, allProducts }) => {
    let listItems;

    if (content && content.length > 0) {
        listItems = content.map((menu, item) => {
            const { id, name, price, weight, status, image, productResponseList } = menu;

            return (
                <Col md={3} key={item}>
                    <Card className="mb-4 text-center">
                        <CardImg top src={image} alt={name} />
                        <CardBody>
                            <CardTitle>
                                {name} <Badge color="danger" pill> {price}р </Badge>
                            </CardTitle>
                            <ListGroup flush>
                                <ListGroupItem>Вес: {weight} гр</ListGroupItem>
                                <ProductList
                                    products={productResponseList}
                                />
                                <AdditionalInfo
                                    id={id}
                                    name={name}
                                    price={price}
                                    weight={weight}
                                    products={productResponseList}
                                    basket={basket}
                                    setBasket={setBasket}
                                    isAdmin={isAdmin}
                                    status={status}
                                    setMessage={setMessage}
                                    allProducts={allProducts}
                                />
                            </ListGroup>
                        </CardBody>
                    </Card >
                </Col >)
        });
    }
    return (
        <Row>{listItems}</Row>
    );
}

const Menu = () => {
    const [isAdmin, setAdmin] = useState();
    const [basket, setBasket] = useState([]);
    const [content, setContent] = useState([]);
    const [filteredContent, setFilteredContent] = useState();
    const [allProducts, setAllProducts] = useState();
    const [message, setMessage] = useState();

    useEffect(() => {
        const admin = (localStorage.getItem('isAdmin') === 'true') ? true : false;
        let basket = localStorage.getItem("basket");

        try {
            basket = (basket) ? JSON.parse(basket) : [];
        } catch {
            basket = [];
        }

        setAdmin(admin);
        setBasket(basket);
    }, []);

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket));
    }, [basket])

    useEffect(() => {
        const getProducts = async () => {
            const res = await getAllProducts();
            const resMenu = await getAllMenu();

            if (res.status === 200) {
                setAllProducts(res.data);
            }

            if (resMenu.status === 200) {
                setContent(resMenu.data);
                setFilteredContent(resMenu.data);
            }
        }

        getProducts();
    }, [message])

    return (
        <section className="catalog">
            <Container>
                <Filter
                    isAdmin={isAdmin}
                    content={content}
                    setFilteredContent={setFilteredContent}
                    allProducts={allProducts}
                    setMessage={setMessage}
                />
                {
                    message &&
                    <Row>
                        <Col>
                            <Info message={message} setMessage={setMessage} isSuccess={true} />
                        </Col>
                    </Row>
                }
                <MenuCards
                    content={filteredContent}
                    basket={basket}
                    setBasket={setBasket}
                    isAdmin={isAdmin}
                    setMessage={setMessage}
                    allProducts={allProducts}
                />
            </Container>
        </section>
    )
}

export default Menu;