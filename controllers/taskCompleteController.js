const Tasks = require('../model/Tasks');
const userData = require('../model/User');

const setTaskCompleted = async (req, res) => {

        if (!req?.body?.taskId) {
            return res.status(400).json({ 'message': 'ID parameter is required.' });
        }
    
        const allTasks = await Tasks.findOne({ _id: req.body.taskId }).exec();
        const user = await userData.findOne({ _id: req.userId }).exec();
        
        if (!allTasks) {
            return res.status(204).json({ "message": `No task matches ID ${req.body.taskId}.` });
        }
        // if (req.body?.taskId) allTasks.firstname = req.body.firstname;
        if (req.body?.points) user.points = Number( user?.points + req.body?.points )
        if (req.body?.taskId) allTasks.userCompleted = [...allTasks.userCompleted, req?.userId]

        const result = await user.save();
        const taskResult = await allTasks.save();
        res.status(200).json(result);

}

module.exports = { setTaskCompleted }
