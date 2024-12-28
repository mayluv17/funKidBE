const TaskData = require('../model/TaskData');

const createNewData = async (req, res) => {
    if (!req?.body?.text || !req.body.taskId) {
        return res.status(400).json({ 'message': 'First and last names are required' });
    }

    try {
        const result = await TaskData.create({
            taskId: req.body.taskId,
            content: { type: "text", content: req.body.text },
            userId: req.userId
        });

    res.status(201).json({ response:'ok', 'message': 'data uploaded', 'data': result._doc });
    } catch (err) {
        console.error(err);
    }
}

module.exports = { createNewData }
