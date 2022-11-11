import { useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useTheme = () => {
    const [error, setError] = useState(false)
    const {dispatch} = useAuthContext();

    const changeTheme = (theme) => {
        try {
            dispatch({type:'THEME_CHANGE', payload:theme})
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    }


  return {changeTheme}
}
