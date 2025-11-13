import { createContext, use, useContext, useEffect, useState } from "react";
import App from "../App";
import { instance } from "../lib/axios";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [books, setbooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCart, setUserCart] = useState(null);
  const [orders, setOrders] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  const [AllOrders, setAllOrders] = useState([]);

  const login = async (email, password) => {
    try {
      const response = await instance.get("/users");
      const foundUser = response.data.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        return foundUser;
      }
      return null;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []); // ← Thêm [] để chỉ chạy 1 lần

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await instance.get("/books");
        setbooks(res.data || []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setbooks([]);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await instance.get("/categories");
        setCategories(res.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchBooks();
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          // Fetch user cart
          const cartsResponse = await instance.get("/carts");
          const userCart = cartsResponse.data.find(
            (cart) => String(cart.userId) === String(user.id)
          );
          if (userCart) {
            setUserCart(userCart);
          } else {
            setUserCart({
              userId: user.id,
              items: [],
            });
          }

          // Fetch user orders
          const ordersResponse = await instance.get("/orders");
          const userOrders = ordersResponse.data.filter(
            (order) => String(order.userId) === String(user.id)
          );
          setOrders(userOrders);
          setAllOrders(ordersResponse.data); // Set all orders for admin

          // Fetch user address
          const addressResponse = await instance.get("/AddressUser");
          const userAddr = addressResponse.data.find(
            (address) => String(address.userId) === String(user.id)
          );
          setUserAddress(userAddr || null);
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Set default values on error
          setUserCart({ userId: user.id, items: [] });
          setOrders([]);
          setUserAddress(null);
        }
      } else {
        setUserCart({ items: [] });
        setOrders([]);
        setUserAddress(null);
      }
    };

    fetchUserData();
  }, [user]);

  const addtoCart = async (bookid) => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    try {
      const cartsResponse = await instance.get("/carts");
      let userCart = cartsResponse.data.find((cart) => cart.userId === user.id);
      if (!userCart) {
        // Tạo giỏ hàng mới nếu chưa có
        const newCart = {
          userId: user.id,
          items: [{ bookId: bookid, quantity: 1 }],
        };
        const book = books.find((b) => String(b.id) === String(bookid));
        if (book && book.stock < 1) {
          alert(`Cannot add to cart. Only ${book.stock} items left in stock.`);
          return;
        }
        await instance.post("/carts", newCart);
        setUserCart(newCart);
      } else {
        const foundIndex = userCart.items.findIndex(
          (item) => item.bookId === bookid
        );
        const book = books.find((b) => String(b.id) === String(bookid));
        if (foundIndex !== -1) {
          // Cập nhật số lượng nếu sách đã có trong giỏ
          const currentQuantity = userCart.items[foundIndex].quantity;
          if (book && currentQuantity + 1 > book.stock) {
            alert(
              `Cannot add more than ${book.stock} items. Only ${book.stock} left in stock.`
            );
            return;
          }
          userCart.items[foundIndex].quantity += 1;
        } else {
          userCart.items.push({ bookId: bookid, quantity: 1 });
        }
        // Sử dụng userCart.id thay vì cartIndex
        await instance.put(`/carts/${userCart.id}`, userCart);
        setUserCart(userCart);
      }
      alert("Book added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        books,
        setbooks,
        categories,
        setCategories,
        user,
        setUser,
        login,
        logout,
        loading,
        userCart,
        setUserCart,
        orders,
        userAddress,
        setUserAddress,
        setOrders,
        addtoCart,
        AllOrders,
        setAllOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
export default AppProvider;
