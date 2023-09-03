function answerTrue() {
    alert("答对力（喜");
}
function answerFalse() {
    alert("答错力（悲");
}
//1
$("#math-submit-problem1").on('click', function () {
    var answer1 = document.querySelector("#math-text-problem1").value;
    if (answer1 == "123/14") {
        answerTrue();
    } else {
        answerFalse();
    }
});
