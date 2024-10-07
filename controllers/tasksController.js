const Tasks = require('../model/Tasks');
const TaskData = require('../model/TaskData');

const getAllTasks = async (req, res) => {
    const allTasks = await Tasks.find();
    if (!Tasks) return res.status(204).json({ 'message': 'No Tasks found.' });

    const refactored = allTasks.map((task, i) => ({...task._doc, id: i+1, userCompleted:  task._doc.userCompleted.length}))
    res.status(200).json(refactored);
}

const getAllTasksBycategory = async (req, res) => {

    const category = req.params.categoryName;
    const taskInCategory = await Tasks.find({category: category});
    if (!taskInCategory) return res.status(204).json({ 'message': 'No Tasks found in this category.' });

    const refactoredTaskInCategory = await taskInCategory.map(task => ({...task._doc, userCompleted:  task.userCompleted.includes(req.userId) }))
    res.status(200).json(refactoredTaskInCategory);
}

const getSingleTask = async (req, res) => {
    const taskId = req.params.taskId 
    const taskInCategory = await Tasks.findOne({_id: taskId});
    const userTaskActions = (await TaskData.find({ taskId: taskId, userId: req.userId }));
    if (!taskInCategory) return res.status(204).json({ 'message': 'This task is no longer availaible' });

    const refactoredTaskInCategory = await {...taskInCategory._doc, userCompleted:  taskInCategory._doc.userCompleted.includes(req.userId) }
    // console.log(userTaskActions[0].content[0].content)
    res.json({ singleTaskData: refactoredTaskInCategory, userTaskActions: userTaskActions });
}


const updateTask = async (req, res) => {
    if (!req?.body?.taskId) {
        return res.status(400).json({ 'message': 'task ID is required.' });
    }

    const task = await Tasks.findOne({ _id: req.body.taskId }).exec();

    if (!task) {
        return res.status(204).json({ "message": `No task matches ID ${req.body.taskId}.` });
    }

    if (req.body?.title) task.title = req.body.title;
    if (req.body?.category) task.category = req.body.category;
    if (req.body?.description) task.description = req.body.description;
    if (req.body?.points) task.points = req.body.points;

    await task.save();
    
    const allTasks = await Tasks.find();
    const refactored = allTasks.map((task, i) => ({...task._doc, id: i+1, userCompleted:  task._doc.userCompleted.length}))
    res.status(201).json(refactored);
}

const addTask = async (req, res) => {

    if (!req?.body?.title || !req?.body?.category || !req?.body?.description) {
        return res.status(400).json({ 'message': 'All field most be filled' });
    }

    try {
        const result = await Tasks.create({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            points: req.body.points
        });

        const allTasks = await Tasks.find();
        const refactored = allTasks.map((task, i) => ({...task._doc, id: i + 1, userCompleted:  task._doc.userCompleted.length}))
        res.status(201).json(refactored);

    } catch (err) {
        console.error(err);
    }

}

const deleteTask = async (req, res) => {
    if (!req?.body?.taskId) return res.status(400).json({ 'message': 'You need to select a task' });

    const task = await Tasks.findOne({ _id: req.body.taskId }).exec();
    if (!task) {
        return res.status(204).json({ "message": `No task matched ID ${req.body.taskId}.` });
    }
    
    // if (!result) return res.status(204).json({ "message": `No task matched ID ${req.body.taskId}.` });
    try {
        const result = await task.deleteOne(); 
        const allTasks = await Tasks.find();
        const refactored = allTasks.map((task, i) => ({...task._doc, id: i + 1, userCompleted:  task._doc.userCompleted.length}))
        res.status(201).json(refactored);

    } catch (err) {
        console.error(err);
    }

}



module.exports = {
    addTask,
    getAllTasks,
    getAllTasksBycategory,
    updateTask,
    getSingleTask,
    deleteTask
}