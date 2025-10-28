"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Link2, Home, History, Link, LogOut, Menu, X } from "lucide-react";


export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if(token){
  //     setIsLoggedIn(true);
  //   }
  // }, []);
  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("token");
  if (token) {
    setIsLoggedIn(true);
    };
    
  }
  checkAuth(); 
    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    toast.success("Logged out successfully");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    router.push("/login");
  };

  return (
<nav className="bg-gradient-to-r from-sky-300 to-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/")}>
            <Link2 className="text-balck w-8 h-8" />
            <span className="text-black text-2xl font-bold tracking-tight">
              ShortURL
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => router.push("/")}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-black hover:bg-black/20 transition-all duration-200"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => router.push("/links")}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-black hover:bg-black/20 transition-all duration-200"
                >
                  <Link className="w-4 h-4" />
                  <span>My Links</span>
                </button>
                <button
                  onClick={() => router.push("/history")}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-black hover:bg-black/20 transition-all duration-200"
                >
                  <History className="w-4 h-4" />
                  <span>History</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 ml-2 rounded-lg bg-black/10 text-black hover:bg-black/20 transition-all duration-200 border border-black/30"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="px-5 py-2 rounded-lg text-black hover:bg-black/20 transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="px-5 py-2 ml-2 rounded-lg bg-black text-indigo-600 hover:bg-gray-100 transition-all duration-200 font-semibold"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-black p-2 rounded-lg hover:bg-black/20 transition-all duration-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/10 backdrop-blur-lg border-t border-black/20">
          <div className="px-4 py-3 space-y-2">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    router.push("/");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-black hover:bg-black/20 transition-all duration-200"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => {
                    router.push("/links");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-black hover:bg-black/20 transition-all duration-200"
                >
                  <Link className="w-5 h-5" />
                  <span>My Links</span>
                </button>
                <button
                  onClick={() => {
                    router.push("/history");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-black hover:bg-black/20 transition-all duration-200"
                >
                  <History className="w-5 h-5" />
                  <span>History</span>
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg bg-black/10 text-black hover:bg-black/20 transition-all duration-200 border border-black/30"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    router.push("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg text-black hover:bg-black/20 transition-all duration-200 text-left"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    router.push("/register");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-black text-indigo-600 hover:bg-gray-100 transition-all duration-200 font-semibold text-left"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}