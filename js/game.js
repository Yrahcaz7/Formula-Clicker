var game = {
	points: 0,
	tab: "main",
};

const loop = setInterval(() => {
	let main = document.getElementById("main");
	if (game.tab == "main") {
		main.innerHTML = "test<h2>TEST</h2>test<br>test<br><br>test<h1>TEST</h1>test<h5>TEST</h5>test";
	};
}, 30);
