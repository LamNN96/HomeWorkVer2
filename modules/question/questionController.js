const questionModel = require("./questionSchema");

const addNewQuestion = (question, callback) => {
  let newQuestion = {
    question
  };
  questionModel.create(newQuestion, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      callback(data);
    }
  });
};

const getQuestionById = (id, callback) => {
  questionModel.findOne({ _id: id }, (err, question) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, question);
    }
  });
};

const answerQuestion = (id, answer) => {
  getQuestionById(id, (err, question) => {
    if (err) {
      console.log("callback err ", err);
    } else {
      let nYes = question.yes;
      let nNo = question.no;
      if (answer.answer == "no") {
        nNo++;
        questionModel.findByIdAndUpdate(
          { _id: id },
          { no: nNo },
          (err, data) => {
            if (err) {
              console.log("err ", err);
            } else {
              console.log('save "no" success');
            }
          }
        );
      } else if (answer.answer == "yes") {
        nYes++;
        questionModel.findByIdAndUpdate(
          { _id: id },
          { yes: nYes },
          (err, data) => {
            if (err) {
              console.log("err ", err);
            } else {
              console.log('save "yes" success');
            }
          }
        );
      } else {
        console.log("invalid answer");
      }
    }
  });
};

const getRandomQuestion = callback => {
  questionModel.count({}, (err, number) => {
    random = Math.floor(Math.random() * number);
    questionModel
      .findOne()
      .skip(random)
      .exec((err, result) => {
        if (err) {
          console.log("err ", err);
        } else {
          callback(result);
        }
      });
  });
};

module.exports = {
  addNewQuestion,
  answerQuestion,
  getQuestionById,
  getRandomQuestion
};
