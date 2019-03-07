const router = require("express").Router();
const {
  answerQuestion,
  getQuestionById,
  getRandomQuestion
} = require("./questionController");

router.get("/", (req, res) => {
  getRandomQuestion(randomQuestion => {
    res.render("home", {
      question: randomQuestion,
      questionView: 'class = "active"'
    });
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    aboutView: "class='active'"
  });
});

router.get("/ask", (req, res) => {
  res.render("ask", {
    askView: "class='active'"
  });
});

router.post("/question/:id", (req, res) => {
  let id = req.params.id;
  let answerText = req.body;
  answerQuestion(id, answerText);
  res.redirect(`/question/result/${id}`);
});

router.get("/question/result/:id", (req, res) => {
  let id = req.params.id;
  getQuestionById(id, (err, question) => {
    if (err) {
      res.send("err");
    } else {
      let total = question.yes + question.no;
      let percentYes =
        ((question.yes / total) * 100).toFixed(2) == 0.0
          ? ""
          : ((question.yes / total) * 100).toFixed(2) + "%";
      let percentNo =
        ((question.no / total) * 100).toFixed(2) == 0.0
          ? ""
          : ((question.no / total) * 100).toFixed(2) + "%";
      let percentNoView = percentNo == 0.0 ? "" : `style="width:${percentNo}"`;
      let percentYesView =
        percentYes == 0.0 ? "" : `style="width:${percentYes}"`;
      let result = { total, percentNo, percentYes };
      res.render("question", {
        question,
        result,
        percentYesView,
        percentNoView,
        questionView: "class='active'"
      });
    }
  });
});

module.exports = router;
