import { Outlet, Navigate } from "react-router-dom";
import Sidebar from '../components/Sidebar/Sidebar';


export const PrivateRouter = ({ user }) => {
    return (
        user
            ? (
                <>
                    <Sidebar />
                    <Outlet />
                </>
            )
            : <Navigate to='/login' />
    )
}
