const express = require('express');
const router = express.Router();
router.use(express.json());

const mongoose = require('mongoose');
const {z, success} = require('zod');
const Sheet = require('../models/Sheet.js');
const Section = require('../models/Section.js');
const User = require('../models/User.js');
const Subsection = require('../models/Subsection.js');

const USER_NOT_FOUND = "User not found !!";
const NO_SHEET_PRESENT = "No sheet present for this user";
const SHEET_NOT_FOUND = "Sheet Not Found !!";


const questionShema = z.object({
    userId:z.string().trim().min(1),
    sheetId:z.string().trim().min(1),
    sectionId:z.string().trim().min(1),
    questionObj:z.object({
        questionName:z.string().trim().min(1),
        questionLink:z.string().trim().min(1),
        difficulty: z.enum(["Easy", "Medium", "Hard"]),
        markForRevision:z.boolean(),
        markCompleted:z.boolean(),
    })
})



const sheetSchema = z.object({
    sheetName:z.string().min(3),
    createdBy:z.enum(["User","Admin","ViewOnly"]),
    section:z.array( 
        z.object({
            subsectionName:z.string(),
            subsection:z.array(
                z.object({
                    questionName: z.string().min(1),
                    questionLink: z.string().min(1),
                    difficulty: z.enum(["Easy", "Medium", "Hard"]),
                    markForRevision: z.boolean(),
                    markCompleted: z.boolean(),
                })
            ).min(1),
        })
    ).min(1),
})

async function addQuestionToSubSection(userId,sheetId,sectionId,questionObj) {
     try {
            const session = await mongoose.startSession();
            session.startTransaction();
            const userObj = await User.find({_id:userId}).session(session);
            if(!(userObj?.length)){
                throw new Error(USER_NOT_FOUND);
            }

            // console.log(userObj[0].availableSheets,"---",sheetId,"---");
            const isSheetPresent = userObj[0].availableSheets.some((sheet)=>{
                // console.log(sheet.length,"----",sheetId.length,"----");
               return sheet===sheetId});
                console.log("isSheetPresent",isSheetPresent);
            if(!(isSheetPresent)){
                throw new Error(NO_SHEET_PRESENT);
            }

            const sheetObj = await Sheet.find({_id:sheetId}).session(session);
            if(!(sheetObj?.length)){
                  throw new Error(NO_SHEET_PRESENT);
            }

            const sectionObj =  sheetObj[0].section.find((section)=>section.equals(sectionId))
            console.log(sectionId,"---",sectionObj,"---",sheetObj[0].section);
            if(!(sectionObj)){
                  throw new Error(NO_SHEET_PRESENT);
            }

         const subsectionQuestion =  await Subsection.create([questionObj],{session});
          console.log(sectionObj._id,"sectionObj", subsectionQuestion," subsectionQuestion._id");
         const updateResult = await Section.updateOne(
                { _id: sectionObj },
                { $push: { subsection: subsectionQuestion[0]._id } },
                { session }
                );
        console.log(updateResult); // { acknowledged: true, modifiedCount: 1, ... }

          await session.commitTransaction();
          session.endSession();
           
           return "SUCCESS";
     }  
     catch(error){
        console.log("something went wrong while adding question to subsection",error);
         await session.abortTransaction();
        session.endSession();
        return "FAILURE";
     }
}

 async function addSheetToDB(sheet,userId){

    console.log(sheet,"sheet",userId,"userId",typeof userId);
      try {
            const sheetDBobj = await Sheet.find({sheetName:sheet.sheetName});
            
        if(!(sheetDBobj?.length)){
            const sectionIdArray = await Promise.all(sheet.section.map(async (section) => {
                const questionIdArray = await Promise.all(section.subsection.map(async (question) => {
                    console.log(question,"question");
                    const questionId =  await Subsection.create(question);
                    return questionId._id;
                }));

                const sectionId =  await Section.create({subsectionName:section.subsectionName,
                    subsection: questionIdArray,
                });
                return sectionId._id;
            }));

            console.log(sectionIdArray,"sectionIdArray");
            const sheetId =  await Sheet.create({sheetName:sheet.sheetName,
                    section: sectionIdArray,
                    createdBy:sheet.createdBy,
                });


            if(userId?.length){
                const userSheetUpdated = await User.findByIdAndUpdate(
                        userId,
                        { $push: { availableSheets: sheetId._id } },
                        { new: true }
                        );

                console.log(userSheetUpdated,"userSheetUpdated");
            }                

             return "SUCCESS";
        }    
       return "Sheet Already Present With This Name";
    } catch (error) {
        console.log(error);
        return "FAILURE";
    }  
}

router.use(express.json());
router.post('/addSheet',async (req,res,next)=>{
    try{
            console.log("inside admin addsheet",req.body);
            const sheet =req.body.sheet;
            const userId = req.body.userId;
            const sheetSchemaValidate = sheetSchema.safeParse(sheet);

            if(!sheetSchemaValidate.success){
                 console.log(sheetSchemaValidate.error);
                return res.status(400).json({
                    success:false,
                    data:sheetSchemaValidate.error.issues[0].message,
                });
            }

            const entry = await addSheetToDB(sheet,userId);

            if(entry === 'SUCCESS'){
                 return res.status(200).json({
                    success:true,
                    data:sheetSchemaValidate.data,
                });
            }
            else{
                return res.status(500).json({
                    success:false,
                    data:entry,
                });
            }
    }
    catch(error){
        console.log("someting went wrong while adding sheet !!",error);
         return res.status(500).json({
            success:false,
            data:"Something went wrong",
        });
    }

})


router.post('/addQuestion',async function(req,res){
    
    try {
            const ZodRequest = questionShema.safeParse(req.body);

            if(!ZodRequest.success){
                console.log(ZodRequest.error);
                return res.status(400).json({
                    success:false,
                    data: ZodRequest.error.issues[0],
                })
            }
            const {userId,sheetId,sectionId,questionObj} = ZodRequest.data;
            const response = await addQuestionToSubSection(userId,sheetId,sectionId,questionObj)

            if(response === "SUCCESS"){
                return res.status(200).json({
                    success:true,
                    data: "Successfully Able to Add Question to Subsection !!",
                })
            }
            else{
                console.log(response,"in add question");
                return res.status(400).json({
                    success:false,
                    data: "Failed to Add Question to Subsection !!",
                })
            }        
    } catch (error) {
         console.log(error,"in add question");
                return res.status(500).json({
                    success:false,
                    data: "Failed to Add Question to Subsection !!",
         })
    }

})


module.exports = router;