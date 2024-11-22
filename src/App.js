import { Provider } from "react-redux";
import store  from "./redux/store"; // Update with the correct path to your store
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Admin/AdminDashbord/AdminDashbord";
import AllUsers from "./components/Admin/AllUsers/AllUsers";
import ActivateUserForm from "./components/Admin/ActivateUserForm/ActivateUserForm";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin";
import AdminProtectedRoute from "./components/Admin/adminProctedRoute";
import AllWithdrawRequest from "./components/Admin/AllWithdrawRequest/AllWithdrawRequest";
import AllRequestList from "./components/Admin/AllRequestList/AllRequestList";

function App() {
  return (
    <Provider store={store}>
      <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      
        <Route path="/" element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
        <Route path="/admin/activate-user" element={<AdminProtectedRoute><ActivateUserForm /></AdminProtectedRoute>} />
        <Route path="/admin/all-users" element={<AdminProtectedRoute><AllUsers /></AdminProtectedRoute>} />
        <Route path="/admin/all-withdrawl-requests" element={<AdminProtectedRoute><AllWithdrawRequest /></AdminProtectedRoute>} />
        <Route path="/admin/all-recharge-requests" element={<AdminProtectedRoute><AllRequestList /></AdminProtectedRoute>} />
      </Routes>
    </Provider>
  );
}

export default App;
