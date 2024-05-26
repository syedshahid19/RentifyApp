import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ACCOUNT_TYPE } from "../../utils/constants";

const Navbar = () => {
    const token = localStorage.getItem('token');
    const accountType = localStorage.getItem('accountType');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        toast.success("Logged Out");
        navigate("/login");
    };

    return (
        <header className="bg-richblack-800 flex flex-col items-center justify-center border-b-[1px] border-b-richblack-700 p-2">
            <div className="w-11/12 max-w-maxContent flex flex-col md:flex-row items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-richblack-400 hover:text-richblack-500 mb-4 md:mb-0">Rentify</Link>

                {/* Navigation links */}
                <nav className="flex flex-col md:flex-row gap-4 text-richblack-25 items-center">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "bg-yellow-500 text-white px-3 py-2 rounded-md font-bold" : "rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/properties"
                        className={({ isActive }) =>
                            isActive ? "bg-yellow-500 text-white px-3 py-2 rounded-md font-bold" : "rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
                        }
                    >
                        Properties
                    </NavLink>
                    {!token && (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? "bg-yellow-500 text-white px-3 py-2 rounded-md font-bold" : "rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) =>
                                    isActive ? "bg-yellow-500 text-white px-3 py-2 rounded-md font-bold" : "rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
                                }
                            >
                                Sign Up
                            </NavLink>
                        </>
                    )}
                    {token && accountType === ACCOUNT_TYPE.SELLER && (
                        <NavLink
                            to="/dashboard/seller"
                            className={({ isActive }) =>
                                isActive ? "bg-yellow-500 text-white px-3 py-2 rounded-md font-bold" : "rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
                            }
                        >
                            Dashboard
                        </NavLink>
                    )}
                    {token && (
                        <button onClick={handleLogout} className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                            Logout
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
