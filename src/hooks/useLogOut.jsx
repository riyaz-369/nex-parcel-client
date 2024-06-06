import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "./useAuth";

const useLogOut = () => {
  const { logOut } = useAuth();
  const doLogOut = async () => {
    await logOut();
    toast.success("Logout successful");
  };

  const handleLogOut = async () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4ade80",
      cancelButtonColor: "#F43F5E",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        doLogOut();
      }
    });
  };

  return handleLogOut;
};

export default useLogOut;
