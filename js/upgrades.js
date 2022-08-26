const upgrades = [{
	title: "ELEMENTARY",
	desc: "increases &#945 by 0.1",
	effect() {
		return game.upgrades[0] * 0.1;
	},
	cost() {
		return (1.5 ** game.upgrades[0]) * 25;
	},
	unlocked() {
		return game.pointBest >= 25;
	},
}];
