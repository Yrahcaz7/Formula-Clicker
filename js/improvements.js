const improvements = [{
	title: "EFFECIENCY",
	desc() {
		return "increases the " + alpha + beta + " constant based on your times clicked (" + format(this.baseEff()) + ")";
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
		return true;
	},
}, {
	title: "SIMPLIFICATION",
	desc: "simplifies the point gain formula (may decrease gain), and multiplies the " + alpha + beta + " constant by 1.50",
	effect() {
		if (game.improvements[1] > 0) return 1.5;
		return 1;
	},
	cost() {
		return 250000;
	},
	max: 1,
	unlocked() {
		return game.pointTotal >= 500000 && game.upgrades[2] > 0 && game.improvements[0] > 0;
	},
}, {
	title: "ADVANCEMENT",
	desc: "increases the " + gamma + " exponent by 0.50",
	effect() {
		return game.improvements[2] * 0.5;
	},
	cost() {
		return (10 ** game.improvements[2]) * 50000000;
	},
	max: 2,
	unlocked() {
		return game.pointTotal >= 100000000 && game.upgrades[4] > 0 && game.improvements[1] > 0;
	},
}, {
	title: "AUTOMATION",
	desc: "automatically buys an upgrade when it is 5% or less of your points",
	cost() {
		return 5e10;
	},
	max: 1,
	unlocked() {
		return game.pointTotal >= 1e11 && game.improvements[2] > 0;
	},
}];
