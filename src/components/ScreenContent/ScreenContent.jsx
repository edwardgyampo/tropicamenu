import { useContext } from "react";
import caretLeftSvg from "../../svg/caret-left";
import MenuOption from "../MenuOption/MenuOption";
import ScreenPresenterContext from "../ScreenPresenterContext/ScreenPresenterContext";
import classes from "./ScreenContent.module.css";

const ScreenContent = (props) => {
  const ctx = useContext(ScreenPresenterContext);
  
	return (
		<ul className={classes.screenContent}>
			{props.controls ? <MenuOption infoIcon={caretLeftSvg} label="Go back" onClick={ctx.goBack}></MenuOption> : ""}
			{props.children}
		</ul>
	);
};

export default ScreenContent;
