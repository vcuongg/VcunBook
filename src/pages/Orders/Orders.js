import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Table, Modal } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import { useAppContext } from "../../provider/AppProvider";
const Orders = () => {
  const [cancelReason, setCancelReason] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getStatusBadgeStyle = (status) => {
    const styles = {
      Pending: { bg: "#FEF9C3", color: "#CA8A04" }, // màu vàng
      Shipped: { bg: "#DBEAFE", color: "#2563EB" }, // màu xanh dương
      Delivered: { bg: "#DCFCE7", color: "#16A34A" }, // màu xanh lá
      Cancelled: { bg: "#FEE2E2", color: "#DC2626" }, // màu đỏ
    };
    return styles[status] || { bg: "#E5E7EB", color: "#6C757D" }; // default xám
  };
  const { orders, books } = useAppContext();
  const [StatusFilter, setStatusFilter] = useState("All");
  const orderFilttered =
    StatusFilter === "All"
      ? orders
      : orders.filter((order) => order.status === StatusFilter);
  console.log("orders: ", orders);

  const CalculateTotal = (order) => {
    const subtotal = order.items.reduce((sum, item) => {
      const book = books.find((b) => String(b.id) === String(item.bookId));
      return sum + (book ? book.price * item.quantity : 0);
    }, 0);
    const shippingFee = order.shippingFee || 0;
    return subtotal + shippingFee;
  };

  const HandleCancelOrder = (order) => {
    setShowModal(true);
  };

  // Calculate order statistics
  const totalOrders = orders?.length || 0;
  const pendingOrders =
    orders?.filter((order) => order.status === "Pending").length || 0;
  const completedOrders =
    orders?.filter((order) => order.status === "Delivered").length || 0;
  const totalSpent =
    orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;

  return (
    <div>
      <Navbar />
      <Container>
        <Row className="mt-4">
          <Col lg={8}>
            <h4 className="fw-bold">Orders Management</h4>
            <p>Manage and track all customer orders</p>
          </Col>
          <Col lg={4}>
            <Row className="d-flex justify-content-end">
              <Form.Select
                style={{
                  width: "120px",
                }}
                onChange={(e) => setStatusFilter(e.target.value)}
                value={StatusFilter}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Select>
            </Row>
          </Col>
        </Row>
        <Row className="Orders general detail">
          <Col lg={3}>
            <Card
              className="shadow-sm"
              style={{
                border: "1px solid #E5E7EB",
              }}
            >
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1" style={{ lineHeight: "1.2" }}>
                    Total Orders
                  </p>
                  <h3 className=" fw-bold mb-0" style={{ lineHeight: "1" }}>
                    {totalOrders}
                  </h3>
                </div>
                <div
                  style={{
                    backgroundColor: "#DBEAFE",
                    borderRadius: "10px",
                    width: "48px",
                    height: "48px",
                  }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <i style={{ color: "#2563EB" }} class="bi bi-cart-fill"></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3}>
            <Card
              className="shadow-sm"
              style={{
                border: "1px solid #E5E7EB",
              }}
            >
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1" style={{ lineHeight: "1.2" }}>
                    Pending
                  </p>
                  <h3
                    className=" fw-bold mb-0"
                    style={{ color: "#CA8A04", lineHeight: "1" }}
                  >
                    {pendingOrders}
                  </h3>
                </div>
                <div
                  style={{
                    backgroundColor: "#FEF9C3",
                    borderRadius: "10px",
                    width: "48px",
                    height: "48px",
                  }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <i
                    style={{
                      color: "#CA8A04",
                    }}
                    class="bi bi-alarm-fill"
                  ></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3}>
            <Card
              className="shadow-sm"
              style={{
                border: "1px solid #E5E7EB",
              }}
            >
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1" style={{ lineHeight: "1.2" }}>
                    Completed
                  </p>
                  <h3
                    className=" fw-bold mb-0"
                    style={{ color: "#16A34A", lineHeight: "1" }}
                  >
                    {completedOrders}
                  </h3>
                </div>
                <div
                  style={{
                    backgroundColor: "#DCFCE7",
                    borderRadius: "10px",
                    width: "48px",
                    height: "48px",
                  }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <i
                    style={{ color: "#16A34A" }}
                    class="bi bi-check-circle-fill"
                  ></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3}>
            <Card
              className="shadow-sm"
              style={{
                border: "1px solid #E5E7EB",
              }}
            >
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1" style={{ lineHeight: "1.2" }}>
                    Total Spent
                  </p>
                  <h3
                    className=" fw-bold mb-0"
                    style={{ color: "#DC2626", lineHeight: "1" }}
                  >
                    ${totalSpent.toFixed(2)}
                  </h3>
                </div>
                <div
                  style={{
                    backgroundColor: "#FEF2F2",
                    borderRadius: "10px",
                    width: "48px",
                    height: "48px",
                  }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <i
                    style={{
                      color: "#DC2626",
                    }}
                    class="bi bi-currency-exchange"
                  ></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date Order</th>
              <th>Status</th>
              <th>Total</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderFilttered?.map((order) => {
              const style = getStatusBadgeStyle(order.status);
              return (
                <tr key={order.id}>
                  <td>#{String(order.id).padStart(3, "0")}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: style.bg,
                        color: style.color,
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontWeight: "500",
                        fontSize: "0.85rem",
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>${CalculateTotal(order)}</td>
                  <td className="text-center">
                    <button className="btn">
                      <i
                        style={{
                          color: "#0d6efd",
                          cursor: "pointer",
                        }}
                        className="bi bi-eye-fill"
                      ></i>
                    </button>
                    <button className="btn">
                      <i
                        style={{
                          color: "#dc3545",
                          cursor: "pointer",
                        }}
                        onClick={HandleCancelOrder}
                        className="bi bi-trash-fill"
                      ></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Cancel Order</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Orders;
