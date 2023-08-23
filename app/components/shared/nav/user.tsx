import React, { useState,useRef } from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';
import Image from 'next/image';
import { FiMoon, FiSettings, FiUser, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import {MdOutlineLogin} from 'react-icons/md'

const User = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false)
    }
  };


  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className=''>
      {session ? (
        <div className="relative">
          <button
            className="flex items-center focus:outline-none"
            onClick={handleDropdownToggle}
          >
            <Image
              className="rounded-full border-2 border-gray-200 dark:border-gray-900"
              src={session.user?.image ?? ''}
              alt="avatar"
              width={40}
              height={40}
            />
            
          </button>

          {isDropdownOpen && (
            <div ref={menuRef} className="absolute right-0 mt-2 py-2 w-[180px] bg-white dark:bg-gray-800 rounded shadow-lg overflow-hidden">
              <button className="flex gap-1 items-center text-sm w-full px-2 py-2 border-spacing-3 border-b">
                
                <p className="italic">signed in as </p>
                <p className="font-bold">{session?.user?.name?.split(" ")[0]}</p>
              </button>
              <button className="flex items-center w-full px-4 py-2">
                <FiSettings className="mr-2" />
                Settings
              </button>
              <button className="flex items-center w-full px-4 py-2">
                <FiUser className="mr-2" />
                Profile
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-red-500 hover:text-red-700"
                onClick={handleLogout}
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          
           <Link href={"/Login"}>
           <button onClick={()=>signIn()} className="px-3 py-3 md:py-1 rounded-full text-xs md:text-lg font-light text-white bg-gradient-to-tr from-blue-500 to-indigo-500 ">
              <p className='hidden md:flex'>signIn</p>
              
            </button>
            </Link>

          
        </div>
      )}
    </div>
  );
};

export default User;