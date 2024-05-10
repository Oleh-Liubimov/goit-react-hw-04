/* eslint-disable react/prop-types */
export default function GalleryCard({ data: { urls, likes }, onImgClick }) {
  return (
    <div>
      <img
        src={urls.small}
        className="w-96 h-52 rounded-lg block object-cover hover:scale-105"
        onClick={() => onImgClick(urls.regular)}
      />
      <p className="text-center font-mono text-lg font-bold">Likes: {likes}</p>
    </div>
  );
}