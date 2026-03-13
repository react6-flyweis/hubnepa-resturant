import { useState } from "react"
import { Send, Paperclip, Smile, Image as ImageIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  content: string
  timestamp: string
  isUser: boolean
  avatar?: string
}

const defaultMessages: ChatMessage[] = [
  {
    id: "1",
    content:
      "I'm sorry to hear that. Could you please tell me what file format the image is in (JPG, PNG)?",
    timestamp: "10:25 AM",
    isUser: true,
    avatar: "/avatars/user-1.jpg",
  },
  {
    id: "2",
    content: "It's a PNG file, about 5MB size.",
    timestamp: "10:26 AM",
    isUser: false,
  },
  {
    id: "3",
    content:
      "Ah, I see. The maximum file size allowed is 4MB. Could you try compressing it or using a smaller image?",
    timestamp: "10:27 AM",
    isUser: true,
    avatar: "/avatars/user-1.jpg",
  },
]

export function LiveChatTab() {
  const [messages] = useState<ChatMessage[]>(defaultMessages)
  const [messageInput, setMessageInput] = useState("")

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message to the server
      console.log("Sending message:", messageInput)
      setMessageInput("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Chat Section */}
      <div className="lg:col-span-2">
        <Card className="flex h-[600px] flex-col">
          {/* Chat Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.isUser ? "justify-start" : "justify-end"
                )}
              >
                {message.isUser && (
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback className="bg-slate-200 text-slate-600">
                      U
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={cn("max-w-[70%] space-y-1")}>
                  <div
                    className={cn(
                      "rounded-2xl p-3 text-sm",
                      message.isUser
                        ? "bg-slate-100 text-slate-900"
                        : "bg-[#059669] text-white"
                    )}
                  >
                    {message.content}
                  </div>
                  <p className="px-3 text-xs text-slate-400">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
              <div className="flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100/70">
                <div className="px-6 pt-6 pb-5">
                  <Textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message here..."
                    className="min-h-10 resize-none border-0 bg-transparent p-0 text-[clamp(1.25rem,2.4vw,2.25rem)] leading-tight text-slate-400 shadow-none placeholder:text-slate-400 focus-visible:ring-0"
                  />
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="">
                      <Paperclip className="" />
                    </Button>
                    <Button variant="ghost" size="icon" className="">
                      <ImageIcon className="" />
                    </Button>
                    <Button variant="ghost" size="icon" className="">
                      <Smile className="" />
                    </Button>
                  </div>

                  <div className="text-right text-slate-400">
                    Press Enter to send
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSendMessage}
                size="icon"
                className="h-10 w-10 rounded-xl"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Support Hours */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#059669]">
                <div className="h-2 w-2 rounded-full bg-white"></div>
              </div>
              Support Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Mon - Fri</span>
              <span className="text-sm font-medium text-slate-900">
                9:00 AM - 8:00 PM
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Sat - Sun</span>
              <span className="text-sm font-medium text-slate-900">
                10:00 AM - 6:00 PM
              </span>
            </div>
            <div className="border-t border-slate-100 pt-2">
              <div className="text-sm font-medium text-[#059669]">
                under 2 minutes
              </div>
              <div className="text-xs text-slate-500">
                Average response time is currently
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Help */}
        <Card className="bg-slate-800 text-white">
          <CardContent className="p-6">
            <h3 className="mb-3 text-lg font-semibold">Need urgent help?</h3>
            <p className="mb-4 text-sm text-slate-300">
              For critical issues affecting orders in progress, please use the
              emergency hotline.
            </p>
            <Button
              variant="outline"
              className="w-full border-slate-600 bg-transparent text-white hover:border-slate-500 hover:bg-slate-700"
            >
              Call +1 (800) 123-4567
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
