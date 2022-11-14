const poem = [
	["<span class=v1>Light, </span>", "<span class=v2>Darkness, </span>", "<span class=v6>Nothingness</span>"],
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

function findNumber(percentage, min, max) {
	if (percentage > 1) percentage = 1;
	if (percentage < 0) percentage = 0;
	if (min > max) min = max;
	return (percentage * (max - min)) + min;
};
