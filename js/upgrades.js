const upgrades = [{
	title: "ELEMENTARY",
	desc() {
		return "increases " + alpha + " by " + format(0.1);
	},
	effect() {
		return game.upgrades[0] * 0.1;
	},
	cost() {
		return new Decimal(1.25).pow(game.upgrades[0]).mul(25);
	},
	unlocked() {
		return game.pointTotal.gte(20);
	},
}, {
	title: "LARGER INCREMENTS",
	desc() {
		return "increases " + alpha + " by " + format(0.5);
	},
	effect() {
		return game.upgrades[1] * 0.5;
	},
	cost() {
		return new Decimal(1.5).pow(game.upgrades[1]).mul(150);
	},
	unlocked() {
		return game.pointTotal.gte(225) && game.upgrades[0] > 0;
	},
}, {
	title: "SECONDARY",
	desc() {
		return "increases " + beta + " by " + format(0.1);
	},
	effect() {
		return game.upgrades[2] * 0.1;
	},
	cost() {
		return new Decimal(1.25).pow(game.upgrades[2]).mul(500);
	},
	unlocked() {
		return game.pointTotal.gte(750) && game.upgrades[1] > 0;
	},
}, {
	title: "MASS MULT",
	desc() {
		return "increases " + beta + " by " + format(0.5);
	},
	effect() {
		return game.upgrades[3] * 0.5;
	},
	cost() {
		return new Decimal(1.5).pow(game.upgrades[3]).mul(3000);
	},
	unlocked() {
		return game.pointTotal.gte(4500) && game.upgrades[2] > 0;
	},
}, {
	title: "TERTIARY",
	desc() {
		return "increases " + gamma + " by " + format(0.1);
	},
	effect() {
		return game.upgrades[4] * 0.1;
	},
	cost() {
		return new Decimal(1.25).pow(game.upgrades[4]).mul(1000000);
	},
	unlocked() {
		return game.pointTotal.gte(1500000) && game.upgrades[3] > 0;
	},
}, {
	title: "FAST SCALING",
	desc() {
		return "increases " + gamma + " by " + format(0.5);
	},
	effect() {
		return game.upgrades[5] * 0.5;
	},
	cost() {
		return new Decimal(1.5).pow(game.upgrades[5]).mul(6000000);
	},
	unlocked() {
		return game.pointTotal.gte(9000000) && game.upgrades[4] > 0;
	},
}, {
	title: "QUATERNARY",
	desc() {
		return "increases " + delta + " by " + format(0.1);
	},
	effect() {
		return game.upgrades[6] * 0.1;
	},
	cost() {
		if (game.upgrades[6] >= 25) return new Decimal(1.5).pow(25).mul(1e11).mul(new Decimal(2.5).pow(game.upgrades[6] - 25));
		return new Decimal(1.5).pow(game.upgrades[6]).mul(1e11);
	},
	unlocked() {
		return game.pointTotal.gte(1.5e11) && game.upgrades[5] > 0;
	},
}, {
	title: "EXPONENTIAL",
	desc() {
		return "increases " + delta + " by " + format(0.5);
	},
	effect() {
		return game.upgrades[7] * 0.5;
	},
	cost() {
		if (game.upgrades[7] >= 15) return new Decimal(2).pow(15).mul(6e11).mul(new Decimal(5).pow(game.upgrades[7] - 25));
		return new Decimal(2).pow(game.upgrades[7]).mul(6e11);
	},
	unlocked() {
		return game.pointTotal.gte(9e11) && game.upgrades[6] > 0;
	},
}, {
	title: "QUINARY",
	desc() {
		return "increases " + epsilon + " by " + format(0.1);
	},
	effect() {
		return game.upgrades[8] * 0.1;
	},
	cost() {
		return new Decimal(1.5).pow(game.upgrades[8]).mul(1e29);
	},
	unlocked() {
		return game.pointTotal.gte(1.5e29) && game.improvements[5] > 2 && game.upgrades[7] > 0;
	},
}, {
	title: "EXTENDED COMBO",
	desc() {
		return "increases " + epsilon + " by " + format(0.5);
	},
	effect() {
		return game.upgrades[9] * 0.5;
	},
	cost() {
		return new Decimal(2).pow(game.upgrades[9]).mul(1e30);
	},
	unlocked() {
		return game.pointTotal.gte(1.5e30) && game.upgrades[8] > 0;
	},
}, {
	title: "SENARY",
	desc() {
		return "increases " + zeta + " by " + format(0.1);
	},
	effect() {
		return game.upgrades[10] * 0.1;
	},
	cost() {
		return new Decimal(5).pow(game.upgrades[10]).mul(1e55);
	},
	unlocked() {
		return game.pointTotal.gte(1.5e55) && game.improvements[10] && game.upgrades[9] > 0;
	},
}, {
	title: "NEVER-ENDING",
	desc() {
		return "increases " + zeta + " by " + format(0.5);
	},
	effect() {
		return game.upgrades[11] * 0.5;
	},
	cost() {
		return new Decimal(10).pow(game.upgrades[11]).mul(1e57);
	},
	unlocked() {
		return game.pointTotal.gte(1.5e57) && game.upgrades[10] > 0;
	},
}];
