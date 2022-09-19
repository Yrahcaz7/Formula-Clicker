const ID = "Yrahcaz7/Formula-Clicker/save";

function hardReset() {
	localStorage.removeItem(ID);
	game = null;
	location.reload();
};

function getProxy() {
	get = JSON.stringify(game).replace(/Â/g, "");
	get = get.replace(/e\+/g, "e"); // numbers
	get = get.replace(/point/g, "¶").replace(/Best/g, "«").replace(/Total/g, "¬").replace(/min/g, "¯").replace(/max/g, "°").replace(/Min/g, "±").replace(/Max/g, "²").replace(/upgrades/g, "³").replace(/improvements/g, "¼").replace(/options/g, "½").replace(/wave/g, "¾"); // words
	get = get.replace(/false/g, "!F").replace(/true/g, "!T"); // booleans
	get = get.replace(/","/g, "&").replace(/":"/g, "=").replace(/":/g, "(").replace(/,"/g, ")"); // technical
	get = get.replace(/=#/g, "$").replace(/\(\[/g, "´").replace(/\]\)/g, "µ").replace(/\(\{"/g, "·").replace(/\}\)/g, "¸").replace(/\)¶/g, "¹").replace(/«\(/g, "»").replace(/¬\(/g, "º"); // advanced technical
	get = get.replace(/,0/g, "¡").replace(/,1/g, "¢").replace(/,2/g, "£").replace(/,3/g, "¤").replace(/,4/g, "¥").replace(/,5/g, "¦").replace(/,6/g, "§").replace(/,7/g, "¨").replace(/,8/g, "©").replace(/,9/g, "ª"); // item numbers
	get = get.replace(/000000000/g, "^9").replace(/00000000/g, "^8").replace(/0000000/g, "^7").replace(/000000/g, "^6").replace(/00000/g, "^5").replace(/0000/g, "^4").replace(/000/g, "^3"); // zero chains
	get = get.replace(/!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F/g, "®F19").replace(/!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F/g, "®F18").replace(/!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F/g, "®F17").replace(/!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F/g, "®F16").replace(/!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F/g, "®F15").replace(/!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F/g, "®F14").replace(/!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F/g, "®F13").replace(/!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F/g, "®F12").replace(/!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F/g, "®F11").replace(/!F,!F,!F,!F,!F,!F,!F,!F,!F,!F/g, "®F10").replace(/!F,!F,!F,!F,!F,!F,!F,!F,!F/g, "®F9").replace(/!F,!F,!F,!F,!F,!F,!F,!F/g, "®F8").replace(/!F,!F,!F,!F,!F,!F,!F/g, "®F7").replace(/!F,!F,!F,!F,!F,!F/g, "®F6").replace(/!F,!F,!F,!F,!F/g, "®F5").replace(/!F,!F,!F,!F/g, "®F4").replace(/!F,!F,!F/g, "®F3").replace(/!F,!F/g, "®F2"); // !F chains
	get = get.replace(/!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T/g, "®T19").replace(/!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T/g, "®T18").replace(/!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T/g, "®T17").replace(/!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T/g, "®T16").replace(/!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T/g, "®T15").replace(/!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T/g, "®T14").replace(/!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T/g, "®T13").replace(/!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T/g, "®T12").replace(/!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T/g, "®T11").replace(/!T,!T,!T,!T,!T,!T,!T,!T,!T,!T/g, "®T10").replace(/!T,!T,!T,!T,!T,!T,!T,!T,!T/g, "®T9").replace(/!T,!T,!T,!T,!T,!T,!T,!T/g, "®T8").replace(/!T,!T,!T,!T,!T,!T,!T/g, "®T7").replace(/!T,!T,!T,!T,!T,!T/g, "®T6").replace(/!T,!T,!T,!T,!T/g, "®T5").replace(/!T,!T,!T,!T/g, "®T4").replace(/!T,!T,!T/g, "®T3").replace(/!T,!T/g, "®T2"); // !T chains
	get = get.replace(/¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡/g, "®¡22").replace(/¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡/g, "®¡21").replace(/¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡/g, "®¡20").replace(/¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡/g, "®¡19").replace(/¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡/g, "®¡18").replace(/¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡/g, "®¡17").replace(/¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡/g, "®¡16").replace(/¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡/g, "®¡15").replace(/¡¡¡¡¡¡¡¡¡¡¡¡¡¡/g, "®¡14").replace(/¡¡¡¡¡¡¡¡¡¡¡¡¡/g, "®¡13").replace(/¡¡¡¡¡¡¡¡¡¡¡¡/g, "®¡12").replace(/¡¡¡¡¡¡¡¡¡¡¡/g, "®¡11").replace(/¡¡¡¡¡¡¡¡¡¡/g, "®¡10").replace(/¡¡¡¡¡¡¡¡¡/g, "®¡9").replace(/¡¡¡¡¡¡¡¡/g, "®¡8").replace(/¡¡¡¡¡¡¡/g, "®¡7").replace(/¡¡¡¡¡¡/g, "®¡6").replace(/¡¡¡¡¡/g, "®¡5").replace(/¡¡¡¡/g, "®¡4"); // ¡ chains
	get = get.replace(/¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢/g, "®¢22").replace(/¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢/g, "®¢21").replace(/¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢/g, "®¢20").replace(/¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢/g, "®¢19").replace(/¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢/g, "®¢18").replace(/¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢/g, "®¢17").replace(/¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢/g, "®¢16").replace(/¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢/g, "®¢15").replace(/¢¢¢¢¢¢¢¢¢¢¢¢¢¢/g, "®¢14").replace(/¢¢¢¢¢¢¢¢¢¢¢¢¢/g, "®¢13").replace(/¢¢¢¢¢¢¢¢¢¢¢¢/g, "®¢12").replace(/¢¢¢¢¢¢¢¢¢¢¢/g, "®¢11").replace(/¢¢¢¢¢¢¢¢¢¢/g, "®¢10").replace(/¢¢¢¢¢¢¢¢¢/g, "®¢9").replace(/¢¢¢¢¢¢¢¢/g, "®¢8").replace(/¢¢¢¢¢¢¢/g, "®¢7").replace(/¢¢¢¢¢¢/g, "®¢6").replace(/¢¢¢¢¢/g, "®¢5").replace(/¢¢¢¢/g, "®¢4"); // ¢ chains
	get = get.replace(/\)frame\(/g, "¿").replace(/infinity/g, "|").replace(/milestones/g, "~"); // more words
	get = get.replace(/\)tab=½&unlocks´"/g, "<>"); // constant
	return btoa(get.replace(/Â/g, ""));
};

function normalizeSave(save = localStorage.getItem(ID)) {
	if (!save) return null;
	save = atob(save).replace(/Â/g, "");
	save = save.replace(/<>/g, ")tab=½&unlocks´\""); // constant
	save = save.replace(/¿/g, ")frame(").replace(/\|/g, "infinity").replace(/\~/g, "milestones"); // more words
	save = save.replace(/®¢22/g, "¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢").replace(/®¢21/g, "¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢").replace(/®¢20/g, "¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢").replace(/®¢19/g, "¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢").replace(/®¢18/g, "¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢").replace(/®¢17/g, "¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢").replace(/®¢16/g, "¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢").replace(/®¢15/g, "¢¢¢¢¢¢¢¢¢¢¢¢¢¢¢").replace(/®¢14/g, "¢¢¢¢¢¢¢¢¢¢¢¢¢¢").replace(/®¢13/g, "¢¢¢¢¢¢¢¢¢¢¢¢¢").replace(/®¢12/g, "¢¢¢¢¢¢¢¢¢¢¢¢").replace(/®¢11/g, "¢¢¢¢¢¢¢¢¢¢¢").replace(/®¢10/g, "¢¢¢¢¢¢¢¢¢¢").replace(/®¢9/g, "¢¢¢¢¢¢¢¢¢").replace(/®¢8/g, "¢¢¢¢¢¢¢¢").replace(/®¢7/g, "¢¢¢¢¢¢¢").replace(/®¢6/g, "¢¢¢¢¢¢").replace(/®¢5/g, "¢¢¢¢¢").replace(/®¢4/g, "¢¢¢¢"); // ¢ chains
	save = save.replace(/®¡22/g, "¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡").replace(/®¡21/g, "¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡").replace(/®¡20/g, "¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡").replace(/®¡19/g, "¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡").replace(/®¡18/g, "¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡").replace(/®¡17/g, "¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡").replace(/®¡16/g, "¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡").replace(/®¡15/g, "¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡").replace(/®¡14/g, "¡¡¡¡¡¡¡¡¡¡¡¡¡¡").replace(/®¡13/g, "¡¡¡¡¡¡¡¡¡¡¡¡¡").replace(/®¡12/g, "¡¡¡¡¡¡¡¡¡¡¡¡").replace(/®¡11/g, "¡¡¡¡¡¡¡¡¡¡¡").replace(/®¡10/g, "¡¡¡¡¡¡¡¡¡¡").replace(/®¡9/g, "¡¡¡¡¡¡¡¡¡").replace(/®¡8/g, "¡¡¡¡¡¡¡¡").replace(/®¡7/g, "¡¡¡¡¡¡¡").replace(/®¡6/g, "¡¡¡¡¡¡").replace(/®¡5/g, "¡¡¡¡¡").replace(/®¡4/g, "¡¡¡¡"); // ¡ chains
	save = save.replace(/®T19/g, "!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T").replace(/®T18/g, "!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T").replace(/®T17/g, "!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T").replace(/®T16/g, "!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T").replace(/®T15/g, "!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T").replace(/®T14/g, "!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T").replace(/®T13/g, "!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T").replace(/®T12/g, "!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T").replace(/®T11/g, "!T,!T,!T,!T,!T,!T,!T,!T,!T,!T,!T").replace(/®T10/g, "!T,!T,!T,!T,!T,!T,!T,!T,!T,!T").replace(/®T9/g, "!T,!T,!T,!T,!T,!T,!T,!T,!T").replace(/®T8/g, "!T,!T,!T,!T,!T,!T,!T,!T").replace(/®T7/g, "!T,!T,!T,!T,!T,!T,!T").replace(/®T6/g, "!T,!T,!T,!T,!T,!T").replace(/®T5/g, "!T,!T,!T,!T,!T").replace(/®T4/g, "!T,!T,!T,!T").replace(/®T3/g, "!T,!T,!T").replace(/®T2/g, "!T,!T"); // !T chains
	save = save.replace(/®F19/g, "!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F").replace(/®F18/g, "!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F").replace(/®F17/g, "!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F").replace(/®F16/g, "!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F").replace(/®F15/g, "!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F").replace(/®F14/g, "!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F").replace(/®F13/g, "!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F").replace(/®F12/g, "!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F").replace(/®F11/g, "!F,!F,!F,!F,!F,!F,!F,!F,!F,!F,!F").replace(/®F10/g, "!F,!F,!F,!F,!F,!F,!F,!F,!F,!F").replace(/®F9/g, "!F,!F,!F,!F,!F,!F,!F,!F,!F").replace(/®F8/g, "!F,!F,!F,!F,!F,!F,!F,!F").replace(/®F7/g, "!F,!F,!F,!F,!F,!F,!F").replace(/®F6/g, "!F,!F,!F,!F,!F,!F").replace(/®F5/g, "!F,!F,!F,!F,!F").replace(/®F4/g, "!F,!F,!F,!F").replace(/®F3/g, "!F,!F,!F").replace(/®F2/g, "!F,!F"); // !F chains
	save = save.replace(/\^9/g, "000000000").replace(/\^8/g, "00000000").replace(/\^7/g, "0000000").replace(/\^6/g, "000000").replace(/\^5/g, "00000").replace(/\^4/g, "0000").replace(/\^3/g, "000"); // zero chains
	save = save.replace(/¡/g, ",0").replace(/¢/g, ",1").replace(/£/g, ",2").replace(/¤/g, ",3").replace(/¥/g, ",4").replace(/¦/g, ",5").replace(/§/g, ",6").replace(/¨/g, ",7").replace(/©/g, ",8").replace(/ª/g, ",9"); // item numbers
	save = save.replace(/\$/g, "=#").replace(/´/g, "([").replace(/µ/g, "])").replace(/·/g, "({\"").replace(/¸/g, "})").replace(/¹/g, ")¶").replace(/»/g, "«(").replace(/º/g, "¬("); // advanced technical
	save = save.replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/\(/g, "\":").replace(/\)/g, ",\""); // technical
	save = save.replace(/!F/g, "false").replace(/!T/g, "true"); // booleans
	save = save.replace(/¶/g, "point").replace(/«/g, "Best").replace(/¬/g, "Total").replace(/¯/g, "min").replace(/°/g, "max").replace(/±/g, "Min").replace(/²/g, "Max").replace(/³/g, "upgrades").replace(/¼/g, "improvements").replace(/½/g, "options").replace(/¾/g, "wave"); // words
	save = save.replace(/null/g, "1.7976931348623157e308"); // numbers
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
