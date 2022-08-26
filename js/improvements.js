const improvements = [{
	title: "EFFECIENCY",
	desc() {
		return "increases the " + alpha + beta + " constant based on your times clicked (" + format(this.baseEff()) + ")"
	},
	baseEff() {
		return ((game.clicks + 1) ** 0.5) / 25;
	},
	effect() {
		return game.improvements[0] * this.baseEff();
	},
	cost() {
		return (2 ** game.improvements[0]) * 1000;
	},
	unlocked() {
		return game.pointBest >= 1000;
	},
}, {
	title: "SIMPLIFICATION",
	desc: "simplifies the point gain formula (which decreases gain), but multiplies the " + alpha + beta + " constant by 1.5",
	effect() {
		if (game.improvements[1] > 0) return 1.5;
		return 1;
	},
	cost() {
		return 250000;
	},
	max: 1,
	unlocked() {
		return game.pointBest >= 250000 && game.upgrades[2] > 0 && game.improvements[0] > 0;
	},
}];
