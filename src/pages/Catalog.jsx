import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { catagories } from '../services/api';
import  getCatalogaPageData  from '../services/operations/pageAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import CourseCard from '../components/core/Catalog/Course_Card';
import "./Catalog.css"



const Catalog = () => {
  const {catalogName} = useParams();
  const [catalogPageData, setCatalogPageData]=useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(1);

  useEffect(()=>{
    const getCategories = async() => {
      const result = await apiConnector("GET",catagories.CATAGORIES_API);
      //fetch selected catagory id
      const category_id = result?.data?.data?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
      setCategoryId(category_id);
    }
    getCategories();
  },[catalogName]);

  useEffect(()=>{
    const getCategoryDetails = async() => {
      try{
        const res=await getCatalogaPageData(categoryId);
        console.log("Printing res: ", res);
        setCatalogPageData(res);
      }catch(error){
        console.log(error);
      }
    }

    if(categoryId){
      getCategoryDetails();
    }
  },[categoryId]);





  return (
    <div className="catalog-page">
      <div className='catalog-header-cont'>
        <div className="catalog-header">
          <p className="catalog-breadcrumb">
            {`Home / Catalog /`}
            <span>{catalogPageData?.data?.allCourses?.name}</span>
          </p>
          <p className="catalog-title">{catalogPageData?.data?.allCourses?.name}</p>
          <p className="catalog-description">{catalogPageData?.data?.allCourses?.description}</p>
        </div>
      </div>



        {/* sec-1 */}
      <div className="catalog-section">
        <div className="section-heading">Courses to get you started</div>
        <div className="catalog-tabs">
          <p className={`catalog-tab ${active === 1 ? "catalog-tab-active" : ""}`}
             onClick={() => setActive(1)}
          >
            Most Popular
          </p>            
          <p className={`catalog-tab ${active === 2 ? "catalog-tab-active" : ""}`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div className="course-slider-container">
          <CourseSlider Courses={  active === 1 ?
            catalogPageData?.data?.allCourses?.course :
            [...catalogPageData?.data?.allCourses?.course].reverse()
          }/>
        </div>
      </div>

      {/* sec-2 */}
      <div className="catalog-section">
        <p className="section-heading">Top Courses in {catalogPageData?.data?.differentCategory?.name}</p>
        <div className="course-slider-container">
          <CourseSlider Courses={catalogPageData?.data?.differentCategory?.course} />
        </div>
      </div>

      {/* sec-3 */}
      <div className="frequently-bought-section">
        <div  className="CFBsection-heading">Frequently Bought</div>
        <div className="frequently-bought-grid" >
          {
            catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course,index)=>(
              <CourseCard course={course} key={index} />
            ))
          }
        </div>
      </div>


      <Footer />
    </div>
  )
}

export default Catalog
