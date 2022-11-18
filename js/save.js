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
	let get = JSON.stringify(game).replace(/Â/g, "");
	get = get.replace(/e\+/g, "e").replace(/1.7976931348620926e308/g, "null").replace(/null/g, "!N");
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
	// undo shortening from old versions
	save = save.replace(/<>/g, ")tab=½&unlocks´\""); // constant
	save = save.replace(/P;/g, "&¾Points").replace(/¿/g, ")frame(").replace(/\|/g, "infinity").replace(/\~/g, "milestones"); // more words
	save = save.replace(/®¢(\d+)/g, (substring, number) => "¢".repeat(+number)); // ¢ chains
	save = save.replace(/®¡(\d+)/g, (substring, number) => "¡".repeat(+number)); // ¡ chains
	save = save.replace(/®T(\d+)/g, (substring, number) => "!T,".repeat(number - 1) + "!T"); // !T chains
	save = save.replace(/®F(\d+)/g, (substring, number) => "!F,".repeat(number - 1) + "!F"); // !F chains
	save = save.replace(/\^(\d+)/g, (substring, number) => "0".repeat(+number)); // 0 chains
	save = save.replace(/¡/g, ",0").replace(/¢/g, ",1").replace(/£/g, ",2").replace(/¤/g, ",3").replace(/¥/g, ",4").replace(/¦/g, ",5").replace(/§/g, ",6").replace(/¨/g, ",7").replace(/©/g, ",8").replace(/ª/g, ",9"); // item numbers
	save = save.replace(/\$/g, "=#").replace(/´/g, "([").replace(/µ/g, "])").replace(/·/g, "({\"").replace(/¸/g, "})").replace(/¹/g, ")¶").replace(/»/g, "«(").replace(/º/g, "¬("); // advanced technical
	save = save.replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/\(/g, "\":").replace(/\)/g, ",\""); // technical
	save = save.replace(/!F/g, "false").replace(/!T/g, "true"); // booleans
	save = save.replace(/¶/g, "point").replace(/«/g, "Best").replace(/¬/g, "Total").replace(/¯/g, "min").replace(/°/g, "max").replace(/±/g, "Min").replace(/²/g, "Max").replace(/³/g, "upgrades").replace(/¼/g, "improvements").replace(/½/g, "options").replace(/¾/g, "wave").replace(/s;/g, "startTime").replace(/f;/g, "finishTime").replace(/c;/g, "clicks").replace(/bg;/g, "bg_col").replace(/tx;/g, "txt_col").replace(/px;/g, "txt_px").replace(/sh;/g, "show_max_imp").replace(/b;/g, "best").replace(/i;/g, "stage"); // words
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
	// return result
	return result;
};

/**
 * resets the page.
 */
function setPage() {
	document.body.innerHTML = "<div class=outer><div class=inner><div id=main>";
};

/**
 * loads your save.
 */
function load() {
	setPage();
	if (!localStorage.getItem(ID)) return;
	Object.assign(game, normalizeSave());
};

/**
 * imports an external save.
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
