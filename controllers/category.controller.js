import categoryModel from "../models/category.model.js";
import slugify from "slugify";

const createCategoryController = async(req, res)=>{


    try{
        const {name} = req.body;
        if(!name){
            return res.status(401).json({
                message:"Name is required",
            })
        }

            const existingCategory = await categoryModel.findOne({name});
            if(existingCategory){
                return res.status(200).json({
                    success:true,
                    message:'Category Already exists',
                })
            }

            const category = await new categoryModel({name, slug:slugify(name)}).save();

            return res.status(201).json({
                success:true,
                message:'New Category Created',
                category,
            })


        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            err,
            message:"Error in Category",
        })
    }

}



const updateCategoryController = async(req, res)=>{
    try{

        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, {
            name, slug:slugify(name), 
        },{
            new:true
        })

        res.status(200).json({
            success:true,
            message:"Category Updated",
            category,
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            err,
            message:"Error in Updating Category",
        })   
    }

}


const categoryController = async(req, res)=>{
    try{
        const category = await categoryModel.find({});

        res.status(200).json({
            success:true,
            message:"All Category List",
            category,
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            err,
            message:"Error in Getting Category",
        })  
    }
}


const getSingleCategoryController = async(req, res)=>{
    try{

        const category = await categoryModel.findOne({slug:req.params.slug})
        
        res.status(200).json({
            success:true,
            message:"Single Category fetched",
            category,
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            err,
            message:"Error in Getting Single Category",
        })  
    }


}




const deleteCategoryController = async(req, res)=>{
    try{
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:"Category Deleted Successfully",
        })
    }

    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            err,
            message:"Error in deleting Category",
        })     
    }


}


export {createCategoryController,updateCategoryController, 
    categoryController,
    getSingleCategoryController,
    deleteCategoryController
};
