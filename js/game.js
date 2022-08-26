var game = {
	points: 0,
	tab: "main",
	unlocks: [],
};

function pointButtonGain() {
	let gain = 1;
	return gain;
};

const loop = setInterval(() => {
	if (game.points > 0 && !game.unlocks.includes("pointDisplay")) game.unlocks.push("pointDisplay");
	if (game.tab == "main") {
		if (game.unlocks.includes("pointDisplay") && !document.getElementById("pointDisplay")) {
			let append = document.createElement("div");
			append.id = "pointDisplay";
			if (document.getElementById("pointButton")) document.getElementById("main").insertBefore(append, document.getElementById("pointButton"));
			else document.getElementById("main").appendChild(append);
		};
		if (!document.getElementById("pointButton")) {
			let append = document.createElement("button");
			append.id = "pointButton";
			append.type = "button";
			append.addEventListener("click", () => {
				game.points += pointButtonGain();
			});
			document.getElementById("main").appendChild(append);
		};
		if (document.getElementById("pointDisplay")) document.getElementById("pointDisplay").innerHTML = "You have " + game.points + " points<br><br>";
		if (document.getElementById("pointButton")) document.getElementById("pointButton").innerHTML = "+" + pointButtonGain() + " points";
	};
}, 30);
