import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser, resetTokenAndCredentials } from '@/store/auth-slice'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AdminHeader = ({setOpen}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  function handleLogout() {
    // dispatch(logoutUser())
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate('/auth/login');
  }

  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      <Button onClick={()=>setOpen(true)} className= "lg:hidden sm:block bg-black text-white">
        <AlignJustify />
        <span className='sr-only'>Toggle Menu</span>
      </Button>
      <div className='flex flex-1 justify-end'>
        <Button 
        onClick= {handleLogout}
        variant="outline" 
        className="inline-flex text-white bg-black gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
          <LogOut/>
          Logout
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader
