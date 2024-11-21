import { Provider } from "react-redux";
import store  from "./redux/store"; // Update with the correct path to your store
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Admin/AdminDashbord/AdminDashbord";
import AllUsers from "./components/Admin/AllUsers/AllUsers";
import ActivateUserForm from "./components/Admin/ActivateUserForm/ActivateUserForm";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin/activate-user" element={<ActivateUserForm />} />
        <Route path="/admin/all-users" element={<AllUsers />} />
      </Routes>
    </Provider>
  );
}

export default App;
