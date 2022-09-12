function prestige() {
	if (game.points >= 1.7976931348623157e308) {
		game.infinity.points++;
		game.infinity.pointTotal++;
		if (game.infinity.points > game.infinity.pointBest) game.infinity.pointBest = game.infinity.points;
	};
	game.points = 0;
	game.pointBest = 0;
	game.pointTotal = 0;
	game.clicks = 0;
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
	location.reload();
};

const infinity_milestones = [{
	title: "1 " + infinity,
	desc: "adds the " + infinity + " element to the point gain formula",
	req() {
		return game.infinity.points >= 1;
	},
}, {
	title: "2 " + infinity,
	desc: "adds the " + infinity + " element to the sinusoidal wave formula",
	req() {
		return game.infinity.points >= 2;
	},
}];
