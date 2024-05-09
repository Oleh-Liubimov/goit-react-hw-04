/* eslint-disable react/prop-types */

import GalleryCard from "../GalleryCard/GalleryCard"

export default function ImageGallery({data,onOpenModal}) {
    return (
      <ul className="flex flex-wrap gap-5 justify-center w-full p-5">
        {data.map((item) => (
          <li key={item.id} className="">
            <GalleryCard data={item} onOpenModal={onOpenModal} />
          </li>
        ))}
      </ul>
    );
}