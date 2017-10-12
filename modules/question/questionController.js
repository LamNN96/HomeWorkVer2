//

const fs = require('fs');
const path = require('path');
const questionModel = require('./questionSchema');
const QuestionFile = path.join(__dirname + '/question.json');

const getQuestionList = () => {
    try {
        let result = JSON.parse(fs.readFileSync(QuestionFile, {encoding: 'utf-8'}));
        return result;
    } catch (err) {
        return [];
    }
};

const saveQuestionList = (questionList) => {
    try {
        fs.writeFileSync(QuestionFile, JSON.stringify(questionList), {encoding: 'utf-8'});

    } catch (err) {
        console.log(err);
    }
};

const saveQuestion = (id, question) => {
    let questionList = getQuestionList();

    questionList[id] = question;

    saveQuestionList();

};


const addNewQuestion = (question, callback) => {
    // let questionList = getQuestionList();
    let newQuestion = {
        question,
        // yes : 0,
        // no : 0
    };
    // let id;
    questionModel.create(newQuestion, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            callback(data);
        }
    });
};

const getQuestionById = (id, callback) => {
    questionModel.findOne({_id: id}, (err, question) => {
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
            console.log('callback err ', err);
        } else {
            let nYes = question.yes;
            let nNo = question.no;
            //console.log('nYes: ', nYes);
            if (answer.answer == 'no') {
                nNo++;
                questionModel.findByIdAndUpdate({_id: id}, {no: nNo}, (err, data) => {
                    if (err) {
                        console.log('err ', err);
                    } else {
                        console.log('save "no" success');
                    }
                });
            } else if (answer.answer == 'yes') {
                nYes++;
                questionModel.findByIdAndUpdate({_id: id}, {yes: nYes}, (err, data) => {
                    if (err) {
                        console.log('err ', err);
                    } else {
                        console.log('save "yes" success');
                    }
                });
            } else {
                console.log('invalid answer');
            }
            ;
        }
    });
};

const getRandomQuestion = (callback) => {
    //console.log('callback ',callback);
    questionModel.count({}, (err, number) => {
        //console.log("Number of questions: ", number);
        // callback(number);
        random = Math.floor(Math.random() * number);
        questionModel.findOne().skip(random).exec(
            (err, result) => {
                //onsole.log(callback);
                //callback(result);
                if (err) {
                    console.log('err ', err);
                    //callback(err);
                } else {
                    // console.log('result ', result);
                    callback(result);
                }
            }
        );
    });
};


module.exports = {
    addNewQuestion,
    answerQuestion,
    getQuestionById,
    getRandomQuestion
}