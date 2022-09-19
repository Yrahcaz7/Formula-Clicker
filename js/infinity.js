const infNum = new Decimal(1.7976931348620926e308);

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
	if (game.infinity.milestones[18]) {
		if (imp[0]) game.improvements[0] = imp[0];
		if (imp[1]) game.improvements[1] = imp[1];
		if (imp[2]) game.improvements[2] = imp[2];
		if (imp[3]) game.improvements[3] = imp[3];
		if (imp[4]) game.improvements[4] = imp[4];
	} else if (game.infinity.milestones[17]) {
		if (imp[0]) game.improvements[0] = imp[0];
		if (imp[1]) game.improvements[1] = imp[1];
		if (imp[2]) game.improvements[2] = imp[2];
		if (imp[3]) game.improvements[3] = imp[3];
	} else {
		if (game.infinity.milestones[3] && imp[3]) game.improvements[3] = imp[3];
	};
	if (game.infinity.milestones[4] && imp[11]) game.improvements[11] = imp[11];
	if (game.infinity.milestones[5] && imp[16]) game.improvements[16] = imp[16];
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
	if (game.points.lt(1.7976931348620926e308) || game.infinity.points >= 45) return 0;
	let gain = game.points.log10().div(308.2547155599167).floor().toNumber();
	if (gain !== gain) return 0;
	return gain
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
}, {
	desc: "keeps the improvement SUPER AUTO on reset",
	req: {infinity_points: 6},
}, {
	desc: "improves the " + infinity + " element in the sinusoidal wave formula",
	req: {infinity_points: 7},
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
}];
