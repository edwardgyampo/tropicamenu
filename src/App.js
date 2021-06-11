import React from "react";
import Menu from "./components/Menu/Menu";
import MenuOption from "./components/MenuOption/MenuOption";
import ScreenContent from "./components/ScreenContent/ScreenContent";

function App() {
	return (
		<div className="App">
			<Menu
				contents={[
					<ScreenContent>
						<MenuOption
							label="Games"
							content={
								<ScreenContent controls>
									<MenuOption label="Genres"></MenuOption>
									<MenuOption
										label="Top&nbsp;5"
										content={
											<ScreenContent controls>
												<MenuOption label="Metal&nbsp;Gear&nbsp;Solid V"></MenuOption>
												<MenuOption label="The&nbsp;Witcher&nbsp;3"></MenuOption>
												<MenuOption label="GTA&nbsp;V"></MenuOption>
												<MenuOption label="Shadow&nbsp;of&nbsp;The&nbsp;Tomb&nbsp;Raider"></MenuOption>
												<MenuOption label="God&nbsp;of&nbsp;War"></MenuOption>
											</ScreenContent>
										}
									></MenuOption>
									<MenuOption label="Upcoming"></MenuOption>
								</ScreenContent>
							}
						></MenuOption>
						<MenuOption label="Music"></MenuOption>
						<MenuOption
							label="Movies"
							content={
								<ScreenContent controls>
									<MenuOption
										label="Genres"
										content={
											<ScreenContent controls>
												<MenuOption label="Animation"></MenuOption>
												<MenuOption label="Comedy"></MenuOption>
												<MenuOption label="Crime"></MenuOption>
												<MenuOption label="Documentary"></MenuOption>
												<MenuOption label="Drama"></MenuOption>
											</ScreenContent>
										}
									></MenuOption>
								</ScreenContent>
							}
						></MenuOption>
					</ScreenContent>,
				]}
			></Menu>
		</div>
	);
}

export default App;
