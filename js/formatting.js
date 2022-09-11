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
	if (!number) return "0.00";
	if (number < 1e3 && number > -1e3) return format(number);
	let pre = "";
	if (number < 0) {
		number = 0 - number;
		pre = "-";
	};
	if (number === Infinity) return pre + "Infinity";
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
				if (val % 100 <= 9) return (pre + remain + (!short&&post?" ":"") + post).replace("undefined", "");
			};
			if (val >= 9) {
				if (val % 10 != 9) {
					if (short) post += shortIllionPrefixes[0][val % 10];
					else post += illionPrefixes[0][val % 10];
				};
				const loc = Math.floor((val + 1) / 10) % 10 - 1;
				if (short) post += shortIllions[1][loc];
				else post += illions[1][loc];
			} else {
				if (short) post += shortIllions[0][val % 10];
				else post += illions[0][val % 10];
			};
		};
	};
	return (pre + remain + (!short&&post?" ":"") + post).replace("undefined", "");
};

function format(number = NaN, smallAllowed = true, expand = false) {
	if (number !== number) return "NaN";
	if (!number) return "0.00";
	if ((game.options["num_note"] == "sho" || (game.options["num_note"] == "mixsci" && number < 1e36 && number > -1e36)) && (number >= 1e3 || number <= -1e3)) return formatIllions(number, !expand);
	let pre = "";
	if (number < 0) {
		number = 0 - number;
		pre = "-";
	};
	if (number === Infinity) return pre + "Infinity";
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
	if (number >= 1000 || number <= -1000) return format(number);
	return number.toFixed(0);
};

const alpha = "<b>&#945</b>", beta = "<b>&#946</b>", gamma = "<b>&#947</b>", delta = "<b>&#948</b>", epsilon = "<b>&#949</b>", zeta = "<b>&#950</b>";

const constant = () => {
	if (game.improvements[5] > 1) return alpha + beta + gamma + delta;
	if (game.improvements[5] > 0) return alpha + beta + gamma;
	return alpha + beta;
};

function copy(text) {
	const fallback = () => {
		var textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		var successful = document.execCommand("copy");
		document.body.removeChild(textArea);
		return successful;
	};
	if (!navigator.clipboard) return fallback();
	navigator.clipboard.writeText(text).then(() => {return true}).catch(() => {return false});
	return fallback();
};
