import { useState } from "react";
import "./App.css";
import ControlPanel from "./components/ControlPanel";
import knightMoves from "./knightMoves";

function App() {
	function setAnswer(ans) {
		console.log(ans);
	}

	const controlPanelData = {
		functionList: [
			{
				func: (input) => {
					return knightMoves(...input.split(";"));
				},
				funcName: "test",
				inputName: "",
			},
		],
		setAnswer,
	};
	return (
		<>
			<h1>Henlo</h1>
			<ControlPanel data={controlPanelData} />
		</>
	);
}

export default App;
