import { Badge, Button, Container, Form, Modal, Table } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import { useAppContext } from "../../provider/AppProvider";
import { useState } from "react";
import { instance } from "../../lib/axios";

const OrdersManagement = () => {
  const { AllOrders, setAllOrders, books } = useAppContext();
  const [showModal, setShowModal] = useState();
  const [updatedStatus, setUpdateStatus] = useState();
  const getCategoryBadgeStyle = (Orderstatus) => {
    const styles = {
      Pending: { bg: "#FEF9C3", color: "#CA8A04" }, // màu vàng
      Shipped: { bg: "#DBEAFE", color: "#2563EB" }, // màu xanh dương
      Delivered: { bg: "#DCFCE7", color: "#16A34A" }, // màu xanh lá
      Cancelled: { bg: "#FEE2E2", color: "#DC2626" }, // màu đỏ
    };
    return styles[Orderstatus] || { bg: "#E8E8E8", color: "#6C757D" };
  };
  const CalculateTotal = (order) => {
    const subtotal = order.items.reduce((sum, item) => {
      const book = books.find((b) => String(b.id) === String(item.bookId));
      return sum + (book ? book.price * item.quantity : 0);
    }, 0);
    const shippingFee = order.shippingFee || 0;
    return subtotal + shippingFee;
  };

  const HandleUpdate = (order) => {
    setUpdateStatus(order);
    setShowModal(true);
  };

  const HandleUpdateOrder = async () => {
    try {
      const response = await instance.patch(`/orders/${updatedStatus.id}`, {
        status: updatedStatus.status,
        ShippedDate: new Date().toISOString().split("T")[0],
      });
      const updatedOrders = AllOrders.map((order) =>
        order.id === updatedStatus.id ? response.data : order
      );
      setAllOrders(updatedOrders);
      setShowModal(false);
      setUpdateStatus(null);
      alert("Order status updated successfully.");
    } catch (error) {
      alert("Failed to update order status: " + error.message);
    }
  };
  console.log("Updated Orders: ", updatedStatus);

  return (
    <div>
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
                    <th className="py-3 text-muted fw-medium">userId</th>
                    <th className="py-3 text-muted fw-medium">orderDate</th>
                    <th className="py-3 text-muted fw-medium">total</th>
                    <th className="py-3 text-muted fw-medium">status</th>
                    <th className="py-3 text-muted fw-medium">addressId</th>
                    <th className="py-3 text-muted fw-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {AllOrders?.map((order) => {
                    const badgeStyle = getCategoryBadgeStyle(order.status);
                    return (
                      <tr key={order.id}>
                        <td className="py-3 fw-medium text-dark">
                          #{String(order.id).padStart(3, "0")}
                        </td>
                        <td className="py-3 text-muted">{order.userId}</td>
                        <td className="py-3 fw-medium text-dark">
                          {order.orderDate}
                        </td>
                        <td className="py-3 fw-semibold text-dark">
                          ${CalculateTotal(order).toFixed(2)}
                        </td>
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
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-muted">{order.addressId}</td>
                        <td>
                          {/* <button className="btn">
                            <i
                              style={{
                                marginRight: "15px",
                                color: "#0d6efd",
                                cursor: "pointer",
                              }}
                              className="bi bi-pencil-square"
                            ></i>
                          </button> */}
                          <button
                            className="btn"
                            onClick={() => HandleUpdate(order)}
                          >
                            <i
                              style={{
                                color: "#3589dcff",
                                cursor: "pointer",
                              }}
                              class="bi bi-pencil-square"
                            ></i>
                          </button>
                          <button className="btn">
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
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="statusSelect" className="mb-3">
              <Form.Label>Select New Status</Form.Label>
              <Form.Select
                value={updatedStatus?.status || ""}
                onChange={(e) =>
                  setUpdateStatus({ ...updatedStatus, status: e.target.value })
                }
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={HandleUpdateOrder}>
              Update Status
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrdersManagement;
