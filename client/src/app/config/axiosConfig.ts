import { store } from "../../store/configureStore/store";

const { token } = store.getState().auth;
export const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": JSON.parse(token),
  },
};
