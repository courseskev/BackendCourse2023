import userService from '../services/user.service.js'


class SessionController{

    async forgotPassword(req,res){
        const { email, password, password2 } = req.body
        if (!email || !password || !password2)
            return res.status(400).json({ message: "All fields are mandatory" })
        if (password !== password2)
            return res.status(400).json({ message: "Password doesn't match" })
        try {
            const passwordHashed = await hashData(password)
            const user = await userService.findByEmail(email)
            let result = "";
            if (user) {
                result = await userService.updateProduct(user._id, { password: passwordHashed })
                //console.log("User updated:", result);
                return res.redirect("/views/login")
            }
            else {
                result = "Not user found"
                console.log("Result: ", result);
            }
            return res.redirect("/views/signup")
        } catch (err) {
            res.status(500).json({ Error: err.message })
        }
    }

    async logout(req,res){        
        const githubUser =  await userService.findByEmail("temporalGithub@mail.com") 
        const googleUser =  await userService.findByEmail("temporalGoogle@mail.com") 
        if (githubUser) await userService.deleteUser(githubUser.id)
        if (googleUser) await userService.deleteUser(googleUser.id)
        req.session.destroy(() => {        
            res.redirect("/views/login")
        });
    }

    async request(req, res){
        if(req.session.passport){
            res.send(req.user)
            //console.log("REQUEST:", req);
            //console.log(req.session);
        }
        console.log("No sessoin found");
    }
}

const sessionController = new SessionController();
export default sessionController;