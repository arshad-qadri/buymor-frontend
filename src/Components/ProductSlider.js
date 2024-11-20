"use client";
import Image from "next/image";
import React from "react";
import SlickSlider from "./slick-slider/SlickSlider";
import sliderImages from "@/data/sliderImages";

const ProductSlider = () => {
  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <SlickSlider>
        {sliderImages.map((img, ind) => (
          <div key={ind} className="py-4 px-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src={img}
                alt={"Product Image"}
                className=" object-cover"
                width={400}
                height={600}
              />
              {/* <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                <p className="text-gray-700">₹{product.price}</p>
              </div> */}
            </div>
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default ProductSlider;
