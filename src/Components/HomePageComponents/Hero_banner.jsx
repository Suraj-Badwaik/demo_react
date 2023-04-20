import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../Styles/HeroBanner.css";

const Hero_banner = () => {
  const [homeBannerdata, setHomeBannerData] = useState({});
  const getHomeScreenContent = () => {
    axios
      .get("http://localhost:1337/api/home-page-banner?populate=*", {
        headers: {
          Authorization: "bearer" + process.env.REACT_APP_API_TOKEN,
        },
      })
      .then((res) => {
        console.log("res", res.data.data.attributes);
        setHomeBannerData(res.data.data.attributes);
        console.log("res", homeBannerdata?.bannerImage?.data?.attributes?.url);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    getHomeScreenContent();
  }, []);

  return (
    <>
      <div className="hero_banner_container">
        <img src={`http://localhost:1337${homeBannerdata?.bannerImage?.data?.attributes?.url}`} alt="" />
        <div className="container">
          <div className="bannerText">
            <h1>{homeBannerdata?.bannerText}</h1>
          </div>
          <div>
            {homeBannerdata?.cta && <button className="cta_btn">{homeBannerdata?.cta.lable}</button>}
          </div>
          <div className="ribbons">
            {homeBannerdata?.ribbons?.length > 0 &&
              homeBannerdata.ribbons.map((item, index) => {
                return <button className="ribbon_btn">{item.lable}</button>;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero_banner;
