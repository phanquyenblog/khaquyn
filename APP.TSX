import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, BookOpen, MessageCircle, Sparkles, User, 
  Send, Menu, X 
} from 'lucide-react'
import { cn } from './lib/utils'
import Chat from './pages/Chat'
import Study from './pages/Study'
import Trends from './pages/Trends'
import Profile from './pages/Profile'
import Landing from './pages/Landing'

// Mobile FAB + Sticky CTA
const MobileCTA = ({ onOpenChat }: { onOpenChat: () => void }) => (
  <motion.button
    className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-neon-purple to-cyan-glow rounded-full shadow-2xl border-4 border-white/20 backdrop-blur-sm z-50 flex items-center justify-center"
    onClick={onOpenChat}
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05 }}
  >
    <MessageCircle className="w-8 h-8 text-white drop-shadow-lg" />
  </motion.button>
)

function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'study' | 'chat' | 'trends' | 'profile'>('home')
  const [showLanding, setShowLanding] = useState(true)

  const renderContent = () => {
    if (showLanding) return <Landing onStart={() => setShowLanding(false)} />
    
    const tabs = {
      home: <div>🏠 Home Feed</div>,
      study: <Study />,
      chat: <Chat />,
      trends: <Trends />,
      profile: <Profile />
    }
    
    return tabs[currentTab]
  }

  return (
    <div className="min-h-screen bg-deep-black text-white font-sarabun">
      {/* Mobile CTA */}
      {!showLanding && <MobileCTA onOpenChat={() => setCurrentTab('chat')} />}
      
      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab + showLanding}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen pb-24"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation - Mobile Only */}
      {!showLanding && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 bg-deep-black/80 backdrop-blur-xl border-t border-white/10 z-40 md:hidden"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
            {(['home', 'study', 'trends', 'profile'] as const).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setCurrentTab(tab)}
                className={cn(
                  "p-2 rounded-xl flex-1 flex flex-col items-center gap-1 h-full transition-all",
                  currentTab === tab 
                    ? "bg-gradient-to-r from-neon-purple/20 backdrop-blur-sm text-neon-purple" 
                    : "text-gray-400 hover:text-white"
                )}
                whileTap={{ scale: 0.95 }}
              >
                {tab === 'home' && <Home className="w-5 h-5" />}
                {tab === 'study' && <BookOpen className="w-5 h-5" />}
                {tab === 'trends' && <Sparkles className="w-5 h-5" />}
                {tab === 'profile' && <User className="w-5 h-5" />}
                <span className="text-xs font-medium">{tab.toUpperCase()}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default App
