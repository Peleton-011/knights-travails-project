import { useState } from "react";
import "./App.css";
import ControlPanel from "./components/ControlPanel";

function App() {
	function setAnswer(ans) {
		console.log(ans);
	}

	const controlPanelData = {
		functionList: [
			{
				func: (input) => {
					console.log("test");
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
