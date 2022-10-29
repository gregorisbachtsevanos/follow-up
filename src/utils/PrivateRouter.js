import { Outlet, Navigate } from "react-router-dom";

export const PrivateRouter = ({ user }) => {
    return user ? <Outlet /> : <Navigate to='/login' />
}
