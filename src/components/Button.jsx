"use client"
import React from 'react'

const Button = ({text,callback}) => {
  return (
    <button onClick={()=>callback()} className="border border-gray-500 p-2 mt-4 ml-4">{text}</button>
  )
}

export default Button