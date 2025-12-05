import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import useAxios from "../../hooks/useAxios";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = () => {
  const axiosInstance = useAxios();
  const [models, setModels] = useState([]);

  useEffect(() => {
    axiosInstance.get("/models").then((data) => {
      setModels(data.data);
    });
  }, [axiosInstance]);

  return (
    <div className="mt-[30px]">
      {models.length > 0 && (
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          infiniteLoop={true}
          interval={6000}
          transitionTime={2000}
        >
          {models.slice(0, 5).map((model) => (
            <div key={model._id}>
              <img className="h-[350px]" src={model.image} alt="" />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Slider;
