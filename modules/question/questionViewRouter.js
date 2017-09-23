//view router: router lam nhiem vu hien thi
const router = require('express').Router();
const {answerQuestion, getQuestionById, getRandomQuestion} = require('./questionController');


//home
router.get('/', (req, res) => {
    getRandomQuestion((randomQuestion) => {
        console.log('random question ', randomQuestion);
        res.render('home', {
            question: randomQuestion,
            questionView: 'class = "active"'
        });
    });
});

//ask
router.get('/ask', (req, res) => {
    res.render('ask', {
        askView: "class='active'"
    });
});

router.post('/question/:id', (req, res) => {
    console.log('params', req.params);
    let id = req.params.id;
    console.log('answerText ', req.body);
    let answerText = req.body;
    answerQuestion(id, answerText);
    console.log('DONE____________');
    console.log('id: ', id);
    res.redirect(`/question/result/${id}`);
});

router.get('/question/result/:id', (req, res) => {
    // let id =req.params.id;
    // getQuestionById(id, (err, question)=>{
    //     res.render('question', {
    //         question : question,
    //         questionView: "class = 'active'"
    //     });
    // })
    let id = req.params.id;
    getQuestionById(id, (err, question) => {
        if (err) {
            res.send('err');
        } else {
            console.log('tong so luot vote: ', question.yes + question.no)
            let total = question.yes + question.no;
            let percentYes = ((((question.yes / total) * 100).toFixed(2)) == 0.00)? '': ((question.yes / total) * 100).toFixed(2)+'%';
            let percentNo = ((((question.no / total) * 100).toFixed(2))==0.00)? '':((question.no / total) * 100).toFixed(2)+'%';
            let percentNoView = (percentNo == 0.00) ? '' : `style="width:${percentNo}"`;
            let percentYesView = (percentYes == 0.00) ? '' : `style="width:${percentYes}"` ;
            let result = {total, percentNo, percentYes};
            res.render('question', {
                question,
                result,
                percentYesView,
                percentNoView,
                questionView: "class='active'"
            })
        }
    })
});


module.exports = router;