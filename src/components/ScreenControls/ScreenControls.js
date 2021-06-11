import classes from "./ScreenControls.module.css";

const ScreenControls = (props) => {
	return (
		<div
			className={`${classes.screenControls} ${
				props.overlay ? classes.overlay : ""
			}`}
		>
			<button onClick={props.onPrevious}>Previous</button>
			<button onClick={props.onNext}>Next</button>
			<button onClick={props.onReload}>Reload</button>
		</div>
	);
};

export default ScreenControls;
