"use client";
import { React } from 'react'
import Image from 'next/image';
const Navbar = ({ give }) => {



  return (

    <>
      <div className='relative'>
        <div className=' h-[40vh] w-full sm:h-[50vh] text-center list-none '>
          <div className='text-4xl pt-3  font-bold  text-white'>
            MENUS/&gt;        
             </div>
          <nav className=' sm:container sm:mx-auto  pt-5 py-9' >
            <Image
              src="/food_bg.jpg"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover z-[-1]"
            />
            <div className='flex relative gap-5  justify-center   items-center sm:gap-4 '>
         
            </div>
            <div className='  flex flex-col sm:relative sm:bottom-9 items-center sm:mt-3 text-yellow-100 p-1 mt-0 '>
              <span className='  sm:text-3xl sm:font-bold font-bold text-3xl mt-8  '> welcome to  {give} </span>
              {/* <span className='sm:text-3xl sm:font-bold font-bold text-2xl mt-0 sm:invisible visible'>Search your flavorate food</span> */}
              <span className=' text-2xl  font-bold  '>This website is build for digitel menus </span>
              <span className=' sm:text-2xl  sm:font-bold sm:visible invisible'>click to register </span>
              <button className="group   relative inline-flex h-12 mt-0 sm:mt-4 items-center w-56 justify-center overflow-hidden rounded-md bg-neutral-900 px-6 font-medium text-neutral-200 duration-500"><div className="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0 ">Register</div><div className="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></div></button>
              
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar