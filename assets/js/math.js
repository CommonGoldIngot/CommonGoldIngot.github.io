function answerTrue() {
    alert("答对力（喜");
}
function answerFalse() {
    alert("答错力（悲");
}
$("input.math-submit-problem1").on('click', function () {
    var answer1 = document.querySelector("input.math-input-text-problem1").value;
    if (answer1 = "123/14") {
        answerTrue();
    } else {
        answerFalse();
    }
});