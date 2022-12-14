const options = [{
	title: "Background Color",
	id: "bc",
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
	id: "tc",
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
	id: "ts",
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
	id: "sm",
	type: "checkbox",
	default: true,
	value() {
		let val = game.options[this.id];
		if (val !== undefined) return val;
		return this.default;
	},
}, {
	title: "Number Notation",
	id: "nn",
	type: "dropdown",
	default: "scientific",
	list: ["scientific", "mixed scientific", "engineering", "mixed engineering", "short", "logarithm", "percentage of infinity", "letters: scientific", "letters: engineering", "letters: logarithm", "symbols: scientific", "symbols: engineering", "symbols: logarithm"],
	intList: ["sci", "mixsci", "eng", "mixeng", "sho", "log", "inf", "letsci", "leteng", "letlog", "symsci", "symeng", "symlog"],
	value() {
		let val = game.options[this.id];
		if (val !== undefined) return val;
		return this.default;
	},
}, {
	title: "Export Save",
	type: "export",
	value() {
		return getProxy();
	},
}, {
	title: "Import Save",
	type: "import",
	set(value) {
		if (!value) {
			if (confirm("Are you sure? You are importing a blank save. Importing a blank save is equal to resetting all of your progress! Make sure to export your save somewhere safe first!")) hardReset();
			return;
		};
		if (confirm("Are you sure? Make sure to export your save somewhere safe first!")) importSave(value);
	},
}];
