import { Outlet, Navigate } from "react-router-dom";

export const PublicRouter = ({ user }) => {
    return !user ? <Outlet /> : <Navigate to='/' />
}
