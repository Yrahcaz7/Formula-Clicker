var game = {
	points: 0,
	pointBest: 0,
	tab: "main",
	unlocks: [],
	upgrades: [],
};

function pointButtonGain() {
	let a = 0;
	a += upgrades[0].effect();
	a += upgrades[1].effect();
	return 1 + a;
};

function buy(type, index) {
	if (type == "upgrade") {
		let max = Infinity;
		if (upgrades[index].max) max = upgrades[index];
		if (game.points >= upgrades[index].cost() && game.upgrades[index] < max) {
			game.points -= upgrades[index].cost();
			game.upgrades[index]++;
		};
	};
};

const loop = setInterval(() => {
	if (game.points > 0 && !game.unlocks.includes("pointDisplay")) game.unlocks.push("pointDisplay");
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
				if (game.points > game.pointBest) game.pointBest = game.points;
			});
			document.getElementById("main").appendChild(append);
		};
		if (!document.getElementById("upgrades")) {
			let append = document.createElement("div");
			append.id = "upgrades";
			append.style = "display: flex; flex-wrap: wrap";
			document.getElementById("main").insertBefore(append, document.getElementById("main").lastChild.nextSibling);
		};
		if (document.getElementById("pointDisplay")) document.getElementById("pointDisplay").innerHTML = "You have " + format(game.points) + " points";
		if (document.getElementById("pointButton")) document.getElementById("pointButton").innerHTML = "+" + format(pointButtonGain()) + " points";
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
				document.getElementById("upgrade_" + index).innerHTML = element.title + "<br><br>" + element.desc + "<br><br>Cost: " + format(upgrades[index].cost());
			};
		};
	};
}, 30);
