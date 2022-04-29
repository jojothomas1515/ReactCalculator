import { click } from "@testing-library/user-event/dist/click";
import React, { useReducer, useRef } from "react";
import "./App.css";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

export const ACTION = {
  ADD_DIGIT: "add_digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DEL: "del",
  EVAL: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTION.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand === "") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.EVAL:
      return{
        ...state, 
        currentOperand:evalu(state),
        previousOperand:null,
        operation:null,
      }

    case ACTION.CLEAR:
      return {};
    case ACTION.DEL:
      return {
        ...state,
        currentOperand: "",
      };
    
  }
}
const evalu = ({currentOperand, previousOperand, operation}) => {
  const current = parseFloat(currentOperand)
  const previous = parseFloat(previousOperand)
  const computation =""
  switch (operation) {
    case "*":
      computation = previous * current;
      break

    case "+":
      computation = previous + current;
      break

    case "-":
      computation = previous - current;
      break

    case "+":
      computation = previous / current;
      break
  }
};

const App = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    { currentOperand: "" }
  );

  return (
    <>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {previousOperand}
            {operation}
          </div>
          <div className="current-operand">{currentOperand}</div>
        </div>
        <button
          className="span-two"
          onClick={() => dispatch({ type: ACTION.CLEAR })}
        >
          AC
        </button>
        <button className="" onClick={() => dispatch({ type: ACTION.CLEAR })}>
          DEL
        </button>
        <button className="">÷</button>
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />

        <DigitButton digit="5" dispatch={dispatch} />

        <DigitButton digit="6" dispatch={dispatch} />

        <button className="">+</button>
        <DigitButton digit="7" dispatch={dispatch} />

        <DigitButton digit="8" dispatch={dispatch} />

        <DigitButton digit="9" dispatch={dispatch} />

        <button className="">-</button>
        <DigitButton digit="." dispatch={dispatch} />

        <DigitButton digit="0" dispatch={dispatch} />

        <button className="span-two">=</button>
      </div>
    </>
  );
};

export default App;
