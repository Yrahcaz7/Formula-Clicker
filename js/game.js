const version = "v1.5";

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
		frame: 0,
		upgrades: [],
	},
	infinity: {
		points: 0,
		best: {
			points: new Decimal(0),
			wavePoints: 0,
		},
		milestones: [],
		stage: 1,
	},
	beyond: {
		omega: 0,
		bestTime: -1,
	},
	startTime: new Date().getTime(),
	finishTime: -1,
	version: version,
};

/**
 * Does a game tick (not including passive resource gen).
 */
function update() {
	// unlocks
	if (game.points.gt(0) && !game.unlocks.includes("pd")) game.unlocks.push("pd");
	if (game.upgrades[0] > 0 && !game.unlocks.includes("vd")) game.unlocks.push("vd");
	if (game.points.gte(1000) && !game.unlocks.includes("t")) game.unlocks.push("t");
	if (game.improvements[4] > 0 && game.unlocks.includes("t") && !game.unlocks.includes("o")) game.unlocks.push("o");
	if (game.improvements[13] && game.unlocks.includes("t") && !game.unlocks.includes("w")) game.unlocks.push("w");
	if ((game.points.gte(infNum()) || (game.unlocks.includes("t") && game.infinity.points >= 1)) && !game.unlocks.includes("i")) game.unlocks.push("i");
	if (game.infinity.points >= 1 && game.unlocks.includes("t") && !game.unlocks.includes("?")) game.unlocks.push("?");
	if (game.beyond.omega >= 1 && game.unlocks.includes("t") && !game.unlocks.includes("b")) game.unlocks.push("b");
	// point display
	if (game.unlocks.includes("pd") && !document.getElementById("pointDisplay")) {
		let append = document.createElement("div");
		append.id = "pointDisplay";
		if (document.getElementById("pointButton")) document.getElementById("main").insertBefore(append, document.getElementById("pointButton"));
		else document.getElementById("main").appendChild(append);
	};
	if (document.getElementById("pointDisplay")) {
		document.getElementById("pointDisplay").innerHTML = "You have <b>" + format(game.points, true, true) + "</b> points";
	};
	// point button
	if (!document.getElementById("pointButton")) {
		let append = document.createElement("button");
		append.id = "pointButton";
		append.type = "button";
		append.onclick = click;
		document.getElementById("main").appendChild(append);
	};
	if (document.getElementById("pointButton")) {
		let text = "";
		if (!game.infinity.milestones[32]) text += "+" + format(pointButtonGain()) + " points<br>";
		if (game.improvements[15] > 0) {
			const max = getWavePointMax();
			let gen = getWaveClickGen();
			if (gen + game.wave.points > max) gen = max - game.wave.points;
			text += "+" + format(gen) + " wave points";
		};
		document.getElementById("pointButton").innerHTML = text;
	};
	// variable and formula display
	if (game.unlocks.includes("vd") && !document.getElementById("varDisplay")) {
		let append = document.createElement("div");
		append.id = "varDisplay";
		append.className = "margin";
		if (document.getElementById("tabs")) document.getElementById("main").insertBefore(append, document.getElementById("tabs"));
		else if (document.getElementById("upgrades")) document.getElementById("main").insertBefore(append, document.getElementById("upgrades"));
		else document.getElementById("main").appendChild(append);
	};
	if (document.getElementById("varDisplay")) {
		// formula components
		const superscript = (string) => {return "<sup>" + string + "</sup>"};
		const constantFm = format(getConstant()) + constant();
		const deltaFm = superscript("(" + format(getGammaEx()) + " + " + delta + superscript(format(getDeltaEx())) + ")");
		const epsilonFm = epsilon + superscript(format(getEpsilonEx()));
		const zetaFm = "(" + format(2) + superscript(zeta) + " + " + format(5) + zeta + ")";
		// variable display
		let text = "Your " + alpha + " is " + format(getAlpha());
		if (game.upgrades[2] > 0) text += "<br>Your " + beta + " is " + format(getBeta());
		if (game.upgrades[4] > 0) text += "<br>Your " + gamma + " is " + format(getGamma());
		if (game.upgrades[6] > 0) text += "<br>Your " + delta + " is " + format(getDelta());
		if (game.upgrades[8] > 0) text += "<br>Your " + epsilon + " is " + format(getEpsilon());
		if (game.upgrades[10] > 0) text += "<br>Your " + zeta + " is " + format(getZeta());
		// normal formula
		let formula = "";
		if (game.improvements[24]) formula = constantFm + "(" + format(1.45) + gamma + ")" + deltaFm + epsilonFm + format(2.22) + superscript(zeta);
		else if (game.upgrades[10] > 0) formula = constantFm + "(" + format(1.45) + gamma + ")" + deltaFm + epsilonFm + zetaFm;
		else if (game.improvements[10]) formula = constantFm + "(" + format(1.45) + gamma + ")" + deltaFm + epsilonFm;
		else if (game.upgrades[8] > 0) formula = constantFm + "(" + format(1.45) + gamma + ")" + deltaFm + "(" + epsilon + " + " + format(1) + ")";
		else if (game.improvements[5] > 2) formula = constantFm + "(" + format(1.45) + gamma + ")" + deltaFm;
		else if (game.upgrades[6] > 0) formula = constantFm + gamma + deltaFm;
		else if (game.upgrades[4] > 0) formula = constantFm + gamma + superscript(format(getGammaEx()));
		else if (game.upgrades[2] > 0) formula = constantFm;
		// add infinity formula piece
		if (formula) {
			if (game.infinity.milestones[24]) formula += "(" + format(1.45) + superscript(infinity) + " + " + format(2.5e9) + infinity + ")";
			else if (game.infinity.milestones[13]) formula += "(" + format(1.25) + superscript(infinity) + " + " + format(7.5) + infinity + ")";
			else if (game.infinity.milestones[0]) formula += "(" + format(1.2) + superscript(infinity) + " + " + format(5) + infinity + ")";
		};
		// add beyond formula piece
		if (formula) formula += "(" + omega + " + " + format(1) + ")";
		// add formula text
		if (formula) formula = "Your point gain is " + formula + "<br><br>";
		// display variables and formula
		document.getElementById("varDisplay").innerHTML = formula + text;
	};
	// tabs
	if ((game.unlocks.includes("t")) && !document.getElementById("tabs")) {
		let append = document.createElement("span");
		append.id = "tabs";
		if (document.getElementById("varDisplay")) document.getElementById("main").insertBefore(append, document.getElementById("varDisplay").nextSibling);
		else if (document.getElementById("pointButton")) document.getElementById("main").insertBefore(append, document.getElementById("pointButton").nextSibling);
	};
	if (document.getElementById("tabs") && game.unlocks.includes("t")) {
		// main tab
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
			else if (document.getElementById("tab-beyond")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-beyond"));
			else if (document.getElementById("tab-options")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-options"));
			else document.getElementById("tabs").appendChild(append);
		};
		if (document.getElementById("tab-main")) {
			if (game.tab == "main") document.getElementById("tab-main").className = "tab on";
			else if (game.points.gte(infNum())) document.getElementById("tab-main").className = "tab finished";
			else document.getElementById("tab-main").className = "tab";
		};
		// improvements tab
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
			else if (document.getElementById("tab-beyond")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-beyond"));
			else if (document.getElementById("tab-options")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-options"));
			else document.getElementById("tabs").appendChild(append);
		};
		if (document.getElementById("tab-improvements")) {
			if (game.tab == "improvements") document.getElementById("tab-improvements").className = "tab on";
			else document.getElementById("tab-improvements").className = "tab";
		};
		// options tab
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
		if (document.getElementById("tab-options")) {
			if (game.tab == "options") document.getElementById("tab-options").className = "tab on";
			else document.getElementById("tab-options").className = "tab";
		};
		// waves tab
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
			else if (document.getElementById("tab-beyond")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-beyond"));
			else if (document.getElementById("tab-options")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-options"));
			else document.getElementById("tabs").appendChild(append);
		};
		if (document.getElementById("tab-waves")) {
			if (game.tab == "waves") document.getElementById("tab-waves").className = "tab on";
			else if (game.wave.points >= MAX) document.getElementById("tab-waves").className = "tab finished";
			else document.getElementById("tab-waves").className = "tab";
		};
		// infinity tab
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
			else if (document.getElementById("tab-beyond")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-beyond"));
			else if (document.getElementById("tab-options")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-options"));
			else document.getElementById("tabs").appendChild(append);
		};
		if (document.getElementById("tab-infinity")) {
			if (game.tab == "infinity") document.getElementById("tab-infinity").className = "tab on";
			else if (game.infinity.points >= MAX) document.getElementById("tab-infinity").className = "tab finished";
			else if (getInfGain() > 0 && getInfGain() >= game.infinity.points / 100) document.getElementById("tab-infinity").className = "tab notif";
			else document.getElementById("tab-infinity").className = "tab";
		};
		// ??? tab
		if (game.unlocks.includes("?") && !document.getElementById("tab-???")) {
			let append = document.createElement("button");
			append.id = "tab-???";
			append.type = "button";
			append.className = "tab";
			append.onclick = () => {
				game.tab = "???";
			};
			append.innerHTML = "???";
			if (document.getElementById("tab-beyond")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-beyond"));
			else if (document.getElementById("tab-options")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-options"));
			else document.getElementById("tabs").appendChild(append);
		};
		if (document.getElementById("tab-???")) {
			if (game.tab == "???") {
				document.getElementById("tab-???").className = "tab on";
			} else if (
				(game.infinity.points == 45 && game.infinity.stage == 1) ||
				(game.points.gte(infNum()) && game.infinity.stage > 1 && game.infinity.stage < MAX) ||
				(game.infinity.stage >= MAX && !game.unlocks.includes("b"))
			) {
				document.getElementById("tab-???").className = "tab notif";
			} else {
				document.getElementById("tab-???").className = "tab";
			};
		};
		// beyond tab
		if (game.unlocks.includes("b") && !document.getElementById("tab-beyond")) {
			let append = document.createElement("button");
			append.id = "tab-beyond";
			append.type = "button";
			append.className = "tab";
			append.onclick = () => {
				game.tab = "beyond";
			};
			append.innerHTML = "Beyond";
			if (document.getElementById("tab-options")) document.getElementById("tabs").insertBefore(append, document.getElementById("tab-options"));
			else document.getElementById("tabs").appendChild(append);
		};
		if (document.getElementById("tab-beyond")) {
			if (game.tab == "beyond") document.getElementById("tab-beyond").className = "tab on";
			else if (game.infinity.stage >= MAX) document.getElementById("tab-beyond").className = "tab notif";
			else document.getElementById("tab-beyond").className = "tab";
		};
	};
	// main tab
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
	// upgrades
	for (let index = 0; index < upgrades.length; index++) {
		if (game.upgrades[index] === undefined) game.upgrades[index] = 0;
		const element = upgrades[index];
		let max = game.infinity.milestones[49] ? 10000000 : 100000;
		if (element.max) max = element.max;
		if (element.unlocked() && game.upgrades[index] < max && index != 12) {
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
				if (game.improvements[16] && ((game.points * 0.1) >= element.cost() || game.infinity.milestones[10])) buy.upgrade(index, true);
				else if (game.improvements[3] && game.options.uo && (game.points * 0.025) >= element.cost()) buy.upgrade(index);
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
				buy.upgrade(index);
			};
			if (index == 12) append.style = "max-width:none;border-radius:10px;flex-basis:100%";
			if (document.getElementById("upgrade_" + (index - 1))) document.getElementById("upgrades").insertBefore(append, document.getElementById("upgrade_" + (index - 1)).nextSibling);
			else document.getElementById("upgrades").appendChild(append);
		};
		if (document.getElementById("upgrade_" + index)) {
			if (game.upgrades[index] >= max) document.getElementById("upgrade_" + index).className = "upgrade maxed";
			else if (game.points.gte(element.cost())) document.getElementById("upgrade_" + index).className = "upgrade";
			else document.getElementById("upgrade_" + index).className = "upgrade fade";
			if (game.upgrades[index] > 0) document.getElementById("upgrade_" + index).innerHTML = element.title + "<br><br>" + (typeof element.desc == "function" ? element.desc() : element.desc) + "<br><br>Cost: " + format(upgrades[index].cost());
			else {
				document.getElementById("upgrade_" + index).innerHTML = element.title + "<br><br>Cost: " + format(upgrades[index].cost());
				document.getElementById("upgrade_" + index).className += " small";
			};
		};
	};
	// improvements tab
	if (game.tab == "improvements") {
		// improvement display
		if (!document.getElementById("improvement_display")) {
			let append = document.createElement("div");
			append.id = "improvement_display";
			document.getElementById("main").appendChild(append);
		};
		if (document.getElementById("improvement_display")) {
			if (game.improvements[16] || !game.improvements[3]) {
				document.getElementById("improvement_display").innerHTML = "";
				delete game.options.uo;
			} else {
				if (game.options.uo === undefined) game.options.uo = true;
				if (!document.getElementById("improvement_display").innerHTML) document.getElementById("improvement_display").innerHTML = "Toggle upgrade autobuyer: <input id='option_autobuyer' type='checkbox' " + (game.options.uo ? "checked" : "") + "></input>";
				game.options.uo = document.getElementById("option_autobuyer").checked;
			};
		};
		// improvements frame
		if (!document.getElementById("improvements")) {
			let append = document.createElement("div");
			append.id = "improvements";
			append.style = "display: flex; flex-wrap: wrap";
			document.getElementById("main").appendChild(append);
		};
	} else {
		if (document.getElementById("improvement_display")) document.getElementById("improvement_display").remove();
		if (document.getElementById("improvements")) document.getElementById("improvements").remove();
	};
	// improvements
	let maxed = 0;
	for (let index = 0; index < improvements.length; index++) {
		if (game.improvements[index] === undefined) game.improvements[index] = 0;
		const element = improvements[index];
		const cost = (typeof element.cost == "function" ? element.cost() : element.cost);
		let max = game.infinity.milestones[49] ? 10000000 : 100000;
		if (element.max) max = element.max;
		if (element.unlocked() && index == 0 && game.infinity.milestones[51]) game.improvements[0] = 1e10;
		else if (element.unlocked() && game.improvements[index] < max) {
			if (index == 0 && game.improvements[11]) {
				let work = 1;
				if (game.improvements[27]) work *= 3;
				if (game.infinity.milestones[44]) work *= 2;
				if (game.infinity.milestones[46]) work *= 2;
				if (game.infinity.milestones[48]) work *= 2;
				for (let iteration = 0; iteration < work; iteration++) {
					if (game.improvements[0] >= max || game.points.lt(improvements[0].cost())) break;
					buy.improvement(0, true);
				};
			} else if (game.infinity.milestones[12]) buy.improvement(index);
		};
		if (document.getElementById("tab-improvements") && element.unlocked()) {
			if (game.points.gte(cost) && game.improvements[index] < max) document.getElementById("tab-improvements").className += " notif";
			if (game.improvements[index] >= max) maxed++;
		};
		if (game.tab != "improvements" || !element.unlocked() || (game.improvements[index] >= max && !game.options.sm && game.options.sm !== undefined)) {
			if (document.getElementById("improvement_" + index)) document.getElementById("improvement_" + index).remove();
			continue;
		};
		if (!document.getElementById("improvement_" + index)) {
			let append = document.createElement("button");
			append.id = "improvement_" + index;
			append.type = "button";
			append.onclick = () => {
				buy.improvement(index);
			};
			if (document.getElementById("improvement_" + (index - 1))) document.getElementById("improvements").insertBefore(append, document.getElementById("improvement_" + (index - 1)).nextSibling);
			else document.getElementById("improvements").appendChild(append);
		};
		if (document.getElementById("improvement_" + index)) {
			if (game.improvements[index] >= max) document.getElementById("improvement_" + index).className = "improvement maxed";
			else if (game.points.gte(cost)) document.getElementById("improvement_" + index).className = "improvement";
			else document.getElementById("improvement_" + index).className = "improvement fade";
			document.getElementById("improvement_" + index).innerHTML = element.title + "<br><br>" + (typeof element.desc == "function" ? element.desc() : element.desc) + "<br><br>Cost: " + format(cost) + " Bought: " + (max == 1 ? (game.improvements[index] ? "yes" : "no") : formatWhole(game.improvements[index]) + (element.max ? "/" + formatWhole(max) : ""));
			let rows = document.getElementById("improvement_" + index).innerHTML.split("<br>");
			document.getElementById("improvement_" + index).innerHTML = document.getElementById("improvement_" + index).innerHTML.replace("Bought:", "            ".slice(rows[rows.length - 1].length - 20) + "Bought:");
		};
	};
	if (maxed == improvements.length && game.tab != "improvements") document.getElementById("tab-improvements").className = "tab finished";
	// options tab
	if (game.tab == "options") {
		if (!document.getElementById("options")) {
			let append = document.createElement("div");
			append.id = "options";
			document.getElementById("main").appendChild(append);
		};
	} else {
		if (document.getElementById("options")) document.getElementById("options").remove();
		if (document.getElementById("option_reset_br")) document.getElementById("option_reset_br").remove();
		if (document.getElementById("option_reset")) document.getElementById("option_reset").remove();
	};
	// options
	for (let index = 0; index < options.length && index < game.improvements[4]; index++) {
		const element = options[index];
		if (game.options[element.id] === undefined && element.type != "export" && element.type != "import") game.options[element.id] = element.value();
		if (!document.getElementById("option_" + index) && game.tab == "options") {
			let append = document.createElement("span");
			append.id = "option_" + index;
			append.style = "margin-left: auto";
			append.innerHTML = (index !== 0 ? "<br><br>" : "") + (element.type != "export" ? element.title + ": " : "");
			if (document.getElementById("option_reset_br")) document.getElementById("options").insertBefore(document.getElementById("option_reset_br"), append);
			else document.getElementById("options").appendChild(append);
			if (element.set && element.type != "export" && element.type != "import") element.set(game.options[element.id]);
		};
		if (element.type == "color") {
			if (!document.getElementById("option_" + index + "_type") && game.tab == "options") {
				let append = document.createElement("input");
				append.id = "option_" + index + "_type";
				append.type = "color";
				append.className = "color";
				append.value = game.options[element.id];
				if (document.getElementById("option_reset_br")) document.getElementById("options").insertBefore(document.getElementById("option_reset_br"), append);
				else document.getElementById("options").appendChild(append);
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
				if (document.getElementById("option_reset_br")) document.getElementById("options").insertBefore(document.getElementById("option_reset_br"), append);
				else document.getElementById("options").appendChild(append);
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
				if (document.getElementById("option_reset_br")) document.getElementById("options").insertBefore(document.getElementById("option_reset_br"), append);
				else document.getElementById("options").appendChild(append);
			};
			if (document.getElementById("option_" + index + "_type")) game.options[element.id] = document.getElementById("option_" + index + "_type").checked;
		} else if (element.type == "dropdown") {
			if (!document.getElementById("option_" + index + "_type") && game.tab == "options") {
				let append = document.createElement("select");
				append.id = "option_" + index + "_type";
				append.value = game.options[element.id];
				if (append.value === undefined) append.value = element.default;
				if (document.getElementById("option_reset_br")) document.getElementById("options").insertBefore(document.getElementById("option_reset_br"), append);
				else document.getElementById("options").appendChild(append);
				for (let num = 0; num < element.list.length; num++) {
					const item = element.list[num];
					document.getElementById("option_" + index + "_type").innerHTML += "<option value='" + item + "' " + (element.intList[num] == game.options[element.id] ? "selected" : "") + ">" + item + "</option>";
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
				if (document.getElementById("option_reset_br")) document.getElementById("options").insertBefore(document.getElementById("option_reset_br"), append);
				else document.getElementById("options").appendChild(append);
			};
		} else if (element.type == "import") {
			if (!document.getElementById("option_" + index + "_type") && game.tab == "options") {
				let append = document.createElement("input");
				append.id = "option_" + index + "_type";
				append.type = "text";
				if (document.getElementById("option_reset_br")) document.getElementById("options").insertBefore(document.getElementById("option_reset_br"), append);
				else document.getElementById("options").appendChild(append);
			};
			if (!document.getElementById("option_" + index + "_space") && game.tab == "options") {
				let append = document.createElement("span");
				append.id = "option_" + index + "_space";
				append.innerHTML = " ";
				if (document.getElementById("option_reset_br")) document.getElementById("options").insertBefore(document.getElementById("option_reset_br"), append);
				else document.getElementById("options").appendChild(append);
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
				if (document.getElementById("option_reset_br")) document.getElementById("options").insertBefore(document.getElementById("option_reset_br"), append);
				else document.getElementById("options").appendChild(append);
			};
		};
	};
	if (!document.getElementById("option_reset") && game.tab == "options") {
		let br = document.createElement("br");
		br.id = "option_reset_br";
		document.getElementById("options").appendChild(br);
		let append = document.createElement("button");
		append.id = "option_reset";
		append.onclick = () => {
			for (let index = 0; index < options.length; index++) {
				const element = options[index];
				if (element.type == "export" || element.type == "import") continue;
				game.options[element.id] = element.default;
			};
			setPage();
		};
		append.style = "margin-left: auto";
		append.innerHTML = "Reset Options";
		document.getElementById("options").appendChild(append);
	};
	// waves tab
	if (game.tab == "waves") {
		// wave point display
		if (!document.getElementById("wave_point_display")) {
			let append = document.createElement("div");
			append.id = "wave_point_display";
			if (document.getElementById("wave_graph")) document.getElementById("main").insertBefore(append, document.getElementById("wave_graph"));
			else if (document.getElementById("wave_upgrades")) document.getElementById("main").insertBefore(append, document.getElementById("wave_upgrades"));
			else document.getElementById("main").appendChild(append);
		};
		if (document.getElementById("wave_point_display")) document.getElementById("wave_point_display").innerHTML = "You have " + format(game.wave.points) + "/" + format(getWavePointMax()) + " wave points<br>" + (game.wave.upgrades[3] > 0 ? "Your best wave points is " + format(game.wave.pointBest) + "<br>" : "") + "You are gaining " + format(getWaveGen(), false) + " wave points per second<br>Your wave formula is " + waveFormula();
		// wave graph
		if (!document.getElementById("wave_graph")) {
			let append = document.createElement("div");
			append.id = "wave_graph";
			append.innerHTML = "<svg viewBox='0 0 600 100' class='graph'></svg>"
			if (document.getElementById("wave_upgrades")) document.getElementById("main").insertBefore(append, document.getElementById("wave_upgrades"));
			else document.getElementById("main").appendChild(append);
		};
		if (document.getElementById("wave_graph") && sinwaves.length) {
			const normal = getWaveMin() < getWaveMax();
			let points = "";
			if (normal) {
				for (let iteration = 0; iteration <= 302; iteration++) {
					points += ((iteration - 1) * 2) + "," + sinwaves[iteration + game.wave.frame] + " ";
				};
			} else {
				points = "0,50 600,50";
			};
			document.getElementById("wave_graph").innerHTML = "<svg viewBox='0 0 600 100' class='graph'><polyline points='" + points + "' fill='none' stroke='#000'/><circle cx='300' cy='" + (normal ? sinwaves[game.wave.frame + 151] : "50") + "' r='5' stroke='#000' fill='#eee'/></svg>";
		};
		// wave upgrade frame
		if (!document.getElementById("wave_upgrades")) {
			let append = document.createElement("div");
			append.id = "wave_upgrades";
			append.style = "display: flex; flex-wrap: wrap";
			document.getElementById("main").appendChild(append);
		};
	} else {
		if (document.getElementById("wave_graph")) document.getElementById("wave_graph").remove();
		if (document.getElementById("wave_point_display")) document.getElementById("wave_point_display").remove();
	};
	// wave upgrades
	for (let index = 0; index < wave_upgrades.length; index++) {
		if (game.wave.upgrades[index] === undefined) game.wave.upgrades[index] = 0;
		const element = wave_upgrades[index];
		const cost = (typeof element.cost == "function" ? element.cost() : element.cost);
		let max = game.infinity.milestones[49] ? 10000000 : 100000;
		if (typeof element.max == "function") max = element.max();
		else if (element.max) max = element.max;
		if (element.unlocked() && game.wave.upgrades[index] < max) {
			let work = 1;
			if (game.infinity.milestones[31]) work *= 2;
			if (game.infinity.milestones[33]) work *= 2;
			for (let iteration = 0; iteration < work; iteration++) {
				if (game.wave.upgrades[index] >= max) break;
				if (game.infinity.milestones[11] && game.infinity.milestones[15]) buy.wave_upgrade(index, true);
				else if ((index == 0 && game.infinity.milestones[7]) || (index == 1 && game.infinity.milestones[8]) || (index == 2 && game.infinity.milestones[9])) buy.wave_upgrade(index, true);
				else if (game.infinity.milestones[11]) buy.wave_upgrade(index);
			};
		};
		if (document.getElementById("tab-waves") && element.unlocked() && game.wave.points >= cost && game.wave.upgrades[index] < max) document.getElementById("tab-waves").className += " notif";
		if (game.tab != "waves" || !element.unlocked()) {
			if (document.getElementById("wave_upgrade_" + index)) document.getElementById("wave_upgrade_" + index).remove();
			continue;
		};
		if (!document.getElementById("wave_upgrade_" + index)) {
			let append = document.createElement("button");
			append.id = "wave_upgrade_" + index;
			append.type = "button";
			append.onclick = () => {
				buy.wave_upgrade(index);
			};
			if (document.getElementById("wave_upgrade_" + (index - 1))) document.getElementById("wave_upgrades").insertBefore(append, document.getElementById("wave_upgrade_" + (index - 1)).nextSibling);
			else document.getElementById("wave_upgrades").appendChild(append);
		};
		if (document.getElementById("wave_upgrade_" + index)) {
			if (game.wave.upgrades[index] >= max) document.getElementById("wave_upgrade_" + index).className = "upgrade maxed";
			else if (game.wave.points >= cost) document.getElementById("wave_upgrade_" + index).className = "upgrade";
			else document.getElementById("wave_upgrade_" + index).className = "upgrade fade";
			if (game.wave.upgrades[index] > 0 || max === 1) document.getElementById("wave_upgrade_" + index).innerHTML = element.title + "<br><br>" + (typeof element.desc == "function" ? element.desc() : element.desc) + "<br><br>Cost: " + format(cost) + (max < 100000 ? "<br>Bought: " + (max == 1 ? (game.wave.upgrades[index] ? "yes" : "no") : formatWhole(game.wave.upgrades[index]) + "/" + formatWhole(max)) : "");
			else {
				document.getElementById("wave_upgrade_" + index).innerHTML = element.title + "<br><br>Cost: " + format(cost);
				document.getElementById("wave_upgrade_" + index).className += " small";
			};
		};
	};
	// infinity tab
	if (game.tab == "infinity") {
		// break infinity autobuyer toggle
		if (!document.getElementById("break_auto_display")) {
			let append = document.createElement("div");
			append.id = "break_auto_display";
			document.getElementById("main").appendChild(append);
		};
		if (document.getElementById("break_auto_display")) {
			if (game.infinity.milestones[53] || !game.infinity.milestones[45]) {
				document.getElementById("break_auto_display").innerHTML = "";
				delete game.options.bo;
			} else {
				if (game.options.bo === undefined) game.options.bo = true;
				if (!document.getElementById("break_auto_display").innerHTML) document.getElementById("break_auto_display").innerHTML = "Toggle break infinity autobuyer: <input id='option_autobuyer' type='checkbox' " + (game.options.bo ? "checked" : "") + "></input><br><br>";
				game.options.bo = document.getElementById("option_autobuyer").checked;
			};
		};
		// infinity point display
		if (!document.getElementById("infinity_point_display")) {
			let append = document.createElement("div");
			append.id = "infinity_point_display";
			document.getElementById("main").appendChild(append);
		};
		if (document.getElementById("infinity_point_display")) document.getElementById("infinity_point_display").innerHTML = "You have <b>" + formatWhole(game.infinity.points) + "</b> " + infinity + "<br><br>Your best points ever is " + format(game.infinity.best.points, true, false, false, true) + "<br>Your best wave points ever is " + format(game.infinity.best.wavePoints) + "<br><br>You can press Shift+P to prestige from any tab";
		// infinity prestige button
		if (!document.getElementById("infinity_prestige_button")) {
			let append = document.createElement("button");
			append.id = "infinity_prestige_button";
			append.className = "prestigeButton";
			append.onclick = () => {
				if (getInfGain() > 0) prestige();
			};
			document.getElementById("main").appendChild(append);
		};
		if (document.getElementById("infinity_prestige_button")) {
			if (game.infinity.points >= 45 && game.infinity.stage == 1) {
				document.getElementById("infinity_prestige_button").className = "prestigeButton fade";
				document.getElementById("infinity_prestige_button").innerHTML = "Max " + infinity + " reached<br>Go to the ??? tab";
			} else if (getInfGain() > 0) {
				document.getElementById("infinity_prestige_button").className = "prestigeButton";
				document.getElementById("infinity_prestige_button").innerHTML = "Prestige for +" + formatWhole(getInfGain()) + " " + infinity + "<br>" + getNextInf();
			} else {
				document.getElementById("infinity_prestige_button").className = "prestigeButton fade";
				document.getElementById("infinity_prestige_button").innerHTML = "Prestige for +" + formatWhole(getInfGain()) + " " + infinity + "<br>" + getNextInf();
			};
		};
		// infinity milestones frame
		if (!document.getElementById("infinity_milestones")) {
			let append = document.createElement("div");
			append.id = "infinity_milestones";
			append.style = "border-top:1px solid #000;border-bottom:1px solid #000";
			document.getElementById("main").appendChild(append);
		};
	} else {
		if (document.getElementById("break_auto_display")) document.getElementById("break_auto_display").remove();
		if (document.getElementById("infinity_point_display")) document.getElementById("infinity_point_display").remove();
		if (document.getElementById("infinity_prestige_button")) document.getElementById("infinity_prestige_button").remove();
		if (document.getElementById("infinity_milestones")) document.getElementById("infinity_milestones").remove();
	};
	// infinity milestones
	let potentialInf = game.infinity.points + getInfGain();
	for (let index = 0; index < infinity_milestones.length; index++) {
		if (game.infinity.milestones[index] === undefined) game.infinity.milestones[index] = false;
		const element = infinity_milestones[index];
		if (!game.infinity.milestones[index] && game.infinity.milestones[index - 1] !== false) {
			if (game.infinity.points >= element.req) game.infinity.milestones[index] = true;
		};
		if (game.tab != "infinity" || (game.infinity.milestones[index - 1] === false && potentialInf < element.req)) {
			if (document.getElementById("infinity_milestone_" + index)) document.getElementById("infinity_milestone_" + index).remove();
			continue;
		} else if (element.merge) {
			let boolean = true;
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
				if (game.infinity.milestones[1]) document.getElementById("infinity_milestone_" + index).innerHTML = "Bonuses:<br>" + (typeof element.desc == "function" ? element.desc() : element.desc);
				else if (game.infinity.milestones[0]) document.getElementById("infinity_milestone_" + index).innerHTML = "Bonus:<br>" + (typeof element.desc == "function" ? element.desc() : element.desc);
				else if (potentialInf >= element.req) document.getElementById("infinity_milestone_" + index).innerHTML = (game.infinity.milestones[index] ? "" : "Obtainable bonus:<br><br>") + (typeof element.desc == "function" ? element.desc() : element.desc);
				else document.getElementById("infinity_milestone_" + index).innerHTML = "Next bonus at " + formatWhole(element.req) + " " + infinity + "<br><br>" + (typeof element.desc == "function" ? element.desc() : element.desc);
			} else {
				if (potentialInf >= element.req) document.getElementById("infinity_milestone_" + index).innerHTML = (game.infinity.milestones[index] ? "" : "Obtainable bonus:<br><br>") + (typeof element.desc == "function" ? element.desc() : element.desc);
				else document.getElementById("infinity_milestone_" + index).innerHTML = (game.infinity.milestones[index] ? "" : "Next bonus at " + formatWhole(element.req) + " " + infinity + "<br><br>") + (typeof element.desc == "function" ? element.desc() : element.desc);
			};
			if (game.infinity.milestones[index]) document.getElementById("infinity_milestone_" + index).className = "milestone done";
			else document.getElementById("infinity_milestone_" + index).className = "milestone";
		};
	};
	// ??? tab
	if (game.tab == "???") {
		if (!document.getElementById("???_display")) {
			let append = document.createElement("div");
			append.id = "???_display";
			document.getElementById("main").appendChild(append);
		};
		let text = "<div class='v0'><span style='font-size: calc(var(--text-size) * 2)'>", count = +game.infinity.points;
		for (let iteration = 0; iteration < poem.length; iteration++) {
			const element = poem[iteration];
			if (iteration !== 0 && element[0] != poem[iteration - 1][0]) text += "<span class='" + element[0] + "'>";
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
		if (game.infinity.stage > 12) text += "<br><div class='big'>Congrats! You beat the game!</div><br>Thanks for playing, I really hope you enjoyed it!<br><br>You can keep going, but there's not really much else to do.<br><br>The credits for this game are below, if you want to see them.<br><br>If I forgot to mention anyone, just tell me and I'll put you on.<br><br><br><br><div class='big'>Credit roll:</div><br>Yrachaz7 (myself): the standalone developer and poem-writer<br><br>My older sibling: playtester and good advice-giver<br><br>My father: also a good advice-giver on coding problems<br><br>The games Exponential Idle and Candy Box 2: inspiration<br><br>And last but not least, thank YOU for taking the time to play my game!<br><br><br><br>" + (game.infinity.stage >= MAX ? "<div class='big ending'>TRUE ENDING ACHIEVED</div><br>You have currently broken Infinity " + formatWhole(MAX) + " extra times.<br><br>The time it took you to achieve the TRUE ENDING is below." : "<div class='big'>If you really want to keep playing...</div><br>You have currently broken Infinity " + formatWhole(game.infinity.stage - 13) + " extra times.");
		document.getElementById("???_display").innerHTML = text;
		if (game.infinity.stage > 12) {
			if (!document.getElementById("export_score")) {
				let append = document.createElement("button");
				append.id = "export_score";
				append.type = "button";
				append.onclick = () => {
					if (game.infinity.stage >= MAX) {
						if (copy("in Yrahcaz7's Formula Clicker, I achieved the TRUE ENDING in " + getTime() + "!")) alert("Export score: Successful!");
						else alert("Export score: Failure - try a different browser");
					} else {
						if (copy("in Yrahcaz7's Formula Clicker, my high score is " + formatWhole(game.infinity.stage - 1) + ", and I achieved it in " + getTime() + "!")) alert("Export score: Successful!");
						else alert("Export score: Failure - try a different browser");
					};
				};
				if (document.getElementById("break_infinity")) document.getElementById("main").insertBefore(append, document.getElementById("break_infinity"));
				else document.getElementById("main").appendChild(append);
				let br = document.createElement("br");
				br.id = "score_br";
				if (document.getElementById("break_infinity")) document.getElementById("main").insertBefore(br, document.getElementById("break_infinity"));
				else document.getElementById("main").appendChild(br);
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
						if (game.infinity.stage == 12) {
							setPage();
						};
						game.points = game.points.sub(infNum());
						game.infinity.stage += breakInfBulk();
					};
				};
				document.getElementById("main").appendChild(append);
			};
		} else {
			if (document.getElementById("break_infinity")) document.getElementById("break_infinity").remove();
		};
		if (document.getElementById("export_score")) {
			if (game.infinity.stage >= MAX) {
				document.getElementById("export_score").className = "ending";
				document.getElementById("export_score").innerHTML = "Export TRUE ENDING ACHIEVED in " + getTime();
			} else {
				document.getElementById("export_score").className = "";
				document.getElementById("export_score").innerHTML = "Export score of " + formatWhole(game.infinity.stage - 1) + " in " + getTime();
			};
		};
		if (document.getElementById("break_infinity")) {
			if (game.infinity.stage >= MAX) document.getElementById("break_infinity").className = "upgrade ending fade";
			else if (game.points.gte(infNum())) document.getElementById("break_infinity").className = "upgrade";
			else document.getElementById("break_infinity").className = "upgrade fade";
			if (game.infinity.stage >= MAX) document.getElementById("break_infinity").innerHTML = "THERE IS AN END<br><br>you have broken the<br>VERY LAST Infinity";
			else if (game.infinity.stage == 12) document.getElementById("break_infinity").innerHTML = "THERE IS NO END<br><br>break the LAST Infinity<br><br>Cost: "+format(infNum(), true, false, false, true);
			else document.getElementById("break_infinity").innerHTML = "THERE IS NO END<br><br>break the false Infinity<br><br>Cost: "+format(infNum(), true, false, false, true);
		};
		if (!document.getElementById("reach_beyond") && !game.unlocks.includes("b")) {
			// line break
			let br = document.createElement("br");
			br.id = "reach_br";
			document.getElementById("main").appendChild(br);
			// button
			let append = document.createElement("button");
			append.id = "reach_beyond";
			append.type = "button";
			append.className = "ending";
			append.innerHTML = "ATTEMPT TO REACH BEYOND<br><br>YOU WILL GAIN +" + formatWhole(getOmegaGain()) + " " + omega + "<br><br>THIS WILL RESET EVERYTHING";
			append.onclick = reach_beyond;
			document.getElementById("main").appendChild(append);
		};
	} else {
		if (document.getElementById("???_display")) document.getElementById("???_display").remove();
		if (document.getElementById("reach_beyond")) document.getElementById("reach_beyond").remove();
		if (document.getElementById("reach_br")) document.getElementById("reach_br").remove();
		if (document.getElementById("export_score")) document.getElementById("export_score").remove();
		if (document.getElementById("score_br")) document.getElementById("score_br").remove();
		if (document.getElementById("break_infinity")) document.getElementById("break_infinity").remove();
	};
	// beyond tab
	if (game.tab == "beyond") {
		// omega display
		if (!document.getElementById("omega_display")) {
			let append = document.createElement("div");
			append.id = "omega_display";
			document.getElementById("main").appendChild(append);
		};
		if (document.getElementById("omega_display")) document.getElementById("omega_display").innerHTML = "You have <b>" + formatWhole(game.beyond.omega) + "</b> " + omega + "<br><br>Your " + omega + " is multiplying clicks, point gain, the value of your wave, " + infinity + " gain, break infinity bulk amount, and TO THE BEYOND bulk amount by (" + omega + " + " + format(1) + ") = " + format(game.beyond.omega + 1) + "x<br><br>The shortest time it has taken you to reach beyond is " + formatTime(game.beyond.bestTime);
		// beyond prestige button
		if (!document.getElementById("beyond_prestige_button")) {
			let append = document.createElement("button");
			append.id = "beyond_prestige_button";
			append.className = "prestigeButton";
			append.onclick = () => {
				if (getOmegaGain() > 0) reach_beyond();
			};
			document.getElementById("main").appendChild(append);
		};
		if (document.getElementById("beyond_prestige_button")) {
			if (getOmegaGain() > 0) document.getElementById("beyond_prestige_button").className = "prestigeButton";
			else document.getElementById("beyond_prestige_button").className = "prestigeButton fade";
			document.getElementById("beyond_prestige_button").innerHTML = "REACH BEYOND for +" + formatWhole(getOmegaGain()) + " " + omega + "<br>" + getNextOmega();
		};
	} else {
		if (document.getElementById("omega_display")) document.getElementById("omega_display").remove();
		if (document.getElementById("beyond_prestige_button")) document.getElementById("beyond_prestige_button").remove();
	};
	// break infinity autobuyer
	if (game.infinity.milestones[45] && game.points.gte(infNum()) && (game.infinity.milestones[53] || game.options.bo === undefined || game.options.bo)) {
		let work = 1;
		if (game.infinity.milestones[54]) work *= 5;
		if (game.infinity.milestones[55]) work *= 5;
		if (game.infinity.milestones[58]) work *= 5;
		if (game.infinity.milestones[59]) work *= 2;
		if (game.infinity.milestones[60]) work *= 2;
		if (game.infinity.milestones[61]) work *= 2;
		if (game.infinity.milestones[62]) work *= 2;
		if (game.infinity.milestones[63]) work *= 2;
		let bulk = breakInfBulk();
		for (let iteration = 0; iteration < work; iteration++) {
			if (game.points.lt(infNum())) break;
			if (!game.infinity.milestones[53]) game.points = game.points.sub(infNum());
			game.infinity.stage += bulk;
			let gen = pointButtonGain();
			if (game.infinity.milestones[53] && gen.gt(game.points)) game.points = gen;
		};
	};
	// stop timer on game complete
	if (game.infinity.stage >= MAX && game.finishTime === -1) game.finishTime = new Date().getTime();
};

let prevTime = new Date().getTime();

const loop = setInterval(() => {
	// calculate delta time
	let newTime = new Date().getTime();
	let delta = Math.min((newTime - prevTime) / 1000, 1);
	prevTime = newTime;
	// do the stuff
	if (!prestiging && !reaching) {
		// wave point gen
		if (game.unlocks.includes("w")) {
			if (game.wave.frame > 312) game.wave.frame = 0;
			// calculate wave point gain
			const max = getWavePointMax();
			let gen = getWaveGen() * delta;
			if (game.wave.points < max) {
				// generate wave points
				if (gen > max - game.wave.points) gen = max - game.wave.points;
				game.wave.points += gen;
				if (game.wave.points > game.wave.pointBest) game.wave.pointBest = game.wave.points;
				if (game.wave.points > game.infinity.best.wavePoints) game.infinity.best.wavePoints = game.wave.points;
				// fix invalid values
				if (game.wave.points === Infinity || game.wave.points !== game.wave.points) game.wave.points = MAX;
				if (game.wave.pointBest === Infinity || game.wave.pointBest !== game.wave.pointBest) game.wave.pointBest = MAX;
				if (game.infinity.best.wavePoints === Infinity || game.infinity.best.wavePoints !== game.infinity.best.wavePoints) game.infinity.best.wavePoints = MAX;
			};
		};
		// point gen
		if (game.infinity.milestones[26]) {
			// calculate point gain
			let gen = 1e-10;
			if (game.infinity.milestones[27]) gen = 0.01;
			if (game.infinity.milestones[30]) gen = 1;
			if (game.infinity.milestones[32]) gen = 100;
			if (gen > 0 && pointButtonGain().gt(0)) {
				// generate points
				gen *= 0.01 * delta;
				game.points = game.points.add(pointButtonGain().mul(gen));
				game.pointTotal = game.pointTotal.add(pointButtonGain().mul(gen));
				if (game.points.gt(game.pointBest)) game.pointBest = game.points;
				if (game.points.gt(game.infinity.best.points)) game.infinity.best.points = game.points;
				// fix invalid values
				if (game.points.gt(infNum())) game.points = infNum();
				if (game.pointTotal.gt(infNum())) game.pointTotal = infNum();
				if (game.pointBest.gt(infNum())) game.pointBest = infNum();
			};
		};
		// everthing else
		update();
		// move wave a frame
		if (game.unlocks.includes("w")) game.wave.frame++;
		else game.wave.frame = 0;
	};
}, 30), save = setInterval(() => {
	// save the game
	let proxy = getProxy();
	if (proxy) localStorage.setItem(ID, proxy);
}, 1000);
