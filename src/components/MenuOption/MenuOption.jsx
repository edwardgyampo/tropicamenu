import cogSvg from "../../svg/cog";
import caretRightSvg from "../../svg/caret-right";
import classes from "./MenuOption.module.css";
import ScreenPresenterContext from "../ScreenPresenterContext/ScreenPresenterContext";
import { useContext } from "react";

const MenuOption = (props) => {
	const ctx = useContext(ScreenPresenterContext);

	const clickHandler = () => {
		if (props.onClick) {
			props.onClick();
			return;
		}

		if (!props.content) return;
		ctx.setNextScreenContent(props.content);
	};

	return (
		<button className={classes.menuOption} onClick={clickHandler}>
			<div className={`${classes.icon} ${classes.infoIcon}`}>
				{props.infoIcon || cogSvg}
			</div>
			<label className={classes.label}>
				{props.label.replace(/\s/g, "\u00a0")}
			</label>
			<div className={`${classes.icon} ${classes.actionIcon}`}>
				{props.content ? caretRightSvg : props.actionIcon}
			</div>
		</button>
	);
};

export default MenuOption;
