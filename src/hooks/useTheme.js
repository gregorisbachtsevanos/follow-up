import { useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useTheme = () => {
    const [ error, setError  ] = useState(false)
    const { dispatch,user } = useAuthContext();

    const changeTheme = async (theme) => {
        try {
            console.log('THEME:' ,theme)
            // return console.log(user.uid)
            await projectFirestore.collection('users').doc(user.uid).update({theme: theme})
            dispatch({type:'THEME_CHANGE', payload:theme})

        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    }

  return {changeTheme}
}
