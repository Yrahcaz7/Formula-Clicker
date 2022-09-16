const infNum = 1.7976931348623157e308;

function prestige() {
	if (game.points >= infNum) {
		game.infinity.points++;
		game.infinity.pointTotal++;
		if (game.infinity.points > game.infinity.pointBest) game.infinity.pointBest = game.infinity.points;
	};
	game.points = 0;
	game.pointBest = 0;
	game.pointTotal = 0;
	if (game.infinity.milestones[2]) game.clicks = Math.floor(game.clicks * 0.5);
	else game.clicks = 0;
	game.tab = "main";
	game.unlocks = [];
	game.upgrades = [];
	let imp = game.improvements;
	game.improvements = [];
	if (game.infinity.milestones[3] && imp[3]) game.improvements[3] = imp[3];
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
	desc() {
		return "keeps " + format(50, true, false, true) + "% of your clicks on reset";
	},
	req: {infinity_points: 3},
}, {
	desc: "keeps the improvement AUTOMATION on reset",
	req: {infinity_points: 4},
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
}, {
	desc: "unlocks COOLHEADED autobuyer, which doesn't need to use any wave points",
	req: {infinity_points: 9},
}, {
	desc: "unlocks LOOSEN CHAINS autobuyer, which doesn't need to use any wave points",
	req: {infinity_points: 10},
}];
