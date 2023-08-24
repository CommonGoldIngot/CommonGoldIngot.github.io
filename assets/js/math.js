function answerTrue() {
    alert("答对力（喜");
}
function answerFalse() {
    alert("答错力（悲"):
}
var answer1 = $("input.math-problem1").value;
function checkAnswer1() {
    if (answer1 = "123/14") {
        answerTrue();
    } else {
        answerFalse();
    }
}