import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar"
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import Error from "../Error/Error";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImagesWithQuery } from "../../search-api";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { perPage } from "../../search-api";




function App() {

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [page,setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("")

  useEffect(() => {
    if (!query) return;
    async function fetchImages() {
      try {
        setLoading(true);
        setError(false)
        const data = await fetchImagesWithQuery(query, page);
        if (data.data.total === 0) {
          setError(true);
        }
        if (page > Math.ceil(data.data.total_pages / perPage)) {
          const endOfCollection = () =>
            toast("Sorry, but you've reached the end of search results");
          endOfCollection()
          return
        }
          setImages((i) => [...i, ...data.data.results]);       
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    
    }
    fetchImages()
  
    
  }, [page,query])
  



  const handleSearch = () => {
      setImages([]);
      setPage(1);
    }
  
  const handleAddSearch =  () => {
      setPage(page + 1)

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
