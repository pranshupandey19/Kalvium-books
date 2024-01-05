import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserdata } from '../utils/redux/action';
import loading from "../assets/books.gif";

const Books = () => {
  const books = useSelector((data) => {
    return data.books;
  });
  const search = useSelector((search) => {
    return search.search;
  });

  const dispatch = useDispatch();
  let savedData = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: { 'Authorization': 'whatever-you-want' }
    })
    .then((res) => {
      const data = res.data.books;
      dispatch(fetchUserdata(data));
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const handlePreview = (e) => {
    window.open(e);
    console.log(e);
  };

  const filteredBooks = books.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));
  const isBooksFound = filteredBooks.length > 0;

  return (
    <div>
      {savedData != null ? "" : (<div className="absolute">Please register to view the books</div>)}
      <div className={`${savedData != null ? "" : "books-container"}`}>
        {books.length !== 0 ? (
          <>
            {isBooksFound ? (
              <div id='grid'>
                {filteredBooks.map((e) => (
                  <div id='grid-boxes' key={e.id} onClick={() => {
                    handlePreview(e.previewLink);
                  }}>
                    <div id="image">
                      <img src={e.imageLinks.thumbnail} alt={`Thumbnail of ${e.title}`} />
                    </div>
                    <div id='title'>{e.title}</div>
                    <div id='rating'><span>⭐ {e.averageRating ? e.averageRating : "4.3"}</span> <span style={{ color: 'green' }}>Free</span></div>
                  </div>
                ))}
              </div>
            ) : (
              <div id='no-books-found'>This Book Is Not Available!</div>
            )}
          </>
        ) : (
          <div id='loading'>
            <img src="https://im2.ezgif.com/tmp/ezgif-2-16583eb875.gif" alt="Loading..." width={"100vmax"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
