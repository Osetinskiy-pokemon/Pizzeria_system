import { checkUsernameAvailability, checkEmailAvailability } from './api';

const checkExist = async (value, type) => {
    const res = (type === 'login') ?
        await checkUsernameAvailability(value)
        :
        await checkEmailAvailability(value);

    return res.data.available;
}

export const validateLogin = async (value) => {
    const regex = /^[A-z0-9]{3,}$/;

    if (!value.match(regex))
        return 'Логин должен включать A-z, 0-9 минимум состоять из 3 символов';

    if (!await checkExist(value, 'login'))
        return 'Логин занят';
    return 'ok';
}

export const validateEmail = async (value) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!value.match(regex))
        return 'Некорректный email';
    if (!await checkExist(value, 'email'))
        return 'Такая почта занята';
    return 'ok';
}

export const validateFirstName = async (value) => {
    const regex = /^[А-я]{1,}$/;

    if (!value.match(regex))
        return 'Некорректное имя';
    return 'ok';
}

export const validateLastName = async (value) => {
    const regex = /^[А-я]{1,}$/;

    if (!value.match(regex))
        return 'Некорректная фамилия';
    return 'ok';
}

export const validatePhone = async (value) => {
    const regex = /^\+7[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

    if (!value.match(regex))
        return 'Некорректный номер. Введите в формате +7999-123-7891';
    return 'ok';
}

export const validateAddress = async (value) => {
    const regex = /^[А-я0-9]{1,}$/;

    if (!value.match(regex))
        return 'Адрес может включать только А-я, 0-9';
    return 'ok';
}

export const validatePassword = async (value) => {
    if (value.length < 6)
        return 'Простой пароль. Усложните до 6 символов минимум';
    return 'ok';
}