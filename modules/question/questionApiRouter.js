//questionApiRouter

const router = require ('express').Router();
const { answerQuestion, getQuestionById, addNewQuestion, getRandomQuestion } = require('./questionController'); //ES6 destructuring

router.post('/', (req, res) =>{

    let question = req.body.question;
    addNewQuestion(question, (data) => {
        res.redirect(`/api/question/${data._id}`);
    });

    // addNewQuestion(question)
    //     .then((question) => res.redirect(`/question/${question._id}`))
    //     .catch((err) => console.log(err))
});

router.get('/:id', (req, res) => {
    // let id = answerQuestion(req.params.id, req.body);
    //
    // if(id){
    //     res.redirect(`/question/${id}`);
    // } else {
    //     res.redirect('/');
    // };
    let id = req.params.id;
    getQuestionById(id, (err, question)=>{
        if(err){
            res.send('err');
        } else {
            res.render('home', {
                question,
                questionView:"class='active'"
            })
        }

    })
});

router.get('/', (req, res) =>{
    let question =getRandomQuestion();
    res.send(question);
});

router.post(':/id', (req, res)=>{
    console.log(req.params);
});

module.exports = router;