const Question = require('../model/questionsmodel')

exports.add_question = async ( req, res, next) => {
    try{
        const {course} = req.body
        const { question } = req.body
        const { options } = req.body
        const questions = new Question({
            course,
            question,
            options
        })
        const createdQuestion = await questions.save();
        res.status(201).json({
            createdQuestion
        })
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}

exports.get_questions = async ( req, res, next) => {
    try{
        const questions = await Question.find();
        if(questions.length == 0){
            res.status(200).json({
                message : 'No questions available',
            }) 
        }
        else{
           res.status(200).json({
            message : 'All questions fetched',
            fetchedQuestions : questions
        }) 
        }
        
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}

exports.get_single_question = async ( req, res, next) => {
    try{
        const question = await Question.findById(req.params.id)
        if(!question){
            const error = new Error('Question with specified id is not in the database')
            error.status = 500
            throw error
        }
        res.status(200).json({
            message : 'question fetched',
            fetchedQuestion : question
        })
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}

exports.delete_question = async ( req, res, next) => {
    try{
        await Question.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message : 'question successfully deleted'
        })
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}

exports.update_question = async ( req, res, next )=> {
    try{
        const {course} = req.body
        const { question } = req.body
        const { options } = req.body
        await Question.updateOne({_id : req.params.id}, {$set: {
            course,
            question,
            options
        }})
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}