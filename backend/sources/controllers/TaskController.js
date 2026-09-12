import CreateTaskService from "../services/CreateTaskService";

class TaskController {

    async store (req, res) {

        const { task } = req.body;
        const userId = req.userId;

        try {

            const newTask = await CreateTaskService.execute({
                task,
                userId
            })

            return res.status(201).json(newTask);

        } catch (error) {
            
            return res.status(400).json({
                error: error.message
            })

        }

    }

}

export default new TaskController();