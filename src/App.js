import React from "react";
import Menu from "./components/Menu/Menu";
import menuData from "./data/menu.json";
import './App.css';

function App() {
	return (
		<div className="App">
			<Menu data={menuData}></Menu>
		</div>
	);
}

export default App;
