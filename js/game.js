function multiBuy(scale, number, base, points = game.points, divCost = 1) {
	scale = +scale;
	number = +number;
	base = +base;
	if (scale < 0 || number < 0) return [NaN, NaN];
	if (scale == 0 || base <= 0) return [0, Infinity];
	let result = (scale ** number) * base / divCost;
	if (points < result) return [result, 0];
	if (scale == 1) return [Math.floor(points / base * divCost) * base / divCost, Math.floor(points / base * divCost)];
	let mult = 1, count = 1;
	while (true) {
		if (result * (mult + (scale ** count)) > points) break;
		mult += scale ** count;
		count++;
	};
	return [result * mult, count];
};

var game = {
	points: 0,
	pointBest: 0,
	pointTotal: 0,
	clicks: 0,
	tab: "main",
	unlocks: [],
	upgrades: [],
	improvements: [],
	wave: {
		points: 0,
		pointBest: 0,
		pointTotal: 0,
		pointMax: 100,
		pointGen: 0,
		frame: 0,
		min: 0,
		max: 1,
		upgrades: [],
	},
	options: {},
};

function get_alpha() {
	let a = 1;
	a += upgrades[0].effect();
	a += upgrades[1].effect();
	a *= improvements[4].effect();
	return a;
};

function get_beta() {
	let b = 1;
	b += upgrades[2].effect();
	b += upgrades[3].effect();
	b *= improvements[4].effect();
	return b;
};

function get_gamma() {
	let g = 1;
	g += upgrades[4].effect();
	g += upgrades[5].effect();
	g *= improvements[7].effect();
	return g;
};

function get_delta() {
	let d = 0;
	d += upgrades[6].effect();
	d += upgrades[7].effect();
	d *= improvements[8].effect();
	return d;
};

function get_epsilon() {
	let e = 0;
	e += upgrades[8].effect();
	e += upgrades[9].effect();
	e *= improvements[9].effect();
	return e;
};

function get_zeta() {
	let z = 0;
	z += upgrades[10].effect();
	z += upgrades[11].effect();
	return z;
};

function get_constant() {
	let co = 2.5;
	co += improvements[0].effect();
	co *= improvements[1].effect();
	co *= improvements[11].effect();
	co *= wave_upgrades[3].effect();
	return co;
};

function get_g_exponent() {
	let g_ex = 2;
	g_ex += improvements[2].effect();
	return g_ex;
};

function get_d_exponent() {
	let d_ex = 0.5;
	d_ex += improvements[6].effect();
	return d_ex;
};

function get_e_exponent() {
	let e_ex = 1.5;
	e_ex += improvements[12].effect();
	return e_ex;
};

function pointButtonGain() {
	let imp = game.improvements[5] + game.improvements[10];
	let a = get_alpha();
	let b = get_beta();
	let g = get_gamma();
	let d = get_delta();
	let e = get_epsilon();
	let z = get_zeta();
	let co = get_constant();
	let g_ex = get_g_exponent();
	let d_ex = get_d_exponent();
	let e_ex = get_e_exponent();
	if (z > 0) return (co * a * b * g * d) * ((1.45 * g) ** (g_ex + (d ** d_ex))) * (e ** e_ex) * ((2 ** z) + (5 * z));
	if (imp >= 4) return (co * a * b * g * d) * ((1.45 * g) ** (g_ex + (d ** d_ex))) * (e ** e_ex);
	if (e > 0) return (co * a * b * g * d) * ((1.45 * g) ** (g_ex + (d ** d_ex))) * (e + 1);
	if (imp >= 3) return (co * a * b * g * d) * ((1.45 * g) ** (g_ex + (d ** d_ex)));
	if (imp >= 2) return (co * a * b * g * d) * (g ** (g_ex + (d ** d_ex)));
	if (imp >= 1) return (co * a * b * g) * (g ** (g_ex + (d ** d_ex)));
	if (d > 0) return (co * a * b) * (g ** (g_ex + (d ** d_ex)));
	if (g > 0) return (co * a * b) * (g ** g_ex);
	if (b > 0) return (co * a * b);
	return a;
};

function buy(type, index, free = false) {
	if (type == "upgrade") {
		if (!upgrades[index].unlocked()) return false;
		let max = Infinity;
		if (upgrades[index].max) max = upgrades[index].max;
		if (game.points >= upgrades[index].cost() && game.upgrades[index] < max) {
			if (!free) game.points -= upgrades[index].cost();
			game.upgrades[index]++;
			return true;
		} else return false;
	} else if (type == "improvement") {
		if (!improvements[index].unlocked()) return false;
		let max = Infinity;
		if (improvements[index].max) max = improvements[index].max;
		if (game.points >= improvements[index].cost() && game.improvements[index] < max) {
			if (!free) game.points -= improvements[index].cost();
			game.improvements[index]++;
			return true;
		} else return false;
	} else if (type == "wave_upgrade") {
		if (!wave_upgrades[index].unlocked()) return false;
		let max = Infinity;
		if (wave_upgrades[index].max) max = wave_upgrades[index].max;
		if (game.wave.points >= wave_upgrades[index].cost() && game.wave.upgrades[index] < max) {
			if (!free) game.wave.points -= wave_upgrades[index].cost();
			game.wave.upgrades[index]++;
			return true;
		} else return false;
	};
	return false;
};

function update() {
	// unlocks
	if (game.points > 0 && !game.unlocks.includes("pointDisplay")) game.unlocks.push("pointDisplay");
	if (game.upgrades[0] > 0 && !game.unlocks.includes("varDisplay")) game.unlocks.push("varDisplay");
	if (game.points >= 1000 && !game.unlocks.includes("tabs")) game.unlocks.push("tabs");
	if (game.improvements[4] > 0 && !game.unlocks.includes("options")) game.unlocks.push("options");
	if (game.improvements[13] > 0 && !game.unlocks.includes("waves")) game.unlocks.push("waves");
	if (game.points >= 1.7976931348623157e308 && !game.unlocks.includes("infinity")) game.unlocks.push("infinity");
	// tabs
	if ((game.unlocks.includes("tabs") || game.unlocks.includes("options")) && !document.getElementById("tabs")) {
		let append = document.createElement("span");
		append.id = "tabs";
		if (document.getElementById("varDisplay")) document.getElementById("main").insertBefore(append, document.getElementById("varDisplay").nextSibling);
		else if (document.getElementById("pointButton")) document.getElementById("main").insertBefore(append, document.getElementById("pointButton").nextSibling);
	};
	if (document.getElementById("tabs") && game.unlocks.includes("tabs")) {
		if (!document.getElementById("tab-main")) {
			let append = document.createElement("button");
			append.id = "tab-main";
			append.type = "button";
			append.className = "tab";
			append.onclick = () => {
				game.tab = "main";
			};
			append.innerHTML = "Main";
			document.getElementById("tabs").appendChild(append);
		};
		if (!document.getElementById("tab-improvements")) {
			let append = document.createElement("button");
			append.id = "tab-improvements";
			append.type = "button";
			append.className = "tab";
			append.onclick = () => {
				game.tab = "improvements";
			};
			append.innerHTML = "Improvements";
			document.getElementById("tabs").appendChild(append);
		};
		if (game.unlocks.includes("options") && !document.getElementById("tab-options")) {
			let append = document.createElement("button");
			append.id = "tab-options";
			append.type = "button";
			append.className = "tab";
			append.onclick = () => {
				game.tab = "options";
			};
			append.innerHTML = "Options";
			document.getElementById("tabs").appendChild(append);
		};
		if (game.unlocks.includes("waves") && !document.getElementById("tab-waves")) {
			let append = document.createElement("button");
			append.id = "tab-waves";
			append.type = "button";
			append.className = "tab";
			append.onclick = () => {
				game.tab = "waves";
			};
			append.innerHTML = "Waves";
			if (document.getElementById("tab-options")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-options"));
			else document.getElementById("tabs").appendChild(append);
		};
		if (game.unlocks.includes("infinity") && !document.getElementById("tab-infinity")) {
			let append = document.createElement("button");
			append.id = "tab-infinity";
			append.type = "button";
			append.className = "tab";
			append.onclick = () => {
				game.tab = "infinity";
			};
			append.innerHTML = "Infinity";
			if (document.getElementById("tab-options")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-options"));
			else document.getElementById("tabs").appendChild(append);
		};
		if (document.getElementById("tab-main")) {
			if (game.tab == "main") document.getElementById("tab-main").className = "tab on";
			else document.getElementById("tab-main").className = "tab";
		};
		if (document.getElementById("tab-improvements")) {
			if (game.tab == "improvements") document.getElementById("tab-improvements").className = "tab on";
			else document.getElementById("tab-improvements").className = "tab";
		};
		if (document.getElementById("tab-options")) {
			if (game.tab == "options") document.getElementById("tab-options").className = "tab on";
			else document.getElementById("tab-options").className = "tab";
		};
		if (document.getElementById("tab-waves")) {
			if (game.tab == "waves") document.getElementById("tab-waves").className = "tab on";
			else document.getElementById("tab-waves").className = "tab";
		};
		if (document.getElementById("tab-infinity")) {
			if (game.tab == "infinity") document.getElementById("tab-infinity").className = "tab on";
			else document.getElementById("tab-infinity").className = "tab";
		};
	};
	// main display
	if (game.unlocks.includes("pointDisplay") && !document.getElementById("pointDisplay")) {
		let append = document.createElement("div");
		append.id = "pointDisplay";
		if (document.getElementById("pointButton")) document.getElementById("main").insertBefore(append, document.getElementById("pointButton"));
		else document.getElementById("main").appendChild(append);
	};
	if (!document.getElementById("pointButton")) {
		let append = document.createElement("button");
		append.id = "pointButton";
		append.type = "button";
		append.onclick = () => {
			// points
			game.points += pointButtonGain();
			game.pointTotal += pointButtonGain();
			if (game.points > game.pointBest) game.pointBest = game.points;
			if (game.points === Infinity) game.points = 1.7976931348623157e308;
			if (game.pointTotal === Infinity) game.pointTotal = 1.7976931348623157e308;
			if (game.pointBest === Infinity) game.pointBest = 1.7976931348623157e308;
			// clicks
			game.clicks++;
			// wave points
			if (game.improvements[15] > 0 && game.wave.points < game.wave.pointMax) {
				let gen = game.wave.pointGen * improvements[15].effect();
				if (gen + game.wave.points > game.wave.pointMax) gen = game.wave.pointMax - game.wave.points;
				game.wave.points += gen;
				game.wave.pointTotal += gen;
				if (game.wave.points > game.wave.pointBest) game.wave.pointBest = game.wave.points;
			};
		};
		document.getElementById("main").appendChild(append);
	};
	if (game.unlocks.includes("varDisplay") && !document.getElementById("varDisplay")) {
		let append = document.createElement("div");
		append.id = "varDisplay";
		append.className = "margin";
		if (document.getElementById("upgrades")) document.getElementById("main").insertBefore(append, document.getElementById("upgrades"));
		else if (document.getElementById("tabs")) document.getElementById("main").insertBefore(append, document.getElementById("tabs"));
		else document.getElementById("main").appendChild(append);
	};
	if (document.getElementById("pointDisplay")) document.getElementById("pointDisplay").innerHTML = "You have <b>" + (game.points==1.7976931348623157e308?Infinity:format(game.points)) + "</b> points";
	if (document.getElementById("pointButton")) {
		let gain = pointButtonGain();
		if (gain === Infinity) gain = 1.7976931348623157e308;
		let extra = "";
		if (game.improvements[15] > 0) {
			let gen = game.wave.pointGen * improvements[15].effect();
			if (gen + game.wave.points > game.wave.pointMax) gen = game.wave.pointMax - game.wave.points;
			extra += "<br>+" + format(gen) + " wave points";
		};
		document.getElementById("pointButton").innerHTML = "+" + format(pointButtonGain()) + " points" + extra;
	};
	if (document.getElementById("varDisplay")) {
		const superscript = (string) => {return "<sup>" + string + "</sup>"};
		const _constant = format(get_constant()) + constant();
		const _delta = superscript("(" + format(get_g_exponent()) + " + " + delta + superscript(format(get_d_exponent())) + ")");
		const _epsilon = epsilon + superscript(format(get_e_exponent()));
		let text = "";
		if (game.upgrades[0] > 0) text += "Your " + alpha + " is " + format(get_alpha());
		if (game.upgrades[2] > 0) text += "<br>Your " + beta + " is " + format(get_beta());
		if (game.upgrades[4] > 0) text += "<br>Your " + gamma + " is " + format(get_gamma());
		if (game.upgrades[6] > 0) text += "<br>Your " + delta + " is " + format(get_delta());
		if (game.upgrades[8] > 0) text += "<br>Your " + epsilon + " is " + format(get_epsilon());
		if (game.upgrades[10] > 0) text += "<br>Your " + zeta + " is " + format(get_zeta());
		let formula = "";
		if (game.upgrades[10] > 0) formula = _constant + "(1.45" + gamma + _delta + ")" + _epsilon + "(2.00" + superscript(zeta) + " + 5.00" + zeta + ")";
		else if (game.improvements[10] > 0) formula = _constant + "(1.45" + gamma + _delta + ")" + _epsilon;
		else if (game.upgrades[8] > 0) formula = _constant + "(1.45" + gamma + _delta + ")(" + epsilon + " + 1.00)";
		else if (game.improvements[5] > 2) formula = _constant + "(1.45" + gamma + _delta + ")";
		else if (game.improvements[5] > 0) formula = _constant + "(" + gamma + _delta + ")";
		else if (game.upgrades[6] > 0) formula = _constant + gamma + _delta;
		else if (game.upgrades[4] > 0) formula = _constant + gamma + superscript(format(get_g_exponent()));
		else if (game.upgrades[2] > 0) formula = _constant;
		if (formula) formula = "Your point gain is " + formula + "<br><br>";
		document.getElementById("varDisplay").innerHTML = formula + text;
	};
	// tab displays
	if (game.tab == "main") {
		if (!document.getElementById("upgrades")) {
			let append = document.createElement("div");
			append.id = "upgrades";
			append.style = "display: flex; flex-wrap: wrap";
			document.getElementById("main").insertBefore(append, document.getElementById("main").lastChild.nextSibling);
		};
	} else {
		if (document.getElementById("upgrades")) document.getElementById("upgrades").remove();
	};
	for (let index = 0; index < upgrades.length; index++) {
		if (game.upgrades[index] === undefined) game.upgrades[index] = 0;
		const element = upgrades[index];
		if (game.improvements[16] > 0 && element.unlocked() && (game.points * 0.1) >= element.cost()) buy("upgrade", index, true);
		else if (game.improvements[3] > 0 && element.unlocked() && (game.points * 0.025) >= element.cost()) buy("upgrade", index);
		if (game.tab != "main" || !element.unlocked()) {
			if (document.getElementById("upgrade_" + index)) document.getElementById("upgrade_" + index).remove();
			continue;
		};
		if (!document.getElementById("upgrade_" + index)) {
			let append = document.createElement("button");
			append.id = "upgrade_" + index;
			append.type = "button";
			append.onclick = () => {
				buy("upgrade", index);
			};
			if (document.getElementById("upgrade_" + (index + 1))) document.getElementById("upgrades").insertBefore(append, document.getElementById("upgrade_" + (index + 1)));
			else document.getElementById("upgrades").appendChild(append);
		};
		if (document.getElementById("upgrade_" + index)) {
			let max = Infinity;
			if (element.max) max = element.max;
			if (game.upgrades[index] >= max) document.getElementById("upgrade_" + index).className = "upgrade maxed";
			else if (game.points >= element.cost()) document.getElementById("upgrade_" + index).className = "upgrade";
			else document.getElementById("upgrade_" + index).className = "upgrade fade";
			if (game.upgrades[index] > 0) document.getElementById("upgrade_" + index).innerHTML = element.title + "<br><br>" + element.desc + "<br><br>Cost: " + format(upgrades[index].cost());
			else {
				document.getElementById("upgrade_" + index).innerHTML = element.title + "<br><br>Cost: " + format(upgrades[index].cost());
				document.getElementById("upgrade_" + index).className += " small";
			};
		};
	};
	if (game.tab == "improvements") {
		if (!document.getElementById("improvements")) {
			let append = document.createElement("div");
			append.id = "improvements";
			append.style = "display: flex; flex-wrap: wrap";
			document.getElementById("main").insertBefore(append, document.getElementById("main").lastChild.nextSibling);
		};
	} else {
		if (document.getElementById("improvements")) document.getElementById("improvements").remove();
	};
	for (let index = 0; index < improvements.length; index++) {
		if (game.improvements[index] === undefined) game.improvements[index] = 0;
		const element = improvements[index];
		let max = Infinity;
		if (element.max) max = element.max;
		if (index == 0 && game.improvements[11]) buy("improvement", index, true);
		if (document.getElementById("tab-improvements") && element.unlocked() && game.points >= element.cost() && game.improvements[index] < max) document.getElementById("tab-improvements").className += " notif";
		if (game.tab != "improvements" || !element.unlocked() || (game.improvements[index] >= max && !game.options["show_max_imp"] && game.options["show_max_imp"] !== undefined)) {
			if (document.getElementById("improvement_" + index)) document.getElementById("improvement_" + index).remove();
			continue;
		};
		if (!document.getElementById("improvement_" + index)) {
			let append = document.createElement("button");
			append.id = "improvement_" + index;
			append.type = "button";
			append.onclick = () => {
				buy("improvement", index);
			};
			if (document.getElementById("improvement_" + (index + 1))) document.getElementById("improvements").insertBefore(append, document.getElementById("improvement_" + (index + 1)));
			else document.getElementById("improvements").appendChild(append);
		};
		if (document.getElementById("improvement_" + index)) {
			if (game.improvements[index] >= max) document.getElementById("improvement_" + index).className = "improvement maxed";
			else if (game.points >= element.cost()) document.getElementById("improvement_" + index).className = "improvement";
			else document.getElementById("improvement_" + index).className = "improvement fade";
			document.getElementById("improvement_" + index).innerHTML = element.title+"<br><br>"+(typeof element.desc=="function"?element.desc():element.desc)+"<br><br>Cost: "+format(improvements[index].cost())+" Bought: "+(max==1?!!game.improvements[index]:formatWhole(game.improvements[index])+"/"+(element.max?formatWhole(max):"&#8734"));
			let rows = document.getElementById("improvement_" + index).innerHTML.split("<br>");
			document.getElementById("improvement_" + index).innerHTML = document.getElementById("improvement_" + index).innerHTML.replace("Bought:", "        ".slice(rows[rows.length - 1].length - 22) + "Bought:");
		};
	};
	if (game.tab == "options") {
		if (!document.getElementById("options")) {
			let append = document.createElement("div");
			append.id = "options";
			document.getElementById("main").appendChild(append);
		};
	} else {
		if (document.getElementById("options")) document.getElementById("options").remove();
	};
	for (let index = 0; index < options.length && index < game.improvements[4]; index++) {
		const element = options[index];
		if (game.options[element.id] === undefined) game.options[element.id] = element.value();
		if (!document.getElementById("option_" + index) && game.tab == "options") {
			let append = document.createElement("span");
			append.id = "option_" + index;
			append.style = "margin-left: auto";
			append.innerHTML = (index!==0?"<br><br>":"") + element.title + ": ";
			document.getElementById("options").appendChild(append);
		};
		if (element.type == "color") {
			if (!document.getElementById("option_" + index + "_type") && game.tab == "options") {
				let append = document.createElement("input");
				append.id = "option_" + index + "_type";
				append.type = "color";
				append.className = "color";
				append.value = game.options[element.id];
				document.getElementById("options").appendChild(append);
			};
			if (document.getElementById("option_" + index + "_type")) game.options[element.id] = document.getElementById("option_" + index + "_type").value;
			element.set(game.options[element.id]);
		} else if (element.type == "number") {
			if (!document.getElementById("option_" + index + "_type") && game.tab == "options") {
				let append = document.createElement("input");
				append.id = "option_" + index + "_type";
				append.type = "number";
				append.min = element.min;
				append.max = element.max;
				append.value = ("" + game.options[element.id]).replace("px", "");
				document.getElementById("options").appendChild(append);
			};
			if (document.getElementById("option_" + index + "_type")) {
				let val = document.getElementById("option_" + index + "_type").value;
				if (val < element.min) val = element.min;
				if (val > element.max) val = element.max;
				game.options[element.id] = val + "px";
			};
			element.set(game.options[element.id]);
		} else if (element.type == "checkbox") {
			if (!document.getElementById("option_" + index + "_type") && game.tab == "options") {
				let append = document.createElement("input");
				append.id = "option_" + index + "_type";
				append.type = "checkbox";
				append.checked = game.options[element.id];
				document.getElementById("options").appendChild(append);
			};
			if (document.getElementById("option_" + index + "_type")) game.options[element.id] = document.getElementById("option_" + index + "_type").checked;
		};
	};
	if (game.tab == "waves") {
		if (!document.getElementById("wave_graph")) {
			let append = document.createElement("div");
			append.id = "wave_graph";
			append.innerHTML = "<svg viewBox='0 0 600 100' class=graph></svg>"
			if (document.getElementById("wave_upgrades")) document.getElementById("main").insertBefore(append, document.getElementById("wave_upgrades"));
			else document.getElementById("main").appendChild(append);
		};
		if (document.getElementById("wave_graph") && sinwaves.length) {
			let points = "";
			if (game.wave.min < game.wave.max) {
				for (let iteration = 0; iteration <= 302; iteration++) {
					points += ((iteration - 1) * 2) + "," + sinwaves[iteration + game.wave.frame] + " ";
				};
			} else {
				points = "0,50 600,50";
			};
			document.getElementById("wave_graph").innerHTML = "<svg viewBox='0 0 600 100' class=graph><polyline points='"+points+"' fill=none stroke=#000 /><circle cx=300 cy="+(game.wave.min<game.wave.max?sinwaves[game.wave.frame+151]:"50")+" r='5' stroke=#000 fill=#eee /></svg>";
		};
		if (!document.getElementById("wavePointDisplay")) {
			let append = document.createElement("div");
			append.id = "wavePointDisplay";
			if (document.getElementById("wave_graph")) document.getElementById("main").insertBefore(append, document.getElementById("wave_graph"));
			else if (document.getElementById("wave_upgrades")) document.getElementById("main").insertBefore(append, document.getElementById("wave_upgrades"));
			else document.getElementById("main").appendChild(append);
		};
		if (!document.getElementById("wave_upgrades")) {
			let append = document.createElement("div");
			append.id = "wave_upgrades";
			append.style = "display: flex; flex-wrap: wrap";
			document.getElementById("main").appendChild(append);
		};
		if (document.getElementById("wavePointDisplay")) document.getElementById("wavePointDisplay").innerHTML = "You have "+format(game.wave.points)+"/"+format(game.wave.pointMax)+" wave points<br>"+(game.wave.upgrades[3]>0?"Your best ever wave points is "+format(game.wave.pointBest)+"<br>":"")+"You are gaining "+format(game.wave.pointGen,false)+" wave points per second<br>Your wave formula is "+waveFormula();
	} else {
		if (document.getElementById("wave_graph")) document.getElementById("wave_graph").remove();
		if (document.getElementById("wavePointDisplay")) document.getElementById("wavePointDisplay").remove();
	};
	for (let index = 0; index < wave_upgrades.length; index++) {
		if (game.wave.upgrades[index] === undefined) game.wave.upgrades[index] = 0;
		const element = wave_upgrades[index];
		let max = Infinity;
		if (element.max) max = element.max;
		if (document.getElementById("tab-waves") && element.unlocked() && game.wave.points >= element.cost() && game.wave.upgrades[index] < max) document.getElementById("tab-waves").className += " notif";
		if (game.tab != "waves" || !element.unlocked()) {
			if (document.getElementById("wave_upgrade_" + index)) document.getElementById("wave_upgrade_" + index).remove();
			continue;
		};
		if (!document.getElementById("wave_upgrade_" + index)) {
			let append = document.createElement("button");
			append.id = "wave_upgrade_" + index;
			append.type = "button";
			append.onclick = () => {
				buy("wave_upgrade", index);
			};
			if (document.getElementById("wave_upgrade_" + (index + 1))) document.getElementById("wave_upgrades").insertBefore(append, document.getElementById("wave_upgrade_" + (index + 1)));
			else document.getElementById("wave_upgrades").appendChild(append);
		};
		if (document.getElementById("wave_upgrade_" + index)) {
			if (game.wave.upgrades[index] >= max) document.getElementById("wave_upgrade_" + index).className = "upgrade maxed";
			else if (game.wave.points >= element.cost()) document.getElementById("wave_upgrade_" + index).className = "upgrade";
			else document.getElementById("wave_upgrade_" + index).className = "upgrade fade";
			if (game.wave.upgrades[index] > 0 || max === 1) document.getElementById("wave_upgrade_" + index).innerHTML = element.title+"<br><br>"+(typeof element.desc=="function"?element.desc():element.desc)+"<br><br>Cost: "+format(wave_upgrades[index].cost())+(max!==Infinity?"<br>Bought: "+(max==1?!!game.improvements[index]:formatWhole(game.wave.upgrades[index])+"/"+formatWhole(max)):"");
			else {
				document.getElementById("wave_upgrade_" + index).innerHTML = element.title + "<br><br>Cost: " + format(wave_upgrades[index].cost());
				document.getElementById("wave_upgrade_" + index).className += " small";
			};
		};
	};
	if (game.tab == "infinity") {
		if (!document.getElementById("infinityPointDisplay")) {
			let append = document.createElement("div");
			append.id = "infinityPointDisplay";
			document.getElementById("main").insertBefore(append, document.getElementById("main").lastChild.nextSibling);
		};
		if (document.getElementById("infinityPointDisplay")) document.getElementById("infinityPointDisplay").innerHTML = "Congratulations! You have completed the game! More content is coming soon!";
	} else {
		if (document.getElementById("infinityPointDisplay")) document.getElementById("infinityPointDisplay").remove();
	};
};

const loop = setInterval(() => {
	if (game.unlocks.includes("waves")) {
		if (game.wave.frame > 312) game.wave.frame = 0;
		// calculate wave min
		let min = 0;
		min += wave_upgrades[1].effect();
		min *= improvements[17].effect();
		min += game.wave.max * 0.45;
		// calculate wave max
		let max = 1;
		max += wave_upgrades[0].effect();
		max *= improvements[14].effect();
		max *= improvements[18].effect();
		// calculate point max
		let pointMax = 100;
		pointMax *= wave_upgrades[2].effect();
		// set values
		game.wave.min = min;
		game.wave.max = max;
		game.wave.pointMax = pointMax;
		// wave point gain
		let gen = findNumber(Math.abs((sinwaves[game.wave.frame+151] / 100) - 1), min, max);
		gen *= waveMult();
		game.wave.pointGen = gen;
		if (game.wave.points < game.wave.pointMax) {
			gen *= 0.03;
			if (gen > game.wave.pointMax - game.wave.points) gen = game.wave.pointMax - game.wave.points;
			game.wave.points += gen;
			game.wave.pointTotal += gen;
			if (game.wave.points > game.wave.pointBest) game.wave.pointBest = game.wave.points;
		};
	};
	update();
	if (game.unlocks.includes("waves")) game.wave.frame++;
}, 30);
