function cutoff(string, seperator, ...indexes) {
	if (!seperator || indexes.length === 0) return "" + string;
	let array = [];
	let cut = 0;
	for (const index of indexes) {
		if (+index <= cut) continue;
		array.push(("" + string).substring(cut, +index));
		cut = index;
	};
	array.push(("" + string).substring(cut));
	return array.join(seperator);
};

const illionPrefixes = [
	["un", "duo", "tre", "quattuor", "quin", "sex", "septen", "octo", "novem"],
	["cen"],
];

const shortIllionPrefixes = [
	["u", "d", "t", "q", "Q", "s", "S", "o", "n"],
	["c"],
];

const illions = [
	["million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion"],
	["decillion", "vigintillion", "trigintillion", "quadragintillion", "quinquagintillion", "sexagintillion", "septuagintillion", "octogintillion", "nonagintillion"],
	["centillion"],
];

const shortIllions = [
	["m", "b", "t", "q", "Q", "s", "S", "o", "n"],
	["d", "v", "t", "q", "Q", "s", "S", "o", "n"],
	["c"],
];

function formatIllions(number = NaN, smallAllowed = true, short = false, callback = "sho") {
	if (number !== number) return "NaN";
	if (!number) return "0.00";
	if (number < 1e3 && number > -1e3) return format(number, smallAllowed, !short, false, callback);
	let pre = "";
	if (number < 0) {
		number = 0 - number;
		pre = "-";
	};
	if (number === Infinity || number == infNum()) return pre + "Infinity";
	const place3s = Math.floor(Math.log10(number) / 3);
	let remain = (number / (10 ** (place3s * 3))).toFixed(2);
	let post = "";
	if (place3s) {
		if (place3s == 1) {
			if (short) post = "k";
			else post = "thousand"
		} else {
			const val = place3s - 2;
			if (val >= 99) {
				const loc = Math.floor((val + 1) / 100) % 10 - 1;
				if (val % 100 != 99) {
					if (short) post += shortIllionPrefixes[0][val % 10];
					else post += illionPrefixes[0][val % 10];
				};
				if (val % 10 != 9 && val % 100 > 9) {
					if (short) post += shortIllionPrefixes[1][loc];
					else post += illionPrefixes[1][loc];
				} else {
					if (short) post += shortIllions[2][loc];
					else post += illions[2][loc];
				};
				if (short && post.length < 2) post += "~";
				if (short && post.length < 3) post += "~";
				if (val % 100 <= 9) return (pre + remain + (!short && post ? " " : "") + post).replace("undefined", "");
			};
			if (val >= 9) {
				if (val % 10 != 9) {
					if (short) post += shortIllionPrefixes[0][val % 10];
					else post += illionPrefixes[0][val % 10];
				};
				const loc = Math.floor((val + 1) / 10) % 10 - 1;
				if (short) post += shortIllions[1][loc];
				else post += illions[1][loc];
				if (short && post.length < 2 && (game.options["num_note"] != "mixsci" && game.options["num_note"] != "mixeng")) post += "~";
			} else {
				if (short) post += shortIllions[0][val % 10];
				else post += illions[0][val % 10];
			};
		};
	};
	return (pre + remain + (!short && post ? " " : "") + post).replace("undefined", "");
};

function formatEngineering(number = NaN, smallAllowed = true, callback = "eng") {
	if (number !== number) return "NaN";
	if (!number) return "0.00";
	if (number < 1e3 && number > -1e3 && (number > 0.1 || number < -0.1 || !smallAllowed)) return format(number, smallAllowed, false, false, callback);
	let pre = "";
	if (number < 0) {
		number = 0 - number;
		pre = "-";
	};
	if (number === Infinity || number == infNum()) return pre + "Infinity";
	const places = Math.floor(Math.log10(number) / 3) * 3;
	let remain = (number / (10 ** places)).toFixed(2);
	if (remain == "Infinity") return "0.00";
	return pre + remain + "e" + places;
};

function formatLogarithm(number = NaN, smallAllowed = true, callback = "log") {
	if (number !== number) return "NaN";
	if (!number) return "0.00";
	let pre = "";
	if (number < 0) {
		number = 0 - number;
		pre = "-";
	};
	if (number === Infinity || number == infNum()) return pre + "Infinity";
	const log = Math.log10(number);
	let result = pre + "e" + log.toFixed(2);
	if (result == "e-0.00") return "e0.00";
	if (log < 1 && (!smallAllowed || log > -2)) return number.toFixed(2);
	return result;
};

function formatStrange(number = NaN, smallAllowed = true, type = "", whole = false) {
	if (type == "letsci") return (whole?number.toFixed(0):format(number, smallAllowed, false, false, type)).replace(/0/g, "A").replace(/1/g, "C").replace(/2/g, "E").replace(/3/g, "G").replace(/4/g, "I").replace(/5/g, "K").replace(/6/g, "M").replace(/7/g, "O").replace(/8/g, "Q").replace(/9/g, "S");
	if (type == "leteng") return (whole?number.toFixed(0):formatEngineering(number, smallAllowed, type)).replace(/0/g, "A").replace(/1/g, "C").replace(/2/g, "E").replace(/3/g, "G").replace(/4/g, "I").replace(/5/g, "K").replace(/6/g, "M").replace(/7/g, "O").replace(/8/g, "Q").replace(/9/g, "S");
	if (type == "letlog") return (whole?number.toFixed(0):formatLogarithm(number, smallAllowed, type)).replace(/0/g, "A").replace(/1/g, "C").replace(/2/g, "E").replace(/3/g, "G").replace(/4/g, "I").replace(/5/g, "K").replace(/6/g, "M").replace(/7/g, "O").replace(/8/g, "Q").replace(/9/g, "S");
	if (type == "symsci") return (whole?number.toFixed(0):format(number, smallAllowed, false, false, type)).replace(/0/g, "~").replace(/1/g, "!").replace(/2/g, "@").replace(/3/g, "#").replace(/4/g, "$").replace(/5/g, "^").replace(/6/g, "&").replace(/7/g, ":").replace(/8/g, ";").replace(/9/g, "?");
	if (type == "symeng") return (whole?number.toFixed(0):formatEngineering(number, smallAllowed, type)).replace(/0/g, "~").replace(/1/g, "!").replace(/2/g, "@").replace(/3/g, "#").replace(/4/g, "$").replace(/5/g, "^").replace(/6/g, "&").replace(/7/g, ":").replace(/8/g, ";").replace(/9/g, "?");
	if (type == "symlog") return (whole?number.toFixed(0):formatLogarithm(number, smallAllowed, type)).replace(/0/g, "~").replace(/1/g, "!").replace(/2/g, "@").replace(/3/g, "#").replace(/4/g, "$").replace(/5/g, "^").replace(/6/g, "&").replace(/7/g, ":").replace(/8/g, ";").replace(/9/g, "?");
	return (whole?number.toFixed(0):format(number, smallAllowed, false, false, type));
};

function format(number = NaN, smallAllowed = true, expand = false, hasPercent = false, callback = "") {
	if (number !== number) return "NaN";
	if (game.options["num_note"] == "inf" && new Decimal(number).gte(1)) return formatDecimalInfinity(number, smallAllowed, expand, hasPercent);
	if (typeof number == "object" && callback != "decimal") {
		if (("" + game.options["num_note"]).includes("let")) return formatDecimalStrange(number, smallAllowed, hasPercent, "let");
		if (("" + game.options["num_note"]).includes("sym")) return formatDecimalStrange(number, smallAllowed, hasPercent, "sym");
		return formatDecimal(number);
	};
	number = +number.toPrecision(15);
	if ((game.options["num_note"] == "sho" || ((game.options["num_note"] == "mixsci" || game.options["num_note"] == "mixeng") && number < 1e36 && number > -1e36)) && (number >= 1e3 || number <= -1e3) && callback != "sho") return formatIllions(number, smallAllowed, !expand);
	if ((game.options["num_note"] == "eng" || game.options["num_note"] == "mixeng") && (number >= 1e3 || number <= -1e3) && callback != "eng") return formatEngineering(number, smallAllowed);
	if (game.options["num_note"] == "log" && callback != "log") return formatLogarithm(number, smallAllowed);
	if (game.options["num_note"] == "letsci" && callback != "letsci") return formatStrange(number, smallAllowed, "letsci");
	if (game.options["num_note"] == "leteng" && callback != "leteng") return formatStrange(number, smallAllowed, "leteng");
	if (game.options["num_note"] == "letlog" && callback != "letlog") return formatStrange(number, smallAllowed, "letlog");
	if (game.options["num_note"] == "symsci" && callback != "symsci") return formatStrange(number, smallAllowed, "symsci");
	if (game.options["num_note"] == "symeng" && callback != "symeng") return formatStrange(number, smallAllowed, "symeng");
	if (game.options["num_note"] == "symlog" && callback != "symlog") return formatStrange(number, smallAllowed, "symlog");
	if (!number) return "0.00";
	let pre = "";
	if (number < 0) {
		number = 0 - number;
		pre = "-";
	};
	if (number === Infinity || number == infNum()) return pre + "Infinity";
	if (number >= 1e9) return pre + number.toExponential(3).replace("+", "");
	if (number >= 1000000) {
		let string = number.toFixed(0);
		return pre + cutoff(string, ",", string.length - 6, string.length - 3);
	};
	if (number >= 1000) {
		let string = number.toFixed(0);
		return pre + cutoff(string, ",", string.length - 3);
	};
	if (!smallAllowed) return pre + number.toFixed(2);
	if (number < 0.00001) return pre + number.toExponential(3);
	if (number < 0.0001) return pre + number.toFixed(6);
	if (number < 0.001) return pre + number.toFixed(5);
	if (number < 0.01) return pre + number.toFixed(4);
	if (number < 0.1) return pre + number.toFixed(3);
	return pre + number.toFixed(2);
};

function formatWhole(number = NaN) {
	if (number !== number) return "NaN";
	if (number >= 1000 || number <= -1000) {
		if (game.options["num_note"] == "inf" && new Decimal(number).gte(1)) return formatDecimalInfinity(number, false);
		return format(number, false);
	};
	return formatStrange(number, false, game.options["num_note"], true);
};

function formatDecimalInternal(number, precision, mantissa = true) {
	number = new Decimal(number);
	// mod logarithm
	if (("" + game.options["num_note"]).includes("log")) {
		return "e" + (number.sign==-1?"-":"") + format(number.mag);
	};
	let e = number.log10().floor();
	let m = number.div(new Decimal(10).pow(e));
	if (m.toStringWithDecimalPlaces(precision) == 10) {
		m = new Decimal(1);
		e = e.add(1);
	};
	// mod engineering
	if (("" + game.options["num_note"]).includes("eng")) {
		let er = e.div(3).floor().mul(3);
		m = m.mul(new Decimal(10).pow(e.sub(er)));
		e = er;
	};
	// return
	if (mantissa) {
		if (number.lt("1e10000")) return m.toStringWithDecimalPlaces(precision) + "e" + e;
		if (e.toNumber() === Infinity) return m.toStringWithDecimalPlaces(precision) + "e" + formatDecimal(e, false);
		return m.toStringWithDecimalPlaces(precision) + "e" + format(e.toNumber(), false);
	};
	if (e.toNumber() === Infinity) return "e" + formatDecimal(e, false);
	return "e" + format(e.toNumber(), false);
};

function formatDecimalStrange(number, smallAllowed = true, hasPercent = false, type = "") {
	if (type == "let") return formatDecimal(number, smallAllowed, false, false).replace(/0/g, "A").replace(/1/g, "C").replace(/2/g, "E").replace(/3/g, "G").replace(/4/g, "I").replace(/5/g, "K").replace(/6/g, "M").replace(/7/g, "O").replace(/8/g, "Q").replace(/9/g, "S");
	if (type == "sym") return formatDecimal(number, smallAllowed, false, false).replace(/0/g, "~").replace(/1/g, "!").replace(/2/g, "@").replace(/3/g, "#").replace(/4/g, "$").replace(/5/g, "^").replace(/6/g, "&").replace(/7/g, ":").replace(/8/g, ";").replace(/9/g, "?");
	return formatDecimal(number, smallAllowed, false, false);
};

function formatDecimalInfinity(number, smallAllowed = true, expand = false, hasPercent = false) {
	number = new Decimal(number);
	if (number.gte(infNum())) {
		if (hasPercent) return "(100.00%" + (expand ? " (of Infinity)" : "") + ")";
		return "100.00%" + (expand ? " (of Infinity)" : "");
	};
	let percentage = number.log10().div(infNum().log10()).mul(100), round = 2;
	if (smallAllowed) {
		if (percentage.lt(0.00001)) return formatDecimal(number, true, expand, hasPercent);
		else if (percentage.lt(0.0001)) round = 6;
		else if (percentage.lt(0.001)) round = 5;
		else if (percentage.lt(0.01)) round = 4;
		else if (percentage.lt(0.1)) round = 3;
	} else {
		if (percentage.lt(0.01)) return formatDecimal(number, false, expand, hasPercent);
	};
	let result = percentage.toNumber().toFixed(round);
	if (percentage == "Infinity") result = formatDecimalInternal(percentage, round);
	if (hasPercent) return "(" + result + "%" + (expand ? " (of Infinity)" : "") + ")";
	return result + "%" + (expand ? " (of Infinity)" : "");
};

function formatDecimal(number, smallAllowed = true, expand = false, hasPercent = false, internal = false) {
	number = new Decimal(number);
	if (number.lt(0)) number = new Decimal(0);
	if (isNaN(number.sign) || isNaN(number.mag) || isNaN(number.layer)) return "NaN";
	if (number.lt(1e308) && number.gt(-1e308) && (number.gt(1e-308) || number.lt(-1e-308)) || number.eq(0)) return format(number.toNumber(), smallAllowed, expand, hasPercent, "decimal");
	if (number.sign < 0) return "-" + formatDecimal(number.neg(), smallAllowed, expand, hasPercent);
	if ((number.gte(infNum()) && !internal) || number.mag === Infinity) return "Infinity";
	// format
	if (number.gte("eeee1000")) {
		var slog = number.slog();
		if (slog.gte(1e6)) return "F" + format(slog.floor().toNumber(), false, expand, hasPercent);
		return "eee" + format(number.mag, true, expand, hasPercent) + "F" + format(number.layer, false, expand, hasPercent);
	};
	if (number.gte("1e1000000")) return formatDecimalInternal(number, 0, false);
	if (number.gte("1e10000")) return formatDecimalInternal(number, 0);
	if (number.gte(1)) return formatDecimalInternal(number, (""+game.options["num_note"]).includes("eng")?2:3);
	if (number.gte(0.0001) || !smallAllowed) return number.toStringWithDecimalPlaces(smallAllowed&&number.lt(1000)?2:0);
	// invert
	let e = number.log10().ceil();
    let m = number.div(new Decimal(10).pow(e));
	number = new Decimal(10).pow(e.neg()).mul(m);
	// continue
	let val = "";
	if (number.lt("1e1000")) {
		val = formatDecimalInternal(number, (""+game.options["num_note"]).includes("eng")?2:3);
		return val.replace(/([^(?:e|F)]*)$/, '-$1');
	};
	return formatDecimal(number, true, expand, hasPercent, true) + "<sup>-1</sup>";
};

const alpha = "<b>&#945</b>", beta = "<b>&#946</b>", gamma = "<b>&#947</b>", delta = "<b>&#948</b>", epsilon = "<b>&#949</b>", zeta = "<b>&#950</b>", infinity = "<b>&#8734</b>";

const constant = () => {
	if (game.improvements[5] > 1) return alpha + beta + gamma + delta;
	if (game.improvements[5] > 0) return alpha + beta + gamma;
	return alpha + beta;
};
