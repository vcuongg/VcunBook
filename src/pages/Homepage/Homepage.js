import React from "react";
import "./Homepage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import BookCard from "../../components/CardItem/BookCard";
import { Link } from "react-router-dom";
import { useAppContext } from "../../provider/AppProvider";

const Homepage = () => {
  const { books, addtoCart } = useAppContext();

  const featuredBooks =
    books
      ?.filter((book) => ["1", "2", "3", "4"].includes(book.id))
      .slice(0, 4) || [];

  return (
    <div className="homepage">
      <Navbar />
      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center g-4">
            {/* Hero Content */}
            <div className="col-lg-6">
              <h1 className="hero-title display-3 fw-bold text-white mb-4">
                Discover Books
                <br />& Ignite Your Imagination
              </h1>
              <p className="hero-description fs-5 text-white mb-4">
                Let great stories guide you to new worlds every single day.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <button className="btn btn-light btn-lg custom-btn-primary">
                  <Link
                    to="/Categories"
                    className="text-decoration-none link-dark"
                  >
                    Browser Books
                  </Link>
                </button>
                <button className="btn btn-outline-light btn-lg custom-btn-secondary">
                  Learn More
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="col-lg-6">
              <div className="hero-image">
                <img
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop"
                  alt="Library bookshelf"
                  className="img-fluid rounded shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="Categories text-center py-5">
        <div className="container">
          <h2 class="fw-bold mb-4 link-title">Categories</h2>
          <div className="row">
            <div className="col">
              <div className="category-item">
                <div className="category-item-icon">
                  <i className="bi bi-heart-fill"></i>
                </div>
                <p>Romance</p>
              </div>
            </div>
            <div className="col">
              <div className="category-item">
                <div className="category-item-icon">
                  <i className="bi bi-rocket-takeoff-fill"></i>
                </div>
                <p>Sci-fi</p>
              </div>
            </div>
            <div className="col">
              <div className="category-item">
                <div className="category-item-icon">
                  <i className="bi bi-bi bi-binoculars-fill"></i>
                </div>
                <p>Mystery</p>
              </div>
            </div>
            <div className="col">
              <div className="category-item">
                <div className="category-item-icon">
                  <i class="bi bi-backpack-fill"></i>
                </div>
                <p>Education</p>
              </div>
            </div>
            <div className="col">
              <div className="category-item">
                <div className="category-item-icon">
                  <i class="bi bi-egg-fried"></i>
                </div>
                <p>Children</p>
              </div>
            </div>
            <div className="col">
              <div className="category-item">
                <div className="category-item-icon">
                  <i class="bi bi-briefcase-fill"></i>
                </div>
                <p>Business</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Feature-books py-5">
        <div className="container">
          <div className="d-flex justify-content-between mt-3">
            <h2 className="fw-bold mb-4 link-title">Featured Books</h2>
            <Link to="/Categories" className="text-decoration-none link-red">
              View All
            </Link>
          </div>

          <div className="row">
            {featuredBooks.map((book) => (
              <div className="col-md-3" key={book.id}>
                <BookCard
                  image={book.image}
                  title={book.title}
                  author={book.author}
                  price={`$${book.price}`}
                  buttonText="Add to Cart"
                  onButtonClick={() => addtoCart(book.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Information py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center">
              <h2 className="fw-bold link-red">50000+</h2>
              <p>Books Available</p>
            </div>
            <div className="col-md-4 text-center">
              <h2 className="fw-bold link-red">20000+</h2>
              <p>Customers</p>
            </div>
            <div className="col-md-4 text-center">
              <h2 className="fw-bold link-red">99%</h2>
              <p>Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
