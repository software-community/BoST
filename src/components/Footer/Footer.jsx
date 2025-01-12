'use client'
import React from 'react'
import Link from 'next/link'
import { IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathname=usePathname()
  if (pathname.startsWith("/dashboard")) return null;
  return (
    <footer className='w-full h-auto flex text-sm flex-col justify-center py-4 items-center bg-secondary'>
      <p className="text-center text-zinc-400">
        <span>BoST, IIT Ropar | </span>
        Made with ❤️ by{" "}
        <Link href="/softcom" className="text-primary font-bold tracking-widest">
          SoftCom
        </Link>
      </p>
      <div className='w-full text-center text-zinc-400 flex items-center justify-center mt-4'>
        Follow us on:
        <Link href="https://www.instagram.com/bost.iitrpr" target="_blank" className='mx-2 text-primary'>
          <IconBrandInstagram className='mx-2' />
        </Link>
        {/* <Link href="https://www.linkedin.com" target="_blank" className='text-primary'>
          <IconBrandLinkedin />
        </Link> */}
      </div>
    </footer>
  )
}

export default Footer
