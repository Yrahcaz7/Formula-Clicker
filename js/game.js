var game = {
	points: 0,
	pointBest: 0,
	pointTotal: 0,
	clicks: 0,
	tab: "main",
	unlocks: [],
	upgrades: [],
};

function get_alpha() {
	let a = 0;
	a += upgrades[0].effect();
	a += upgrades[1].effect();
	return a;
};

function get_beta() {
	let b = 0;
	b += upgrades[2].effect();
	b += upgrades[3].effect();
	return b;
};

function pointButtonGain() {
	let a = get_alpha();
	let b = get_beta();
	if (!a && !b) return 1;
	return ((1 + a) * (1 + b)) + (2 * a * b);
};

function buy(type, index) {
	if (type == "upgrade") {
		let max = Infinity;
		if (upgrades[index].max) max = upgrades[index];
		if (game.points >= upgrades[index].cost() && game.upgrades[index] < max) {
			game.points -= upgrades[index].cost();
			game.upgrades[index]++;
			return true;
		} else return false;
	};
	return false;
};

function update() {
	if (game.points > 0 && !game.unlocks.includes("pointDisplay")) game.unlocks.push("pointDisplay");
	if (game.upgrades[0] > 0 && !game.unlocks.includes("varDisplay")) game.unlocks.push("varDisplay");
	if (game.tab == "main") {
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
			append.addEventListener("click", () => {
				game.points += pointButtonGain();
				game.pointTotal += pointButtonGain();
				if (game.points > game.pointBest) game.pointBest = game.points;
				game.clicks++;
			});
			document.getElementById("main").appendChild(append);
		};
		if (game.unlocks.includes("varDisplay") && !document.getElementById("varDisplay")) {
			let append = document.createElement("div");
			append.id = "varDisplay";
			append.style = "margin-top: 20px";
			if (document.getElementById("upgrades")) document.getElementById("main").insertBefore(append, document.getElementById("upgrades"));
			else document.getElementById("main").appendChild(append);
		};
		if (!document.getElementById("upgrades")) {
			let append = document.createElement("div");
			append.id = "upgrades";
			append.style = "display: flex; flex-wrap: wrap";
			document.getElementById("main").insertBefore(append, document.getElementById("main").lastChild.nextSibling);
		};
		if (document.getElementById("pointDisplay")) document.getElementById("pointDisplay").innerHTML = "You have <b>" + format(game.points) + "</b> points";
		if (document.getElementById("pointButton")) document.getElementById("pointButton").innerHTML = "+" + format(pointButtonGain()) + " points";
		if (document.getElementById("varDisplay")) {
			let text = "Your " + alpha + " is " + format(get_alpha());
			if (game.upgrades[2] > 0) text = "Your point gain is ((1 + "+alpha+") * (1 + "+beta+")) + (2"+alpha+beta+")<br><br>"+text+"<br>Your "+beta+" is "+format(get_beta());
			document.getElementById("varDisplay").innerHTML = text;
		};
		if (document.getElementById("upgrades")) {
			for (let index = 0; index < upgrades.length; index++) {
				if (game.upgrades[index] === undefined) game.upgrades[index] = 0;
				const element = upgrades[index];
				if (!element.unlocked()) {
					if (document.getElementById("upgrade_" + index)) document.getElementById("upgrade_" + index).remove();
					continue;
				};
				if (!document.getElementById("upgrade_" + index)) {
					let append = document.createElement("button");
					append.id = "upgrade_" + index;
					append.type = "button";
					append.addEventListener("click", () => {
						buy("upgrade", index);
					});
					if (document.getElementById("upgrade_" + (index + 1))) document.getElementById("upgrades").insertBefore(append, document.getElementById("upgrade_" + (index + 1)));
					else document.getElementById("upgrades").appendChild(append);
				};
				if (document.getElementById("upgrade_" + index)) {
					let max = Infinity;
					if (element.max) max = element.max;
					if (game.upgrades[index] >= max) document.getElementById("upgrade_" + index).className = "upgrade maxed";
					else if (game.points >= element.cost()) document.getElementById("upgrade_" + index).className = "upgrade";
					else document.getElementById("upgrade_" + index).className = "upgrade fade";
					document.getElementById("upgrade_" + index).innerHTML = element.title + "<br><br>" + element.desc + "<br><br>Cost: " + format(upgrades[index].cost());
				};
			};
		};
	};
};

const loop = setInterval(() => {
	update();
}, 30);
