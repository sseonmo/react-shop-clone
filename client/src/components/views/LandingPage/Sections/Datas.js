const continents = [
	{"_id": 1, name: "Africa"},
	{"_id": 2, name: "Europe"},
	{"_id": 3, name: "Asia"},
	{"_id": 4, name: "North America"},
	{"_id": 5, name: "South America"},
	{"_id": 6, name: "Australia"},
	{"_id": 7, name: "Antarctica"}
];

const price = [
	{"_id": 1, name: "Any", "array": []},
	{"_id": 2, name: "$0 to $199", "array": [0, 199]},
	{"_id": 3, name: "$200 to $249", "array": [200, 249]},
	{"_id": 4, name: "$250 to $299", "array": [250, 399]},
	{"_id": 5, name: "$300 to $349", "array": [300, 349]},
	{"_id": 6, name: "$350 to $300", "array": [350, 399]},
	{"_id": 7, name: "$400 to $449", "array": [400, 449]},
	{"_id": 8, name: "$450 to $499", "array": [450, 499]},
	{"_id": 9, name: "$500 to $549", "array": [500, 549]},
	{"_id": 10, name: "$550 to $600", "array": [550, 600]},
];

export {continents, price}
