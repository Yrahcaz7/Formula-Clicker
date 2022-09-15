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
	game.improvements = [];
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
}];
