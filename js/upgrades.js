const upgrades = [{
	title: "ELEMENTARY",
	desc: "increases &#945 by 0.10",
	effect() {
		return game.upgrades[0] * 0.1;
	},
	cost() {
		return (1.25 ** game.upgrades[0]) * 25;
	},
	unlocked() {
		return game.pointBest >= 25;
	},
}, {
	title: "LARGER INCREMENTS",
	desc: "increases &#945 by 0.50",
	effect() {
		return game.upgrades[1] * 0.50;
	},
	cost() {
		return (1.5 ** game.upgrades[1]) * 150;
	},
	unlocked() {
		return game.pointBest >= 150;
	},
}];
