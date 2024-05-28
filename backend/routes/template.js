const express = require('express')
const { 
    getTemplates,
    getTemplate,
    createTemplate,
    deleteTemplate,
    updateTemplate
} = require('../controllers/templateController')


const router = express.Router()

router.get('/getAllTemplates', getTemplates)

router.get('/getTemplateById/:id', getTemplate)

router.post('/createTemplate/', createTemplate)

router.delete('/deleteTemplate/:id', deleteTemplate)

router.patch('/updateTemplate/:toBeUpdatedTemplateId', updateTemplate)

module.exports = router 