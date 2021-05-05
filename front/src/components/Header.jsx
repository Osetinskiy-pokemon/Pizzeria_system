import React, { useEffect, useState } from "react";
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import "./../index.css";

const Header = () => {
    const [isLogged, setLogged] = useState();
    const [isAdmin, setAdmin] = useState();

    useEffect(() => {
        const logged = (localStorage.getItem('isLogged') === 'true') ? true : false;
        const admin = (localStorage.getItem('isAdmin') === 'true') ? true : false;

        setLogged(logged);
        setAdmin(admin);
    }, [isAdmin, isLogged]);

    const logOut = () => {
        localStorage.setItem("isLogged", false);
        localStorage.setItem("isAdmin", false);
        localStorage.setItem("accessToken", null);
        setLogged(false);
        setAdmin(false);
    }

    return (
        <header className="header">
            <Container>
                <Navbar color="light" light expand="xs">
                    <NavbarBrand href="/">Pizza</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <Navbar>
                            <NavItem>
                                <NavLink href="/">Меню</NavLink>
                            </NavItem>
                            {
                                !isAdmin &&
                                <NavItem>
                                    <NavLink href="/basket/">Корзина</NavLink>
                                </NavItem>
                            }
                            {
                                isLogged && !isAdmin &&
                                <NavItem>
                                    <NavLink href="/profile/">Профиль</NavLink>
                                </NavItem>
                            }
                            {
                                isLogged &&
                                <NavItem>
                                    <NavLink href="/stat/">Статистика{!isLogged}</NavLink>
                                </NavItem>
                            }
                            <NavItem>
                                <NavLink href="/about/">Об авторе</NavLink>
                            </NavItem>
                            {
                                isLogged && isAdmin &&
                                <NavItem>
                                    <NavLink href='/products'>
                                        Продукты
                                    </NavLink>
                                </NavItem>
                            }
                            {
                                isLogged && isAdmin &&
                                <NavItem>
                                    <NavLink href='/orders'>
                                        Заказы
                                    </NavLink>
                                </NavItem>
                            }
                            {
                                isLogged &&
                                <NavItem>
                                    <NavLink href='/login' onClick={logOut}>
                                        Выход
                                    </NavLink>
                                </NavItem>
                            }
                            {
                                !isLogged &&
                                <NavItem>
                                    <NavLink href='/login'>
                                        Войти
                                    </NavLink>
                                </NavItem>
                            }
                        </Navbar>
                    </Nav>
                </Navbar>
            </Container>
        </header>
    );
}

export default Header;
