import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookies = (name, value) => {
    return cookies.set(name, value);
}

export const removeCookies = (name) => {
    return cookies.remove(name);
}

export const cleareCookies = () => {
    return cookies.remove();
}


