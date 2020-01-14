import React, { useReducer } from "react";
//use the useReducer hook instead of useState when managing more complicated state.
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: true
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false
  });
  //on change of the input...
  const changeHandler = event => {
    dispatch({ type: "CHANGE", val: event.target.value });
  };

  //This line allows you to determine what type of element to render
  //If it's an input prop element then render an input, otherwise a textarea.
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      />
    );

  //

  return (
    <div
      className={`form-control ${!inputState.isValid &&
        "form-control--invalid"}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
