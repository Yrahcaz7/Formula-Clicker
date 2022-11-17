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
		return new Decimal(2).pow(game.improvements[0]).mul(1000);
	},
	unlocked() {
		return true;
	},
}, {
	title: "FLAT MULTIPLIER",
	desc() {
		return "multiplies the " + constant() + " constant by " + format(1.5);
	},
	effect() {
		if (game.improvements[1]) return 1.5;
		return 1;
	},
	cost() {
		return new Decimal(250000);
	},
	max: 1,
	unlocked() {
		return game.upgrades[3] > 0 && game.improvements[0] > 0;
	},
}, {
	title: "ADVANCEMENT",
	desc() {
		return "increases the " + gamma + " exponent by " + format(0.25);
	},
	effect() {
		return game.improvements[2] * 0.25;
	},
	cost() {
		return new Decimal(10).pow(game.improvements[2]).mul(25000000);
	},
	max: 4,
	unlocked() {
		return game.upgrades[5] > 0 && game.improvements[1];
	},
}, {
	title: "AUTOMATION",
	desc() {
		return "automatically buys an upgrade when it is " + format(2.5, true, false, true) + "% or less of your points"
	},
	cost() {
		return new Decimal(5e10);
	},
	max: 1,
	unlocked() {
		return game.improvements[2] > 3;
	},
}, {
	title: "OPTIONS GALORE",
	desc() {
		if (game.improvements[4] >= 4) return "unlocks another option; (" + alpha + " and " + beta + " multiplier is maxed)";
		if (game.improvements[4] > 0) return "unlocks another option; also multiplies " + alpha + " and " + beta + " by " + format(1.1);
		return "unlocks the options tab; also multiplies " + alpha + " and " + beta + " by " + format(1.1);
	},
	effect() {
		if (game.improvements[4] >= 4) return 1.1 ** 4;
		return 1.1 ** game.improvements[4];
	},
	cost() {
		return new Decimal(10).pow(game.improvements[4]).mul(1e17);
	},
	max: 7,
	unlocked() {
		return game.upgrades[7] > 0 && game.improvements[3];
	},
}, {
	title: "SUPER COMBO",
	desc() {
		if (game.improvements[5] > 0) return "improves the point gain formula again";
		return "improves the point gain formula";
	},
	cost() {
		if (game.improvements[5] >= 2) return new Decimal(1000).pow(game.improvements[5]).mul(2e20);
		return new Decimal(100).pow(game.improvements[5]).mul(2e20);
	},
	max: 3,
	unlocked() {
		return game.improvements[4] > 3;
	},
}, {
	title: "REDUCE REDUCTION",
	desc() {
		return "increases the " + delta + " exponent by " + format(0.02);
	},
	effect() {
		return game.improvements[6] * 0.02;
	},
	cost() {
		return new Decimal(100).pow(game.improvements[6]).mul(1e28);
	},
	max: 5,
	unlocked() {
		return game.improvements[5] > 2;
	},
}, {
	title: "GREATER SCALING",
	desc() {
		return "multiplies " + gamma + " by " + format(1.1);
	},
	effect() {
		return 1.1 ** game.improvements[7];
	},
	cost() {
		return new Decimal(1e3).pow(game.improvements[7]).mul(1e36);
	},
	max: 4,
	unlocked() {
		return game.upgrades[9] > 0 && game.improvements[6] > 3;
	},
}, {
	title: "LARGER EXPONENT",
	desc() {
		return "multiplies " + delta + " by " + format(1.0388601182540846);
	},
	effect() {
		return 1.0388601182540846 ** game.improvements[8];
	},
	cost() {
		return new Decimal(1e4).pow(game.improvements[8]).mul(1e40);
	},
	max: 10,
	unlocked() {
		return game.improvements[7] > 1;
	},
}, {
	title: "MORE MULTIPLIERS",
	desc() {
		return "multiplies " + epsilon + " by " + format(1.1355081270020038);
	},
	effect() {
		return 1.1355081270020038 ** game.improvements[9];
	},
	cost() {
		return new Decimal(1e5).pow(game.improvements[9]).mul(1e45);
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
		return new Decimal(1e47);
	},
	max: 1,
}, {
	title: "FINALLY!",
	desc() {
		return "unlocks EFFECIENCY autobuyer, which doesn't need to use any points; also multiplies the " + constant() + " constant based on the amount of EFFECIENCY you have (" + format(this.baseEff()) + "x)";
	},
	baseEff() {
		return (game.improvements[0] + 1) ** 0.3333333333333333;
	},
	effect() {
		if (game.improvements[11]) return this.baseEff();
		return 1;
	},
	cost() {
		return new Decimal(1e50);
	},
	max: 1,
	unlocked() {
		return game.improvements[8] > 2 && game.improvements[10];
	},
}, {
	title: "REPETITION",
	desc() {
		return "increases the " + epsilon + " exponent by " + format(0.25);
	},
	effect() {
		return game.improvements[12] * 0.25;
	},
	cost() {
		return new Decimal(1e3).pow(game.improvements[12]).mul(1e53);
	},
	max: 10,
	unlocked() {
		return game.improvements[8] > 3 && game.improvements[9] > 1 && game.improvements[11];
	},
}, {
	title: "HERE COMES TRIGONOMETRY",
	desc: "unlocks sinusoidal waves",
	cost() {
		return new Decimal(1e90);
	},
	max: 1,
	unlocked() {
		return game.improvements[12] > 9;
	},
}, {
	title: "TALLER WAVES",
	desc() {
		return "multiplies the maximum value of your wave by " + format(1.5);
	},
	effect() {
		return 1.5 ** game.improvements[14];
	},
	cost() {
		return new Decimal(1e5).pow(game.improvements[14]).mul(1e95);
	},
	max: 5,
}, {
	title: "BACK TO THE GRIND",
	desc() {
		if (game.improvements[15] > 0) return "increases wave point gain from the point button by " + format(5, true, false, true) + "% of your wave points per second";
		return "unlocks getting wave point gain from the point button (" + format(5, true, false, true) + "% of your wave points per second)";
	},
	effect() {
		return game.improvements[15] * 0.05;
	},
	cost() {
		return new Decimal(10).pow(game.improvements[15]).mul(1e90);
	},
	max: 20,
}, {
	title: "SUPER AUTO",
	desc() {
		if (game.infinity.milestones[10]) return "changes the upgrade autobuyer to always activate, and it will no longer need to use any points";
		return "changes the upgrade autobuyer to activate at " + format(10, true, false, true) + "% or less of your points, and it will no longer need to use any points";
	},
	cost() {
		return new Decimal(1e136);
	},
	max: 1,
	unlocked() {
		return game.improvements[14] > 4;
	},
}, {
	title: "STABILIZE WAVES",
	desc() {
		return "multiplies the minimum value of your wave by " + format(1.45);
	},
	effect() {
		return 1.45 ** game.improvements[17];
	},
	cost() {
		return new Decimal(1e5).pow(game.improvements[17]).mul(1e140);
	},
	max: 5,
}, {
	title: "INFLUENCE",
	desc() {
		return "multiplies the maximum value of your wave based on your points (" + format(this.baseEff()) + "x)";
	},
	baseEff() {
		return game.points.add(1).pow(0.0025);
	},
	effect() {
		if (game.improvements[18]) return this.baseEff();
		return 1;
	},
	cost() {
		return new Decimal(1e175);
	},
	max: 1,
	unlocked() {
		return game.improvements[17] > 4;
	},
}, {
	title: "SELF STABILIZER",
	desc() {
		return "increase the minimum value of your wave by " + format(45, true, false, true) + "% of the maximum value of your wave (after all other minimum value increases)";
	},
	cost() {
		return new Decimal(1e188);
	},
	max: 1,
}, {
	title: "MULT CAP UP",
	desc: "increase the cap on RECURSION's effect",
	cost() {
		return new Decimal(1e215);
	},
	max: 1,
}, {
	title: "WAVE MULT",
	desc() {
		return "multiplies the value of your wave based on your points (" + format(this.baseEff()) + "x)";
	},
	baseEff() {
		return game.points.add(1).pow(0.0015);
	},
	effect() {
		if (game.improvements[21]) return this.baseEff();
		return 1;
	},
	cost() {
		return new Decimal(1e250);
	},
	max: 1,
}, {
	title: "FASTER, FASTER!",
	desc() {
		return "improves the upgrade autobuyer to work twice as fast";
	},
	effect() {
		return 2 ** game.improvements[22];
	},
	cost() {
		if (game.improvements[22] === 0) return new Decimal("1e360");
		if (game.improvements[22] === 1) return new Decimal("1e750");
		if (game.improvements[22] === 2) return new Decimal("1e1250");
		return new Decimal("1e2500");
	},
	max: 4,
	unlocked() {
		return game.improvements[21] && game.infinity.stage > 1;
	},
}, {
	title: "EVEN MORE",
	desc() {
		return "multiplies " + zeta + " by " + format(1.0388601182540846);
	},
	effect() {
		return 1.0388601182540846 ** game.improvements[23];
	},
	cost() {
		return new Decimal(1e10).pow(game.improvements[23]).mul("1e400");
	},
	max: 10,
}, {
	title: "INSANE SCALING",
	desc() {
		return "improves the point gain formula";
	},
	cost() {
		return new Decimal("1e545");
	},
	max: 1,
	unlocked() {
		return game.improvements[23] > 9;
	},
}, {
	title: "CLICKITY CLICKITY",
	desc() {
		return "multiplies the value of your wave based on your clicks (" + format(this.baseEff()) + "x)";
	},
	baseEff() {
		return (game.clicks + 1) ** 0.025;
	},
	effect() {
		return this.baseEff() ** game.improvements[25];
	},
	cost() {
		return new Decimal(1e30).pow(game.improvements[25]).mul("1e600");
	},
	max: 50,
}, {
	title: "TIRELESS GRIND",
	desc() {
		return "increases wave point gain from the point button by " + format(7.5, true, false, true) + "% of your wave points per second";
	},
	effect() {
		return game.improvements[26] * 0.075;
	},
	cost() {
		return new Decimal(1e10).pow(game.improvements[26]).mul("1e800");
	},
	max: 20,
}, {
	title: "FACE-SLAP",
	desc() {
		return "improves the EFFECIENCY autobuyer to work thrice as fast";
	},
	cost() {
		return new Decimal("1e1250");
	},
	max: 1,
}];

for (let index = 0; index < improvements.length; index++) {
	if (improvements[index].unlocked === undefined) improvements[index].unlocked = function() {
		return game.improvements[index - 1] > 0;
	};
};
