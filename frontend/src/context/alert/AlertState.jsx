import { useReducer } from "react";
import AlertContext from "./AlertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = ({ children }) => {
  const initialState = { alerts: [] };
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg, type) => {
    const id = Date.now();
    dispatch({ type: SET_ALERT, payload: { id, msg, type } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
  };

  return (
    <AlertContext.Provider value={{ ...state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
export default AlertState;
