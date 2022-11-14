let game = {
	points: new Decimal(0),
	pointBest: new Decimal(0),
	pointTotal: new Decimal(0),
	clicks: 0,
	tab: "main",
	unlocks: [],
	upgrades: [],
	improvements: [],
	options: {},
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
	infinity: {
		points: 0,
		pointBest: 0,
		pointTotal: 0,
		best: {
			points: new Decimal(0),
			wave_points: 0,
		},
		milestones: [],
		stage: 1,
	},
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
	z *= improvements[23].effect();
	return z;
};

function get_constant() {
	let co = new Decimal(2.5);
	co = co.add(improvements[0].effect());
	co = co.mul(improvements[1].effect());
	co = co.mul(improvements[11].effect());
	co = co.mul(wave_upgrades[3].effect());
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

function get_multiplier() {
	let mul = new Decimal(1);
	if (game.infinity.milestones[24]) mul = mul.mul(new Decimal(1.45).pow(game.infinity.points).add(game.infinity.points * 2.5e9));
	else if (game.infinity.milestones[13]) mul = mul.mul(new Decimal(1.25).pow(game.infinity.points).add(game.infinity.points * 7.5));
	else if (game.infinity.milestones[0]) mul = mul.mul(new Decimal(1.2).pow(game.infinity.points).add(game.infinity.points * 5));
	return mul;
};

function pointButtonGain() {
	let imp = game.improvements[5] + game.improvements[10] + game.improvements[24];
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
	let mul = get_multiplier();
	if (z > 0 && imp >= 5) return co.mul(a).mul(b).mul(g).mul(d).mul(new Decimal(1.45 * g).pow(g_ex + (d ** d_ex))).mul(e ** e_ex).mul(new Decimal(2.22).pow(z)).mul(mul);
	if (z > 0) return co.mul(a).mul(b).mul(g).mul(d).mul(new Decimal(1.45 * g).pow(g_ex + (d ** d_ex))).mul(e ** e_ex).mul(new Decimal(2).pow(z).add(5 * z)).mul(mul);
	if (e > 0 && imp >= 4) return co.mul(a).mul(b).mul(g).mul(d).mul(new Decimal(1.45 * g).pow(g_ex + (d ** d_ex))).mul(e ** e_ex).mul(mul);
	if (e > 0) return co.mul(a).mul(b).mul(g).mul(d).mul(new Decimal(1.45 * g).pow(g_ex + (d ** d_ex))).mul(e + 1).mul(mul);
	if (d > 0 && imp >= 3) return co.mul(a).mul(b).mul(g).mul(d).mul(new Decimal(1.45 * g).pow(g_ex + (d ** d_ex))).mul(mul);
	if (d > 0 && imp >= 2) return co.mul(a).mul(b).mul(g).mul(d).mul(new Decimal(g).pow(g_ex + (d ** d_ex))).mul(mul);
	if (d > 0 && imp >= 1) return co.mul(a).mul(b).mul(g).mul(new Decimal(g).pow(g_ex + (d ** d_ex))).mul(mul);
	if (d > 0) return co.mul(a).mul(b).mul(new Decimal(g).pow(g_ex + (d ** d_ex))).mul(mul);
	if (g > 1) return co.mul(a).mul(b).mul(g ** g_ex).mul(mul);
	if (b > 1) return co.mul(a).mul(b).mul(mul);
	return new Decimal(a).mul(mul);
};

function buy(type, index, free = false) {
	if (type == "upgrade") {
		if (!upgrades[index] || !upgrades[index].unlocked()) return false;
		let max = game.infinity.milestones[49]?10000000:100000;
		if (upgrades[index].max) max = upgrades[index].max;
		if (game.points.gte(upgrades[index].cost()) && game.upgrades[index] < max) {
			if (!free) game.points = game.points.sub(upgrades[index].cost());
			game.upgrades[index]++;
			return true;
		} else return false;
	} else if (type == "improvement") {
		if (!improvements[index] || !improvements[index].unlocked()) return false;
		let max = game.infinity.milestones[49]?10000000:100000;
		if (improvements[index].max) max = improvements[index].max;
		if (game.points.gte(improvements[index].cost()) && game.improvements[index] < max) {
			if (!free) game.points = game.points.sub(improvements[index].cost());
			game.improvements[index]++;
			return true;
		} else return false;
	} else if (type == "wave_upgrade") {
		if (!wave_upgrades[index] || !wave_upgrades[index].unlocked()) return false;
		let max = game.infinity.milestones[49]?10000000:100000;
		if (typeof wave_upgrades[index].max == "function") max = wave_upgrades[index].max();
		else if (wave_upgrades[index].max) max = wave_upgrades[index].max;
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
	if (game.points.gt(0) && !game.unlocks.includes("pd")) game.unlocks.push("pd");
	if (game.upgrades[0] > 0 && !game.unlocks.includes("vd")) game.unlocks.push("vd");
	if (game.points.gte(1000) && !game.unlocks.includes("t")) game.unlocks.push("t");
	if (game.improvements[4] > 0 && !game.unlocks.includes("o")) game.unlocks.push("o");
	if (game.improvements[13] > 0 && !game.unlocks.includes("w")) game.unlocks.push("w");
	if ((game.points.gte(infNum()) || (game.unlocks.includes("t") && game.infinity.points >= 1)) && !game.unlocks.includes("i")) game.unlocks.push("i");
	if (game.infinity.points >= 1 && game.unlocks.includes("t") && !game.unlocks.includes("?")) game.unlocks.push("?");
	// tabs
	if ((game.unlocks.includes("t")) && !document.getElementById("tabs")) {
		let append = document.createElement("span");
		append.id = "tabs";
		if (document.getElementById("varDisplay")) document.getElementById("main").insertBefore(append, document.getElementById("varDisplay").nextSibling);
		else if (document.getElementById("pointButton")) document.getElementById("main").insertBefore(append, document.getElementById("pointButton").nextSibling);
	};
	if (document.getElementById("tabs") && game.unlocks.includes("t")) {
		if (!document.getElementById("tab-main")) {
			let append = document.createElement("button");
			append.id = "tab-main";
			append.type = "button";
			append.className = "tab";
			append.onclick = () => {
				game.tab = "main";
			};
			append.innerHTML = "Main";
			if (document.getElementById("tab-improvements")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-improvements"));
			else if (document.getElementById("tab-waves")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-waves"));
			else if (document.getElementById("tab-infinity")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-infinity"));
			else if (document.getElementById("tab-options")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-options"));
			else document.getElementById("tabs").appendChild(append);
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
			if (document.getElementById("tab-waves")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-waves"));
			else if (document.getElementById("tab-infinity")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-infinity"));
			else if (document.getElementById("tab-options")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-options"));
			else document.getElementById("tabs").appendChild(append);
		};
		if (game.unlocks.includes("o") && !document.getElementById("tab-options")) {
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
		if (game.unlocks.includes("w") && !document.getElementById("tab-waves")) {
			let append = document.createElement("button");
			append.id = "tab-waves";
			append.type = "button";
			append.className = "tab";
			append.onclick = () => {
				game.tab = "waves";
			};
			append.innerHTML = "Waves";
			if (document.getElementById("tab-infinity")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-infinity"));
			else if (document.getElementById("tab-options")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-options"));
			else document.getElementById("tabs").appendChild(append);
		};
		if (game.unlocks.includes("i") && !document.getElementById("tab-infinity")) {
			let append = document.createElement("button");
			append.id = "tab-infinity";
			append.type = "button";
			append.className = "tab";
			append.onclick = () => {
				game.tab = "infinity";
			};
			append.innerHTML = "Infinity";
			if (document.getElementById("tab-???")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-???"));
			else if (document.getElementById("tab-options")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-options"));
			else document.getElementById("tabs").appendChild(append);
		};
		if (game.unlocks.includes("?") && !document.getElementById("tab-???")) {
			let append = document.createElement("button");
			append.id = "tab-???";
			append.type = "button";
			append.className = "tab";
			append.onclick = () => {
				game.tab = "???";
			};
			append.innerHTML = "???";
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
			else if (getInfGain() > 0 && getInfGain() >= game.infinity.points / 100) document.getElementById("tab-infinity").className = "tab notif";
			else document.getElementById("tab-infinity").className = "tab";
		};
		if (document.getElementById("tab-???")) {
			if (game.tab == "???") document.getElementById("tab-???").className = "tab on";
			else if ((game.infinity.points == 45 && game.infinity.stage == 1) || (game.points.gte(infNum()) && game.infinity.stage > 1)) document.getElementById("tab-???").className = "tab notif";
			else document.getElementById("tab-???").className = "tab";
		};
	};
	// main display
	if (game.unlocks.includes("pd") && !document.getElementById("pointDisplay")) {
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
			if (!game.infinity.milestones[32]) {
				game.points = game.points.add(pointButtonGain());
				game.pointTotal = game.pointTotal.add(pointButtonGain());
				if (game.points.gt(game.pointBest)) game.pointBest = game.points;
				if (game.points.gt(infNum())) game.points = infNum();
				if (game.pointTotal.gt(infNum())) game.pointTotal = infNum();
				if (game.pointBest.gt(infNum())) game.pointBest = infNum();
				if (game.points.gt(game.infinity.best.points)) game.infinity.best.points = game.points;
			};
			if (game.improvements[15] > 0 && game.wave.points < game.wave.pointMax) {
				let gen = game.wave.pointGen * (improvements[15].effect() + improvements[26].effect());
				if (gen + game.wave.points > game.wave.pointMax) gen = game.wave.pointMax - game.wave.points;
				game.wave.points += gen;
				game.wave.pointTotal += gen;
				if (game.wave.points > game.wave.pointBest) game.wave.pointBest = game.wave.points;
				if (game.wave.points === Infinity) game.wave.points = 1.7976931348620926e308;
				if (game.wave.pointTotal === Infinity) game.wave.pointTotal = 1.7976931348620926e308;
				if (game.wave.pointBest === Infinity) game.wave.pointBest = 1.7976931348620926e308;
				if (game.wave.points > game.infinity.best.wave_points) game.infinity.best.wave_points = game.wave.points;
			};
			game.clicks++;
		};
		document.getElementById("main").appendChild(append);
	};
	if (game.unlocks.includes("vd") && !document.getElementById("varDisplay")) {
		let append = document.createElement("div");
		append.id = "varDisplay";
		append.className = "margin";
		if (document.getElementById("tabs")) document.getElementById("main").insertBefore(append, document.getElementById("tabs"));
		else if (document.getElementById("upgrades")) document.getElementById("main").insertBefore(append, document.getElementById("upgrades"));
		else document.getElementById("main").appendChild(append);
	};
	if (document.getElementById("pointDisplay")) document.getElementById("pointDisplay").innerHTML = "You have <b>"+format(game.points, true, true)+"</b> points";
	if (document.getElementById("pointButton")) {
		let text = "";
		if (!game.infinity.milestones[32]) text += "+" + format(pointButtonGain()) + " points<br>";
		if (game.improvements[15] > 0) {
			let gen = game.wave.pointGen * (improvements[15].effect() + improvements[26].effect());
			if (gen + game.wave.points > game.wave.pointMax) gen = game.wave.pointMax - game.wave.points;
			text += "+" + format(gen) + " wave points";
		};
		document.getElementById("pointButton").innerHTML = text;
	};
	if (document.getElementById("varDisplay")) {
		const superscript = (string) => {return "<sup>" + string + "</sup>"};
		const _constant = format(get_constant()) + constant();
		const _delta = superscript("(" + format(get_g_exponent()) + " + " + delta + superscript(format(get_d_exponent())) + ")");
		const _epsilon = epsilon + superscript(format(get_e_exponent()));
		const _zeta = "(" + format(2) + superscript(zeta) + " + " + format(5) + zeta + ")";
		let text = "Your " + alpha + " is " + format(get_alpha());
		if (game.upgrades[2] > 0) text += "<br>Your " + beta + " is " + format(get_beta());
		if (game.upgrades[4] > 0) text += "<br>Your " + gamma + " is " + format(get_gamma());
		if (game.upgrades[6] > 0) text += "<br>Your " + delta + " is " + format(get_delta());
		if (game.upgrades[8] > 0) text += "<br>Your " + epsilon + " is " + format(get_epsilon());
		if (game.upgrades[10] > 0) text += "<br>Your " + zeta + " is " + format(get_zeta());
		let formula = "";
		if (game.improvements[24]) formula = _constant + "(" + format(1.45) + gamma + _delta + ")" + _epsilon + format(2.22) + superscript(zeta);
		else if (game.upgrades[10] > 0) formula = _constant + "(" + format(1.45) + gamma + _delta + ")" + _epsilon + _zeta;
		else if (game.improvements[10] > 0) formula = _constant + "(" + format(1.45) + gamma + _delta + ")" + _epsilon;
		else if (game.upgrades[8] > 0) formula = _constant + "(" + format(1.45) + gamma + _delta + ")(" + epsilon + " + " + format(1) + ")";
		else if (game.improvements[5] > 2) formula = _constant + "(" + format(1.45) + gamma + _delta + ")";
		else if (game.improvements[5] > 0) formula = _constant + "(" + gamma + _delta + ")";
		else if (game.upgrades[6] > 0) formula = _constant + gamma + _delta;
		else if (game.upgrades[4] > 0) formula = _constant + gamma + superscript(format(get_g_exponent()));
		else if (game.upgrades[2] > 0) formula = _constant;
		if (formula) {
			if (game.infinity.milestones[24]) formula += "(" + format(1.45) + superscript(infinity) + " + " + format(2.5e9) + infinity + ")";
			else if (game.infinity.milestones[13]) formula += "(" + format(1.25) + superscript(infinity) + " + " + format(7.5) + infinity + ")";
			else if (game.infinity.milestones[0]) formula += "(" + format(1.2) + superscript(infinity) + " + " + format(5) + infinity + ")";
			formula = "Your point gain is " + formula + "<br><br>";
		};
		document.getElementById("varDisplay").innerHTML = formula + text;
	};
	// tab displays and autobuyers
	if (game.tab == "main") {
		if (!document.getElementById("upgrades")) {
			let append = document.createElement("div");
			append.id = "upgrades";
			append.style = "display: flex; flex-wrap: wrap";
			document.getElementById("main").appendChild(append);
		};
	} else {
		if (document.getElementById("upgrades")) document.getElementById("upgrades").remove();
	};
	for (let index = 0; index < upgrades.length; index++) {
		if (game.upgrades[index] === undefined) game.upgrades[index] = 0;
		const element = upgrades[index];
		let max = game.infinity.milestones[49]?10000000:100000;
		if (element.max) max = element.max;
		if (element.unlocked() && game.upgrades[index] < max) {
			let work = 1;
			work *= improvements[22].effect();
			if (game.infinity.milestones[14]) work *= 2;
			if (game.infinity.milestones[41]) work *= 2;
			if (game.infinity.milestones[42]) work *= 2;
			if (game.infinity.milestones[50]) work *= 2;
			if (game.infinity.milestones[52]) work *= 5;
			if (game.infinity.milestones[56]) work *= 2;
			for (let iteration = 0; iteration < work; iteration++) {
				if (game.upgrades[index] >= max || game.points.lt(upgrades[index].cost())) break;
				if (game.improvements[16] > 0 && ((game.points * 0.1) >= element.cost() || game.infinity.milestones[10])) buy("upgrade", index, true);
				else if (game.improvements[3] > 0 && (game.points * 0.025) >= element.cost()) buy("upgrade", index);
			};
		};
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
			if (document.getElementById("upgrade_" + (index - 1))) document.getElementById("upgrades").insertBefore(append, document.getElementById("upgrade_" + (index - 1)).nextSibling);
			else document.getElementById("upgrades").appendChild(append);
		};
		if (document.getElementById("upgrade_" + index)) {
			if (game.upgrades[index] >= max) document.getElementById("upgrade_" + index).className = "upgrade maxed";
			else if (game.points.gte(element.cost())) document.getElementById("upgrade_" + index).className = "upgrade";
			else document.getElementById("upgrade_" + index).className = "upgrade fade";
			if (game.upgrades[index] > 0) document.getElementById("upgrade_" + index).innerHTML = element.title+"<br><br>"+(typeof element.desc=="function"?element.desc():element.desc)+"<br><br>Cost: "+format(upgrades[index].cost());
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
			document.getElementById("main").appendChild(append);
		};
	} else {
		if (document.getElementById("improvements")) document.getElementById("improvements").remove();
	};
	for (let index = 0; index < improvements.length; index++) {
		if (game.improvements[index] === undefined) game.improvements[index] = 0;
		const element = improvements[index];
		let max = game.infinity.milestones[49]?10000000:100000;
		if (element.max) max = element.max;
		if (element.unlocked() && game.improvements[index] < max) {
			if (index == 0 && game.improvements[11]) {
				if (game.infinity.milestones[51]) game.improvements[0] = 1e10;
				else {
					let work = 1;
					if (game.improvements[27] > 0) work *= 3;
					if (game.infinity.milestones[44]) work *= 2;
					if (game.infinity.milestones[46]) work *= 2;
					if (game.infinity.milestones[48]) work *= 2;
					for (let iteration = 0; iteration < work; iteration++) {
						if (game.improvements[0] >= max || game.points.lt(improvements[0].cost())) break;
						buy("improvement", 0, true);
					};
				};
			} else if (game.infinity.milestones[12]) buy("improvement", index);
		};
		if (document.getElementById("tab-improvements") && element.unlocked() && game.points.gte(element.cost()) && game.improvements[index] < max) document.getElementById("tab-improvements").className += " notif";
		if (game.tab != "improvements" || !element.unlocked() || (game.pointBest.mul(1e10).lt(element.cost()) && index < 22 && index > 0) || (game.improvements[index] >= max && !game.options["show_max_imp"] && game.options["show_max_imp"] !== undefined)) {
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
			if (document.getElementById("improvement_" + (index - 1))) document.getElementById("improvements").insertBefore(append, document.getElementById("improvement_" + (index - 1)).nextSibling);
			else document.getElementById("improvements").appendChild(append);
		};
		if (document.getElementById("improvement_" + index)) {
			if (game.improvements[index] >= max) document.getElementById("improvement_" + index).className = "improvement maxed";
			else if (game.points.gte(element.cost())) document.getElementById("improvement_" + index).className = "improvement";
			else document.getElementById("improvement_" + index).className = "improvement fade";
			document.getElementById("improvement_" + index).innerHTML = element.title+"<br><br>"+(typeof element.desc=="function"?element.desc():element.desc)+"<br><br>Cost: "+format(improvements[index].cost())+" Bought: "+(max==1?!!game.improvements[index]:formatWhole(game.improvements[index])+(element.max?"/"+formatWhole(max):""));
			let rows = document.getElementById("improvement_" + index).innerHTML.split("<br>");
			document.getElementById("improvement_" + index).innerHTML = document.getElementById("improvement_" + index).innerHTML.replace("Bought:", "            ".slice(rows[rows.length - 1].length - 20) + "Bought:");
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
		if (game.options[element.id] === undefined && element.type != "export" && element.type != "import") game.options[element.id] = element.value();
		if (!document.getElementById("option_" + index) && game.tab == "options") {
			let append = document.createElement("span");
			append.id = "option_" + index;
			append.style = "margin-left: auto";
			append.innerHTML = (index !== 0 ? "<br><br>" : "") + (element.type != "export" ? element.title + ": " : "");
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
		} else if (element.type == "dropdown") {
			if (!document.getElementById("option_" + index + "_type") && game.tab == "options") {
				let append = document.createElement("select");
				append.id = "option_" + index + "_type";
				append.value = game.options[element.id];
				if (append.value === undefined) append.value = element.default;
				document.getElementById("options").appendChild(append);
				for (let num = 0; num < element.list.length; num++) {
					const item = element.list[num];
					document.getElementById("option_" + index + "_type").innerHTML += "<option value='"+item+"' "+(element.intList[num]==game.options[element.id]?"selected":"")+">"+item+"</option>";
				};
			};
			if (document.getElementById("option_" + index + "_type")) game.options[element.id] = element.intList[document.getElementById("option_" + index + "_type").selectedIndex];
		} else if (element.type == "export") {
			if (!document.getElementById("option_" + index + "_type") && game.tab == "options") {
				let append = document.createElement("button");
				append.id = "option_" + index + "_type";
				append.style = "margin-top: 0px";
				append.innerHTML = element.title;
				append.onclick = () => {
					if (copy(element.value())) alert(element.title + ": Successful!");
					else alert(element.title + ": Failure - try a different browser");
				};
				document.getElementById("options").appendChild(append);
			};
		} else if (element.type == "import") {
			if (!document.getElementById("option_" + index + "_type") && game.tab == "options") {
				let append = document.createElement("input");
				append.id = "option_" + index + "_type";
				append.type = "text";
				document.getElementById("options").appendChild(append);
			};
			if (!document.getElementById("option_" + index + "_space") && game.tab == "options") {
				let append = document.createElement("span");
				append.id = "option_" + index + "_space";
				append.innerHTML = " ";
				document.getElementById("options").appendChild(append);
			};
			if (!document.getElementById("option_" + index + "_confirm") && game.tab == "options") {
				let append = document.createElement("button");
				append.id = "option_" + index + "_confirm";
				append.style = "margin-top: 0px";
				append.innerHTML = "Confirm";
				append.onclick = () => {
					if (!document.getElementById("option_" + index + "_type")) return;
					element.set(document.getElementById("option_" + index + "_type").value);
				};
				document.getElementById("options").appendChild(append);
			};
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
		if (!document.getElementById("wave_point_display")) {
			let append = document.createElement("div");
			append.id = "wave_point_display";
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
		if (document.getElementById("wave_point_display")) document.getElementById("wave_point_display").innerHTML = "You have "+format(game.wave.points)+"/"+format(game.wave.pointMax)+" wave points<br>"+(game.wave.upgrades[3]>0?"Your best wave points is "+format(game.wave.pointBest)+"<br>":"")+"You are gaining "+format(game.wave.pointGen,false)+" wave points per second<br>Your wave formula is "+waveFormula();
	} else {
		if (document.getElementById("wave_graph")) document.getElementById("wave_graph").remove();
		if (document.getElementById("wave_point_display")) document.getElementById("wave_point_display").remove();
	};
	for (let index = 0; index < wave_upgrades.length; index++) {
		if (game.wave.upgrades[index] === undefined) game.wave.upgrades[index] = 0;
		const element = wave_upgrades[index];
		let max = game.infinity.milestones[49]?10000000:100000;
		if (typeof element.max == "function") max = element.max();
		else if (element.max) max = element.max;
		if (element.unlocked() && game.wave.upgrades[index] < max) {
			let work = 1;
			if (game.infinity.milestones[31]) work *= 2;
			if (game.infinity.milestones[33]) work *= 2;
			for (let iteration = 0; iteration < work; iteration++) {
				if (game.wave.upgrades[index] >= max) break;
				if (game.infinity.milestones[11] && game.infinity.milestones[15]) buy("wave_upgrade", index, true);
				else if ((index == 0 && game.infinity.milestones[7]) || (index == 1 && game.infinity.milestones[8]) || (index == 2 && game.infinity.milestones[9])) buy	("wave_upgrade", index, true);
				else if (game.infinity.milestones[11]) buy("wave_upgrade", index);
			};
		};
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
			if (document.getElementById("wave_upgrade_" + (index - 1))) document.getElementById("wave_upgrades").insertBefore(append, document.getElementById("wave_upgrade_" + (index - 1)).nextSibling);
			else document.getElementById("wave_upgrades").appendChild(append);
		};
		if (document.getElementById("wave_upgrade_" + index)) {
			if (game.wave.upgrades[index] >= max) document.getElementById("wave_upgrade_" + index).className = "upgrade maxed";
			else if (game.wave.points >= element.cost()) document.getElementById("wave_upgrade_" + index).className = "upgrade";
			else document.getElementById("wave_upgrade_" + index).className = "upgrade fade";
			if (game.wave.upgrades[index] > 0 || max === 1) document.getElementById("wave_upgrade_" + index).innerHTML = element.title+"<br><br>"+(typeof element.desc=="function"?element.desc():element.desc)+"<br><br>Cost: "+format(wave_upgrades[index].cost())+(max<100000?"<br>Bought: "+(max==1?!!game.wave.upgrades[index]:formatWhole(game.wave.upgrades[index])+"/"+formatWhole(max)):"");
			else {
				document.getElementById("wave_upgrade_" + index).innerHTML = element.title + "<br><br>Cost: " + format(wave_upgrades[index].cost());
				document.getElementById("wave_upgrade_" + index).className += " small";
			};
		};
	};
	if (game.tab == "infinity") {
		if (!document.getElementById("infinity_point_display")) {
			let append = document.createElement("div");
			append.id = "infinity_point_display";
			document.getElementById("main").appendChild(append);
		};
		if (!document.getElementById("infinity_prestige_button")) {
			let append = document.createElement("button");
			append.id = "infinity_prestige_button";
			append.className = "prestigeButton";
			append.onclick = () => {
				if (getInfGain() > 0 && (game.infinity.points < 45 || game.infinity.stage > 1)) prestige();
			};
			document.getElementById("main").appendChild(append);
		};
		if (!document.getElementById("infinity_milestones")) {
			let append = document.createElement("div");
			append.id = "infinity_milestones";
			append.style = "border-top:1px solid #000;border-bottom:1px solid #000";
			document.getElementById("main").appendChild(append);
		};
		if (document.getElementById("infinity_point_display")) document.getElementById("infinity_point_display").innerHTML = "You have <b>" + formatWhole(game.infinity.points) + "</b> " + infinity + "<br><br>Your best points ever is " + format(game.infinity.best.points) + "<br>Your best wave points ever is " + format(game.infinity.best.wave_points);
		if (document.getElementById("infinity_prestige_button")) {
			if (game.infinity.points >= 45 && game.infinity.stage == 1) {
				document.getElementById("infinity_prestige_button").className = "prestigeButton fade";
				document.getElementById("infinity_prestige_button").innerHTML = "Max " + infinity + " reached<br>Go to the ??? tab";
			} else if (getInfGain() > 0) {
				document.getElementById("infinity_prestige_button").className = "prestigeButton";
				document.getElementById("infinity_prestige_button").innerHTML = "Reset everything for +" + formatWhole(getInfGain()) + " " + infinity + "<br>" + getNextInf();
			} else {
				document.getElementById("infinity_prestige_button").className = "prestigeButton fade";
				document.getElementById("infinity_prestige_button").innerHTML = "Reset everything for +" + formatWhole(getInfGain()) + " " + infinity + "<br>" + getNextInf();
			};
		};
	} else {
		if (document.getElementById("infinity_point_display")) document.getElementById("infinity_point_display").remove();
		if (document.getElementById("infinity_prestige_button")) document.getElementById("infinity_prestige_button").remove();
		if (document.getElementById("infinity_milestones")) document.getElementById("infinity_milestones").remove();
	};
	for (let index = 0; index < infinity_milestones.length; index++) {
		if (game.infinity.milestones[index] === undefined) game.infinity.milestones[index] = false;
		const element = infinity_milestones[index];
		let boolean = true, title = "";
		if (!game.infinity.milestones[index] && game.infinity.milestones[index - 1] !== false && element.req) {
			for (const key in element.req) {
				if (Object.hasOwnProperty.call(element.req, key)) {
					const item = element.req[key];
					let loc = key.split("_");
					let ref = NaN;
					if (loc.length == 1) ref = game[loc[0]];
					else if (loc.length == 2) ref = game[loc[0]][loc[1]];
					else if (loc.length == 3) ref = game[loc[0]][loc[1]][loc[2]];
					if (ref < item) boolean = false;
					if (resources[key]) {
						if (title) title += " and ";
						title += formatWhole(item) + " " + resources[key];
					};
				};
			};
			if (boolean) game.infinity.milestones[index] = true;
		};
		if (game.tab != "infinity" || game.infinity.milestones[index - 1] === false) {
			if (document.getElementById("infinity_milestone_" + index)) document.getElementById("infinity_milestone_" + index).remove();
			continue;
		} else if (element.merge) {
			boolean = true;
			for (let iteration = 0; iteration < element.merge.length; iteration++) {
				if (!game.infinity.milestones[element.merge[iteration]]) boolean = false;
			};
			if (boolean) {
				if (document.getElementById("infinity_milestone_" + index)) document.getElementById("infinity_milestone_" + index).remove();
				continue;
			};
		};
		if (!document.getElementById("infinity_milestone_" + index)) {
			let append = document.createElement("div");
			append.id = "infinity_milestone_" + index;
			if (index === 0) append.style = "border-top:none";
			append.className = "milestone";
			if (document.getElementById("infinity_milestone_" + (index - 1))) document.getElementById("infinity_milestones").insertBefore(append, document.getElementById("infinity_milestone_" + (index - 1)).nextSibling);
			else document.getElementById("infinity_milestones").appendChild(append);
		};
		if (document.getElementById("infinity_milestone_" + index)) {
			if (index === 0) {
				if (game.infinity.milestones[1]) document.getElementById("infinity_milestone_" + index).innerHTML = "Bonuses:<br>"+(typeof element.desc=="function"?element.desc():element.desc);
				else if (game.infinity.milestones[0]) document.getElementById("infinity_milestone_" + index).innerHTML = "Bonus:<br>"+(typeof element.desc=="function"?element.desc():element.desc);
				else document.getElementById("infinity_milestone_" + index).innerHTML = "Next bonus at "+title+(element.extraReqText?element.extraReqText:"")+"<br><br>"+(typeof element.desc=="function"?element.desc():element.desc);
			} else {
				document.getElementById("infinity_milestone_" + index).innerHTML = (game.infinity.milestones[index]?"":"Next bonus at "+title+(element.extraReqText?element.extraReqText:"")+"<br><br>")+(typeof element.desc=="function"?element.desc():element.desc);
			};
			if (game.infinity.milestones[index]) document.getElementById("infinity_milestone_" + index).className = "milestone done";
			else document.getElementById("infinity_milestone_" + index).className = "milestone";
		};
	};
	if (game.tab == "???") {
		if (!document.getElementById("???_display")) {
			let append = document.createElement("div");
			append.id = "???_display";
			document.getElementById("main").appendChild(append);
		};
		let text = "<div class=v0><span style='font-size:calc(var(--text-size)*2)'>", count = +game.infinity.points;
		for (let iteration = 0; iteration < poem.length; iteration++) {
			const element = poem[iteration];
			if (iteration !== 0 && element[0] != poem[iteration - 1][0]) text += "<span class=" + element[0] + ">";
			for (let index = 0; index < element.length; index++) {
				if (iteration === 0) {
					count--;
					if (count < 0) break;
					if (count === 0) text += element[index].replace(", ", "");
					else text += element[index];
				} else if (index !== 0) {
					count--;
					if (count < 0) break;
					text += element[index] + "<br>";
				};
			};
			if (iteration === 0) text += "</span><br>";
			else if (iteration == poem.length - 1) text += "</span>";
			else if (element[0] != poem[iteration + 1][0]) text += "</span>";
			if (count < 0) {
				if (text.endsWith("<br>")) text = text.slice(0, text.length - 4);
				break;
			};
			if (iteration !== 0) text += "<br>";
		};
		if (count >= 0) text += "</div>";
		else text += "</div><br>Next discovery at " + formatWhole(game.infinity.points + 1) + " " + infinity;
		if (game.infinity.stage > 12) text += "<br><span class='big'>Congrats! You beat the game!</span><br><br>Thanks for playing, I really hope you enjoyed it!<br><br>You can keep going, but there's not really much else to do.<br><br>The credits for this game are below, if you want to see them.<br><br>If I forgot to mention anyone, just tell me and I'll put you on.<br><br><br><br><span class='big'>Credit roll:</span><br><br>Yrachaz7 (myself): the standalone developer and poem-writer<br><br>My older sibling: playtester and good advice-giver<br><br>My father: also a good advice-giver on coding problems<br><br>The games Exponential Idle and Candy Box 2: inspiration<br><br>And last but not least, thank YOU for taking the time to play my game!<br><br><br><br><span class='big'>If you really want to keep playing...</span><br><br>You have currently broken Infinity " + formatWhole(game.infinity.stage - 13) + " extra times.";
		document.getElementById("???_display").innerHTML = text;
		if (game.infinity.stage > 12) {
			if (!document.getElementById("export_score")) {
				let append = document.createElement("button");
				append.id = "export_score";
				append.type = "button";
				append.onclick = () => {
					if (copy("in Yrahcaz7's Formula Clicker, my high score is " + formatWhole(game.infinity.stage - 13) + "!")) alert("Export score: Successful!");
					else alert("Export score: Failure - try a different browser");
				};
				document.getElementById("main").appendChild(append);
				let br = document.createElement("br");
				br.id = "score_br";
				document.getElementById("main").appendChild(br);
			};
		} else {
			if (document.getElementById("export_score")) document.getElementById("export_score").remove();
			if (document.getElementById("score_br")) document.getElementById("score_br").remove();
		};
		if (count >= 0) {
			if (!document.getElementById("break_infinity")) {
				let append = document.createElement("button");
				append.id = "break_infinity";
				append.type = "button";
				append.onclick = () => {
					if (game.points.gte(infNum())) {
						game.points = game.points.sub(infNum());
						game.infinity.stage++;
					};
				};
				document.getElementById("main").appendChild(append);
			};
		} else {
			if (document.getElementById("break_infinity")) document.getElementById("break_infinity").remove();
		};
		if (document.getElementById("export_score")) document.getElementById("export_score").innerHTML = "Export score of " + formatWhole(game.infinity.stage - 13);
		if (document.getElementById("break_infinity")) {
			if (game.points.gte(infNum())) document.getElementById("break_infinity").className = "upgrade";
			else document.getElementById("break_infinity").className = "upgrade fade";
			if (game.infinity.stage == 12) document.getElementById("break_infinity").innerHTML = "THERE IS NO END<br><br>break the LAST Infinity<br><br>Cost: "+format(infNum(), true, false, false, true);
			else document.getElementById("break_infinity").innerHTML = "THERE IS NO END<br><br>break the false Infinity<br><br>Cost: "+format(infNum(), true, false, false, true);
		};
	} else {
		if (document.getElementById("???_display")) document.getElementById("???_display").remove();
		if (document.getElementById("export_score")) document.getElementById("export_score").remove();
		if (document.getElementById("score_br")) document.getElementById("score_br").remove();
		if (document.getElementById("break_infinity")) document.getElementById("break_infinity").remove();
	};
	if (game.infinity.milestones[45] && game.points.gte(infNum())) {
		let work = 1;
		if (game.infinity.milestones[54]) work *= 5;
		if (game.infinity.milestones[55]) work *= 5;
		if (game.infinity.milestones[58]) work *= 5;
		if (game.infinity.milestones[59]) work *= 2;
		if (game.infinity.milestones[60]) work *= 2;
		if (game.infinity.milestones[61]) work *= 2;
		if (game.infinity.milestones[62]) work *= 2;
		if (game.infinity.milestones[63]) work *= 2;
		for (let iteration = 0; iteration < work; iteration++) {
			if (game.points.lt(infNum())) break;
			if (!game.infinity.milestones[53]) game.points = game.points.sub(infNum());
			game.infinity.stage++;
			let gen = pointButtonGain();
			if (game.infinity.milestones[53] && gen.gt(game.points)) game.points = gen;
		};
	};
	// fixes
	if (game.wave.points !== game.wave.points) game.wave.points = 1.7976931348623157e308;
	if (game.wave.pointBest !== game.wave.pointBest) game.wave.pointBest = 1.7976931348623157e308;
	if (game.wave.pointGen !== game.wave.pointGen) game.wave.pointGen = 1.7976931348623157e308;
};

const loop = setInterval(() => {
	if (game.unlocks.includes("w")) {
		if (game.wave.frame > 312) game.wave.frame = 0;
		// calculate wave min
		let min = 0;
		min += wave_upgrades[1].effect();
		min *= improvements[17].effect();
		if (game.improvements[19]) min += game.wave.max * 0.45;
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
		if (game.infinity.milestones[25]) gen *= (1.1 ** game.infinity.points) + (game.infinity.points * 5);
		else if (game.infinity.milestones[19]) gen *= (1.05 ** game.infinity.points) + (game.infinity.points * 2.5);
		else if (game.infinity.milestones[6]) gen *= (1.02 ** game.infinity.points) + (game.infinity.points * 2);
		else if (game.infinity.milestones[1]) gen *= game.infinity.points + 1;
		game.wave.pointGen = gen;
		if (game.wave.points < game.wave.pointMax) {
			gen *= 0.03;
			if (gen > game.wave.pointMax - game.wave.points) gen = game.wave.pointMax - game.wave.points;
			game.wave.points += gen;
			game.wave.pointTotal += gen;
			if (game.wave.points > game.wave.pointBest) game.wave.pointBest = game.wave.points;
			if (game.wave.points === Infinity) game.wave.points = 1.7976931348620926e308;
			if (game.wave.pointTotal === Infinity) game.wave.pointTotal = 1.7976931348620926e308;
			if (game.wave.pointBest === Infinity) game.wave.pointBest = 1.7976931348620926e308;
		};
		// best ever
		if (game.wave.points > game.infinity.best.wave_points) game.infinity.best.wave_points = game.wave.points;
	};
	if (game.infinity.milestones[26]) {
		let gen = new Decimal(1e-10);
		if (game.infinity.milestones[27]) gen = new Decimal(0.01);
		if (game.infinity.milestones[30]) gen = new Decimal(1);
		if (game.infinity.milestones[32]) gen = new Decimal(100);
		if (gen.gt(0) && pointButtonGain().gt(0)) {
			gen *= 0.0003;
			game.points = game.points.add(pointButtonGain().mul(gen));
			game.pointTotal = game.pointTotal.add(pointButtonGain().mul(gen));
			if (game.points.gt(game.pointBest)) game.pointBest = game.points;
			if (game.points.gt(game.infinity.best.points)) game.infinity.best.points = game.points;
			if (game.points.gt(infNum())) game.points = infNum();
			if (game.pointTotal.gt(infNum())) game.pointTotal = infNum();
			if (game.pointBest.gt(infNum())) game.pointBest = infNum();
		};
	};
	update();
	if (game.unlocks.includes("w")) game.wave.frame++;
}, 30);
