import React from 'react'
import { Button } from "@/components/ui/button"
import { FileArchive, HomeIcon, List, MoveHorizontal, PhoneIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

const Footer = () => {
  return (
    <footer className="flex items-center justify-around p-4 border-t">
        <Button variant="ghost" className="relative">
          <HomeIcon className="w-6 h-6" />
        </Button>
        <Button variant="ghost">
          <List className="w-6 h-6 text-muted-foreground" />
        </Button>
        <Button variant="ghost" className="bg-green-500 rounded-full p-2">
          <PhoneIcon className="w-6 h-6 text-white" />
        </Button>
        <Button variant="ghost">
          <FileArchive className="w-6 h-6 text-muted-foreground" />
        </Button>
        <Button variant="ghost">
          <SettingsIcon className="w-6 h-6 text-muted-foreground" />
        </Button>
      </footer>
  )
}

export default Footer