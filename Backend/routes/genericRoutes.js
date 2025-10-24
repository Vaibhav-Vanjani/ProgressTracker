const express = require('express');
const router = express.Router();
const Sheet = require('../models/Sheet.js');
const {z, email, success} = require('zod');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "123456";
const bcrypt = require('bcrypt');
const User = require('../models/User.js');

const userSignUpSchema = z.object({
    firstName:z.string().trim(),
    lastName:z.string().trim(),
    phoneNumber:z.number().min(10),
    email:z.email().trim(),
    password:z.string(),
})

const userLoginSchema = z.object({
    email:z.email().trim(),
    password:z.string(),
})

router.use(express.json());

router.get('/signup',async function(req,res){
    try {
        const isZodVerified = userSignUpSchema.safeParse(req.body);
    
        if(!isZodVerified.success){
            res.status(500).json({
                success:false,
                data:isZodVerified?.error?.issues[0],      
            })
        }

        isZodVerified.data.isAdmin = false;

        console.log(isZodVerified.data);

        const isUserPresent = await User.find({email:isZodVerified.data.email});
        console.log(isUserPresent,"isUser");
        if(isUserPresent?.length){
            return res.status(500).json({
                success:false,
                data:"User already Present",      
            })
        }

        const hashedPassword = await bcrypt.hash(isZodVerified.data.password,10);
        isZodVerified.data.password = hashedPassword;

        await User.create(isZodVerified.data);

        const token = jwt.sign(isZodVerified.data,JWT_SECRET);

        res.status(200).cookie('token', token , {
            httpOnly: true,
            secure: true,
            maxAge: 3600000, // 1 hour
            sameSite: 'Strict',
        }).json({
            success:true,
            data:token,
            body:isZodVerified.data,
        });
    } catch (error) {
        console.log(error,"Error in Signing Up");
         res.status(500).json({
            success:false,
            data:"Internal Server Error",
        });
    }
    
})

router.get('/login',async function(req,res){
    try {
    const isZodVerified = userLoginSchema.safeParse(req.body);
        
    console.log(isZodVerified,"/login");
        if(!isZodVerified.success){
            return res.status(500).json({
                success:false,
                data:isZodVerified?.error?.issues[0],      
            })
        }

        isZodVerified.data.isAdmin = req.originalUrl?.includes('Admin') ?? false;

        console.log(isZodVerified.data);

        const isUserPresent = await User.find({email:isZodVerified.data.email,isAdmin:isZodVerified.data.isAdmin});
        console.log(isUserPresent,"isUser");
        if(!(isUserPresent?.length)){
            return res.status(400).json({
                success:false,
                data:"User Not Present",      
            })
        }

        const isCorrectPassword = await bcrypt.compare(isZodVerified.data.password,isUserPresent[0]?.password);

        if(!isCorrectPassword){
             return res.status(400).json({
                success:false,
                data:"Incorrect Credentials",      
            })
        }

        isZodVerified.data.password = isUserPresent.password;

        const token = jwt.sign(isZodVerified.data,JWT_SECRET);

        res.status(200).cookie('token', token , {
            httpOnly: true,
            secure: true,
            maxAge: 3600000, // 1 hour
            sameSite: 'Strict',
        }).json({
            success:true,
            data:token,
            body:isZodVerified.data,
        });
    } catch (error) {
        console.log(error,"Error in Signing Up");
         res.status(500).json({
            success:false,
            data:"Internal Server Error",
        });
    }
     
})

router.get('/logout',function(req,res){
    
})

router.get('/sheet',async function(req,res){

    const viewOnlySheet = await Sheet.find({createdBy:"ViewOnly"}).populate({
        path:"section",
        populate:{
             path:"subsection",
        }
    });

    if(!viewOnlySheet?.length){
        return res.status(500).json({
            success:false,
            data: "No Sheets available !!",
        })
    }

   return res.status(200).json({
        success:true,
        data: viewOnlySheet,
    })
})

module.exports = router;