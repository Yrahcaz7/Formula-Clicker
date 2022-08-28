const options = [{
	title: "Background Color",
	id: "bg_col",
	type: "color",
	default() {
		return getComputedStyle(document.querySelector(':root')).getPropertyValue("--background-color").trim();
	},
	set(value) {
		document.querySelector(':root').style.setProperty("--background-color", value);
	},
}, {
	title: "Text Color",
	id: "txt_col",
	type: "color",
	default() {
		return getComputedStyle(document.querySelector(':root')).getPropertyValue("--text-color").trim();
	},
	set(value) {
		document.querySelector(':root').style.setProperty("--text-color", value);
	},
}];
