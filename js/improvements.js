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
}];
