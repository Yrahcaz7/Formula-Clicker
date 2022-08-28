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
}, {
	title: "Text Size",
	id: "txt_px",
	type: "number",
	min: 8,
	max: 32,
	default() {
		return getComputedStyle(document.querySelector(':root')).getPropertyValue("--text-size").trim();
	},
	set(value) {
		document.querySelector(':root').style.setProperty("--text-size", value);
	},
}, {
	title: "Show Maxed Improvements",
	id: "show_max_imp",
	type: "checkbox",
	min: 8,
	max: 32,
	default() {
		if (game.options[this.id]) return !!game.options[this.id];
		return true;
	},
}];
