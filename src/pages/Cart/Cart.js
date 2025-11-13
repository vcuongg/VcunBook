import { Card, Col, Container, Row } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAppContext } from "../../provider/AppProvider";
import CardItem from "../../components/CardItem/Carditem";
import { Link } from "react-router-dom";
import { instance } from "../../lib/axios";
const Cart = () => {
  const {
    userCart,
    setUserCart,
    books,
    user,
    orders,
    setOrders,
    userAddress,
    setbooks,
  } = useAppContext();

  const cartItems = userCart?.items || [];

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cartItems.reduce((total, item) => {
    const book = books?.find((b) => String(b.id) === String(item.bookId));
    return total + (book ? book.price * item.quantity : 0);
  }, 0);

  const shipping = subtotal > 75 ? 0 : 5.0;
  const total = subtotal + shipping;

  console.log("User Address in Cart:", userAddress);

  const removeFromCart = async (bookId) => {
    try {
      if (!userCart?.items) return;
      const updatedItems = userCart.items.filter(
        (item) => item.bookId !== bookId
      );
      const updatedCart = {
        ...userCart,
        items: updatedItems,
      };
      setUserCart(updatedCart);

      const res = await instance.get("/carts");
      const foundCart = res.data.find((cart) => cart.userId === user.id);

      if (foundCart) {
        await instance.put(`/carts/${foundCart.id}`, updatedCart);
        console.log("Cart updated successfully on server after removal.");
      }
    } catch (error) {
      console.error("Error removing item from cart on server:", error);
    }
  };

  const UpdateCartQuantity = async (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    try {
      const book = books.find((b) => String(b.id) === String(bookId));
      if (book && newQuantity > book.stock) {
        alert(
          `Cannot set quantity to ${newQuantity}. Only ${book.stock} items left in stock.`
        );
        return;
      }
      const updatedItem = userCart.items.find((item) => item.bookId === bookId);
      updatedItem.quantity = newQuantity;
      const updatedItems = userCart.items.map((item) =>
        item.bookId === bookId ? updatedItem : item
      );
      const updatedCart = {
        ...userCart,
        items: updatedItems,
      };
      await instance.put(`/carts/${userCart.id}`, updatedCart);
      setUserCart(updatedCart);
      console.log("Cart updated successfully on server after quantity change.");
    } catch (error) {
      console.error("Error updating item quantity in cart on server:", error);
    }
  };

  const SubmitOrder = async (items, total) => {
    if (items.length === 0) return;

    try {
      const outOfStockItems = items.filter((item) => {
        const book = books.find((b) => String(b.id) === String(item.bookId));
        return book && book.stock < item.quantity;
      });
      if (outOfStockItems.length > 0) {
        alert("Some items are out of stock. Please update your cart.");
        return;
      }
      const newOrder = {
        userId: user.id,
        orderDate: new Date().toISOString().split("T")[0],
        status: "Pending",
        subtotal: subtotal,
        shippingFee: shipping,
        total: total,
        addressId: userAddress?.id,
        items: items,
      };
      await instance.post("/orders", newOrder);
      setOrders([...orders, newOrder]);
      // Clear the cart after order submission
      setUserCart({ ...userCart, items: [] });
      await instance.put(`/carts/${userCart.id}`, { ...userCart, items: [] });
      console.log("Order submitted and cart cleared successfully.");
      alert("Order submitted successfully!");

      const UpdateStockBooks = books.map((book) => {
        const cartItem = items.find(
          (item) => String(item.bookId) === String(book.id)
        );
        if (cartItem) {
          return {
            ...book,
            stock: book.stock - cartItem.quantity,
          };
        }
        return book;
      });
      setbooks(UpdateStockBooks);
      for (const updatedBook of UpdateStockBooks) {
        const originalBook = books.find(
          (b) => String(b.id) === String(updatedBook.id)
        );
        if (originalBook && originalBook.stock !== updatedBook.stock) {
          await instance.put(`/books/${updatedBook.id}`, updatedBook);
        }
      }
      console.log("Book stocks updated successfully after order.");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <Container className="mt-4 mb-5">
        <h2 className="fw-bold">Shopping Cart</h2>
        <p className="text-muted">You have {itemCount} items in your cart</p>
        <Row>
          <Col md={9}>
            {cartItems.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-cart-x fs-1 text-muted mb-3"></i>
                <h5 className="text-muted">Your cart is empty</h5>
                <Link to="/Categories" className="btn btn-primary">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <Card className="shadow-sm">
                {cartItems.map((item) => (
                  <CardItem
                    key={item.bookId}
                    cartItem={item}
                    onRemove={removeFromCart}
                    onQuantityChange={UpdateCartQuantity}
                  />
                ))}
              </Card>
            )}
          </Col>
          <Col md={3}>
            <Card
              className="shadow-sm p-3"
              style={{
                padding: "14px",
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                <h3 className="fw-bold mb-3">Order Summary</h3>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Subtotal</span>
                  <span className="fw-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-4">
                  <span className="text-muted">Shipping</span>
                  <span className="fw-medium">${shipping.toFixed(2)}</span>
                </div>
              </div>
              <div
                style={{
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                <div
                  className="d-flex justify-content-between pt-3"
                  style={{ borderTop: "1px solid #E5E7EB" }}
                >
                  <span className="fw-bold fs-5">Total</span>
                  <span className="fw-bold fs-4 text-danger">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button
                  className="btn w-100 mt-3 shadow-sm mb-3 fw-medium py-2 rounded-3"
                  style={{
                    backgroundColor: "#C62828",
                    color: "white",
                    border: "none",
                    fontSize: "1.1rem",
                  }}
                  onClick={() => SubmitOrder(cartItems, total)}
                >
                  Proceed to Checkout
                </button>
                {/* Free Shipping Box - theo đúng mẫu */}
                <div
                  className="d-flex align-items-center p-3 rounded-3 mb-4"
                  style={{ backgroundColor: "#FEF2F2" }}
                >
                  {/* Icon truck đỏ */}
                  <i
                    className="bi bi-truck me-3"
                    style={{
                      fontSize: "1.5rem",
                      color: "#DC2626",
                    }}
                  ></i>

                  {/* Text content */}
                  <div>
                    <div className="fw-bold text-dark">Free Shipping</div>
                    <div className="text-muted small">On orders over $75</div>
                  </div>
                </div>
              </div>
              <p
                className="text-center mt-2 text-muted"
                style={{
                  fontSize: "12px",
                }}
              >
                <i
                  style={{
                    marginRight: "3px",
                  }}
                  class="bi bi-lock-fill"
                ></i>
                Secure checkout powered by SSL encryption
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Cart;
