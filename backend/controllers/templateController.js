const { default: mongoose } = require('mongoose')
const Template = require('../models/templateModel')

// get all
const getTemplates = async (req, res) => {
    const templates = await Template.find({})

    res.status(200).json(templates)
}

// get using filter
const getTemplate = async (req, res) => {
    const { id } = req.params

    const template = await Template.findById(id)

    if (!template) {
        return res.status(404).json({ error: 'Not found' })
    }

    res.status(200).json(template)
}

// create 
const createTemplate = async (req, res) => {
    const { 
        templateName, 
        templateEmail, 
        templatePassword, 
        templatePhone 
    } = req.body

    try {
        const template = await Template.create({ 
            templateName, 
            templateEmail, 
            templatePassword, 
            templatePhone 
        })
        res.status(200).json(template)
    } 
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete
const deleteTemplate = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No data found'})
    }

    try {
        const template = await Template.findOneAndDelete({ _id: id })

        if(!template) {
            return res.status(404).json({ error: 'No data found'})
        }

        res.status(200).json(template)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// update
const updateTemplate = async (req, res) => {
    const { toBeUpdatedTemplateId } = req.params

    if(!mongoose.Types.ObjectId.isValid(toBeUpdatedTemplateId)) {
        return res.status(404).json({ error: 'No data found'})
    }

    try {
        const template = await Template.findOneAndUpdate(
            { _id: toBeUpdatedTemplateId }, 
            { ...req.body })

        if(!template) {
            return res.status(404).json({ error: 'No data found'})
        }

        res.status(200).json(template)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    getTemplates,
    getTemplate,
    createTemplate,
    deleteTemplate,
    updateTemplate
}