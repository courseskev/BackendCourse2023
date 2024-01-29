import userService from '../services/user.service.js'

class UserController{

    async findAllUsers(req,res){
        try {
            const users = await userService.findAllUsers();
            res.status(200).json({ message: "Users", result: users })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async findUserById(req,res){
        const { idUser } = req.params;
        try {
            const user = await userService.findUserById(idUser);
            res.status(200).json({ message: "User: ", user })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async createUser(req, res) {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ message: "Some data is missing" });
        }
        try {
            const createdUser = await userService.createUser(req.body);        
            res.status(200).json({ message: "User created ", user: createdUser })
            //res.redirect(`/home/${createdUser._id}`)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }


    async deleteUser (req, res) {
        const { idUser } = req.params;
        try {
            await userService.deleteUser(idUser);
            res.status(200).json({ message: "User deleted" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

const userController = new UserController();
export default userController;

