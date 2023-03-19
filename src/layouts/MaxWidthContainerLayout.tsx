import React from 'react'

export default function MaxWidthContainerLayout(props: { children: React.ReactNode }) {
   return (
      <div className="max-w-[1200px] mx-auto bg-[#333346] rounded-xl mt-2 px-2 py-4 h-fit max-h-[calc(100vh-6.75rem)] overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-track-[#b0b0d4] scrollbar-thumb-[#3e3e50] scrollbar-track-rounded-md scrollbar-thumb-rounded-md">
         {props.children}
      </div>
   )
}
