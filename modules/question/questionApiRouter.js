const router = require("express").Router();

const {
  answerQuestion,
  getQuestionById,
  addNewQuestion,
  getRandomQuestion
} = require("./questionController");
router.post("/", (req, res) => {
  let question = req.body.question;
  addNewQuestion(question, data => {
    res.redirect(`/api/question/${data._id}`);
  });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  getQuestionById(id, (err, question) => {
    if (err) {
      res.send("err");
    } else {
      res.render("home", {
        question,
        questionView: "class='active'"
      });
    }
  });
});

router.get("/", (req, res) => {
  let question = getRandomQuestion();
  res.send(question);
});

module.exports = router;
