const upgrades = [{
	title: "ELEMENTARY",
	desc: "increases " + alpha + " by 0.10",
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
	desc: "increases " + alpha + " by 0.50",
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
	desc: "increases " + beta + " by 0.10",
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
	desc: "increases " + beta + " by 0.50",
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
	desc: "increases " + gamma + " by 0.10",
	effect() {
		return game.upgrades[4] * 0.1;
	},
	cost() {
		return (1.25 ** game.upgrades[4]) * 1000000;
	},
	unlocked() {
		return game.pointTotal >= 1500000 && game.improvements[1] > 0 && game.upgrades[3] > 0;
	},
}, {
	title: "FAST SCALING",
	desc: "increases " + gamma + " by 0.50",
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
	desc: "increases " + delta + " by 0.10",
	effect() {
		return game.upgrades[6] * 0.1;
	},
	cost() {
		return (1.25 ** game.upgrades[6]) * 1e11;
	},
	unlocked() {
		return game.pointTotal >= 1.5e11 && game.upgrades[5] > 0;
	},
}, {
	title: "EXPONENTIAL",
	desc: "increases " + delta + " by 0.50",
	effect() {
		return game.upgrades[7] * 0.5;
	},
	cost() {
		return (2 ** game.upgrades[7]) * 6e11;
	},
	unlocked() {
		return game.pointTotal >= 9e11 && game.upgrades[6] > 0;
	},
}];
