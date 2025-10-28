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
    phoneNumber:z.string().min(10),
    email:z.email().trim(),
    password:z.string(),
})

const userLoginSchema = z.object({
    email:z.email().trim(),
    password:z.string(),
})

router.use(express.json());


async function handleSheet(req,res,next){
   
    console.log(req?.cookies?.token,req?.cookies,"::/sheet::");
    if(req?.cookies?.token){
        const token = req?.cookies?.token;
        try {
            const userFromToken = jwt.verify(req?.cookies?.token,JWT_SECRET);
            console.log(userFromToken,"userFromToken");
            if(userFromToken?.userId?.[0]?._id){
                console.log(userFromToken?.userId?.[0]?._id,"handlesheet");
                
                const user = await User.findById(userFromToken?.userId?.[0]?._id);
                console.log(user,"jandle seet user");

                if (!user) {
                    throw new Error("User not found");
                }

                const arrayOfAvailableSheets = await Promise.all(
                user.availableSheets.map(async (sheetId) => {
                    const sheet = await Sheet.findById(sheetId)
                    .populate({
                        path: "section",
                        populate: {
                        path: "subsection"
                        }
                    })
                    .lean(); 
                    return sheet;
                })
            );
            
                    console.log("arrayOfAvailableSheets",arrayOfAvailableSheets);
                userFromToken.availableSheets = arrayOfAvailableSheets;

                return res.status(200).cookie('token', token , {
                    httpOnly: true,
                    secure: false,
                    maxAge: 3600000,
                    sameSite: 'Lax',
                }).json({
                    success:true,
                    userId:userFromToken?.userId,
                    data:userFromToken,
                })
            }
        }
        catch (error) {
            console.log(error,"path ='/' ->",req?.cookies?.token);
        }  
    }

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
        data: {"availableSheets":viewOnlySheet},
    })
}


router.post('/signup',async function(req,res,next){
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

        const viewOnlySheet = await Sheet.find({createdBy:"ViewOnly"});
        console.log("viewOnlySheet",viewOnlySheet);
        if(viewOnlySheet?.length>0){
             isZodVerified.data.availableSheets = viewOnlySheet.map((sheet)=>sheet._id);
        }

        const userObj = await User.create(isZodVerified.data);
        isZodVerified.data.userId = [userObj];
        const token = jwt.sign(isZodVerified.data,JWT_SECRET);

        // res.status(200).cookie('token', token , {
        //     httpOnly: true,
        //     secure: false,
        //     maxAge: 3600000,
        //     sameSite: 'Lax',
        // }).json({
        //     success:true,
        //     data:token,
        //     body:isZodVerified.data,
        // });
        req.cookies = {...req.cookies,
            ["token"]:token,
        }
        next();
    } catch (error) {
        console.log(error,"Error in Signing Up");
         res.status(500).json({
            success:false,
            data:"Internal Server Error",
        });
    }
    
},handleSheet)

router.post('/login',async function(req,res,next){
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

        isZodVerified.data["userId"] = isUserPresent;
        console.log(isUserPresent?.[0],"isUserPresent?.[0]");
        if(isUserPresent?.[0]?.availableSheets?.length){
             isZodVerified.data.availableSheets = isUserPresent?.[0]?.availableSheets;
            console.log(isUserPresent?.[0]?.availableSheets ,"isZodVerified.data.availableSheets ");
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

        req.cookies = {...req.cookies,
            ["token"]:token,
        }
        next();
    } catch (error) {
        console.log(error,"Error in Signing Up");
         res.status(500).json({
            success:false,
            data:"Internal Server Error",
        });
    }
     
},handleSheet)

router.post('/logout',function(req,res,next){
    if(req.cookies)
   { req.cookies.token = null;}
    res.clearCookie("token"); 
    next();
},handleSheet)

router.get('/sheet',handleSheet);

module.exports = router;