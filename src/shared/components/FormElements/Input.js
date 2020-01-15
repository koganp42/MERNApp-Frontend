import React, { useReducer, useEffect } from "react";
//use the useReducer hook instead of useState when managing more complicated state.
//use the useEffect to run some logic when there is a state change.
import { validate } from "../util/validators";

import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isTouched: false,
    isValid: false
  });

  const {id, onInput } = props;
  const {value, isValid} = inputState;

  useEffect((
    onInput(id, value, isValid)
  ), [id, value,isValid,onInput]);

  //on change of the input...
  const changeHandler = event => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = event => {
    dispatch({
      type: "TOUCH"
    });
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
        //onBlur triggers when the user clicks into an element and then out.  This gives the user the chance to enter something.
        onBlur={touchHandler}
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
        inputState.isTouched &&
        "form-control--invalid"}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
