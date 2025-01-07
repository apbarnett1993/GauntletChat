"use client"

import * as React from "react"
import { Hash, MessageSquare, User, ChevronDown, Plus, LogIn } from 'lucide-react'
import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { initialChannels, users } from "@/lib/mock-data"

export type Channel = {
  id: string
  name: string
}

export type User = {
  id: string
  name: string
  avatar: string
}

function AppSidebar() {
  const [channels, setChannels] = React.useState<Channel[]>(initialChannels)
  const [newChannelName, setNewChannelName] = React.useState("")
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault()
    if (newChannelName.trim()) {
      const newChannel: Channel = {
        id: Date.now().toString(),
        name: newChannelName.trim(),
      }
      setChannels([...channels, newChannel])
      setNewChannelName("")
      setIsDialogOpen(false)
    }
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex items-center">
                <Hash className="mr-2 h-4 w-4" />
                <span className="font-semibold">ChatApp</span>
              </div>
              <ChevronDown className="ml-auto h-4 w-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Channels
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto h-4 w-4 p-0">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add Channel</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Channel</DialogTitle>
                  <DialogDescription>
                    Enter a name for the new channel. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddChannel}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newChannelName}
                        onChange={(e) => setNewChannelName(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {channels.map((channel) => (
                <SidebarMenuItem key={channel.id}>
                  <Link href={`/channel/${channel.id}`} passHref>
                    <SidebarMenuButton>
                      <Hash className="mr-2 h-4 w-4" />
                      {channel.name}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Direct Messages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {users.map((user) => (
                <SidebarMenuItem key={user.id}>
                  <Link href={`/direct-message/${user.id}`} passHref>
                    <SidebarMenuButton>
                      <User className="mr-2 h-4 w-4" />
                      {user.name}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/login" passHref>
                  <SidebarMenuButton>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export { AppSidebar }

