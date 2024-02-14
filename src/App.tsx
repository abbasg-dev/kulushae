import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "pages/Layout";
import Home from "pages/Home";
import Login from "pages/Authentication/Login/Login";
import LoginMethods from "pages/Authentication/Login/LoginMethods";
import Register from "pages/Authentication/Register/Register";
import ForgetPassword from "pages/Authentication/ForgetPassword/ForgetPassword";
import OTPCode from "pages/Authentication/OtpCode/OtpCode";
import PostAd from "pages/PostAd/PostAd";
import CreateNewPassword from "pages/Authentication/ForgetPassword/CreateNewPassword";
import RentProperty from "pages/PostAd/RentProperty";
import * as ROUTES from 'constants/routes';
import ScrollToTop from "helpers/scrollToTop/scroll-to-top.component";
import { ThemeProvider } from '@mui/styles';
import { theme as customTheme } from 'constants/theme';
import { LoggedOutRoute, ProtectedRoute } from "helpers/routes";
import './App.css';
const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path={ROUTES.HOME} element={<Layout />} >
              <Route index element={<Home />} />
            </Route>
            <Route path={ROUTES.LOGIN} element={<LoggedOutRoute outlet={<Login />} />} />
            <Route path={ROUTES.LOGIN_METHODS} element={<LoggedOutRoute outlet={<LoginMethods />} />} />
            <Route path={ROUTES.REGISTER} element={<LoggedOutRoute outlet={<Register />} />} />
            <Route path={ROUTES.FORGET_PASSWORD} element={<LoggedOutRoute outlet={<ForgetPassword />} />} />
            <Route path={ROUTES.OTP_CODE} element={<LoggedOutRoute outlet={<OTPCode />} />} />
            <Route path={ROUTES.CREATE_NEW_PASSWORD} element={<LoggedOutRoute outlet={<CreateNewPassword />} />} />
            <Route path={ROUTES.POST_AD} element={<ProtectedRoute outlet={<PostAd />} />} />
            <Route path={ROUTES.RENT_PROPERTY} element={<ProtectedRoute outlet={<RentProperty />} />} />
            <Route path="*" element={<Navigate replace to={ROUTES.HOME} />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </ThemeProvider >
  );
}
export default App;