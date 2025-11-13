import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { ReactComponent as BookIcon } from "../../assets/icons/book-logo.svg";
import { useAppContext } from "../../provider/AppProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", email, password); // Debug

    try {
      const user = await login(email, password);
      console.log("Login result:", user); // Debug

      if (user) {
        if (user.role === "customer") {
          navigate("/home");
        } else if (user.role === "admin") {
          navigate("/admin");
        }
      } else {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };
  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <BookIcon
                      style={{
                        width: "32px",
                        height: "32px",
                        marginRight: "8px",
                        color: "#dc3545",
                      }}
                    />
                    <h4 className="mb-0 fw-bold" style={{ color: "#dc3545" }}>
                      VcunBooks
                    </h4>
                  </div>
                  <p className="text-muted mb-0">
                    Welcome back! Please sign in to your account
                  </p>
                </div>
                {alert && (
                  <Alert variant="danger" className="mb-3">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Email hoặc mật khẩu không đúng!
                  </Alert>
                )}

                {/* Login Form */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      required
                      style={{ padding: "12px" }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      required
                      style={{ padding: "12px" }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      name="rememberMe"
                      label="Remember me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <a
                      href="#"
                      className="text-decoration-none"
                      style={{ color: "#dc3545" }}
                    >
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    variant="danger"
                    className="w-100 py-2 fw-medium"
                    style={{
                      backgroundColor: "#dc3545",
                      borderColor: "#dc3545",
                    }}
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In
                  </Button>
                </Form>

                {/* Divider */}
                <div className="text-center my-4">
                  <span className="text-muted">Or continue with</span>
                </div>

                {/* Social Login Buttons */}
                <Row className="g-2 mb-4">
                  <Col>
                    <Button
                      variant="outline-secondary"
                      className="w-100 d-flex align-items-center justify-content-center"
                    >
                      <i
                        className="bi bi-google me-2"
                        style={{ color: "#db4437" }}
                      ></i>
                      Google
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="outline-secondary"
                      className="w-100 d-flex align-items-center justify-content-center"
                    >
                      <i
                        className="bi bi-facebook me-2"
                        style={{ color: "#4267B2" }}
                      ></i>
                      Facebook
                    </Button>
                  </Col>
                </Row>

                {/* Register Link */}
                <div className="text-center">
                  <span className="text-muted">Don't have an account? </span>
                  <a
                    href="#"
                    className="text-decoration-none fw-medium"
                    style={{ color: "#dc3545" }}
                  >
                    Register here
                  </a>
                </div>
              </Card.Body>
            </Card>

            {/* Footer Links */}
            <div className="text-center mt-4">
              <div className="d-flex justify-content-center gap-3">
                <a href="#" className="text-muted text-decoration-none small">
                  Privacy Policy
                </a>
                <span className="text-muted">•</span>
                <a href="#" className="text-muted text-decoration-none small">
                  Terms of Service
                </a>
                <span className="text-muted">•</span>
                <a href="#" className="text-muted text-decoration-none small">
                  Support
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
