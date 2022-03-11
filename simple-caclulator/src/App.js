import logo from './logo.svg';
import './App.css';
import './styles.css'
import { useReducer } from "react"
import DigitButtons from './DigitButtons';
import OperationButtons from './OperationButtons'


export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  CHOOSE_OPERATION: "choose_operation",
  CLEAR: 'clear',
  DELETE_DIGIT: "delete_digit",
  EVALUATE: "evaluate",

}
function reducer(state, {type, payload}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state
      if (payload.digit === "." && state.currentOperand.includes(".")) return state
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    
    case ACTIONS.CHOOSE_OPERATION: 
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
    case ACTIONS.CLEAR: {
      return {}
    }
  }

}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})
  
  

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR})} >AC</button>
      <button>Del</button>
      <OperationButtons operation="÷" dispatch={dispatch} />
      <DigitButtons digit="1" dispatch={dispatch} />
      <DigitButtons digit="2" dispatch={dispatch} />
      <DigitButtons digit="3" dispatch={dispatch} />
      <OperationButtons operation="*" dispatch={dispatch} />
      <DigitButtons digit="4" dispatch={dispatch} />
      <DigitButtons digit="5" dispatch={dispatch} />
      <DigitButtons digit="6" dispatch={dispatch} />
      <OperationButtons operation="+" dispatch={dispatch} />
      <DigitButtons digit="7" dispatch={dispatch} />
      <DigitButtons digit="8" dispatch={dispatch} />
      <DigitButtons digit="9" dispatch={dispatch} />
      <OperationButtons operation="-" dispatch={dispatch} />
      <DigitButtons digit="." dispatch={dispatch} />
      <DigitButtons digit="0" dispatch={dispatch} />
      <button className="span-two">=</button>
    </div>
  );
}

export default App;
