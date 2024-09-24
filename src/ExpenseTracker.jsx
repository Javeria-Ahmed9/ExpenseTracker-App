import { useContext } from "react";
import { dataIs } from "./Provider";
import { History } from "./History";
import { Transactio } from "./Transactio";
export function ExpenseTracker() {
  let { total, expense } = useContext(dataIs);
  // console.log(total);
  // console.log(expense);
  const sum = total.reduce((t, num) => t + parseInt(num), 0);

  const decrease = expense.reduce((t, val) => t + parseInt(val), 0);
  const balance = sum + decrease;
  return (
    <div id="maindiv" className="container border">
      <h1 className="container">Expense Tracker</h1>
      <div className="container">
        <h4 id="balance">Your balance</h4>
        <h3>Rs. {balance !== 0 ? balance : "000000"}</h3>
      </div>
      <div className="container">
        <div id="expense" className="container text-center border">
          <div className="row ">
            <h4 className="col fw-bold ">Income</h4>

            <h4 className="col fw-bold">Expense</h4>
          </div>

          <>
            <div className="row ">
              <h4 id="save" className="col">
                Rs. {sum !== 0 ? sum : "000000"}
              </h4>

              <h4 id="spent" className="col">
                Rs. {decrease !== 0 ? decrease : "000000"}
              </h4>
            </div>
          </>
        </div>
      </div>
      <History />
      <Transactio />
    </div>
  );
}
