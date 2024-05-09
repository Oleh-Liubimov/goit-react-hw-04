import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar"
import Loader from "../Loader/Loader";
import { Toaster } from "react-hot-toast";
import Error from "../Error/Error";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImagesWithQuery } from "../../search-api";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";




function App() {

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [page,setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("")



  const handleSearch = async (query) => {
    try {
      setImages([]);
      setError(false);
      setLoading(true);
      setPage(1)
      const data = await fetchImagesWithQuery(query, page);
      console.log(data);
      if (data.data.total === 0) {
        setError(true)
      }
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

  const handleImageClick = (imgUrl) => {
    setImgUrl(imgUrl);
    handleModalOpen()
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} setWord={setQuery} />
      {loading && <Loader />}
      {error && <Error />}
      {images.length > 0 && (
        <ImageGallery data={images} onImgClick={handleImageClick} />
      )}
      {images.length > 0 && <LoadMoreBtn onAddSearch={handleAddSearch} />}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => handleModalOpen()}
          imgUrl={imgUrl}
        ></ImageModal>
      )}
      <Toaster />
    </>
  );
}

export default App
