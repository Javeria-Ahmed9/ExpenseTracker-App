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

  let [dlt, setDlet] = useState("");

  let Alldata = (reason, amount) => {
    setHis([...his, { name: reason, price: amount }]);
    if (amount > 0) {
      setTotal([...total, amount]);
    } else {
      setExpense([...expense, amount, 0]);
    }
  };
  let dlet = (ind, val) => {
    let u = his.filter((vl, id) => id !== ind);
    setHis(u);
    let u1 = total.filter((v) => v !== val);
    setTotal(u1);
    let u2 = expense.filter((v) => v !== val);
    setExpense(u2);
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
