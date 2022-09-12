const options = [{
	title: "Background Color",
	id: "bg_col",
	type: "color",
	default: "#dddddd",
	value() {
		let val = getComputedStyle(document.querySelector(':root')).getPropertyValue("--background-color").trim();
		if (val) return val;
		return this.default;
	},
	set(value) {
		document.querySelector(':root').style.setProperty("--background-color", value);
	},
}, {
	title: "Text Color",
	id: "txt_col",
	type: "color",
	default: "#000000",
	value() {
		let val = getComputedStyle(document.querySelector(':root')).getPropertyValue("--text-color").trim();
		if (val) return val;
		return this.default;
	},
	set(value) {
		document.querySelector(':root').style.setProperty("--text-color", value);
	},
}, {
	title: "Text Size",
	id: "txt_px",
	type: "number",
	default: "18px",
	min: 8,
	max: 32,
	value() {
		let val = getComputedStyle(document.querySelector(':root')).getPropertyValue("--text-size").trim();
		if (val) return val;
		return this.default;
	},
	set(value) {
		document.querySelector(':root').style.setProperty("--text-size", value);
	},
}, {
	title: "Show Maxed Improvements",
	id: "show_max_imp",
	type: "checkbox",
	default: true,
	value() {
		let val = game.options[this.id];
		if (val !== undefined) return val;
		return this.default;
	},
}, {
	title: "Number Notation",
	id: "num_note",
	type: "dropdown",
	default: "scientific",
	list: ["scientific", "mixed scientific", "engineering", "mixed engineering", "short", "letters: scientific", "letters: engineering"],
	intList: ["sci", "mixsci", "eng", "mixeng", "sho", "letsci", "leteng"],
	value() {
		let val = game.options[this.id];
		if (val !== undefined) return val;
		return this.default;
	},
}, {
	title: "Export Save",
	id: "ex_save",
	type: "export",
	value() {
		return getProxy();
	},
}, {
	title: "Import Save",
	id: "im_save",
	type: "import",
	set(value) {
		if (!value) return;
		if (confirm("Are you sure?")) importSave(value);
	},
}];
