import React from "react";
import { Nav } from "react-bootstrap";
import { ReactComponent as BookIcon } from "../../assets/icons/book-logo.svg";
const Sidebar = () => {
  return (
    <div
      style={{ backgroundColor: "white", width: "230px", height: "100vh" }}
      className="shawdow-sm"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #E5E7EB",
          paddingBottom: "20px",
          paddingTop: "8px",
        }}
      >
        <BookIcon
          style={{
            marginRight: "10px",
            width: "30px",
            height: "30px",
          }}
        ></BookIcon>
        <div>
          <h5 className="fw-bold logo-text">VcunBooks</h5>
        </div>
      </div>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link href="/home" className="text-dark">
            {" "}
            <i
              style={{
                marginRight: "10px",
              }}
              class="bi bi-graph-up"
            ></i>{" "}
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin" className="text-dark">
            {" "}
            <i
              style={{
                marginRight: "10px",
              }}
              class="bi bi-journal-code"
            ></i>{" "}
            Manage Books
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/AdminOrders" className="text-dark">
            {" "}
            <i
              style={{
                marginRight: "10px",
              }}
              class="bi bi-cart"
            ></i>{" "}
            Orders
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" className="text-dark ">
            {" "}
            <i
              class="bi bi-box-arrow-left"
              style={{
                marginRight: "10px",
              }}
            ></i>{" "}
            Log out
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
