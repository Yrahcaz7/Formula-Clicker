const infNum = () => {return new Decimal(1.7976931348620926e308).pow(game.infinity.stage)};

function prestige() {
	if (getInfGain() > 0) {
		game.infinity.points += getInfGain();
		game.infinity.pointTotal += getInfGain();
		if (game.infinity.points > game.infinity.pointBest) game.infinity.pointBest = game.infinity.points;
	};
	game.points = new Decimal(0);
	game.pointBest = new Decimal(0);
	game.pointTotal = new Decimal(0);
	if (!game.infinity.milestones[16]) {
		if (game.infinity.milestones[2]) game.clicks = Math.floor(game.clicks * 0.5);
		else game.clicks = 0;
	};
	if (game.infinity.milestones[18]) {
		game.unlocks = ["pd", "vd", "t", "o"];
	} else if (game.infinity.milestones[17]) {
		game.tab = "main";
		game.unlocks = ["pd", "vd"];
	} else {
		game.tab = "main";
		game.unlocks = [];
	};
	game.upgrades = [];
	let imp = game.improvements;
	game.improvements = [];
	if (game.infinity.milestones[23]) {
		for (let index = 0; index < imp.length && index < 22; index++) {
			if (imp[index]) game.improvements[index] = imp[index];
		};
	} else {
		if (game.infinity.milestones[22]) {
			for (let index = 0; index < imp.length && index < 14; index++) {
				if (imp[index]) game.improvements[index] = imp[index];
			};
		} else {
			if (game.infinity.milestones[21]) {
				for (let index = 0; index < imp.length && index < 10; index++) {
					if (imp[index]) game.improvements[index] = imp[index];
				};
			} else if (game.infinity.milestones[18]) {
				for (let index = 0; index < imp.length && index < 5; index++) {
					if (imp[index]) game.improvements[index] = imp[index];
				};
			} else if (game.infinity.milestones[17]) {
				for (let index = 0; index < imp.length && index < 4; index++) {
					if (imp[index]) game.improvements[index] = imp[index];
				};
			} else if (game.infinity.milestones[3] && imp[3]) game.improvements[3] = imp[3];
			if (game.infinity.milestones[4] && imp[11]) game.improvements[11] = imp[11];
		};
		if (game.infinity.milestones[5] && imp[16]) game.improvements[16] = imp[16];
	};
	game.wave.points = 0;
	game.wave.pointBest = 0;
	game.wave.pointTotal = 0;
	game.wave.pointMax = 100;
	game.wave.pointGen = 0;
	game.wave.frame = 0;
	game.wave.min = 0;
	game.wave.max = 0;
	game.wave.upgrades = [];
	setPage();
};

function getInfGain() {
	if (game.points.lt(1.7976931348620926e308) || (game.infinity.points >= 45 && game.infinity.stage == 1)) return 0;
	let gain = game.points.log10().div(308.2547155599167).floor().toNumber();
	if (gain !== gain) return 0;
	return gain
};

function getNextInf() {
	if (getInfGain() == game.infinity.stage) return "Max " + infinity + " gained on reset";
	let next = new Decimal(10).pow((getInfGain() + 1) * 308.2547155599167);
	return "Next " + infinity + " at " + format(next) + " points";
};

const resources = {
	points: "points",
	pointBest: "best points",
	pointTotal: "total points",
	wave_points: "wave points",
	wave_pointBest: "best wave points",
	wave_pointTotal: "total wave points",
	infinity_points: infinity,
	infinity_pointBest: "best " + infinity,
	infinity_pointTotal: "total " + infinity,
};

const infinity_milestones = [{
	desc: "adds the " + infinity + " element to the point gain formula",
	req: {infinity_points: 1},
}, {
	desc: "adds the " + infinity + " element to the sinusoidal wave formula",
	req: {infinity_points: 2},
}, {
	desc() {return "keeps " + format(50, true, false, true) + "% of your clicks on reset"},
	req: {infinity_points: 3},
	merge: [16],
}, {
	desc: "keeps the improvement AUTOMATION on reset",
	req: {infinity_points: 4},
	merge: [17],
}, {
	desc: "keeps the improvement FINALLY! on reset",
	req: {infinity_points: 5},
	merge: [22],
}, {
	desc: "keeps the improvement SUPER AUTO on reset",
	req: {infinity_points: 6},
	merge: [23],
}, {
	desc: "improves the " + infinity + " element in the sinusoidal wave formula",
	req: {infinity_points: 7},
	merge: [19],
}, {
	desc: "unlocks LARGER NUMBERS autobuyer, which doesn't need to use any wave points",
	req: {infinity_points: 8},
	merge: [11, 15],
}, {
	desc: "unlocks COOLHEADED autobuyer, which doesn't need to use any wave points",
	req: {infinity_points: 9},
	merge: [11, 15],
}, {
	desc: "unlocks LOOSEN CHAINS autobuyer, which doesn't need to use any wave points",
	req: {infinity_points: 10},
	merge: [11, 15],
}, {
	desc: "changes SUPER AUTO to always activate",
	req: {infinity_points: 12},
}, {
	desc: "unlocks the wave upgrade autobuyer",
	req: {infinity_points: 14},
}, {
	desc: "unlocks the improvement autobuyer",
	req: {infinity_points: 16},
}, {
	desc: "improves the " + infinity + " element in the point gain formula",
	req: {infinity_points: 18},
	merge: [24],
}, {
	desc: "improves the upgrade autobuyer to work twice as fast",
	req: {infinity_points: 20},
}, {
	desc: "improves the wave upgrade autobuyer to not need to use any wave points",
	req: {infinity_points: 25},
}, {
	desc: "keeps all of your clicks on reset",
	req: {infinity_points: 30},
}, {
	desc: "keeps the first four improvements on reset",
	req: {infinity_points: 35},
	merge: [18],
}, {
	desc: "keeps the first five improvements on reset",
	req: {infinity_points: 40},
	merge: [21],
}, {
	desc: "improves the " + infinity + " element in the sinusoidal wave formula",
	req: {infinity_points: 45},
	merge: [25],
}, {
	desc: "removes the maximum bought on RECURSION, a wave upgrade",
	req: {infinity_points: 50},
}, {
	desc: "keeps the first ten improvements on reset",
	req: {infinity_points: 55},
	merge: [22],
}, {
	desc: "keeps the first fourteen improvements on reset",
	req: {infinity_points: 60},
	merge: [23],
}, {
	desc: "keeps the first twenty-two improvements on reset",
	req: {infinity_points: 66},
}, {
	desc: "improves the " + infinity + " element in the point gain formula",
	req: {infinity_points: 75},
}, {
	desc: "improves the " + infinity + " element in the sinusoidal wave formula",
	req: {infinity_points: 86},
}, {
	desc() {
		return "gains " + format(1e-10, true, false, true) + "% of your point gain per second";
	},
	req: {infinity_points: 100},
}];
