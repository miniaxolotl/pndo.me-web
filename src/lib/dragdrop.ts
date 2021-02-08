import { SyntheticEvent } from "react";

/**
 * Enable screeen on drag in
 * @param event Triggered aevent
 */
export const dragIn = (event: SyntheticEvent<HTMLDivElement>) => {
	event.preventDefault();
	event.stopPropagation();
	
	// const screen = document.getElementById("screen") as HTMLDivElement;
	// screen.classList.remove("display-hidden");
};

/**
 * Disable screeen on drag out
 * @param event Triggered aevent
 */
export const dragOut = (event: SyntheticEvent<HTMLDivElement>) => {
	event.preventDefault();
	event.stopPropagation();

	// const screen = document.getElementById("screen") as HTMLDivElement;
	// screen.classList.add("display-hidden");
};

/**
 * Disable drop event
 * @param event Triggered aevent
 */
export const drop = (event: SyntheticEvent<HTMLDivElement>) => {
	event.preventDefault();
	event.stopPropagation();

	console.log("hello world!");

	// const screen = document.getElementById("screen") as HTMLDivElement;
	// screen.classList.add("display-hidden");
};
