import MenuOption from "../MenuOption/MenuOption";
import ScreenContent from "../ScreenContent/ScreenContent";
import ScreenPresenter from "../ScreenPresenter/ScreenPresenter";
import classes from "./Menu.module.css";

const DUMMY_CONTENTS = [
	<ScreenContent>
		<MenuOption
			label="Option&nbsp;1"
			content={
				<ScreenContent controls>
					<MenuOption label="Option&nbsp;a"></MenuOption>
					<MenuOption label="Option&nbsp;b"></MenuOption>
				</ScreenContent>
			}
		></MenuOption>
	</ScreenContent>,
	<ScreenContent>
		<MenuOption
			label="Some&nbsp;Option&nbsp;2"
			content={
				<ScreenContent controls>
					<MenuOption label="Option&nbsp;c"></MenuOption>
					<MenuOption label="Option&nbsp;d"></MenuOption>
				</ScreenContent>
			}
		></MenuOption>
		<MenuOption label="Some&nbsp;Option&nbsp;3"></MenuOption>
		<MenuOption label="Some&nbsp;Option&nbsp;4"></MenuOption>
	</ScreenContent>,
	<ScreenContent>
		<MenuOption label="Some&nbsp;Option&nbsp;5"></MenuOption>
		<MenuOption label="Some&nbsp;Option&nbsp;6"></MenuOption>
	</ScreenContent>,
];

const Menu = (props) => {
	return (
		<div className={classes.menu}>
			<ScreenPresenter
				contents={props.contents || DUMMY_CONTENTS}
			></ScreenPresenter>
		</div>
	);
};

export default Menu;
