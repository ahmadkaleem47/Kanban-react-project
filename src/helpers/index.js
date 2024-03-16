export const convertToTitleCase = (inputString) => {
	// Remove leading '/' and split the string by '-'
	let words = inputString?.slice(1)?.split("-");

	// Capitalize each word and join them with space
	let titleCaseString = words?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(" ");

	return titleCaseString;
};

export const convertToSlug = (inputString) => {
    return "/"+ inputString?.toLowerCase()?.replace(/\s+/g, '-');
}

export const capitalizeWords = (inputString) => {
    // Split the input string into an array of words
    let words = inputString.split(' ');

    // Iterate through each word and capitalize the first letter
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the words back into a single string
    let capitalizedString = words.join(' ');

    return capitalizedString;
}

export const setTheme = (color) => {
	document.documentElement.removeAttribute("style");
	const colorBlack = {
		"--text-first": "#fff",
		"--bg-tab": "#635FC7",
		"--text-second": "#828FA3",
		"--bg-aside": "#3E3F4E",
		"--bg-body": "#2B2C37",
        "--text-primary": "#fff",
        "--bg-dark": "#2B2C37",
        "--text-modal": "#fff",
        "--bg-modal-btn": "#fff",
        "--text-delete": "#EA5555",
        "--bg-cancel": "#fff",
	};
	const colorWhite = {
		"--text-first": "#fff",
		"--bg-tab": "#635FC7",
		"--text-second": "#828FA3",
		"--bg-aside": "#fff",
		"--bg-body": "#F4F7FD",
        "--text-primary": "#000",
        "--bg-dark": "#E9EFFA",
        "--text-modal": "#828FA3",
        "--bg-modal-btn": "#F4F7FD",
        "--text-delete": "#EA5555",
        "--bg-cancel": "#F4F7FD",
	};
	const colors = color ? colorWhite : colorBlack;
	for (const item in colors) {
		document.documentElement.style.setProperty(
			item,
			color ? colorWhite?.[item] : colorBlack?.[item]
		);
	}
	return;
};
