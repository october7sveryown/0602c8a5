import React from 'react'
import { Button } from "@/components/ui/button"
import { PhoneCallIcon } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate('/archived-calls');
    }

    const goToHome = () => {
        navigate('/');
    }


  return (
    <header className="flex items-center justify-between p-4 border-b border-t-0">
        <div className="flex items-center">
          <PhoneCallIcon className="w-6 h-6 text-green-500" />
          <h1 className="ml-2 text-lg font-bold">Aircall</h1>
        </div>
        <div className="flex items-center space-x-4">
          {
            (location.pathname != '/') && (
                <Button variant="ghost" className="text-muted-foreground" onClick={()=>goToHome()}>
                    Calls
          </Button>
            )
          }
          {
            (location.pathname != '/archived-calls') && (
                <Button variant="ghost" className="text-muted-foreground" onClick={()=>handleClick()}>
            Archived calls
          </Button>
            )
          }
        </div>
      </header>
  )
}

export default Header