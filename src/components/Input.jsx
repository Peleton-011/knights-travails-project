import React, { useState, useEffect } from "react";

const Input = ({ data: { func, funcName, inputName, inputID, setAnswer } }) => {
	return (
		<div className="inputWrapper">
			<label htmlFor={inputID}>{inputName}</label>
			<input type="text" id={inputID} />
			<button
				onClick={(e) => {
					setAnswer(
						func(e.target.parentElement.querySelector("input").value)
					);
				}}
			>
				{funcName}
			</button>
		</div>
	);
};

export default Input;
