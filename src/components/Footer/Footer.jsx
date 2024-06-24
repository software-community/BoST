import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='w-full h-[10vh] flex text-sm  justify-center py-4 items-center bg-secondary'>
         <p className="text-center text-zinc-400">
            <span>Bost Portal IIT Ropar | </span>
        Made with ❤️ by{" "}
        <Link href="/softcom" className="text-primary  font-bold tracking-widest">
          SoftCom
        </Link>
      </p>
    </footer>
    
  )
}

export default Footer