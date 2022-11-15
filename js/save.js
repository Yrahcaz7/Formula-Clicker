const ID = "Yrahcaz7/Formula-Clicker/save";

function hardReset() {
	localStorage.removeItem(ID);
	game = null;
	location.reload();
};

function getProxy() {
	get = JSON.stringify(game).replace(/Â/g, "");
	get = get.replace(/e\+/g, "e").replace(/1.7976931348620926e308/g, "null"); // numbers
	get = get.replace(/point/g, "¶").replace(/Best/g, "«").replace(/Total/g, "¬").replace(/min/g, "¯").replace(/max/g, "°").replace(/Min/g, "±").replace(/Max/g, "²").replace(/upgrades/g, "³").replace(/improvements/g, "¼").replace(/options/g, "½").replace(/wave/g, "¾").replace(/startTime/g, "s;").replace(/finishTime/g, "f;"); // words
	get = get.replace(/false/g, "!F").replace(/true/g, "!T"); // booleans
	get = get.replace(/","/g, "&").replace(/":"/g, "=").replace(/":/g, "(").replace(/,"/g, ")"); // technical
	get = get.replace(/=#/g, "$").replace(/\(\[/g, "´").replace(/\]\)/g, "µ").replace(/\(\{"/g, "·").replace(/\}\)/g, "¸").replace(/\)¶/g, "¹").replace(/«\(/g, "»").replace(/¬\(/g, "º"); // advanced technical
	get = get.replace(/,0/g, "¡").replace(/,1/g, "¢").replace(/,2/g, "£").replace(/,3/g, "¤").replace(/,4/g, "¥").replace(/,5/g, "¦").replace(/,6/g, "§").replace(/,7/g, "¨").replace(/,8/g, "©").replace(/,9/g, "ª"); // item numbers
	while (/0{3,}/.test(get)) {
		let find = /0{3,}/.exec(get)[0];
		get = get.replace(find, "^" + find.length); // 0 chains
	};
	while (/(!F,)+!F/.test(get)) {
		let find = /(!F,)+!F/.exec(get)[0];
		get = get.replace(find, "®F" + ((find.length + 1) / 3)); // !F chains
	};
	while (/(!T,)+!T/.test(get)) {
		let find = /(!T,)+!T/.exec(get)[0];
		get = get.replace(find, "®T" + ((find.length + 1) / 3)); // !T chains
	};
	while (/(¡){4,}/.test(get)) {
		let find = /(¡){4,}/.exec(get)[0];
		get = get.replace(find, "®¡" + (find.length / 2)); // ¡ chains
	};
	while (/(¢){4,}/.test(get)) {
		let find = /(¢){4,}/.exec(get)[0];
		get = get.replace(find, "®¢" + (find.length / 2)); // ¢ chains
	};
	get = get.replace(/\)frame\(/g, "¿").replace(/infinity/g, "|").replace(/milestones/g, "~"); // more words
	get = get.replace(/\)tab=½&unlocks´"/g, "<>"); // constant
	return btoa(get.replace(/Â/g, ""));
};

function normalizeSave(save = localStorage.getItem(ID)) {
	if (!save) return null;
	save = atob(save).replace(/Â/g, "");
	save = save.replace(/<>/g, ")tab=½&unlocks´\""); // constant
	save = save.replace(/¿/g, ")frame(").replace(/\|/g, "infinity").replace(/\~/g, "milestones"); // more words
	save = save.replace(/®¢(\d+)/g, (substring, number) => "¢".repeat(+number)); // ¢ chains
	save = save.replace(/®¡(\d+)/g, (substring, number) => "¡".repeat(+number)); // ¡ chains
	save = save.replace(/®T(\d+)/g, (substring, number) => "!T,".repeat(number - 1) + "!T"); // !T chains
	save = save.replace(/®F(\d+)/g, (substring, number) => "!F,".repeat(number - 1) + "!F"); // !F chains
	save = save.replace(/\^(\d+)/g, (substring, number) => "0".repeat(+number)); // 0 chains
	save = save.replace(/¡/g, ",0").replace(/¢/g, ",1").replace(/£/g, ",2").replace(/¤/g, ",3").replace(/¥/g, ",4").replace(/¦/g, ",5").replace(/§/g, ",6").replace(/¨/g, ",7").replace(/©/g, ",8").replace(/ª/g, ",9"); // item numbers
	save = save.replace(/\$/g, "=#").replace(/´/g, "([").replace(/µ/g, "])").replace(/·/g, "({\"").replace(/¸/g, "})").replace(/¹/g, ")¶").replace(/»/g, "«(").replace(/º/g, "¬("); // advanced technical
	save = save.replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/\(/g, "\":").replace(/\)/g, ",\""); // technical
	save = save.replace(/!F/g, "false").replace(/!T/g, "true"); // booleans
	save = save.replace(/¶/g, "point").replace(/«/g, "Best").replace(/¬/g, "Total").replace(/¯/g, "min").replace(/°/g, "max").replace(/±/g, "Min").replace(/²/g, "Max").replace(/³/g, "upgrades").replace(/¼/g, "improvements").replace(/½/g, "options").replace(/¾/g, "wave").replace(/s;/g, "startTime").replace(/f;/g, "finishTime"); // words
	save = save.replace(/null/g, "1.7976931348620926e308"); // numbers
	// decimal conversion
	let result = JSON.parse(save.replace(/Â/g, ""));
	result.infinity.best.points = new Decimal(result.infinity.best.points);
	for (const key in result) {
		if (Object.hasOwnProperty.call(result, key)) {
			if (key == "points" || key == "pointBest" || key == "pointTotal") result[key] = new Decimal(result[key]);
		};
	};
	// fixes
	if (result.infinity.stage === undefined) result.infinity.stage = 1;
	// return result
	return result;
};

function setPage() {
	document.body.innerHTML = "<div class=outer><div class=inner><div id=main>";
};

function load() {
	setPage();
	if (!localStorage.getItem(ID)) return;
	Object.assign(game, normalizeSave());
};

function importSave(save) {
	if (!save) return;
	Object.assign(game, normalizeSave(save));
	location.reload();
};

window.onbeforeunload = () => {
	let proxy = getProxy();
	if (proxy) localStorage.setItem(ID, proxy);
};
