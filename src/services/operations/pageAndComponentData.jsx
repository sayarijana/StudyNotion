import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../api";

const getCatalogaPageData = async(catId)=>{
    const toastId=toast.loading("Loading....");
    let result=[];
    console.log("inside getCatalogaPageData func... before call ");
    try{
        const response = await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,
            {catId:catId}
        );
        if(!response?.data?.success){
            throw new Error("Could not Fetch Category page data");
        }
        result = response?.data;
    }catch(error){
        console.log("CATALOG PAGE DATA API ERROR....",error);
        toast.error(error.message);
        result = error?.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}

export default getCatalogaPageData;