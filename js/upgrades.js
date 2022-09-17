const upgrades = [{
	title: "ELEMENTARY",
	desc() {
		return "increases " + alpha + " by " + format(0.1);
	},
	effect() {
		return game.upgrades[0] * 0.1;
	},
	cost() {
		return (1.25 ** game.upgrades[0]) * 25;
	},
	unlocked() {
		return game.pointTotal >= 20;
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
		return (1.5 ** game.upgrades[1]) * 150;
	},
	unlocked() {
		return game.pointTotal >= 225 && game.upgrades[0] > 0;
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
		return (1.25 ** game.upgrades[2]) * 500;
	},
	unlocked() {
		return game.pointTotal >= 750 && game.upgrades[1] > 0;
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
		return (1.5 ** game.upgrades[3]) * 3000;
	},
	unlocked() {
		return game.pointTotal >= 4500 && game.upgrades[2] > 0;
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
		return (1.25 ** game.upgrades[4]) * 1000000;
	},
	unlocked() {
		return game.pointTotal >= 1500000 && game.upgrades[3] > 0;
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
		return (1.5 ** game.upgrades[5]) * 6000000;
	},
	unlocked() {
		return game.pointTotal >= 9000000 && game.upgrades[4] > 0;
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
		if (game.upgrades[6] >= 25) return ((1.5 ** 25) * 1e11) * (2.5 ** (game.upgrades[6] - 25));
		return (1.5 ** game.upgrades[6]) * 1e11;
	},
	unlocked() {
		return game.pointTotal >= 1.5e11 && game.upgrades[5] > 0;
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
		if (game.upgrades[7] >= 15) return ((2 ** 15) * 6e11) * (5 ** (game.upgrades[7] - 15));
		return (2 ** game.upgrades[7]) * 6e11;
	},
	unlocked() {
		return game.pointTotal >= 9e11 && game.upgrades[6] > 0;
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
		return (1.5 ** game.upgrades[8]) * 1e29;
	},
	unlocked() {
		return game.pointTotal >= 1.5e29 && game.improvements[5] > 2 && game.upgrades[7] > 0;
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
		return (2 ** game.upgrades[9]) * 1e30;
	},
	unlocked() {
		return game.pointTotal >= 1.5e30 && game.upgrades[8] > 0;
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
		return (5 ** game.upgrades[10]) * 1e55;
	},
	unlocked() {
		return game.pointTotal >= 1.5e55 && game.improvements[10] > 0 && game.upgrades[9] > 0;
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
		return (10 ** game.upgrades[11]) * 1e57;
	},
	unlocked() {
		return game.pointTotal >= 1.5e57 && game.upgrades[10] > 0;
	},
}];
