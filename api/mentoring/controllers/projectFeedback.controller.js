const {Feedback} = require("../models/index");
const {ResponseConstants} = require("../constants/ResponseConstants");

const createFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.create(req.body);
        res.status(201).json({...ResponseConstants.Feedback.SuccessCreation, feedback});
    } catch (error) {
        res.status(500).json({...ResponseConstants.Feedback.Error.InternalServerError, error: error.message });
    }
};

const getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findAll();
        res.status(200).json({...ResponseConstants.Feedback.SuccessGet, feedback});
    } catch (error) {
        res.status(500).json({...ResponseConstants.Feedback.Error.InternalServerError, error: error.message });
    }
};

const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id);
        if (!feedback) {
            return res.status(404).json({...ResponseConstants.Feedback.Error.NotFound});
        }
        res.status(200).json({...ResponseConstants.Feedback.SuccessGetById, feedback});
    } catch (error) {
        res.status(500).json({...ResponseConstants.Feedback.Error.InternalServerError, error: error.message });
    }
};

const updateFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id);
        if (!feedback) {
            return res.status(404).json({...ResponseConstants.Feedback.Error.NotFound});
        }
        await feedback.update(req.body);
        res.status(200).json({...ResponseConstants.Feedback.SuccessUpdate, feedback});
    } catch (error) {
        res.status(500).json({...ResponseConstants.Feedback.Error.InternalServerError, error: error.message });
    }
};

const deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id);
        if (!feedback) {
            return res.status(404).json({...ResponseConstants.Feedback.Error.NotFound});
        }
        await feedback.destroy();
        res.status(200).json({...ResponseConstants.Feedback.SuccessDeletion});
    } catch (error) {
        res.status(500).json({...ResponseConstants.Feedback.Error.InternalServerError, error: error.message });
    }
};

module.exports = {
    createFeedback,
    getFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
};