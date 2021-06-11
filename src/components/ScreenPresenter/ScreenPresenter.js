import { useEffect, useRef, useState } from "react";
import Screen from "../Screen/Screen";
import screenClasses from "../Screen/Screen.module.css";
import screenContentClasses from "../ScreenContent/ScreenContent.module.css";
import ScreenControls from "../ScreenControls/ScreenControls";
import ScreenPresenterContext from "../ScreenPresenterContext/ScreenPresenterContext";
import classes from "./ScreenPresenter.module.css";

const ScreenPresenter = (props) => {
	const ref = useRef();
	const [contents, setContents] = useState(props.contents || []);
	const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
	const [size, setSize] = useState({});
	const [direction, setDirection] = useState(1);

	const currentScreen =
		direction < 0 ? (
			<Screen key={Math.random().toString()} currentReverse>
				{contents[currentScreenIndex]}
			</Screen>
		) : (
			<Screen key={Math.random().toString()} current>
				{contents[currentScreenIndex]}
			</Screen>
		);

	const previousScreen =
		currentScreenIndex > 0 ? (
			<Screen key={Math.random().toString()} previous>
				{contents[currentScreenIndex - 1]}
			</Screen>
		) : (
			""
		);

	const nextScreen =
		direction < 0 ? (
			<Screen key={Math.random().toString()} next>
				{contents[currentScreenIndex + 1]}
			</Screen>
		) : (
			""
		);

	const nextScreenHandler = () => {
		if (currentScreenIndex >= contents.length - 1) return;
		setDirection((direction) => 1);
		setCurrentScreenIndex((currentScreenIndex) => currentScreenIndex + 1);
	};

	const previousScreenHandler = () => {
		if (currentScreenIndex < 1) return;
		setDirection((direction) => -1);
		setCurrentScreenIndex((currentScreenIndex) => currentScreenIndex - 1);
	};

	const reloadHandler = () => {
		setCurrentScreenIndex((currentScreenIndex) => 0);
	};

	useEffect(() => {
		const s = `.${screenClasses.currentScreen} .${screenContentClasses.screenContent}`;
		const content = ref.current.querySelector(s);
		setSize((size) => ({
			width: content.getBoundingClientRect().width,
			height: content.getBoundingClientRect().height,
		}));
	}, [currentScreenIndex]);

	return (
		<ScreenPresenterContext.Provider
			value={{
				contents,
				setNextScreenContent: (content) => {
					setContents((contents) => {
						let arr = [...contents];
						arr.splice(currentScreenIndex + 1, 1, content);
						return arr;
					});
					nextScreenHandler();
				},
				goBack: previousScreenHandler,
			}}
		>
			<div
				ref={ref}
				className={classes.screenPresenter}
				style={{ width: `${size.width}px`, height: `${size.height}px` }}
			>
				{previousScreen}
				{currentScreen}
				{nextScreen}
				<ScreenControls
					onNext={nextScreenHandler}
					onPrevious={previousScreenHandler}
					onReload={reloadHandler}
					overlay={props.controls}
				></ScreenControls>
			</div>
		</ScreenPresenterContext.Provider>
	);
};

export default ScreenPresenter;
