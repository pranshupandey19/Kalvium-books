import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserdata } from '../utils/redux/action';
import loading from "../assets/book-loader.gif";

const Books = () => {
  // Selectors to access state variables
  const books = useSelector((data) => {
    return data.books;
  });
  const search = useSelector((search) => {
    return search.search;
  });

  // Redux dispatch hook
  const dispatch = useDispatch();
  let savedData = JSON.parse(localStorage.getItem("data"));

  // Fetch data from API when component mounts
  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: { 'Authorization': 'whatever-you-want' }
    })
    .then((res) => {
      const data = res.data.books;
      dispatch(fetchUserdata(data)); // Dispatch fetched data to Redux store
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  // Handle opening preview link in a new tab/window
  const handlePreview = (e) => {
    window.open(e);
    console.log(e);
  };

  // Filter books based on search query
  const filteredBooks = books.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));
  const isBooksFound = filteredBooks.length > 0; // Check if books are found after filtering

  return (
    <div>
      {/* Conditionally render message if user needs to register */}
      {savedData != null ? "" : (<div className="absolute">Please register to view the books</div>)}

      <div className={`${savedData != null ? "" : "books-container"}`}>
        {books.length !== 0 ? ( // Check if books exist in Redux store
          <>
            {isBooksFound ? (
              <div id='grid'>
                {/* Display filtered books */}
                {filteredBooks.map((e) => (
                  <div id='grid-boxes' key={e.id} onClick={() => {
                    handlePreview(e.previewLink);
                  }}>
                    <div id="image">
                      <img src={e.imageLinks.thumbnail} alt={`Thumbnail of ${e.title}`} />
                    </div>
                    <div id='title'>{e.title}</div>
                    <div id='rating'>
                      <span>⭐ {e.averageRating ? e.averageRating : "4.3"}</span> <span style={{ color: 'green' }}>Free</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div id='no-books-found'>This Book Is Not Available!</div>
            )}
          </>
        ) : (
          // Display loading GIF when books are being fetched
          <div id='loading'>
            <img src={loading} alt="Loading..." width={"100vmax"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
