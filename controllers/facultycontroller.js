const Faculty = require('../model/facultymodel') 

exports.add_faculty = async ( req, res, next) => {
    try{
        const { faculty } = req.body
        const { courses }= req.body
        const createdFaculty = new Faculty({
            faculty,
            courses
        })
        const addedfaculty = await createdFaculty.save();
        res.status(201).json({
            message : 'New Faculty successfully added',
            addedFaculty :addedfaculty
        })
    }
    catch(err) {
        res.status(500).json({
            error : err.message
        })
    }
}

exports.get_faculty = async ( req, res, next) => {
    try{
        const extractedfaculty = await Faculty.find()
        res.status(200).json({
            message : "Facultys successfully fetched",
            extractedFaculty : extractedfaculty
        })
    }
    catch(err) {
        res.status(500).json({
            error : err.message
        })
    }
}

exports.delete_faculty = async ( req, res, next) => {
    try{
        await Faculty.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message : 'Faculty successfully deleted'
        })
    }
    catch(err) {
        res.status(500).json({
            error : err.message
        })
    }
}

exports.get_single_faculty = async ( req, res, next) => {
    try{
        const extractedfaculty = await Faculty.findById(req.params.id)
        res.status(200).json({
            message : "Faculty successfully fetched",
            extractedFaculty : extractedfaculty
        })
    }
    catch(err) {
        res.status(500).json({
            error : err.message
        })
    }
}


exports.update_faculty  = async ( req, res, next) => {
    try{
        const { faculty } = req.body
        const { courses }= req.body
        await Institution.findByIdAndUpdate(req.params.id, {$set:{
            faculty,
            courses
        }})
        res.status(200).json({
            message : 'Faculty updated'
        })
    }
    catch(err) {
        res.status(500).json({
            error : err.message
        })
    }
}