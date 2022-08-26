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

function format(number = NaN) {
	if (number === 0) return "0.00";
	let pre = "";
	if (number < 0) {
		number = 0 - number;
		pre = "-";
	};
	if (number >= 1e9) return pre + number.toExponential(3).replace("+", "");
	if (number >= 1000000) {
		let string = number.toFixed(0);
		return pre + cutoff(string, ",", string.length - 6, string.length - 3);
	};
	if (number >= 1000) {
		let string = number.toFixed(0);
		return pre + cutoff(string, ",", string.length - 3);
	};
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

const alpha = "<b>&#945</b>", beta = "<b>&#946</b>";
