import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store'; // Ensure the path to the Redux store is correct
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Admin/AdminDashbord/AdminDashbord';
import AllUsers from './components/Admin/AllUsers/AllUsers';
import ActivateUserForm from './components/Admin/ActivateUserForm/ActivateUserForm';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import AdminProtectedRoute from './components/Admin/adminProctedRoute';
import AllWithdrawRequest from './components/Admin/AllWithdrawRequest/AllWithdrawRequest';
import AllRequestList from './components/Admin/AllRequestList/AllRequestList';
import PaidUsers from './components/Admin/PaidUsers/PaidUsers';
import UnpaidUsersList from './components/Admin/UnpaidUserslist/UnpaidUserslist';
import UserTeam from './components/Admin/userTeam/UserTeam';

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />

                    {/* Protected Routes */}
                    <Route
                        path="/"
                        element={
                            <AdminProtectedRoute>
                                <Dashboard />
                            </AdminProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/activate-user"
                        element={
                            <AdminProtectedRoute>
                                <ActivateUserForm />
                            </AdminProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/all-users"
                        element={
                            <AdminProtectedRoute>
                                <AllUsers />
                            </AdminProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/all-paid-users"
                        element={
                            <AdminProtectedRoute>
                                <PaidUsers />
                            </AdminProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/all-unpaid-users"
                        element={
                            <AdminProtectedRoute>
                                <UnpaidUsersList/>
                            </AdminProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/user-team"
                        element={
                            <AdminProtectedRoute>
                                <UserTeam/>
                            </AdminProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/all-withdrawl-requests"
                        element={
                            <AdminProtectedRoute>
                                <AllWithdrawRequest />
                            </AdminProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/all-recharge-requests"
                        element={
                            <AdminProtectedRoute>
                                <AllRequestList />
                            </AdminProtectedRoute>
                        }
                    />

                    {/* Fallback Redirect */}
                    <Route path="*" element={<Navigate to="/admin/login" replace />} />
                </Routes>
            </PersistGate>
        </Provider>
    );
}

export default App;
