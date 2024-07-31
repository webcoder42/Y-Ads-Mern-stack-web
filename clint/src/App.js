import { Route, Routes } from "react-router-dom";
import UserDashboard from "./Pages/UserDashboardPages/UserDashboard";
import PageNotFound from "./Pages/PageNotFound";
import Home from "./Pages/Home";
import Work from "./Pages/Work";
import Contact from "./Pages/Contact";
import Login from "./Pages/UserRegistrationForms/Login";

import ForgotPassword from "./Pages/UserRegistrationForms/ForgotPassword";
import ResetPassword from "./Pages/UserRegistrationForms/ResetPassword";
import PrivateRoute from "./Componet/ProtectedRoute/PrivateRoute";
import Profile from "./Pages/UserDashboardPages/Profile";
import AdminDashboard from "./Pages/AdminDashboardPages/AdminDashboard";
import AdminRoute from "./Componet/ProtectedRoute/AdminRoute";
import AllUser from "./Pages/AdminDashboardPages/AllUser";
import CreatePackage from "./Pages/AdminDashboardPages/CreatePackage";
import AllPackage from "./Pages/AdminDashboardPages/AllPackage";
import UpdatePackage from "./Pages/AdminDashboardPages/UpdatePackage";
import BuyPackage from "./Pages/UserDashboardPages/BuyPackage";
import CreateSiteTitle from "./Pages/AdminDashboardPages/CreateSiteTitle";
import UpdateTitle from "./Pages/AdminDashboardPages/UpdateTitle";
import CreatePaymentAccount from "./Pages/AdminDashboardPages/CreatePaymentAccount";
import UpdatePaymentAccount from "./Pages/AdminDashboardPages/UpdatePaymentAccount";
import PaymentMethod from "./Pages/UserDashboardPages/PaymentMethod ";
import AllTransaction from "./Pages/AdminDashboardPages/AllTransaction";

import Membership from "./Pages/UserDashboardPages/Membership";
import TotalTeam from "./Pages/UserDashboardPages/TotalTeam";
import CreateAds from "./Pages/AdminDashboardPages/CreateAds";
import Notification from "./Pages/AdminDashboardPages/NotificationPage";

import EditAdModal from "./Pages/AdminDashboardPages/EditAdModal";
import UserAdsInteraction from "./Pages/AdminDashboardPages/UserAdsInteraction";
import Ads from "./Pages/UserDashboardPages/Ads";
import Commission from "./Pages/UserDashboardPages/Commission";
import WithdrawalAcount from "./Pages/AdminDashboardPages/WithdrawalAcount";
import UpdateWithdrawalAccount from "./Pages/AdminDashboardPages/UpdateWithdrawalAccount";
import UserWithdrawal from "./Pages/UserDashboardPages/UserWithdrawal";
import AdminWithdrawal from "./Pages/AdminDashboardPages/AdminWithdrawal";
import WithdrawalHistory from "./Pages/UserDashboardPages/WithdrawalHistory";
import CreateContact from "./Pages/AdminDashboardPages/CreateContact";
import ContactsUser from "./Pages/UserDashboardPages/ContactsUser";
import CreateSubscribe from "./Pages/AdminDashboardPages/CreateSubscribe";

import LongEarn from "./Pages/UserDashboardPages/LongEarn";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route
          path="/request-password-reset/:token"
          element={<ResetPassword />}
        />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />

          <Route path="user/profile" element={<Profile />} />
          <Route path="user/buy-package" element={<BuyPackage />} />
          <Route path="user/payment-method/:slug" element={<PaymentMethod />} />
          <Route path="user/membership" element={<Membership />} />
          <Route path="user/totel-team" element={<TotalTeam />} />
          <Route path="user/ads" element={<Ads />} />
          <Route path="user/withdrawal" element={<UserWithdrawal />} />
          <Route path="user/contact-user" element={<ContactsUser />} />
          <Route path="user/longearn" element={<LongEarn />} />

          <Route
            path="user/withdrawalhistory"
            element={<WithdrawalHistory />}
          />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/all-users" element={<AllUser />} />
          <Route path="admin/create-package" element={<CreatePackage />} />
          <Route path="admin/all-package" element={<AllPackage />} />
          <Route path="admin/site-title" element={<CreateSiteTitle />} />
          <Route path="admin/update-title/:slug" element={<UpdateTitle />} />
          <Route path="admin/notification" element={<Notification />} />
          <Route path="admin/contact" element={<CreateContact />} />
          <Route path="admin/subscribe" element={<CreateSubscribe />} />

          <Route
            path="admin/update-account/:id"
            element={<UpdatePaymentAccount />}
          />
          <Route path="admin/all-transaction" element={<AllTransaction />} />
          <Route path="admin/create-ads" element={<CreateAds />} />
          <Route path="admin/userads" element={<UserAdsInteraction />} />
          <Route
            path="admin/withdrawal-account"
            element={<WithdrawalAcount />}
          />

          <Route path="admin/update/:id" element={<EditAdModal />} />

          <Route
            path="admin/payment-account"
            element={<CreatePaymentAccount />}
          />

          <Route
            path="admin/update-package/:slug"
            element={<UpdatePackage />}
          />
          <Route
            path="admin/update-withdrawal-account/:id"
            element={<UpdateWithdrawalAccount />}
          />
          <Route path="admin/withdrawal" element={<AdminWithdrawal />} />
        </Route>

        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
