import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export const useThemeContext = () => {
    const context = useContext(ThemeContext)

    if (context === undefined) throw new Error('ThemeContext not defined')

    return context
}