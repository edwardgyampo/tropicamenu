import classes from "./Screen.module.css";

const Screen = (props) => {
	return (
		<div
			className={`${classes.screen} ${
				props.currentReverse
					? `${classes.currentScreen} ${classes.slideInFromLeft}`
					: ""
			} ${
				props.current
					? `${classes.currentScreen} ${classes.slideInFromRight}`
					: ""
			} ${
				props.previous
					? `${classes.previousScreen} ${classes.slideOutToLeft}`
					: ""
			} ${
				props.next
					? `${classes.nextScreen} ${classes.slideOutToRight}`
					: ""
			}`}
		>
			{props.children}
		</div>
	);
};

export default Screen;
