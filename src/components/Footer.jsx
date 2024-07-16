import React from 'react'
import { Button } from "@/components/ui/button"
import { FileArchive, HomeIcon, List, MoveHorizontal, PhoneIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from 'react-router-dom'

const Footer = () => {

  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  }

  const goToList = () => {
    navigate('/archived-calls');
  }



  return (
    <>
    <footer className="flex items-center justify-around p-4 border-t">
        <Button variant="ghost" className="relative" onClick={()=>goToHome()}>
          <HomeIcon className="w-6 h-6" />
        </Button>
        <Button variant="ghost" >
          <List className="w-6 h-6 text-muted-foreground" />
        </Button>
        <Button variant="ghost" className="bg-green-500 rounded-full p-2">
          <PhoneIcon className="w-6 h-6 text-white" />
        </Button>
        <Button variant="ghost" onClick={()=>goToList()}>
          <FileArchive className="w-6 h-6 text-muted-foreground" />
        </Button>
        <Button variant="ghost">
          <SettingsIcon className="w-6 h-6 text-muted-foreground" />
        </Button>
    </footer>
    <p className="text-sm text-gray-500 flex justify-center items-center">
    Made with love by &nbsp;
    <a
      href="https://yash-thaker.vercel.app"
      className="font-bold underline"
    >
      Yash
    </a>
  </p>
  </>
  )
}

export default Footer