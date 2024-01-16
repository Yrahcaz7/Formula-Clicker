const upgrades = [{
	title: "PRIMARY",
	desc() {return "increases " + alpha + " by " + format(0.1)},
	effect() {return game.upgrades[0] * 0.1},
	cost() {return new Decimal(1.25).pow(game.upgrades[0]).mul(25)},
	unlocked() {return game.unlocks.includes("pd")},
}, {
	title: "LARGER INCREMENTS",
	desc() {return "increases " + alpha + " by " + format(0.5)},
	effect() {return game.upgrades[1] * 0.5},
	cost() {return new Decimal(1.5).pow(game.upgrades[1]).mul(150)},
}, {
	title: "SECONDARY",
	desc() {return "increases " + beta + " by " + format(0.1)},
	effect() {return game.upgrades[2] * 0.1},
	cost() {return new Decimal(1.25).pow(game.upgrades[2]).mul(500)},
}, {
	title: "MASS MULT",
	desc() {return "increases " + beta + " by " + format(0.5)},
	effect() {return game.upgrades[3] * 0.5},
	cost() {return new Decimal(1.5).pow(game.upgrades[3]).mul(3000)},
}, {
	title: "TERTIARY",
	desc() {return "increases " + gamma + " by " + format(0.1)},
	effect() {return game.upgrades[4] * 0.1},
	cost() {return new Decimal(1.25).pow(game.upgrades[4]).mul(1000000)},
}, {
	title: "FAST SCALING",
	desc() {return "increases " + gamma + " by " + format(0.5)},
	effect() {return game.upgrades[5] * 0.5},
	cost() {return new Decimal(1.5).pow(game.upgrades[5]).mul(6000000)},
}, {
	title: "QUATERNARY",
	desc() {return "increases " + delta + " by " + format(0.1)},
	effect() {return game.upgrades[6] * 0.1},
	cost() {return (game.upgrades[6] >= 25 ? new Decimal(1.5).pow(25).mul(1e11).mul(new Decimal(2.5).pow(game.upgrades[6] - 25)) : new Decimal(1.5).pow(game.upgrades[6]).mul(1e11))},
}, {
	title: "EXPONENTIAL",
	desc() {return "increases " + delta + " by " + format(0.5)},
	effect() {return game.upgrades[7] * 0.5},
	cost() {return (game.upgrades[7] >= 15 ? new Decimal(2).pow(15).mul(6e11).mul(new Decimal(5).pow(game.upgrades[7] - 15)) : new Decimal(2).pow(game.upgrades[7]).mul(6e11))},
}, {
	title: "QUINARY",
	desc() {return "increases " + epsilon + " by " + format(0.1)},
	effect() {return game.upgrades[8] * 0.1},
	cost() {return new Decimal(1.5).pow(game.upgrades[8]).mul(1e29)},
	unlocked() {return game.upgrades[7] && game.improvements[5] >= 3},
}, {
	title: "EXTENDED COMBO",
	desc() {return "increases " + epsilon + " by " + format(0.5)},
	effect() {return game.upgrades[9] * 0.5},
	cost() {return new Decimal(2).pow(game.upgrades[9]).mul(1e30)},
}, {
	title: "SENARY",
	desc() {return "increases " + zeta + " by " + format(0.1)},
	effect() {return game.upgrades[10] * 0.1},
	cost() {return new Decimal(5).pow(game.upgrades[10]).mul(1e55)},
	unlocked() {return game.upgrades[9] && game.improvements[10]},
}, {
	title: "NEVER-ENDING",
	desc() {return "increases " + zeta + " by " + format(0.5)},
	effect() {return game.upgrades[11] * 0.5},
	cost() {return new Decimal(10).pow(game.upgrades[11]).mul(1e57)},
}, {
	title: "TO THE BEYOND",
	desc() {return "exponentiates the " + constant() + " constant by " + format(10) + " (compounds upon itself)"},
	effect() {return 10 ** game.upgrades[12]},
	cost() {return new Decimal("e1000").pow(10 ** game.upgrades[12])},
	max: 308,
	unlocked() {return game.infinity.milestones[79]},
}];

// sets default unlock condition
for (let index = 0; index < upgrades.length; index++) {
	if (upgrades[index].unlocked === undefined) upgrades[index].unlocked = () => {return game.upgrades[index - 1]};
};
