import React from 'react'
import logo from '/logo.svg' // from public folder
import { Button } from "@/components/ui/button"

function Header() {
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src={logo} alt="Logo" className="h-10" />
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  )
}

export default Header
