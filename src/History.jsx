import { useContext } from "react";
import { dataIs } from "./Provider";
import { RxCross2 } from "react-icons/rx";

export function History() {
  let { his } = useContext(dataIs);
  let { dlet } = useContext(dataIs);
  let deletefun = (ind, val) => {
    dlet(ind, val);
  };
  return (
    <>
      <div id="hitorydiv">
        <h4>
          <b>History</b>
        </h4>
        <hr className="border mt-2 border-secondary border-2 opacity-50" />
        {his.map((val, ind) => (
          <div key={ind} className="text-center">
            <div id="row" className="row align-items-start">
              <div className="col-2">
                <h6 id="hist">
                  <RxCross2
                    onClick={() => deletefun(ind, val.price)}
                    id="icon"
                  />
                </h6>
              </div>
              <div className="col text-start">
                <h6 className="text-capitalize">{val.name}</h6>
              </div>

              <div className="col text-end">
                {val.price > 0 ? (
                  <h6 id="hist" className="text-success">
                    Rs. {val.price}
                  </h6>
                ) : (
                  <h6 className="text-danger" id="hist">
                    Rs. {val.price}
                  </h6>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
