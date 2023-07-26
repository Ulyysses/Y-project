import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import AppHeader from "../app-header";
import Error from "../error";
import Loading from "../loading";
import { setIngredients } from "../../services/ingredients";
import MainPage from "../../pages/main-page/MainPage";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import ForgotPassword from "../../pages/forgot-password/ForgotPassword";
import ResetPassword from "../../pages/reset-password/ResetPassword";
import Profile from "../../pages/profile/Profile";
import { ProvideAuth } from "../../pages/auth";
import { ProtectedRouteElement } from "../../pages/ProtectedRouteElement";
import IngredientPage from "../../pages/ingredient-page/IngredientPage";
import NotFound404 from "../../pages/404/NotFound404";
import { ingredientsList } from "../../pages/api";
import FeedPage from "../../orders/feed-page/FeedPage";
import OrderPage from "../../orders/order-page/OrderPage";
import OrderHistory from "../../orders/order-history/OrderHistory";
import RecentOrder from "../../orders/recent-order/RecentOrder";

const App = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const showMainPage = async () => {
      try {
        const res = await ingredientsList();
        const result = await res.json();
        dispatch(setIngredients(result.data));
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
        console.error(error);
      }
    };
    showMainPage();
  }, []);

  if (isLoading) {
    return <Loading style={{ height: "100vh" }} />;
  }

  return (
    <>
      {hasError ? (
        <Error style={{ height: "100vh" }} />
      ) : (
        <>
          <AppHeader />
          <main className="container">
            <ProvideAuth>
              <Routes>
                <Route
                  path="/profile"
                  element={<ProtectedRouteElement element={<Profile />} />}
                />
                <Route path="/profile/orders" element={<OrderHistory />} />
                <Route path="/profile/orders/:id" element={<RecentOrder />} />
                <Route path="/ingredients/:id" element={<IngredientPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="*" element={<NotFound404 />} />
                <Route path="/" element={<MainPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/feed/:id" element={<OrderPage />} />
              </Routes>
            </ProvideAuth>
          </main>
        </>
      )}
    </>
  );
};

export default App;
