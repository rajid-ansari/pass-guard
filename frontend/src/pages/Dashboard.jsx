import React, { useContext } from 'react'
import LogOut from "../components/LogOut"
import { useAuth } from '../contexts/UserContextProvider'

const Dashboard = () => {

  const { user } = useAuth();

  return (
  <main className='min-h-screen w-full bg-light'>
    <div>
      <nav className="px-3 md:px-18 h-14 shadow font-outfit transition-all duration-100 ease-linear">
            <div className="h-full w-full  flex items-center justify-between">
                <div className="flex items-center gap-1 ">
                    <div className="logo h-14 w-14 md:h-9 md:w-9 rounded-lg overflow-hidden">
                        <img src={"pass_guard.png"} alt="" />
                    </div>
                    <h2
                        draggable={true}
                        className="hidden sm:block md:block  text-[25px] text-primary font-semibold tracking-tight cursor-default select-none "
                    >
                        PassGuard
                    </h2>
                </div>
                <LogOut />
            </div>
        </nav>
    </div>
  </main>
  )
}

export default Dashboard