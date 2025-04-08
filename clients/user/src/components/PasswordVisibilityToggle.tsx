import { Dispatch, SetStateAction } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./icons/ShowHideIcons";

const PasswordVisibilityToggle = ({ isPasswordVisible, setIsPasswordVisible }: { isPasswordVisible: boolean, setIsPasswordVisible: Dispatch<SetStateAction<boolean>>}) => {
    return (
        <button
            aria-label="toggle password visibility"
            className="focus:outline-none"
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
        >
            {isPasswordVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
        </button>
    );
}
 
export default PasswordVisibilityToggle;