const ID = "Yrahcaz7/Formula-Clicker/save";

function hardReset() {
	localStorage.removeItem(ID);
	game = null;
	location.reload();
};

function getProxy() {
	get = JSON.stringify(game).replace(/Â/g, "");
	get = get.replace(/e\+/g, "e"); // numbers
	get = get.replace(/point/g, "¶").replace(/Best/g, "«").replace(/Total/g, "¬").replace(/Display/g, "®").replace(/min/g, "¯").replace(/max/g, "°").replace(/Min/g, "±").replace(/Max/g, "²").replace(/upgrades/g, "³").replace(/improvements/g, "¼").replace(/options/g, "½").replace(/wave/g, "¾"); // words
	get = get.replace(/false/g, "!0").replace(/true/g, "!1"); // booleans
	get = get.replace(/","/g, "&").replace(/":"/g, "=").replace(/":/g, "(").replace(/,"/g, ")"); // technical
	get = get.replace(/=#/g, "$").replace(/\(\[/g, "´").replace(/\]\)/g, "µ").replace(/\(\{"/g, "·").replace(/\}\)/g, "¸").replace(/\)¶/g, "¹").replace(/«\(/g, "»").replace(/¬\(/g, "º"); // advanced technical
	get = get.replace(/,0/g, "¡").replace(/,1/g, "¢").replace(/,2/g, "£").replace(/,3/g, "¤").replace(/,4/g, "¥").replace(/,5/g, "¦").replace(/,6/g, "§").replace(/,7/g, "¨").replace(/,8/g, "©").replace(/,9/g, "ª"); // item numbers
	get = get.replace(/000000000/g, "^9").replace(/00000000/g, "^8").replace(/0000000/g, "^7").replace(/000000/g, "^6").replace(/00000/g, "^5").replace(/0000/g, "^4").replace(/000/g, "^3"); // zero chains
	get = get.replace(/\)frame\(/g, "¿").replace(/infinity/g, "|").replace(/milestones/g, "~"); // more words
	get = get.replace(/\)tab=½&unlocks´"/g, "<>"); // constant
	return btoa(get.replace(/Â/g, ""));
};

function normalizeSave(save = localStorage.getItem(ID)) {
	if (!save) return null;
	save = atob(save).replace(/Â/g, "");
	save = save.replace(/<>/g, ")tab=½&unlocks´\""); // constant
	save = save.replace(/¿/g, ")frame(").replace(/\|/g, "infinity").replace(/\~/g, "milestones"); // more words
	save = save.replace(/\^9/g, "000000000").replace(/\^8/g, "00000000").replace(/\^7/g, "0000000").replace(/\^6/g, "000000").replace(/\^5/g, "00000").replace(/\^4/g, "0000").replace(/\^3/g, "000"); // zero chains
	save = save.replace(/¡/g, ",0").replace(/¢/g, ",1").replace(/£/g, ",2").replace(/¤/g, ",3").replace(/¥/g, ",4").replace(/¦/g, ",5").replace(/§/g, ",6").replace(/¨/g, ",7").replace(/©/g, ",8").replace(/ª/g, ",9"); // item numbers
	save = save.replace(/\$/g, "=#").replace(/´/g, "([").replace(/µ/g, "])").replace(/·/g, "({\"").replace(/¸/g, "})").replace(/¹/g, ")¶").replace(/»/g, "«(").replace(/º/g, "¬("); // advanced technical
	save = save.replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/\(/g, "\":").replace(/\)/g, ",\""); // technical
	save = save.replace(/!0/g, "false").replace(/!1/g, "true"); // booleans
	save = save.replace(/¶/g, "point").replace(/«/g, "Best").replace(/¬/g, "Total").replace(/®/g, "Display").replace(/¯/g, "min").replace(/°/g, "max").replace(/±/g, "Min").replace(/²/g, "Max").replace(/³/g, "upgrades").replace(/¼/g, "improvements").replace(/½/g, "options").replace(/¾/g, "wave"); // words
	save = save.replace(/null/g, "1.7976931348623157e308"); // numbers
	return JSON.parse(save.replace(/Â/g, ""));
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
