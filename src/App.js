import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Footer from "./components/Footer/Footer";
import Categories from "./pages/Categories/Categories";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppProvider from "./provider/AppProvider";
import Orders from "./pages/Orders/Orders";
import OrdersManagement from "./pages/AdminPage/OrdersManagement";
import BooksManagement from "./pages/AdminPage/BooksManagement";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Categories" element={<Categories />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <BooksManagement /> {/* Chỉ admin mới vào được */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminOrders"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <OrdersManagement /> {/* Chỉ admin mới vào được */}
              </ProtectedRoute>
            }
          />
          <Route path="/Orders" element={<Orders />} />
          <Route
            path="/Cart"
            element={
              <ProtectedRoute allowedRoles={["customer", "admin"]}>
                <Cart /> {/* Cả customer và admin đều vào được */}
              </ProtectedRoute>
            }
          />
          <Route path="/Orders" element={<Orders />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
