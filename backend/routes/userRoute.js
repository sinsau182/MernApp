const express = require("express")
const router = express.Router();
const User = require("../models/userModel")
 
//Crafting Routes
router.post("/", async(req, res) => {
    console.log(req.body);
    const {name,email,age} = req.body;

    try {
        const userData = await User.create({
            name: name,
            email: email,
            age: age
        });
        res.status(201).json(userData);
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message })
    }
    
})

router.get("/", async(req, res) => {

    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }    

})

router.get("/:id", async(req, res) => {
    const {id} = req.params;

    try {
        const singleUser = await User.findById({ _id: id });
        res.status(200).json(singleUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }

})

router.delete("/:id", async(req, res) => {
    const {id} = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete({ _id: id });

        res.status(200).json(`${deletedUser.name} is deleted`);

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }

})

router.patch("/:id", async(req,res) => {
    const {id} = req.params;

    try {
        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new:true
        });
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;