import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import React, {
  useEffect,
  useState,
  createContext,
  useCallback,
} from "react";
import auth from "../firebase/firebase.init";
import axiosPublic from "../axios/axiosPublic";
import { setLogoutFunction } from "../axios/axiosSecure";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleAuthProvider = new GoogleAuthProvider();

  /* ---------- AUTH METHODS ---------- */

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleAuthProvider);
  };

  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const emailVerification = () => {
    return sendEmailVerification(auth.currentUser);
  };

  /* ---------- LOGOUT (FIXED) ---------- */
  const logout = useCallback(async () => {
    setLoading(true);
    await signOut(auth);
    localStorage.removeItem("access-token");
    setUser(null);
    setLoading(false);
  }, []);

  /* ---------- REGISTER LOGOUT FOR AXIOS ---------- */
  useEffect(() => {
    setLogoutFunction(logout);
  }, [logout]);

  /* ---------- AUTH STATE LISTENER ---------- */
  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isMounted) return;

      setLoading(true);

      if (currentUser) {
        try {
          const res = await axiosPublic.post("/jwt", {
            email: currentUser.email,
          });

          if (res.data?.token) {
            localStorage.setItem("access-token", res.data.token);
          }

          setUser(currentUser);
        } catch (error) {
          console.error("JWT fetch failed:", error);
          setUser(currentUser); // still allow login
        }
      } else {
        localStorage.removeItem("access-token");
        setUser(null);
      }

      setLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  /* ---------- CONTEXT VALUE ---------- */
  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    updateUser,
    emailVerification,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
