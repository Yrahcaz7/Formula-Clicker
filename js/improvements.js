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
	title: "FLAT MULTIPLIER",
	desc() {
		return "multiplies the " + constant() + " constant by 1.50";
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
		return game.upgrades[3] > 0 && game.improvements[0] > 0;
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
		return game.upgrades[5] > 0 && game.improvements[1] > 0;
	},
}, {
	title: "AUTOMATION",
	desc: "automatically buys an upgrade when it is 2.5% or less of your points",
	cost() {
		return 5e10;
	},
	max: 1,
	unlocked() {
		return game.improvements[2] > 2;
	},
}, {
	title: "OPTIONS GALORE",
	desc() {
		if (game.improvements[4] > 0) return "unlocks another option; also multiplies " + alpha + " and " + beta + " by 1.1";
		return "unlocks the options tab; also multiplies " + alpha + " and " + beta + " by 1.1";
	},
	effect() {
		return 1.1 ** game.improvements[4];
	},
	cost() {
		return (10 ** game.improvements[4]) * 1e17;
	},
	max: 4,
	unlocked() {
		return game.upgrades[7] > 0 && game.improvements[3] > 0;
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
		return game.improvements[4] > 2;
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
		return game.improvements[5] > 2;
	},
}, {
	title: "GREATER SCALING",
	desc: "multiplies " + gamma + " by 1.1",
	effect() {
		return 1.1 ** game.improvements[7];
	},
	cost() {
		return (1e3 ** game.improvements[7]) * 1e36;
	},
	max: 4,
	unlocked() {
		return game.upgrades[9] > 0 && game.improvements[6] > 3;
	},
}, {
	title: "LARGER EXPONENT",
	desc: "multiplies " + delta + " by 1.03886",
	effect() {
		return 1.03886 ** game.improvements[8];
	},
	cost() {
		return (1e4 ** game.improvements[8]) * 1e40;
	},
	max: 10,
	unlocked() {
		return game.improvements[7] > 1;
	},
}, {
	title: "MORE MULTIPLIERS",
	desc: "multiplies " + epsilon + " by 1.13551",
	effect() {
		return 1.13551 ** game.improvements[9];
	},
	cost() {
		return (1e5 ** game.improvements[9]) * 1e45;
	},
	max: 3,
	unlocked() {
		return game.improvements[8] > 1;
	},
}, {
	title: "GREATER HEIGHTS",
	desc() {
		return "improves the point gain formula";
	},
	cost() {
		return 1e47;
	},
	max: 1,
	unlocked() {
		return game.improvements[9] > 0;
	},
}, {
	title: "FINALLY!",
	desc() {
		return "unlocks EFFECIENCY autobuyer, which doesn't need to use any points; also multiplies the " + constant() + " constant based on the amount of EFFECIENCY you have (" + format(this.baseEff()) + "x)";
	},
	baseEff() {
		return game.improvements[0] ** 0.3333333333333333;
	},
	effect() {
		if (game.improvements[11] > 0) return this.baseEff();
		return 1;
	},
	cost() {
		return 1e50;
	},
	max: 1,
	unlocked() {
		return game.improvements[0] >= 100 && game.improvements[10] > 0;
	},
}, {
	title: "REPETITION",
	desc: "increases the " + epsilon + " exponent by 0.25",
	effect() {
		return game.improvements[12] * 0.25;
	},
	cost() {
		return (1e3 ** game.improvements[12]) * 1e53;
	},
	max: 10,
	unlocked() {
		return game.improvements[9] > 1 && game.improvements[11] > 0;
	},
}, {
	title: "NEW AND COOL",
	desc: "unlocks <span style='background-color:#000'>sinusoidal</span> <span style='background-color:#000'>waves</span> (in development)",
	cost() {
		return 1e90;
	},
	max: 1,
	unlocked() {
		return game.improvements[12] > 9;
	},
}];
