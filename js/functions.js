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

function findNumber(percentage, min, max) {
	if (percentage > 1) percentage = 1;
	if (percentage < 0) percentage = 0;
	if (min > max) min = max;
	return (percentage * (max - min)) + min;
};
