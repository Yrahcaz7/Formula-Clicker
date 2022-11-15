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

function formatIllions(number = NaN, short = false) {
	if (number !== number) return "NaN";
	let pre = "";
	if (number < 0) {
		number = 0 - number;
		pre = "-";
	};
	if (number < 1) return pre + "0.00";
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

function format(number, smallAllowed = true, expand = false, hasPercent = false, showInfValue = false) {
	if (number !== number || (typeof number == "number" && number >= 1.7976931348620926e308)) number = Infinity;
	let natural = typeof number=="object"?number.toNumber():+number;
	if ((natural !== Infinity && natural !== -Infinity) && (game.options["num_note"] == "sho" || (("" + game.options["num_note"]).includes("mix") && natural < 1e36 && natural > -1e36)) && (natural >= 1e3 || natural <= -1e3)) return formatIllions(number, !expand);
	if (game.options["num_note"] == "inf" && new Decimal(number).gte(1)) return formatDecimalInfinity(number, smallAllowed, expand, hasPercent);
	if (("" + game.options["num_note"]).includes("let")) return formatDecimalStrange(number, smallAllowed, hasPercent, "let");
	if (("" + game.options["num_note"]).includes("sym")) return formatDecimalStrange(number, smallAllowed, hasPercent, "sym");
	return formatDecimal(number, smallAllowed, expand, hasPercent, showInfValue);
};

function formatWhole(number) {
	if (game.options["num_note"] == "inf" || (("" + game.options["num_note"]).includes("log") && new Decimal(number).gte(1000))) return format(number, false);
	let result = format(number, false);
	if (result.includes("e") || game.options["num_note"] == "sho" || ("" + game.options["num_note"]).includes("mix")) return result;
	return result.split(".")[0];
};

function formatDecimalInternal(number, precision = 2, mantissa = true) {
	number = new Decimal(number);
	if (("" + game.options["num_note"]).includes("log") && number.lt("e1000000")) {
		if (number.gte("e10000")) {
			let result = number.log10().toStringWithDecimalPlaces(0);
			return "e" + cutoff(result, ",", result.length - 6, result.length - 3);
		} else if (number.gte("e1000")) return "e" + number.log10().toStringWithDecimalPlaces(1);
		else if (number.gte("e100")) return "e" + number.log10().toStringWithDecimalPlaces(2);
		else if (number.gte(1000)) return "e" + number.log10().toStringWithDecimalPlaces(3);
	};
	let e = number.log10().floor();
	let m = number.div(new Decimal(10).pow(e));
	if (m.toStringWithDecimalPlaces(precision) == 10) {
		m = new Decimal(1);
		e = e.add(1);
	};
	if (("" + game.options["num_note"]).includes("eng")) {
		let er = e.div(3).floor().mul(3);
		m = m.mul(new Decimal(10).pow(e.sub(er)));
		e = er;
	};
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
	return formatDecimal(number, smallAllowed, false, hasPercent);
};

function formatDecimalInfinity(number, smallAllowed = true, expand = false, hasPercent = false) {
	number = new Decimal(number);
	if (number.gte(infNum())) {
		if (hasPercent) return "(100%" + (expand ? " (of Infinity)" : "") + ")";
		return "100%" + (expand ? " (of Infinity)" : "");
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
	if (result == "Infinity") result = formatDecimalInternal(percentage, round);
	if (result == "100.00%") result = "100%";
	if (hasPercent) return "(" + result + "%" + (expand ? " (of Infinity)" : "") + ")";
	return result + "%" + (expand ? " (of Infinity)" : "");
};

function formatDecimal(number, smallAllowed = true, expand = false, hasPercent = false, internal = false) {
	number = new Decimal(number);
	if (number.eq(0)) return "0.00";
	if (isNaN(number.sign) || isNaN(number.mag) || isNaN(number.layer)) return "NaN";
	if (number.sign < 0) return "-" + formatDecimal(number.neg(), smallAllowed, expand, hasPercent);
	// handle negatives
	let pre = "";
	if (number.sign == -1) {
		number.sign = 1;
		pre = "-";
	};
	// handle infinity
	if ((number.gte(infNum()) && !internal) || number.mag === Infinity) return pre + "Infinity";
	// format
	if (number.gte("eeee1000")) {
		let slog = number.slog();
		if (slog.gte(1e6)) return pre + "F" + format(slog.floor().toNumber(), false, expand, hasPercent);
		return pre + format(number.mag, true, expand, hasPercent) + "F" + format(number.layer, false, expand, hasPercent);
	};
	if (number.gte("e1000000")) return pre + formatDecimalInternal(number, 0, false);
	if (number.gte("e1000")) return pre + formatDecimalInternal(number, 0);
	if (number.gte(1e9) || (number.gte(1e3) && (""+game.options["num_note"]).includes("eng"))) return pre + formatDecimalInternal(number, (""+game.options["num_note"]).includes("eng")?2:3);
	if (number.gte(1000)) {
		let result = number.toStringWithDecimalPlaces(0);
		return pre + cutoff(result, ",", result.length - 6, result.length - 3);
	};
	if (number.gte(0.1) || !smallAllowed) return pre + number.toStringWithDecimalPlaces(2);
	if (number.gte(0.01)) return pre + number.toStringWithDecimalPlaces(3);
	if (number.gte(0.001)) return pre + number.toStringWithDecimalPlaces(4);
	if (number.gte(0.0001)) return pre + number.toStringWithDecimalPlaces(5);
	if (number.gte(0.00001)) return pre + number.toStringWithDecimalPlaces(6);
	// invert
	let e = number.log10().ceil();
	let m = number.div(new Decimal(10).pow(e));
	number = new Decimal(10).pow(e.neg()).mul(m);
	// continue
	let val = formatDecimal(number, true, expand, hasPercent, true);
	if (number.lt("e10000")) return pre + val.replace(/([^(?:e|F)]*)$/, '-$1');
	return pre + formatDecimal(number, true, expand, hasPercent, true) + "<sup>-1</sup>";
};

const time = [[
	"s", "second", "seconds"
], [
	"m", "minute", "minutes"
], [
	"h", "hour", "hours"
], [
	"d", "day", "days"
], [
	"y", "year", "years"
]];

function formatTime(ms, short = false) {
	let seconds = ms / 1000;
	let arr = [Math.floor(seconds / 31536000), Math.floor(seconds / 86400) % 365, Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
	for (let index = 0; index < arr.length; index++) {
		if (arr[index] === 0) arr[index] = undefined;
		else break;
	};
	let result = "";
	if (short) {
		for (let index = 0; index < arr.length; index++) {
			const number = arr[index];
			if (number === undefined) continue;
			if (index === arr.length - 1) result += format(number) + time[arr.length - (index + 1)][0];
			else result += formatWhole(number) + time[arr.length - (index + 1)][0] + " ";
		};
	} else {
		for (let index = 0; index < arr.length; index++) {
			const number = arr[index];
			if (number === undefined) continue;
			if (number === 1) {
				if (index === arr.length - 1) result += format(number) + " " + time[arr.length - (index + 1)][1];
				else result += formatWhole(number) + " " + time[arr.length - (index + 1)][1] + (index === arr.length - 2 ? ", and " : ", ");
			} else {
				if (index === arr.length - 1) result += format(number) + " " + time[arr.length - (index + 1)][2];
				else result += formatWhole(number) + " " + time[arr.length - (index + 1)][2] + (index === arr.length - 2 ? ", and " : ", ");
			};
		};
	};
	return result;
};

const alpha = "<b>&#945</b>", beta = "<b>&#946</b>", gamma = "<b>&#947</b>", delta = "<b>&#948</b>", epsilon = "<b>&#949</b>", zeta = "<b>&#950</b>", infinity = "<b>&#8734</b>";

const constant = () => {
	if (game.improvements[5] > 1) return alpha + beta + gamma + delta;
	if (game.improvements[5] > 0) return alpha + beta + gamma;
	return alpha + beta;
};
