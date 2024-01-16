/**
 * Reaches beyond for omega.
 */
function reach_beyond() {
	if (prestiging) return;
	if (!confirm("Are you really sure you want reach beyond? This will reset EVERYTHING (even game time) except what is beyond.")) return;
	prestiging = true;
	// gain
	if (getOmegaGain() > 0) {
		game.beyond.omega += getOmegaGain();
	};
	// reset clicks
	game.clicks = 0;
	// reset unlocks
	game.tab = "main";
	game.unlocks = [];
	// reset upgrades
	game.upgrades = [];
	// reset improvements
	game.improvements = [];
	// reset wave upgrades
	game.wave.upgrades = [];
	// reset infinity milestones
	game.infinity.milestones = [];
	// reset infinity stage
	game.infinity.stage = 1;
	// reset points
	game.points = new Decimal(0);
	game.pointBest = new Decimal(0);
	game.pointTotal = new Decimal(0);
	// reset wave points
	game.wave.points = 0;
	game.wave.pointBest = 0;
	game.wave.frame = 0;
	// reset infinity points
	game.infinity.points = getAlephEffect();
	// reset infinity bests
	game.infinity.best.points = new Decimal(0);
	game.infinity.best.wavePoints = 0;
	// update best time
	if (game.finishTime - game.startTime < game.beyond.bestTime || game.beyond.bestTime == -1) {
		game.beyond.bestTime = game.finishTime - game.startTime;
	};
	// reset times
	game.startTime = new Date().getTime();
	game.finishTime = -1;
	// reset page
	setPage();
	prestiging = false;
};

/**
 * Calculates omega gain.
 * @returns {number} gain
 */
function getOmegaGain() {
	if (game.infinity.stage >= MAX) return 1;
	else return 0;
};

/**
 * Calculates "next omega at" text.
 * @returns {string} text
 */
function getNextOmega() {
	let gain = getOmegaGain();
	if (gain == 1) return "Max " + omega + " gained on reset";
	return "Next " + omega + " at " + format(MAX) + " broken infinities";
};

/**
 * Calculates best run time.
 * @returns {number} time
 */
function getBestRunTime() {
	if (game.finishTime - game.startTime < game.beyond.bestTime && game.finishTime != -1) return game.finishTime - game.startTime;
	if (game.beyond.bestTime != -1) return game.beyond.bestTime;
	return Infinity;
};

/**
 * Calculates aleph gain.
 * @returns {number} gain
 */
function getAlephGain() {
	let gain = game.beyond.omega;
	if (game.infinity.stage >= MAX) gain++;
	return gain;
};

/**
 * Calculates aleph effect.
 * @returns {number} effect
 */
function getAlephEffect() {
	return Math.floor((game.beyond.aleph / (getBestRunTime() / 10000)) ** 0.25);
};

/**
 * Calculates the amount of aleph you need to increase its effect by 1.
 * @returns {number} amount
 */
function nextAlephEffectAt() {
	return Math.ceil((getBestRunTime() / 10000) * ((getAlephEffect() + 1) ** 4));
};
