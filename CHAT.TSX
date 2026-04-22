import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Trash2, Edit3, Heart } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useChat } from '../hooks/useChat'

// GEN Z AI SYSTEM PROMPT
const SYSTEM_PROMPT = `Bạn là KHAQUYN - AI bạn thân của học sinh Gen Z Việt Nam (lớp 8-9). 
Xưng hô: "cậu - tớ" hoặc "mình - bạn". 

Tính cách: 
- Thân thiện, thông minh, hiểu áp lực học hành
- Nói chuyện tự nhiên như bạn bè Việt Nam 
- Biết động viên vừa đủ, không sến
- Hiểu culture Gen Z VN (TikTok, trà sữa, crush, thi cử)

Kiến thức chính:
- Tiếng Anh Global Success 8-9
- Khoa học tự nhiên Cánh Diều 8-9
- Toán 8-9 (phương trình, hình học)
- Văn học Việt Nam lớp 8-9

Ví dụ trả lời:
User: "Tớ chán quá"
→ "Chán vì bài tập Toán hả cậu? Hay crush không rep tin nhắn? 😅 Kể tớ nghe coi"

User: "Giúp tớ giải phương trình x² - 5x + 6 = 0"
→ "Ok cậu, phương trình bậc 2 này dễ nè. Tớ giải từng bước nhé..."

KHÔNG BAO GIỜ trả lời máy móc kiểu: "Tôi hiểu bạn đang cảm thấy..."`

const SkeletonMessage = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex gap-3">
        <div className="w-10 h-10 bg-gray-800 rounded-2xl animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
)

export default function Chat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()
  const { mutate: sendMessage, isPending } = useChat()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    
    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    sendMessage(
      { messages: [...messages, userMessage], systemPrompt: SYSTEM_PROMPT },
      {
        onSuccess: (aiResponse) => {
          setMessages(prev => [...prev, { role: 'assistant' as const, content: aiResponse }])
        },
        onError: () => {
          toast.error('Ối, mạng lag rồi cậu ơi! Thử lại nhé 😅')
        }
      }
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-deep-black via-black to-gray-900">
      {/* Header */}
      <div className="p-6 border-b border-white/10 sticky top-0 bg-deep-black/95 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-cyan-glow rounded-2xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-cyan-glow bg-clip-text text-transparent">
              KHAQUYN
            </h1>
            <p className="text-sm text-gray-400">Tớ đây, sẵn sàng trò chuyện! 😊</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 text-gray-400"
          >
            <Heart className="w-16 h-16 mx-auto mb-4 text-neon-purple opacity-50" />
            <h2 className="text-xl font-semibold mb-2">Chào cậu! 👋</h2>
            <p>Hỏi tớ bất cứ gì nhé: bài tập, tâm sự, hay chỉ muốn tán gẫu!</p>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "flex gap-3",
                message.role === 'user' ? "justify-end" : ""
              )}
            >
              {message.role === 'assistant' && (
                <div className="w-10 h-10 bg-gradient-to-r from-neon-purple to-cyan-glow rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
              )}
              <div 
                className={cn(
                  "max-w-[80%] p-4 rounded-2xl backdrop-blur-sm",
                  message.role === 'user' 
                    ? "bg-white/10 border border-white/20" 
                    : "bg-gradient-to-r from-neon-purple/10 to-cyan-glow/10 border border-neon-purple/30"
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Skeleton Loading */}
        {isPending && <SkeletonMessage />}
      </div>

      {/* Input */}
      <div className="px-4 pb-8 sticky bottom-0 bg-deep-black/95 backdrop-blur-sm">
        <div className="flex gap-2 bg-white/5 border border-white/10 rounded-3xl p-3 px-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Gõ gì đó để trò chuyện với tớ..."
            className="flex-1 bg-transparent outline-none placeholder-gray-500 text-white py-3"
            disabled={isPending}
          />
          <motion.button
            onClick={handleSend}
            disabled={!input.trim() || isPending}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 bg-gradient-to-r from-neon-purple to-cyan-glow rounded-2xl flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
