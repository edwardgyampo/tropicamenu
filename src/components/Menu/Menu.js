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

let getContentTree = (data_i) => {
	return (
		<MenuOption
			key={Math.random().toString()}
			label={data_i.label}
			infoIcon={data_i.infoIcon}
			actionIcon={data_i.actionIcon}
			content={
				data_i.options && (
					<ScreenContent controls>
						{data_i.options &&
							data_i.options.map((data_j) => (
								<MenuOption
									key={Math.random().toString()}
									label={data_j.label}
									infoIcon={data_j.infoIcon}
									actionIcon={data_j.actionIcon}
									content={
										data_j.options && (
											<ScreenContent controls>
												{data_j.options.map((option) => getContentTree(option))}
											</ScreenContent>
										)
									}
								></MenuOption>
							))}
					</ScreenContent>
				)
			}
		></MenuOption>
	);
};

let contentsFromData = (data) => {
	return [
		<ScreenContent>
			{data.map((initial_option) => getContentTree(initial_option))}
		</ScreenContent>,
	];
};

const Menu = (props) => {
	return (
		<div className={classes.menu}>
			<ScreenPresenter
				contents={
					(props.data && contentsFromData(props.data)) ||
					props.contents ||
					DUMMY_CONTENTS
				}
			></ScreenPresenter>
		</div>
	);
};

export default Menu;
