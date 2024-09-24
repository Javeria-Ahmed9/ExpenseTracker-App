import { useContext, useState } from "react";
import { dataIs } from "./Provider";

export function Transactio() {
  let { Alldata } = useContext(dataIs);
  let [text, setText] = useState("");
  let [price, setPrice] = useState("");
  let handleText = (event) => {
    setText(event.target.value);
  };

  let handlePrice = (event) => {
    setPrice(event.target.value);
  };

  let handledata = () => {
    if (text.trim() !== "" && price.trim() !== "") {
      Alldata(text, price);
      setPrice("");
      setText("");
    }
  };
  let handlesubmit = (event) => {
    event.preventDefault();
    handledata();
  };
  return (
    <>
      <div id="tran" className="container  ">
        <h4>
          <b>Add new transaction</b>
        </h4>
        <hr className="border  mt-2   border-secondary border-2 opacity-50" />
        <h6>Text</h6>
        <form onSubmit={handlesubmit}>
          <div className="input-group mb-3 border border-secondary">
            <input
              value={text}
              placeholder="Enter text..."
              onChange={handleText}
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
        </form>
        <h6>Amount</h6>
        <h6>(negative-expense,positive-income)</h6>
        <form onSubmit={handlesubmit}>
          <div className="input-group mb-3 border border-secondary">
            <input
              value={price}
              placeholder="0"
              onChange={handlePrice}
              type="number"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
        </form>
        <div className="d-grid gap-2 ">
          <button
            onClick={handledata}
            className="btn btn-primary"
            type="button"
          >
            Add Transaction
          </button>
        </div>
      </div>
    </>
  );
}
