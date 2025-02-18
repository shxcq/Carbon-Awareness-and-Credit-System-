import { signOut } from "firebase/auth";
import { auth } from "./firebase"; // adjust the path as needed
import { useNavigate } from "react-router-dom";
import { DropdownItem } from "reactstrap"; // or your UI library

const LogoutLink = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      navigate("/auth/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <DropdownItem href="#pablo" onClick={handleLogout}>
      <i className="ni ni-user-run" />
      <span>Logout</span>
    </DropdownItem>
  );
};

export default LogoutLink;
