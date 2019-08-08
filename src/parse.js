// Copyright Titanium I.T. LLC.
"use strict";

const Card = require("./card");
const AllCards = require("./all_cards");

exports.allCards = function allCards(allCardsString) {
	if (allCardsString === undefined) throw new Error("Expected 5 cards but got nothing");
	if (allCardsString.length !== 10) throw new Error(`Expected 5 cards but got ${allCardsString.length / 2}`);

	const groups = /(..)(..)(..)(..)(..)/.exec(allCardsString);
	const cards = groups.slice(1, 5).map((group) => exports.card(group, false));
	cards[4] = exports.card(groups[5], true);

	return new AllCards(cards);
};

exports.card = function card(cardString, isStarter) {
	let rank = cardString[0];
	const suit = cardString[1];
	if (rank === "0") rank = "10";

	if (!Card.isValidRank(rank)) throw new Error(`Unknown rank '${rank}' in card '${cardString}'`);
	if (!Card.isValidSuit(suit)) throw new Error(`Unknown suit '${suit}' in card '${cardString}'`);

	return new Card(rank, suit, isStarter);
};