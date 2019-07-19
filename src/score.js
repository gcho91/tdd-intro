// Copyright Titanium I.T. LLC.
"use strict";

const Card = require("./card");
const parse = require("./parse");

exports.analyze = function(cardsString) {
	return exports.calculate(parse.allCards(cardsString));
};

exports.calculate = function(allCards) {
	const previousStraights = [];
	const previousFlushes = [];
	const combinations = allCards.combinations();
	combinations.sort((a, b) => b.length - a.length);   // doing larger sets first makes the subset checks work

	return combinations.reduce((accumulator, cards) => {
		const straightScore = scoreStraight(previousStraights, cards);
		if (straightScore > 0) previousStraights.push(cards);

		const flushScore = scoreFlush(previousFlushes, cards);
		if (flushScore > 0) previousFlushes.push(cards);

		return accumulator +
			scorePair(cards) +
			straightScore +
			flushScore +
			scoreNobs(cards) +
			scoreFifteen(cards);
	}, 0);
};

function scorePair(cards) {
	return Card.isPair(cards) ? 2 : 0;
}

function scoreStraight(previousStraights, cards) {
	if (!Card.isStraight(cards)) return 0;

	const alreadyScored = previousStraights.some((previousStraight) => Card.isSubset(cards, previousStraight));
	if (alreadyScored) return 0;

	return cards.length;
}

function scoreFlush(previousFlushes, cards) {
	if (!Card.isFlush(cards)) return 0;

	const alreadyScored = previousFlushes.some((previousFlush) => Card.isSubset(cards, previousFlush));
	if (alreadyScored) return 0;

	return cards.length;
}

function scoreNobs(cards) {
	return Card.isNobs(cards) ? 1 : 0;
}

function scoreFifteen(cards) {
	return Card.isFifteen(cards) ? 2 : 0;
}