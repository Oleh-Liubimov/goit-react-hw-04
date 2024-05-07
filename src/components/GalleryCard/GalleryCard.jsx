/* eslint-disable react/prop-types */
export default function GalleryCard({ data: { urls, likes } }) {
  return (
    <div>
          <img src={urls.small}
               className="w-96 h-52 rounded-lg block object-cover" />
      <p className="text-center font-mono text-lg font-bold">Likes: {likes}</p>
    </div>
  );
}