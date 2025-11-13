import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useAppContext } from "../../provider/AppProvider";
import Footer from "../../components/Footer/Footer";
import {
  Col,
  Container,
  FormGroup,
  Row,
  Form,
  Button,
  Card,
  Pagination,
} from "react-bootstrap";
import BookCard from "../../components/CardItem/BookCard";
import Paginationbook from "../../components/pagination/Paginationbook";

const Categories = () => {
  const { books, setbooks, categories, setCategories, addtoCart, user } =
    useAppContext();

  const [selectedCategories, setSelectedCategories] = useState([]);
  console.log("books: ", books);
  console.log("categories: ", categories);
  console.log("Current user: ", user); // Debug user
  console.log("addtoCart function: ", addtoCart); // Debug function

  const itemsPerPage = 12;
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedSort, setSelectedSort] = React.useState("default");

  const filterBooks =
    selectedCategories.length === 0
      ? books
      : books.filter((book) => selectedCategories.includes(book.categoryId));

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  const sortBooks =
    selectedSort === "default"
      ? filterBooks
      : [...filterBooks].sort((a, b) => {
          if (a.price < b.price) return selectedSort === "price-asc" ? -1 : 1;
          if (a.price > b.price) return selectedSort === "price-asc" ? 1 : -1;
          return 0;
        });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortBooks.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="Categories">
      <Navbar />
      <Row className="mt-4 mb-5">
        <Col
          className="Filter"
          sm={3}
          style={{
            paddingLeft: "130px",
          }}
        >
          <Card
            className="p-3 shadow-sm rounded-4"
            style={{ width: "100%", maxWidth: 300 }}
          >
            <h4>Filters</h4>
            <div>
              <h5 className="mb-3 mt-3">Genre</h5>
              {categories &&
                categories.map((category) => (
                  <Form.Check
                    checked={selectedCategories.includes(category.id)}
                    label={category.name}
                    type="checkbox"
                    key={category.id}
                    onChange={(e) => handleCategoryChange(category.id)}
                  ></Form.Check>
                ))}
              <h5 className="mb-3 mt-3">Sort by</h5>
              <Form.Select onChange={(e) => setSelectedSort(e.target.value)}>
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </Form.Select>
              <Button
                onClick={() => setSelectedCategories([])}
                className="mt-3"
                style={{
                  width: "100%",
                  margin: "20px 0px",
                  backgroundColor: "#E53935",
                  border: "none",
                }}
              >
                Clear All
              </Button>
            </div>
          </Card>
        </Col>
        <Col
          className="Book-list"
          sm={9}
          style={{
            paddingRight: "130px",
          }}
        >
          <Row>
            {currentItems &&
              currentItems.map((book) => (
                <Col className="mb-4" lg={3} key={book.id}>
                  <BookCard
                    image={book.image}
                    title={book.title}
                    author={book.author}
                    price={book.price + "$"}
                    buttonText="Add to Cart"
                    onButtonClick={() => {
                      console.log("Button clicked for book:", book.id);
                      addtoCart(book.id);
                    }}
                  ></BookCard>
                </Col>
              ))}
          </Row>
          <Paginationbook
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default Categories;
