const improvements = [{
	title: "EFFECIENCY",
	desc() {
		return "increases the " + constant() + " constant based on your times clicked (+" + format(this.baseEff()) + ")";
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
	desc() {
		return "simplifies the point gain formula (may decrease gain), and multiplies the " + constant() + " constant by 1.50";
	},
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
	desc: "increases the " + gamma + " exponent by 0.25",
	effect() {
		return game.improvements[2] * 0.25;
	},
	cost() {
		return (10 ** game.improvements[2]) * 25000000;
	},
	max: 4,
	unlocked() {
		return game.pointTotal >= 50000000 && game.upgrades[4] > 0 && game.improvements[1] > 0;
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
}, {
	title: "OPTIONS GALORE",
	desc() {
		if (game.improvements[4] > 0) return "unlocks another option, and multiplies " + alpha + " and " + beta + " by 1.1";
		return "unlocks the options tab, and multiplies " + alpha + " and " + beta + " by 1.1";
	},
	effect() {
		return 1.1 ** game.improvements[4];
	},
	cost() {
		return (10 ** game.improvements[4]) * 1e17;
	},
	max: 4,
	unlocked() {
		return game.pointTotal >= 2e17 && game.improvements[3] > 0;
	},
}, {
	title: "SUPER COMBO",
	desc() {
		if (game.improvements[5] > 0) return "improves the point gain formula again";
		return "improves the point gain formula";
	},
	cost() {
		if (game.improvements[5] >= 2) return (1000 ** game.improvements[5]) * 2e20;
		return (100 ** game.improvements[5]) * 2e20;
	},
	max: 3,
	unlocked() {
		return game.pointTotal >= 4e20 && game.upgrades[6] > 0 && game.improvements[4] > 0;
	},
}, {
	title: "REDUCE REDUCTION",
	desc: "increases the " + delta + " exponent by 0.02",
	effect() {
		return game.improvements[6] * 0.02;
	},
	cost() {
		return (100 ** game.improvements[6]) * 1e28;
	},
	max: 5,
	unlocked() {
		return game.pointTotal >= 2e28 && game.improvements[5] > 0;
	},
}];
