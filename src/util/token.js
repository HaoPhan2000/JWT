import nameStorage from "../constants/storage";
import Cookies from "js-cookie";
const local = {
  get: () => JSON.parse(localStorage.getItem(nameStorage.name)),
  set: (token) => localStorage.setItem(nameStorage.name, JSON.stringify(token)),
  remove: () => localStorage.removeItem(nameStorage.name),
};
const cookie = {
  get: () =>
    JSON.parse(
      Cookies.get(nameStorage.name) === undefined
        ? null
        : Cookies.get(nameStorage.name)
    ),
  set: (token) => Cookies.set(nameStorage.name, JSON.stringify(token)),
  remove: () => Cookies.remove(nameStorage.name),
};

const tokenMethod = {
  get: () => {
    return local.get();
  },
  set: (token) => {
    return local.set(token);
  },
  remove: () => {
    return local.remove();
  },
};
export default tokenMethod;
