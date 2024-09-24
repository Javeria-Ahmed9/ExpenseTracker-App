import { createContext, useState } from "react";
import PropTypes from "prop-types";

export let dataIs = createContext();
export default function Provider({ children }) {
  Provider.propTypes = {
    children: PropTypes.element.isRequired,
  };
  let [his, setHis] = useState([]);
  let [total, setTotal] = useState([]);
  let [expense, setExpense] = useState([]);
  let Alldata = (reason, amount) => {
    setHis([...his, { name: reason, price: amount }]);
    if (amount > 0) {
      setTotal([...total, amount]);
    } else {
      setExpense([...expense, amount]);
    }
  };
  let dlet = (ind) => {
    let u = his.filter((val, id) => id !== ind);
    setHis(u);
  };

  let valueToShare = {
    Alldata,
    his,
    total,
    expense,
    dlet,
  };
  return <dataIs.Provider value={valueToShare}>{children}</dataIs.Provider>;
}
