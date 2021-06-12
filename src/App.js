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
										label="Top 5"
										content={
											<ScreenContent controls>
												<MenuOption label="Metal Gear Solid V"></MenuOption>
												<MenuOption label="The Witcher 3"></MenuOption>
												<MenuOption label="GTA V"></MenuOption>
												<MenuOption label="Shadow of The Tomb Raider"></MenuOption>
												<MenuOption label="God of War"></MenuOption>
											</ScreenContent>
										}
									></MenuOption>
									<MenuOption label="Upcoming"></MenuOption>
								</ScreenContent>
							}
						></MenuOption>
						<MenuOption label="Music" content={
							<ScreenContent controls>
								<MenuOption label="Genres"></MenuOption>
								<MenuOption label="Top 10 Hits"></MenuOption>
							</ScreenContent>
						}></MenuOption>
						<MenuOption
							label="Movies"
							content={
								<ScreenContent controls>
									<MenuOption
										label="Genres"
										content={
											<ScreenContent controls>
												<MenuOption label="Animation &amp; Anime" content={
													<ScreenContent controls>
														<MenuOption label="Naruto" content={
															<ScreenContent controls>
																<MenuOption label="Characters" content={
																	<ScreenContent controls>
																		<MenuOption label="Naruto"></MenuOption>
																		<MenuOption label="Sasuke"></MenuOption>
																		<MenuOption label="Madara"></MenuOption>
																		<MenuOption label="Hashirama"></MenuOption>
																		<MenuOption label="Obito"></MenuOption>
																	</ScreenContent>
																}></MenuOption>
															</ScreenContent>
														}></MenuOption>
														<MenuOption label="Avatar"></MenuOption>
														<MenuOption label="Death Note"></MenuOption>
														<MenuOption label="Boruto"></MenuOption>
														<MenuOption label="One Piece"></MenuOption>
													</ScreenContent>
												}></MenuOption>
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
						<MenuOption label="Settings"></MenuOption>
					</ScreenContent>,
				]}
			></Menu>
		</div>
	);
}

export default App;
