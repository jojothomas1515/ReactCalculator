import React, {useReducer} from "react";
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

function reducer(state, {type, payload}) {
    switch (type) {
        case ACTION.ADD_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false
                }
            }
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
            break;

        case ACTION.CHOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null) {
                return state
            }
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null
                }

            }
            if (state.currentOperand === null) {
                return {
                    ...state,
                    operation: payload.operation,
                }
                return {
                    ...state,
                    previousOperand: evalu(state),
                    operation: payload.operation,
                    currentOperand: null,
                }

            }
            break;

        case ACTION.EVAL:
            return {
                ...state,
                currentOperand: evalu(state),
                previousOperand: null,
                operation: null,
                overwrite: true,
            }
            break;

        case ACTION.CLEAR:
            return {};
        case ACTION.DEL:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null,

                };
            }
            if (state.currentOperand == null) return state
            if (state.currentOperand.length === 1) {
                return {...state, currentOperand: null}
            }

            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
            break;


    }
}

const evalu = ({currentOperand, previousOperand, operation}) => {
    const current = parseFloat(currentOperand)
    const previous = parseFloat(previousOperand)
    let computation = ""
    if (isNaN(current) && isNaN(current)) return
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

        case "÷":
            computation = previous / current;
            break
    }
    return computation.toString()
};

const INTERGER_FORMATTER = new Intl.NumberFormat('en-us', {
    maximumFractionDigits: 0,
});

function formatOperand(operand) {
    if (operand == null) return
    const [interger, decimal] = operand.split(".")
    if (decimal == null) return INTERGER_FORMATTER.format(interger)
    return `${INTERGER_FORMATTER.format(interger)}.${decimal}`
}

const App = () => {
    const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(
        reducer,
        {}
    );

    return (
        <>
            <div className="calculator-grid">
                <div className="output">
                    <div className="previous-operand">
                        {formatOperand(previousOperand)}
                        {operation}
                    </div>
                    <div className="current-operand">{formatOperand(currentOperand)}</div>
                </div>
                <button
                    className="span-two"
                    onClick={() => dispatch({type: ACTION.CLEAR})}
                >
                    AC
                </button>
                <button className="" onClick={() => dispatch({type: ACTION.DEL})}>
                    DEL
                </button>
                <OperationButton operation="÷" dispatch={dispatch}/>
                <DigitButton digit="1" dispatch={dispatch}/>
                <DigitButton digit="2" dispatch={dispatch}/>
                <DigitButton digit="3" dispatch={dispatch}/>
                <OperationButton operation="*" dispatch={dispatch}/>
                <DigitButton digit="4" dispatch={dispatch}/>

                <DigitButton digit="5" dispatch={dispatch}/>

                <DigitButton digit="6" dispatch={dispatch}/>

                <OperationButton operation="-" dispatch={dispatch}/>
                <DigitButton digit="7" dispatch={dispatch}/>

                <DigitButton digit="8" dispatch={dispatch}/>

                <DigitButton digit="9" dispatch={dispatch}/>

                <OperationButton operation="+" dispatch={dispatch}/>
                <DigitButton digit="." dispatch={dispatch}/>

                <DigitButton digit="0" dispatch={dispatch}/>

                <button className="span-two" onClick={() => dispatch({type: ACTION.EVAL})}>=</button>
            </div>
        </>
    );
};

export default App;
