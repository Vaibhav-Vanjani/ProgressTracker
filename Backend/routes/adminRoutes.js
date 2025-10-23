const express = require('express');
const router = express.Router();
router.use(express.json());

const {z, success} = require('zod');
const Sheet = require('../models/Sheet.js');
const Section = require('../models/Section.js');
const Subsection = require('../models/Subsection.js');

const sheetSchema = z.object({
    sheetName:z.string().min(3),
    createdBy:z.enum(["User","Admin","ViewOnly"]),
    section:z.array( 
        z.object({
            subsectionName:z.string(),
            subsection:z.array(
                z.object({
                    questionName: z.string(),
                    questionLink: z.string(),
                    difficulty: z.enum(["Easy", "Medium", "Hard"]),
                    markForRevision: z.boolean(),
                    markCompleted: z.boolean(),
                })
            ),
        })
    ),
})

 async function addSheetToDB(sheet){

    console.log(sheet,"sheet");
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

             return "SUCCESS";
        }    
       return "FAILURE";
    } catch (error) {
        console.log(error);
        return "FAILURE";
    }  
}


router.post('/addSheet',async (req,res,next)=>{
    try{
            console.log("inside admin addsheet");
            const sheetSchemaValidate = sheetSchema.safeParse(req.body);

            if(!sheetSchemaValidate.success){
                return res.status(400).json({
                    success:false,
                    data:sheetSchemaValidate.error.issues[0].message,
                });
            }

            const entry = await addSheetToDB(req.body);

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


router.get('/viewSheet',function(req,res){

})


module.exports = router;