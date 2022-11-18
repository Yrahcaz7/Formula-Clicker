/**
 * calculates alpha.
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
 * calculates beta.
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
 * calculates gamma.
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
 * calculates delta.
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
 * calculates epsilon.
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
 * calculates zeta.
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
 * calculates the constant.
 * @returns {decimal} constant
 */
function getConstant() {
	let co = new Decimal(2.5);
	co = co.add(improvements[0].effect());
	co = co.mul(improvements[1].effect());
	co = co.mul(improvements[11].effect());
	co = co.mul(wave_upgrades[3].effect());
	return co;
};

/**
 * calculates the gamma exponent.
 * @returns {number} exponent
 */
function getGammaEx() {
	let gEx = 2;
	gEx += improvements[2].effect();
	return gEx;
};

/**
 * calculates the delta exponent.
 * @returns {number} exponent
 */
function getDeltaEx() {
	let dEx = 0.5;
	dEx += improvements[6].effect();
	return dEx;
};

/**
 * calculates the epsilon exponent.
 * @returns {number} exponent
 */
function getEpsilonEx() {
	let eEx = 1.5;
	eEx += improvements[12].effect();
	return eEx;
};

/**
 * calculates point gain multiplier.
 * @returns {decimal} multiplier
 */
function getPointMult() {
	let mul = new Decimal(1);
	if (game.infinity.milestones[24]) mul = mul.mul(new Decimal(1.45).pow(game.infinity.points).add(game.infinity.points * 2.5e9));
	else if (game.infinity.milestones[13]) mul = mul.mul(new Decimal(1.25).pow(game.infinity.points).add(game.infinity.points * 7.5));
	else if (game.infinity.milestones[0]) mul = mul.mul(new Decimal(1.2).pow(game.infinity.points).add(game.infinity.points * 5));
	return mul;
};

/**
 * calculates point button gain.
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
	let mul = getPointMult();
	if (z > 0 && imp >= 5) return co.mul(a).mul(b).mul(g).mul(d).mul(new Decimal(1.45 * g).pow(gEx + (d ** dEx))).mul(e ** eEx).mul(new Decimal(2.22).pow(z)).mul(mul);
	if (z > 0) return co.mul(a).mul(b).mul(g).mul(d).mul(new Decimal(1.45 * g).pow(gEx + (d ** dEx))).mul(e ** eEx).mul(new Decimal(2).pow(z).add(5 * z)).mul(mul);
	if (e > 0 && imp >= 4) return co.mul(a).mul(b).mul(g).mul(d).mul(new Decimal(1.45 * g).pow(gEx + (d ** dEx))).mul(e ** eEx).mul(mul);
	if (e > 0) return co.mul(a).mul(b).mul(g).mul(d).mul(new Decimal(1.45 * g).pow(gEx + (d ** dEx))).mul(e + 1).mul(mul);
	if (d > 0 && imp >= 3) return co.mul(a).mul(b).mul(g).mul(d).mul(new Decimal(1.45 * g).pow(gEx + (d ** dEx))).mul(mul);
	if (d > 0 && imp >= 2) return co.mul(a).mul(b).mul(g).mul(d).mul(new Decimal(g).pow(gEx + (d ** dEx))).mul(mul);
	if (d > 0 && imp >= 1) return co.mul(a).mul(b).mul(g).mul(new Decimal(g).pow(gEx + (d ** dEx))).mul(mul);
	if (d > 0) return co.mul(a).mul(b).mul(new Decimal(g).pow(gEx + (d ** dEx))).mul(mul);
	if (g > 1) return co.mul(a).mul(b).mul(g ** gEx).mul(mul);
	if (b > 1) return co.mul(a).mul(b).mul(mul);
	return new Decimal(a).mul(mul);
};
