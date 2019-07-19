// Copyright Titanium I.T. LLC.
"use strict";


module.exports = class Card {
	static get RANKS() { return ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]; }
	static get SUITS() { return ["C", "S", "H", "D"]; }

	constructor(rank, suit) {
		this.rank = rank;
		this.suit = suit;
	}
};