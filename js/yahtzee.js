/*
 * Yahtzee in vanilla javascript (original in jQuery)
 * Made by mdg
 * december 2011 (refactored in 2025)
 */

// global variabels
const dices = [0, 0, 0, 0, 0];
let hold = [0, 0, 0, 0, 0];
const scoreArray = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
const largeStraightArray = [
  [2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5],
];
let turn = 1;
let timesThrown = 0;
let scoreLock = true;
let yahtzeeBonus = 0;
const subtotal = [0, 0];
let total = 0;

// start of the game related events
$(() => {
  const laagsteScoreTopTien = Number.parseInt($("#laagsteScore").html());
  /*
    /* start of the game related events
    */
  $("#throw-button").click(function () {
    scoreLock = false;

    if (timesThrown === 0) $(".hold-button").attr("disabled", "disabled");

    if (timesThrown < 3) {
      $(".hold-button").removeAttr("disabled");
      throwDices();

      ++timesThrown;
    }
    if (timesThrown === 3) {
      //reset everything
      $(this).attr("disabled", "disabled");
      $(".hold-button").attr("disabled", "disabled");
      hold = Array(0, 0, 0, 0, 0);
      timesThrown = 0;
      removeHoldColors();
    }
  });

  $(".hold-button").click(function () {
    i = $(this).attr("id");
    nr = i.substring(4);
    setHold(nr);
  });

  /*
   * When a scoreSquare is clicked then fill in teh score and the turn, reset timesThrown, hold array and hold buttons, if 13 turns have passed then end the game'
   */
  $(".scoreSquare").click(function () {
    if (checkYahtzee() && scoreArray[11] === 50) {
      yahtzeeBonus += 100;
    }
    id = Number.parseInt($(this).attr("id"));
    if ($(this).html() === "" && !scoreLock && scoreArray[id] === -1) {
      switch (id) {
        case 6:
          scoreArray[6] = threeOfAKind();
          break;
        case 7:
          scoreArray[7] = fourOfAKind();
          break;
        case 8:
          scoreArray[8] = fullHouse();
          break;
        case 9:
          scoreArray[9] = smallStraight();
          break;
        case 10:
          scoreArray[10] = largeStraight();
          break;
        case 11:
          scoreArray[11] = checkYahtzee() ? 50 : 0;
          break;
        case 12:
          scoreArray[12] = chance();
          break;

        default:
          scoreArray[id] = checkScore(id + 1);
      }
      $(`#${id}`).html(scoreArray[id]).css({
        background: "transparent",
        color: "#111",
      });
      scoreLock = true;

      //reset hold array + buttons
      timesThrown = 0;
      $(".hold-button").attr("disabled", "disabled");
      hold = [0, 0, 0, 0, 0];
      removeHoldColors();

      //start score calculations
      subtotal[0] = getSubtotal(0);
      $("#sixtyThree").html(subtotal[0]);
      if (subtotal[0] >= 63) {
        $("#extra").html("35");
        subtotal[0] += 35;
      } else {
        $("#extra").html("0");
      }
      $("#subtotal").html(subtotal[0]);
      subtotal[1] = getSubtotal(1);
      $("#yahtzeeBonus").html(yahtzeeBonus);
      $("#subtotal2").html(subtotal[1]);
      total = getTotal();
      $("#totalScore").html(total);

      /*
       * reset de gooiknop
       * of voer acties uit voor het einde van het spel als er 13 keer gesmeten is
       */
      if (turn === 13) {
        //Acties voor het einde van het spel
        $("#throw-button").val("Spel Afgelopen").attr("disabled", "disabled");
        $("#totalScoreRow").css("background", "#EA9D30");
        if (laagsteScoreTopTien < total) {
          $("#topscores").append(
            "<button class='button gray medium' id='addTopscoreButton'>Voeg mijn score toe</button>"
          );
          $("#addTopscoreButton").click(function () {
            $(this).slideUp(300);
            $("#addTopscoreForm").slideDown(300);
            $("#addTopscoreFormNaam").focus();
          });
        }
      } else {
        $("#throw-button").removeAttr("disabled");
      }

      ++turn;
    }
  });

  $("#addTopscoreFormSubmit").click(() => {
    if ($.trim($("#addTopscoreFormNaam").val()) === "") {
      $("#addTopscoreFormNaam").css("border", "#e00 solid 2px");
      return false;
    }
    $("#topscoresText").slideUp(111);
    $("#loadingGif").show();

    $.post(
      "score.php?w=post",
      {
        naam: $("#addTopscoreFormNaam").val(),
        score: total,
      },
      (data) => {
        $.get(`score.php?w=get&s=${total}`, (data) => {
          $("#loadingGif").hide();
          $("#topscoresText").html(data).slideDown(444);
        });
      }
    );

    return false;
  });

  /* alles scores laten zien */

  $("a#show-all-scores").click(function () {
    $("#loadingGif2").show();
    $(this).hide();
    $.get("score.php?w=extra", (data) => {
      $("#topscoresText").append(data).slideDown(444);
      $("#loadingGif2").hide();
    });

    return false;
  });
});
