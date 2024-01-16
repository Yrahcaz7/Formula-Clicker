const poem = [ // the poem (in code form)
	["<span class='v1'>Light, </span>", "<span class='v2'>Darkness, </span>", "<span class='v6'>Nothingness</span>"],
	["v1", "in the darkness", "there lies a light", "a brilliant light"],
	["v1", "the light is hope", "the light is peace", "but light is not perfect"],
	["v2", "darkness is always there", "you just don't see it", "close your eyes, find it"],
	["v2", "sense the darkness", "the eternal peace", "but nothing lasts forever"],
	["v3", "find that place", "between the two", "your fitting place"],
	["v3", "the perfect place", "has some light, and darkness", "sometimes equal"],
	["v3", "that place is your home", "It is the perfect place", "but you cannot stay there forever"],
	["v4", "venture out, into the world", "embrace both darkness and light", "understand the world"],
	["v4", "understand existence", "then you shall see", "the world as it is, and isn't"],
	["v5", "through your travels", "you miss home", "you journey back"],
	["v5", "you find that it is not the same", "then you shall find a new place", "or embrace the change"],
	["v5", "embrace it like the light", "embrace it like the darkness", "you shall change too"],
	["v6", "look out into the light and darkness", "you find absolute nothingness", "the infinite nothingness"],
	["v6", "infinite nothingness", "has no beginning", "no beginning means no end"],
];

document.addEventListener("keydown", (event) => {
	if (event.shiftKey && event.key == "P" && !event.repeat) {
		if (getInfGain() > 0) prestige();
	} else if (event.key == " " && !event.repeat) {
		click();
	};
});

/**
 * Clicks the point button.
 */
function click() {
	game.clicks += (game.beyond.omega + 1);
	if (!game.infinity.milestones[32]) {
		game.points = game.points.add(pointButtonGain());
		game.pointTotal = game.pointTotal.add(pointButtonGain());
		if (game.points.gt(game.pointBest)) game.pointBest = game.points;
		if (game.points.gt(infNum())) game.points = infNum();
		if (game.pointTotal.gt(infNum())) game.pointTotal = infNum();
		if (game.pointBest.gt(infNum())) game.pointBest = infNum();
		if (game.points.gt(game.infinity.best.points)) game.infinity.best.points = game.points;
	};
	const max = getWavePointMax();
	if (game.improvements[15] > 0 && game.wave.points < max) {
		let gen = getWaveClickGen();
		if (gen + game.wave.points > max) gen = max - game.wave.points;
		game.wave.points += gen;
		if (game.wave.points > game.wave.pointBest) game.wave.pointBest = game.wave.points;
		if (game.wave.points === Infinity || game.wave.points !== game.wave.points) game.wave.points = MAX;
		if (game.wave.pointBest === Infinity || game.wave.pointBest !== game.wave.pointBest) game.wave.pointBest = MAX;
		if (game.wave.points > game.infinity.best.wavePoints) game.infinity.best.wavePoints = game.wave.points;
		if (game.infinity.best.wavePoints === Infinity || game.infinity.best.wavePoints !== game.infinity.best.wavePoints) game.infinity.best.wavePoints = MAX;
	};
};

const buy = {
	/**
	 * Buys the specified upgrade.
	 * @param {number} index - the index of the purchase.
	 * @param {boolean} free - if true, does not spend any currency on purchase.
	 * @returns {boolean} success
	 */
	upgrade(index, free = false) {
		if (!upgrades[index] || !upgrades[index].unlocked()) return false;
		const cost = (typeof upgrades[index].cost == "function" ? upgrades[index].cost() : upgrades[index].cost);
		let max = game.infinity.milestones[49] ? 10000000 : 100000;
		if (upgrades[index].max) max = upgrades[index].max;
		if (game.points.gte(cost) && game.upgrades[index] < max) {
			if (!free) game.points = game.points.sub(cost);
			if (index === 12) {
				game.upgrades[index] += (game.beyond.omega + 1);
				game.upgrades[index] = Math.min(game.upgrades[index], upgrades[index].max);
			} else {
				game.upgrades[index]++;
			};
			return true;
		};
		return false;
	},
	/**
	 * Buys the specified improvement.
	 * @param {number} index - the index of the purchase.
	 * @param {boolean} free - if true, does not spend any currency on purchase.
	 * @returns {boolean} success
	 */
	improvement(index, free = false) {
		if (!improvements[index] || !improvements[index].unlocked()) return false;
		const cost = (typeof improvements[index].cost == "function" ? improvements[index].cost() : improvements[index].cost);
		let max = game.infinity.milestones[49] ? 10000000 : 100000;
		if (improvements[index].max) max = improvements[index].max;
		if (game.points.gte(cost) && game.improvements[index] < max) {
			if (!free) game.points = game.points.sub(cost);
			game.improvements[index]++;
			return true;
		};
		return false;
	},
	/**
	 * Buys the specified wave upgrade.
	 * @param {number} index - the index of the purchase.
	 * @param {boolean} free - if true, does not spend any currency on purchase.
	 * @returns {boolean} success
	 */
	wave_upgrade(index, free = false) {
		if (!wave_upgrades[index] || !wave_upgrades[index].unlocked()) return false;
		const cost = (typeof wave_upgrades[index].cost == "function" ? wave_upgrades[index].cost() : wave_upgrades[index].cost);
		let max = game.infinity.milestones[49] ? 10000000 : 100000;
		if (typeof wave_upgrades[index].max == "function") max = wave_upgrades[index].max();
		else if (wave_upgrades[index].max) max = wave_upgrades[index].max;
		if (game.wave.points >= cost && game.wave.upgrades[index] < max) {
			if (!free) game.wave.points -= cost;
			game.wave.upgrades[index]++;
			return true;
		};
		return false;
	},
};

/**
 * Copies text to clipboard.
 * @param {string} text - the text to copy.
 * @returns {boolean} success
 */
function copy(text) {
	const fallback = () => {
		let textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		let successful = document.execCommand("copy");
		document.body.removeChild(textArea);
		return successful;
	};
	if (!navigator.clipboard) return fallback();
	navigator.clipboard.writeText(text).then(() => {return true}).catch(() => {return false});
	return fallback();
};

/**
 * Calculates a number from a percentage in between two numbers.
 * @param {number} percentage - the percentage (between 0 and 1).
 * @param {number} min - the lower number.
 * @param {number} max - the higher number.
 * @returns {number} number
 */
function findNumber(percentage, min, max) {
	if (percentage > 1) percentage = 1;
	if (percentage < 0) percentage = 0;
	if (min > max) min = max;
	return (percentage * (max - min)) + min;
};

/**
 * Calculates the current run time.
 * @returns {string} time
 */
function getTime() {
	if (game.finishTime !== -1) return formatTime(game.finishTime - game.startTime);
	return formatTime(new Date().getTime() - game.startTime);
};
