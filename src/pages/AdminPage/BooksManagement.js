import Sidebar from "../../components/Sidebar";
import {
  Container,
  Table,
  Badge,
  Button,
  Modal,
  Form,
  FormGroup,
} from "react-bootstrap";
import { useAppContext } from "../../provider/AppProvider";
import Categories from "../Categories/Categories";
import { instance } from "../../lib/axios";
import { useState } from "react";
const BooksManagement = () => {
  const { books, setbooks, categories, setCategories } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: 0,
    categoryId: 0,
    stock: 0,
    image: "",
  });

  const HandleUpdate = (book) => {
    setEditingBook(book);
    setShowModal(true);
  };
  const HandleAddNew = () => {
    setShowModal2(true);
  };

  const handleUpdateBook = async () => {
    try {
      const response = await instance.put(
        `/books/${editingBook.id}`,
        editingBook
      );
      const updatedBooks = books.map((book) =>
        book.id === editingBook.id ? response.data : book
      );
      setbooks(updatedBooks);
      setShowModal(false);
      setEditingBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleAddBook = async () => {
    if (
      newBook.title.trim() === "" ||
      newBook.author.trim() === "" ||
      newBook.categoryId === 0 ||
      newBook.price <= 0 ||
      newBook.stock < 0 ||
      newBook.image.trim() === "" ||
      isNaN(newBook.price) ||
      isNaN(newBook.stock)
    ) {
      alert("Please fill in all fields with valid data.");
      return;
    }
    try {
      await instance.post("/books", newBook);
      const response = await instance.get("/books");
      setbooks(response.data);
      setShowModal2(false);
      setNewBook({
        title: "",
        author: "",
        price: 0,
        categoryId: "",
        stock: 0,
        image: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const GetCategoryName = (categoryId) => {
    const categoryName = categories?.find(
      (category) => Number(category.id) === Number(categoryId)
    );
    return categoryName ? categoryName.name : "Unknown User";
  };

  const getCategoryBadgeStyle = (categoryName) => {
    const styles = {
      Romance: { bg: "#FFE8E8", color: "#DC3545" },
      SciFi: { bg: "#E8EEFF", color: "#4B6BFB" },
      Mystery: { bg: "#F3E8FF", color: "#6B21A8" },
      Education: { bg: "#E8F5E9", color: "#2E7D32" },
      Children: { bg: "#FFF3CD", color: "#856404" },
      Business: { bg: "#D1ECF1", color: "#0C5460" },
    };
    return styles[categoryName] || { bg: "#E8E8E8", color: "#6C757D" };
  };

  const RemoveBook = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book? This action cannot be undone."
    );
    if (!confirmDelete) return;

    const updatedBooks = books.filter((book) => book.id !== bookId);
    setbooks(updatedBooks);
    await instance.delete(`/books/${bookId}`);
  };
  return (
    <div className="d-flex mt-3" style={{ backgroundColor: "#f8f9fa" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <div
          className="d-flex justify-content-between align-items-center mb-3"
          style={{
            backgroundColor: "white",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <div
            style={{
              marginLeft: "30px",
            }}
          >
            <h4 className="fw-bold mb-0">Manager Books</h4>
            <p className="text-muted small mb-3">
              Manage your book inventory and listings
            </p>
          </div>
          <Button
            variant="danger"
            style={{
              marginRight: "60px",
            }}
            className="mb-3"
            onClick={HandleAddNew}
          >
            <i className="fa-solid fa-plus me-1"></i> Add Book
          </Button>
        </div>
        <Container>
          <div
            className="bg-white p-4 shadow-sm rounded-3"
            style={{
              borderRadius: "20px",
            }}
          >
            <Table
              hover
              borderless
              className="align-middle mb-0"
              style={{
                borderRadius: "100px",
              }}
            >
              <thead className="table-light">
                <tr>
                  <th className="py-3 text-muted fw-medium">ID</th>
                  <th className="py-3 text-muted fw-medium">Title</th>
                  <th className="py-3 text-muted fw-medium">Author</th>
                  <th className="py-3 text-muted fw-medium">Price</th>
                  <th className="py-3 text-muted fw-medium">Stocks</th>
                  <th className="py-3 text-muted fw-medium">Category</th>
                  <th className="py-3 text-muted fw-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books?.map((book) => {
                  const categoryName = GetCategoryName(book.categoryId);
                  const badgeStyle = getCategoryBadgeStyle(categoryName);

                  return (
                    <tr key={book.id}>
                      <td className="py-3 fw-medium text-dark">
                        #{String(book.id).padStart(3, "0")}
                      </td>
                      <td className="py-3 text-muted">{book.title}</td>
                      <td className="py-3 fw-medium text-dark">
                        {book.author}
                      </td>
                      <td className="py-3 fw-semibold text-dark">
                        ${book.price}
                      </td>
                      <td className="py-3 text-muted">{book.stock}</td>
                      <td className="py-3">
                        <Badge
                          bg=""
                          style={{
                            backgroundColor: badgeStyle.bg,
                            color: badgeStyle.color,
                            fontWeight: "500",
                            padding: "0.35rem 0.75rem",
                            fontSize: "0.875rem",
                          }}
                        >
                          {categoryName}
                        </Badge>
                      </td>
                      <td>
                        <button
                          onClick={() => HandleUpdate(book)}
                          className="btn"
                        >
                          <i
                            style={{
                              marginRight: "15px",
                              color: "#0d6efd",
                              cursor: "pointer",
                            }}
                            className="bi bi-pencil-square"
                          ></i>
                        </button>
                        <button
                          onClick={() => RemoveBook(book.id)}
                          className="btn"
                        >
                          <i
                            style={{
                              color: "#dc3545",
                              cursor: "pointer",
                            }}
                            className="bi bi-trash-fill"
                          ></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Container>

        {/* Update Book Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editingBook && (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingBook.title}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, title: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingBook.author}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, author: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={editingBook.price}
                    onChange={(e) =>
                      setEditingBook({
                        ...editingBook,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    value={editingBook.stock}
                    onChange={(e) =>
                      setEditingBook({
                        ...editingBook,
                        stock: parseInt(e.target.value),
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={editingBook.categoryId}
                    onChange={(e) =>
                      setEditingBook({
                        ...editingBook,
                        categoryId: e.target.value,
                      })
                    }
                  >
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Book Image URL</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    value={editingBook.image || ""}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, image: e.target.value })
                    }
                  />
                  {editingBook.image && (
                    <div className="mt-2">
                      <img
                        src={editingBook.image}
                        alt="Book preview"
                        style={{
                          width: "100px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "5px",
                          border: "1px solid #ddd",
                        }}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/100x150?text=Invalid+URL";
                        }}
                      />
                      <p className="text-muted small mt-1">Image preview</p>
                    </div>
                  )}
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              className="shadow-sm"
              style={{
                backgroundColor: "#E53935",
                border: "none",
              }}
              onClick={handleUpdateBook}
            >
              Update Book
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal2} onHide={() => setShowModal2(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newBook.title}
                  onChange={(e) =>
                    setNewBook({ ...newBook, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  value={newBook.author}
                  onChange={(e) =>
                    setNewBook({ ...newBook, author: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={newBook.price}
                  onChange={(e) =>
                    setNewBook({
                      ...newBook,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={newBook.stock}
                  onChange={(e) =>
                    setNewBook({
                      ...newBook,
                      stock: parseInt(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={newBook.categoryId}
                  onChange={(e) =>
                    setNewBook({
                      ...newBook,
                      categoryId: e.target.value,
                    })
                  }
                >
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Book Image URL</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                  value={newBook.image || ""}
                  onChange={(e) =>
                    setNewBook({ ...newBook, image: e.target.value })
                  }
                />
                {newBook.image && (
                  <div className="mt-2">
                    <img
                      src={newBook.image}
                      alt="Book preview"
                      style={{
                        width: "100px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                      }}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/100x150?text=Invalid+URL";
                      }}
                    />
                    <p className="text-muted small mt-1">Image preview</p>
                  </div>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal2(false)}>
              Cancel
            </Button>
            <Button
              className="shadow-sm"
              style={{
                backgroundColor: "#E53935",
                border: "none",
              }}
              onClick={handleAddBook}
            >
              Add Book
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default BooksManagement;
