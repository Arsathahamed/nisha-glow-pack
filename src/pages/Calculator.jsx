import { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput(input + value);
  };

  const clearInput = () => {
    setInput("");
  };

  const deleteLast = () => {
    setInput(input.slice(0, -1));
  };

  const calculateResult = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="container">
      <div
        className="card shadow mx-auto p-4"
        style={{ maxWidth: "400px" }}
      >
        <h3 className="text-center mb-3">
          Calculator
        </h3>

        <input
          type="text"
          className="form-control text-end mb-3"
          value={input}
          readOnly
          style={{
            fontSize: "24px",
            height: "60px"
          }}
        />

        <div className="row g-2">

          <div className="col-3">
            <button
              className="btn btn-danger w-100"
              onClick={clearInput}
            >
              C
            </button>
          </div>

          <div className="col-3">
            <button
              className="btn btn-warning w-100"
              onClick={deleteLast}
            >
              ⌫
            </button>
          </div>

          <div className="col-3">
            <button
              className="btn btn-secondary w-100"
              onClick={() => handleClick("%")}
            >
              %
            </button>
          </div>

          <div className="col-3">
            <button
              className="btn btn-primary w-100"
              onClick={() => handleClick("/")}
            >
              ÷
            </button>
          </div>

          {["7","8","9","*","4","5","6","-","1","2","3","+","0",".","="]
            .map((btn, index) => (
              <div
                className={
                  btn === "="
                    ? "col-6"
                    : "col-3"
                }
                key={index}
              >
                <button
                  className={
                    btn === "="
                      ? "btn btn-success w-100"
                      : "btn btn-light w-100"
                  }
                  style={{ height: "55px" }}
                  onClick={() =>
                    btn === "="
                      ? calculateResult()
                      : handleClick(btn)
                  }
                >
                  {btn === "*"
                    ? "×"
                    : btn}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Calculator;