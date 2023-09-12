import React, { useEffect, useState } from "react";

import Input from "./Input";

const ControlPanel = ({ data: { functionList, setAnswer } }) => {

	return (
		<>
			<div>ControlPanel</div>
			<div className="inputs">
				{functionList.map(({ func, funcName, inputName }) => {
					return (
						<Input
							key={inputName}
							data={{
								func,
								funcName,
								inputName,
								inputID: funcName,
								setAnswer,
							}}
						/>
					);
				})}
			</div>
		</>
	);
};

export default ControlPanel;
