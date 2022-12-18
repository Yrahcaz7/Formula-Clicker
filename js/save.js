const ID = "Yrahcaz7/Formula-Clicker/save";

/**
 * resets everything.
 */
function hardReset() {
	if (!confirm("Are you really sure you want to reset EVERYTHING?")) return;
	localStorage.removeItem(ID);
	game = undefined;
	location.reload();
};

/**
 * retrieves the save proxy.
 * @returns {string} proxy
 */
function getProxy() {
	if (!game) return "";
	// initialize proxy
	let get = JSON.stringify(game).replace(/Â/g, "");
	// simplify numbers and null
	get = get.replace(/e\+/g, "e").replace(/1.7976931348620926e308/g, "null").replace(/null/g, "!N");
	// simplify true and false
	get = get.replace(/true/g, "!T").replace(/false/g, "!F");
	// simplify !F chains
	while (/(!F,)+!F/.test(get)) {
		let find = /(!F,)+!F/.exec(get)[0];
		get = get.replace(find, "@F" + ((find.length + 1) / 3));
	};
	// simplify !T chains
	while (/(!T,)+!T/.test(get)) {
		let find = /(!T,)+!T/.exec(get)[0];
		get = get.replace(find, "@T" + ((find.length + 1) / 3));
	};
	// simplify technical
	get = get.replace(/":"/g, "=").replace(/","/g, " ");
	// return proxy
	return btoa(get.replace(/Â/g, ""));
};

/**
 * converts a save proxy to an object.
 * returns undefined on failure.
 * @param {string} save - save proxy to use instead of default.
 * @returns {object | undefined} object
 */
function normalizeSave(save = localStorage.getItem(ID)) {
	if (!save) return undefined;
	save = atob(save).replace(/Â/g, "");
	// undo shortening
	if (save.includes("version")) {
		// expand technical
		save = save.replace(/=/g, '":"').replace(/ /g, '","');
		// expand !T chains
		save = save.replace(/@T(\d+)/g, (substring, number) => "!T,".repeat(number - 1) + "!T");
		// expand !F chains
		save = save.replace(/@F(\d+)/g, (substring, number) => "!F,".repeat(number - 1) + "!F");
		// expand true and false
		save = save.replace(/!F/g, "false").replace(/!T/g, "true");
	} else {
		// undo shortening from old versions
		save = save.replace(/<>/g, ")tab=½&unlocks´\"").replace(/P;/g, "&¾Points").replace(/¿/g, ")frame(").replace(/\|/g, "infinity").replace(/\~/g, "milestones").replace(/®¢(\d+)/g, (s, number) => "¢".repeat(+number)).replace(/®¡(\d+)/g, (s, number) => "¡".repeat(+number)).replace(/®T(\d+)/g, (s, number) => "!T,".repeat(number - 1) + "!T").replace(/®F(\d+)/g, (s, number) => "!F,".repeat(number - 1) + "!F").replace(/\^(\d+)/g, (s, number) => "0".repeat(+number)).replace(/¡/g, ",0").replace(/¢/g, ",1").replace(/£/g, ",2").replace(/¤/g, ",3").replace(/¥/g, ",4").replace(/¦/g, ",5").replace(/§/g, ",6").replace(/¨/g, ",7").replace(/©/g, ",8").replace(/ª/g, ",9").replace(/\$/g, "=#").replace(/´/g, "([").replace(/µ/g, "])").replace(/·/g, "({\"").replace(/¸/g, "})").replace(/¹/g, ")¶").replace(/»/g, "«(").replace(/º/g, "¬(").replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/\(/g, "\":").replace(/\)/g, ",\"").replace(/!F/g, "false").replace(/!T/g, "true").replace(/¶/g, "point").replace(/«/g, "Best").replace(/¬/g, "Total").replace(/¯/g, "min").replace(/°/g, "max").replace(/±/g, "Min").replace(/²/g, "Max").replace(/³/g, "upgrades").replace(/¼/g, "improvements").replace(/½/g, "options").replace(/¾/g, "wave").replace(/s;/g, "startTime").replace(/f;/g, "finishTime").replace(/c;/g, "clicks").replace(/bg;/g, "bg_col").replace(/tx;/g, "txt_col").replace(/px;/g, "txt_px").replace(/sh;/g, "show_max_imp").replace(/b;/g, "best").replace(/i;/g, "stage");
	};
	// fix numbers
	save = save.replace(/null|!N/g, "1.7976931348620926e308");
	// fix decimals
	let result = JSON.parse(save.replace(/Â/g, ""));
	result.infinity.best.points = new Decimal(result.infinity.best.points);
	for (const key in result) {
		if (Object.hasOwnProperty.call(result, key)) {
			if (key == "points" || key == "pointBest" || key == "pointTotal") result[key] = new Decimal(result[key]);
		};
	};
	// update version
	result.version = "v1.2";
	// return result
	return result;
};

/**
 * resets the page.
 */
function setPage() {
	document.body.innerHTML = "<div class='outer'><div class='inner'><div id='main'>";
};

/**
 * loads your save.
 */
function load() {
	// setup the page
	setPage();
	// load the save
	let save = localStorage.getItem(ID);
	if (save) Object.assign(game, normalizeSave(save));
	// garbage collection (for old versions)
	delete game.wave.pointTotal;
	delete game.wave.pointMax;
	delete game.wave.pointGen;
	delete game.wave.min;
	delete game.wave.max;
	delete game.infinity.pointBest;
	delete game.infinity.pointTotal;
	// name changes (from old versions)
	if (game.time) game.startTime = game.time;
	delete game.time;
	if (game.options.bg_col) game.options.bc = game.options.bg_col;
	delete game.options.bg_col;
	if (game.options.txt_col) game.options.tc = game.options.txt_col;
	delete game.options.txt_col;
	if (game.options.txt_px) game.options.ts = game.options.txt_px;
	delete game.options.txt_px;
	if (game.options.show_max_imp) game.options.sm = game.options.show_max_imp;
	delete game.options.show_max_imp;
	if (game.options.num_note) game.options.nn = game.options.num_note;
	delete game.options.num_note;
	if (game.infinity.best.wave_points) game.infinity.best.wavePoints = game.infinity.best.wave_points;
	else if (game.infinity.best.wavePoints === undefined) game.infinity.best.wavePoints = game.wave.pointBest;
	delete game.infinity.best.wave_points;
	// other old version fixes
	if (!game.finishTime) game.finishTime = -1;
};

/**
 * imports an external save.
 * @param {string} save - the save proxy to import.
 */
function importSave(save) {
	if (!save) return;
	Object.assign(game, normalizeSave(save));
	location.reload();
};

window.onbeforeunload = () => { // saves the game
	let proxy = getProxy();
	if (proxy) localStorage.setItem(ID, proxy);
};
