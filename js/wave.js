function sinwave(bottom, top, diff = 0) {
    return (Math.abs((top - bottom) / 2) * Math.sin((Date.now() + diff) / 2500)) + ((top + bottom) / 2);
};

var sinwaves = [];

for (let iteration = 0; iteration <= 615; iteration++) {
    sinwaves.push(Math.round(((50 * Math.sin((iteration * 50) / 2500)) + 50) * 100) / 100);
};
