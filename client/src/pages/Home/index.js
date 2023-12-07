import { Col, message, Row, Table, Badge } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteBook, GetAllBooks } from "../../apicalls/books";
import Button from "../../components/Button";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { SearchBooksByTerm } from "../../apicalls/books";

function Home() {
  const [books, setBooks] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBooks();
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleSearch = async () => {
    try {
      dispatch(ShowLoading());
      const response = await SearchBooksByTerm(searchTerm);
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);
  return (
    <div className="mt-2">
      <h1 style={{ margin: "10px", fontSize: "32px" }}>
        What are you looking for?
      </h1>
      <div className="flex ">
        <input
          style={{
            border: "solid 1px",
            borderRadius: "10px",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            marginBottom: "30px",
            width: "100%",
            height: "40px",
            borderRight: "none",
          }}
          type="text"
          label="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="search books by title, author, category"
        ></input>
        <button
          style={{
            background: "green",
            color: "white",
            cursor: "pointer",
            width: "100px",
            height: "41.5px",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            borderLeft: "none",
            border: "1px",
          }}
          type="submit"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <Row gutter={[16, 16]}>
        {books.map((book) => {
          return (
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              key={book._id}
              onClick={() => navigate(`/book/${book._id}`)}
            >
              <Badge.Ribbon
                text={book.availableCopies > 0 ? "Available" : "Not Available"}
                color={book.availableCopies > 0 ? "green" : "red"}
              >
                <div className="rounded bg-white p-2 shadow flex flex-col gap-1">
                  <img src={book.image} height="350px" />
                  <h1 className="text-md text-secondary uppercase font-bold mt-2">
                    {book.title}
                  </h1>
                </div>
              </Badge.Ribbon>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Home;
