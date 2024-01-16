const MAX = 1.7976931348620926e308;

/**
 * Calculates alpha.
 * @returns {number} alpha
 */
 function getAlpha() {
	let a = 1;
	a += upgrades[0].effect();
	a += upgrades[1].effect();
	a *= improvements[4].effect();
	return a;
};

/**
 * Calculates beta.
 * @returns {number} beta
 */
function getBeta() {
	let b = 1;
	b += upgrades[2].effect();
	b += upgrades[3].effect();
	b *= improvements[4].effect();
	return b;
};

/**
 * Calculates gamma.
 * @returns {number} gamma
 */
function getGamma() {
	let g = 1;
	g += upgrades[4].effect();
	g += upgrades[5].effect();
	g *= improvements[7].effect();
	return g;
};

/**
 * Calculates delta.
 * @returns {number} delta
 */
function getDelta() {
	let d = 0;
	d += upgrades[6].effect();
	d += upgrades[7].effect();
	d *= improvements[8].effect();
	return d;
};

/**
 * Calculates epsilon.
 * @returns {number} epsilon
 */
function getEpsilon() {
	let e = 0;
	e += upgrades[8].effect();
	e += upgrades[9].effect();
	e *= improvements[9].effect();
	return e;
};

/**
 * Calculates zeta.
 * @returns {number} zeta
 */
function getZeta() {
	let z = 0;
	z += upgrades[10].effect();
	z += upgrades[11].effect();
	z *= improvements[23].effect();
	return z;
};

/**
 * Calculates the constant.
 * @returns {decimal} constant
 */
function getConstant() {
	let co = new Decimal(2.5);
	co = co.add(improvements[0].effect());
	co = co.mul(improvements[1].effect());
	co = co.mul(improvements[11].effect());
	co = co.mul(wave_upgrades[3].effect());
	co = co.pow(upgrades[12].effect());
	return co;
};

/**
 * Calculates the gamma exponent.
 * @returns {number} exponent
 */
function getGammaEx() {
	let gEx = 2;
	gEx += improvements[2].effect();
	if (game.improvements[5] > 0) gEx++;
	return gEx;
};

/**
 * Calculates the delta exponent.
 * @returns {number} exponent
 */
function getDeltaEx() {
	let dEx = 0.5;
	dEx += improvements[6].effect();
	return dEx;
};

/**
 * Calculates the epsilon exponent.
 * @returns {number} exponent
 */
function getEpsilonEx() {
	let eEx = 1.5;
	eEx += improvements[12].effect();
	return eEx;
};

/**
 * Calculates point gain multiplier.
 * @returns {decimal} multiplier
 */
function getPointMult() {
	let mult = new Decimal(1);
	if (game.infinity.milestones[24]) mult = mult.mul(new Decimal(1.45).pow(game.infinity.points).add(game.infinity.points * 2.5e9));
	else if (game.infinity.milestones[13]) mult = mult.mul(new Decimal(1.25).pow(game.infinity.points).add(game.infinity.points * 7.5));
	else if (game.infinity.milestones[0]) mult = mult.mul(new Decimal(1.2).pow(game.infinity.points).add(game.infinity.points * 5));
	if (game.beyond.omega > 0) mult = mult.mul(game.beyond.omega + 1);
	return mult;
};

/**
 * Calculates point button gain.
 * @returns {decimal} gain
 */
function pointButtonGain() {
	let imp = game.improvements[5] + game.improvements[10] + game.improvements[24];
	let a = getAlpha();
	let b = getBeta();
	let g = getGamma();
	let d = getDelta();
	let e = getEpsilon();
	let z = getZeta();
	let co = getConstant();
	let gEx = getGammaEx();
	let dEx = getDeltaEx();
	let eEx = getEpsilonEx();
	let mult = getPointMult();
	if (z > 0 && imp >= 5) return co.mul(a).mul(b).mul(d).mul(new Decimal(1.45 * g).pow(gEx + (d ** dEx))).mul(e ** eEx).mul(new Decimal(2.22).pow(z)).mul(mult);
	if (z > 0) return co.mul(a).mul(b).mul(d).mul(new Decimal(1.45 * g).pow(gEx + (d ** dEx))).mul(e ** eEx).mul(new Decimal(2).pow(z).add(5 * z)).mul(mult);
	if (e > 0 && imp >= 4) return co.mul(a).mul(b).mul(d).mul(new Decimal(1.45 * g).pow(gEx + (d ** dEx))).mul(e ** eEx).mul(mult);
	if (e > 0) return co.mul(a).mul(b).mul(d).mul(new Decimal(1.45 * g).pow(gEx + (d ** dEx))).mul(e + 1).mul(mult);
	if (d > 0 && imp >= 3) return co.mul(a).mul(b).mul(d).mul(new Decimal(1.45 * g).pow(gEx + (d ** dEx))).mul(mult);
	if (d > 0 && imp >= 2) return co.mul(a).mul(b).mul(d).mul(new Decimal(g).pow(gEx + (d ** dEx))).mul(mult);
	if (d > 0) return co.mul(a).mul(b).mul(new Decimal(g).pow(gEx + (d ** dEx))).mul(mult);
	if (g > 1) return co.mul(a).mul(b).mul(g ** gEx).mul(mult);
	if (b > 1) return co.mul(a).mul(b).mul(mult);
	return new Decimal(a).mul(mult);
};

/**
 * Calculates the wave maximum.
 * @returns {number} maximum
 */
function getWaveMax() {
	let max = 1;
	max += wave_upgrades[0].effect();
	max *= improvements[14].effect();
	max *= improvements[18].effect();
	if (max >= MAX || max !== max) max = MAX;
	return max;
};

/**
 * Calculates the wave minimum.
 * @returns {number} minimum
 */
function getWaveMin() {
	let min = 0;
	min += wave_upgrades[1].effect();
	min *= improvements[17].effect();
	if (game.improvements[19]) min += getWaveMax() * 0.45;
	if (min >= MAX || min !== min) min = MAX;
	return min;
};

/**
 * Calculates wave multiplier.
 * @returns {number} multiplier
 */
function waveMult() {
	let mult = 1;
	mult *= wave_upgrades[4].effect();
	mult *= wave_upgrades[8].effect();
	mult *= improvements[21].effect();
	mult *= improvements[25].effect();
	if (mult >= MAX || mult !== mult) mult = MAX;
	return mult;
};

/**
 * Calculates the wave point generation.
 * @returns {number} generation
 */
function getWaveGen() {
	let gen = findNumber(Math.abs((sinwaves[game.wave.frame + 151] / 100) - 1), getWaveMin(), getWaveMax()) * waveMult();
	// infinity
	if (game.infinity.milestones[25]) gen *= (1.1 ** game.infinity.points) + (game.infinity.points * 5);
	else if (game.infinity.milestones[19]) gen *= (1.05 ** game.infinity.points) + (game.infinity.points * 2.5);
	else if (game.infinity.milestones[6]) gen *= (1.02 ** game.infinity.points) + (game.infinity.points * 2);
	else if (game.infinity.milestones[1]) gen *= game.infinity.points + 1;
	// beyond
	if (game.beyond.omega > 0) gen *= (game.beyond.omega + 1);
	// return
	if (gen >= MAX || gen !== gen) gen = MAX;
	return gen;
};

/**
 * Calculates the wave point generation on click.
 * @returns {number} generation
 */
function getWaveClickGen() {
	let gen = getWaveGen() * (improvements[15].effect() + improvements[26].effect());
	if (gen >= MAX || gen !== gen) gen = MAX;
	return gen;
};

/**
 * Calculates the wave point maximum.
 * @returns {number} maximum
 */
function getWavePointMax() {
	let max = 100;
	max *= wave_upgrades[2].effect();
	if (max >= MAX || max !== max) max = MAX;
	return max;
};
