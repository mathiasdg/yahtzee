/*
 * Yahtzee in vanilla javascript (original in jQuery)
 * Made by mdg
 * december 2011 (refactored in 2025)
 */

function throwDices() {
  for (i = 0; i < 5; i++) {
    const j = i + 1;
    if (hold[i] === 0) {
      dices[i] = Math.floor(Math.random() * 6) + 1;
      const xWaarde = [0, -45, -90, -135, -180, -225];
      $(`#dice${j} .diceImgHolder`)
        .slideUp(100)
        .css("background-position", `${xWaarde[dices[i] - 1]}px 0px`)
        .slideDown(100);
    }
  }
}
function setHold(dsNummer) {
  knop = $(`#hold${dsNummer}`);
  value = knop.html();
  i = Number.parseInt(dsNummer) - 1;
  if (hold[i] === 0) {
    hold[i] = 1;
    $(`#dice${dsNummer}`).css("background-color", "#341");
    knop.html("Lossen");
  } else {
    hold[i] = 0;
    $(`#dice${dsNummer}`).css("background-color", "#ddd");
    knop.html("Houden");
  }
}
function removeHoldColors() {
  for (i = 1; i < 6; i++) {
    $(`#hold${i}`).html("Houden");
  }
  $(".dice").css("background", "#ddd");
}
function setScore(veld, score) {
  $(`#${veld}`).html(score);
}
function checkScore(eyes) {
  let score = 0;

  for (i = 0; i < 6; i++) {
    if (dices[i] === eyes) score += eyes;
  }
  return score;
}
function sortNumber(a, b) {
  return a - b;
}

function checkXOfAKind(x) {
  let same = 1;
  dices.sort(sortNumber);
  let last = dices[0];

  for (i = 1; i < 5; i++) {
    if (same === x) break;
    if (last === dices[i]) same++;
    else same = 1;

    last = dices[i];
  }

  let score = 0;
  if (same >= x) {
    score = chance();
  }

  return score;
}

function fullHouse() {
  letscore = 0;
  dices.sort(sortNumber);
  let count = 1;
  let found3 = false;
  let found2 = false;
  for (i = 1; i < 5; i++) {
    if (dices[i] === dices[i - 1]) count++;
    else {
      if (count === 3) found3 = true;
      else if (count === 2) found2 = true;
      count = 1;
    }
  }
  if (count === 3) found3 = true;
  else if (count === 2) found2 = true;
  if (found3 && found2) score = 25;

  return score;
}
function smallStraight() {
  let score = 0;
  let same = false;
  dices.sort(sortNumber);

  let curSeqLen = 1;
  let lastDie = dices[0];

  // if the lowest number is a 4, or the highest number is a 3, it cannot be small straight
  if (dices[0] >= 4 || dices[4] <= 3) same = false;

  for (i = 1; i < 5; i++) {
    // the current die is one greater than the last one, the numbers are in sequence
    if (dices[i] === lastDie + 1) {
      curSeqLen++;
    } else if (dices[i] === lastDie) {
    }
    // the consecutive dice are not in order, still might be a straight in there
    else {
      curSeqLen = 1;
    }

    if (curSeqLen >= 4) same = true;

    lastDie = dices[i];
  }

  if (same) score = 30;

  return score;
}
function largeStraight() {
  let score = 0;
  dices.sort(sortNumber);

  let same = false;
  let hetzelfde2 = false;

  for (i = 0; i < 5; i++) {
    if (largeStraightArray[0][i] === dices[i]) {
      same = true;
    } else {
      same = false;
      break;
    }
  }
  for (i = 0; i < 5; i++) {
    if (largeStraightArray[1][i] === dices[i]) {
      hetzelfde2 = true;
    } else {
      hetzelfde2 = false;
      break;
    }
  }
  if (same || hetzelfde2) score = 40;

  return score;
}
//check whole dicesArray against it's first element, every element has to be the same
function checkYahtzee() {
  for (i = 1; i < 5; i++) {
    if (dices[0] !== dices[i]) {
      return false;
    }
  }
  return true;
}

function chance() {
  let score = 0;
  for (dice of dices) {
    score += dice;
  }

  return score;
}

function getSubtotal(id) {
  let score = 0;
  let halt = 6;
  let startIndex = id;
  if (id === 1) {
    startIndex = 6;
    halt = 13;
  }
  for (let i = startIndex; i < halt; i++) {
    const bonusScore = scoreArray[i] === -1 ? 0 : scoreArray[i];
    score += bonusScore;
  }

  return score;
}

function getTotal() {
  return subtotal[0] + subtotal[1] + yahtzeeBonus;
}
