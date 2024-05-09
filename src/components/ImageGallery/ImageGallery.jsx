/* eslint-disable react/prop-types */

import GalleryCard from "../GalleryCard/GalleryCard"

export default function ImageGallery({ data, onImgClick }) {
  return (
    <ul className="flex flex-wrap gap-5 justify-center w-full p-5">
      {data.map((item) => (
        <li key={item.id} className="">
          <GalleryCard data={item} onImgClick={onImgClick} />
        </li>
      ))}
    </ul>
  );
}