import { useState } from "react";
import "./App.css";
import ControlPanel from "./components/ControlPanel";
import Board from "./knightMoves";

function App() {
	function setAnswer(ans) {
		console.log(ans);
	}

    const board = new Board(8)

	const controlPanelData = {
		functionList: [
			{
				func: (input) => {
					return board.knightMoves(...input.split(";"));
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
