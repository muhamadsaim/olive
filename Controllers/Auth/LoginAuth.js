const loginUser = require('../../Models/Auth/Signup')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config();

const loginAuth = async (req,res) => {
    try {
        const { phone, password } = req.body;
        if (!phone || !password) {
            res.status(400).json({message:'Phone and Password both are required'})
        }

        const validUser = await loginUser.findOne({ phone });
        if (!validUser) {
            return res.json({message:'User Not Exits'})
        } else {
            const checkPassword = bcrypt.compareSync(password, validUser.password);
            if (checkPassword) {
                const authToken = jwt.sign({ userId: validUser._id },process.env.secretKey);
                res.json({ success: true, authToken, validUser, message: 'User Verified' });
            } else {
                res.json({success:false,message:'Invalid Credentials'})
            }
        }

    } catch (error) {
        res.status(500).json({message:'user not found'})
    }
}

module.exports=loginAuth