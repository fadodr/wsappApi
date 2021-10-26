const { path } = require('../app');
const Score = require('../model/scoresmodel')

exports.add_score = async (req, res, next) => {
    try {
        const {userId} = req.body;
        const { score } = req.body;
        const { course } = req.body;
        
        const newscoreadded = new Score({
            user: userId,
            score: score,
            course: course,
            date : new Date(new Date().getTime())
        })

        const createdScore = await newscoreadded.save()
        res.status(201).json({
            message: 'New score have been added',
            addedScore : createdScore
        })
    } 
    catch (err) {
        res.status(500).json({
            error : err.message
        })
    }
}

exports.get_scores = async (req, res, next) => {
    try {
        const extractedascores = await Score.find().populate('user', ['username', 'department'])
        res.status(200).json({
            messaage: 'All scores feteched',
            extractedScores : extractedascores
        })
    }
    catch (err) {
        res.status(500).json({
            error : err.message
        })
    }
}

exports.get_single_score = async (req, res, next) => {
    try {
        const extractedscore = await Score.findById(req.params.id).populate('user', 'username')
        res.status(200).json({
            message: 'score fetched',
            extractedAcore : extractedscore
        })
    }
    catch (err) {
        res.status(500).json({
            error : err.message
        })
    }
}

exports.delete_score = async (req, res, next) => {
    try {
        await Score.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'score deleted successfully',
        })
    }
    catch (err) {
        res.status(500).json({
            error : err.message
        })
    }
}

exports.update_score = async (req, res, next) => {
    try {
        await Score.findByIdAndUpdate(req.params.id, {
            $set: {
                user: req.body.userId,
                score: req.body.score,
                course: req.body.course,
                date : new Date(new Date().getTime())
            }
        })
        res.status(200).json({
            message : 'Score successfully updated'
        })
    }
    catch (err) {
        res.status(500).json({
            error : err.message
        })   
    }
}