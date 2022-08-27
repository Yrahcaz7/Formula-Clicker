const ID = "Yrahcaz7/Formula-Clicker/save";

function hardReset() {
	localStorage.removeItem(ID);
	game = null;
	location.reload();
};

function save() {
	let proxy = btoa(JSON.stringify(game));
	localStorage.setItem(ID, proxy);
};

function load() {
	let get = localStorage.getItem(ID);
	if (get) {
		get = JSON.parse(atob(get).replace(/null/g, "1.7976931348623157e308"));
		Object.assign(game, get);
	};
};

function exportSave(elementId) {
	if (document.getElementById(elementId)) {
		document.getElementById(elementId).innerHTML = btoa(JSON.stringify(game));
		return true;
	} else return false;
};

function importSave(save) {
	let get = JSON.parse(atob(save));
	if (get) {
		Object.assign(game, get);
		location.reload();
	};
};

window.onbeforeunload = () => {
	save();
};
