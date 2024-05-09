import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar"
import Loader from "../Loader/Loader";
import { Toaster } from "react-hot-toast";
import Error from "../Error/Error";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImagesWithQuery } from "../../search-api";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};



function App() {

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [page,setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);



  const handleSearch = async (query) => {
    try {
      setImages([]);
      setError(false);
      setLoading(true);
      setPage(1)
      const data = await fetchImagesWithQuery(query, page);
      setImages(data.data.results);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
      setError(true)
    } finally {
      setLoading(false)
    }
  }
  
  const handleAddSearch = async () => {
    try {
      setError(false)
      setLoading(true)
      const nextPage = page + 1
      const moreData = await fetchImagesWithQuery(query, nextPage)
      setImages((i) => (
        [...i,...moreData.data.results]
      ))
      setQuery(nextPage)
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false)
    }
  }

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} setWord={setQuery} />
      {loading && <Loader />}
      {error && <Error />}
      {images.length > 0 && (
        <ImageGallery data={images} onOpenModal={handleModalOpen} />
      )}
      {images.length > 0 && <LoadMoreBtn onAddSearch={handleAddSearch} />}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => handleModalOpen(false)}
          style={customStyles}
        >
          {images.map((item) => (
            <img key={item.id} src={item.urls.regular} alt />
          ))}
        </ImageModal>
      )}
      <Toaster />
    </>
  );
}

export default App
