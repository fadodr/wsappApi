const Institution = require('../model/institutionsmodel')

exports.add_institution = async ( req, res, next) => {
    try{
        const institution = req.body.institution
        const createdinstitution = new Institution({
            institution
        })
        const addedinstitution = await createdinstitution.save();
        res.status(201).json({
            message : 'New institution successfully added',
            addedInstitution :addedinstitution
        })
    }
    catch(err) {
        res.status(500).json({
            error : err.message
        })
    }
}

exports.get_institutions = async ( req, res, next) => {
    try{
        const extractedinstitution = await Institution.find()
        res.status(200).json({
            message : "Institutions successfully fetched",
            extractedInstitution : extractedinstitution
        })
    }
    catch(err) {
        res.status(500).json({
            error : err.message
        })
    }
}

exports.delete_institutions = async ( req, res, next) => {
    try{
        await Institution.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message : 'Institution successfully deleted'
        })
    }
    catch(err) {
        res.status(500).json({
            error : err.message
        })
    }
}

exports.update_institutions = async ( req, res, next) => {
    try{
        await Institution.findByIdAndUpdate(req.params.id, {$set:{
            institution : req.body.institution
        }})
        res.status(200).json({
            message : 'Institution successfully updated'
        })
    }
    catch(err) {
        res.status(500).json({
            error : err.message
        })
    }
}