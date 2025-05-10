const Category=require("../models/category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

exports.createCategory = async(req,res) => {
    try{
        //fetch data
        const {name,description}=req.body;
        //validation
        if (!name){
            return res.status(400).json(
                {
                    success:false,
                    message:"All fileds are required"
                }
            )
        }
        //create entry in db
        const catDetails= await Category.create(
            {
                name:name,
                description:description
            }
        )
        console.log(catDetails);

        return res.status(200).json(
            {
                success:true,
                message:"Categorys created successfully"
            }
        )
        
        
    }catch(err){
        return res.status(500).json(
            {
                success:false,
                message:err.message
            }
        )
    }
}


exports.showAllCategories = async(req,res) => {
    try{
        console.log("INSIDE SHOW ALL CATEGORIES");
        const allCategories = await Category.find({});
        // {name:true,description:true}
        console.log("categories...",allCategories);
        return res.status(200).json(
            {
                success:true,
                data:allCategories,
                message:"All Categorys returned successfully"
            }
        )        

    }catch(err){
        return res.status(500).json(
            {
                success:false,
                message:err.message
            }
        )

    }
}



exports.categoryPageDetails = async (req, res) => {
	try {
		//get category id
        console.log("req body", req.body);
        const {catId }= req.body;
        //fetch all courses
        const allCourses = await Category.findById(catId)
        .populate(
            {
                path:"course",
                match:{
                    status:"Published"
                },
                populate: "ratingAndReview",
            }
        )
        .exec();
        console.log("selected catagory..", allCourses);

        //validation
        if(!allCourses){
            console.log("Category not found.");
            return res.status(404).json(
                {
                    success:false,
                    message:"Category not found"
                }
            )
        }

        // Handle the case when there are no courses
        if(allCourses.course.length === 0){
            console.log("No courses found for the selected category.")
            return res.status(404).json({
              success: false,
              message: "No courses found for the selected category.",
            })
        }


        //diff category

        const diffCat = await Category.find(
            {_id:{$ne: catId}}
        );

        let differentCategory = await Category.findOne(
            diffCat[getRandomInt(diffCat.length)]._id
        ).populate(
            {
                path:"course",
                match:{ status : "Published"},
            }
        ).exec();

        const allCategories = await Category.find()
        .populate(
            {
                path:"course",
                match:{ status : "Published"},
            }
        ).exec();

        const allCourse = allCategories.flatMap((category)=>category.course);
        const mostSellingCourses = allCourse .sort((a,b)=>b.sold - a.sold).slice(0,10);

        return res.status(200).json(
            {
                success:true,
                data:{
                    allCourses,
                    differentCategory,
                    mostSellingCourses
                }
            }
        )

        
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
}; 