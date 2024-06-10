import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import useAxiosCommon from "../hooks/useAxiosCommon";
import toast from "react-hot-toast";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosCommon = useAxiosCommon();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updatedProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const saveUserInDB = (userDetail) => {
    const userInfo = {
      name: userDetail?.displayName,
      email: userDetail?.email,
      photoURL: userDetail?.photoURL,
      role: "User",
    };

    const getData = async () => {
      try {
        await axiosCommon.post("/users", userInfo);
      } catch (err) {
        toast.error(err.message);
      }
    };
    if (userInfo) {
      getData();
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      const userInfo = { email: currentUser?.email };

      const getToken = async () => {
        try {
          const { data } = await axiosCommon.post("/jwt", userInfo);
          localStorage.setItem("token", data.token);
        } catch (err) {
          toast.error(err.message);
        }
      };

      if (currentUser) {
        getToken();
      } else {
        localStorage.removeItem("token");
      }
      setLoading(false);
    });
    return () => {
      return unSubscribe();
    };
  }, [axiosCommon]);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    googleSignIn,
    updatedProfile,
    saveUserInDB,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
