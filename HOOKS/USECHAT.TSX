import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

// Mock AI API - Thay bằng Gemini/OpenRouter sau
const mockAIResponse = async (messages: any[], systemPrompt: string) => {
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const lastUserMessage = messages[messages.length - 1].content.toLowerCase()
  
  // Gen Z responses theo chương trình học
  const responses: Record<string, string> = {
    // Toán lớp 8-9
    'phương trình': 'Ok cậu, phương trình bậc 2 ax² + bx + c = 0 giải theo công thức Δ = b² - 4ac nhé. Cậu đưa đề bài cụ thể tớ giải chi tiết! 📐',
    'hình học': 'Hình học lớp 8 hả cậu? Định lý Pythagoras hay diện tích hình thang? Gửi tớ đề bài nào! 🧮',
    
    // Tiếng Anh Global Success
    'global success': 'Global Success lớp 8-9 đúng không cậu? Unit mấy vậy? Tớ giúp cậu từ vựng + ngữ pháp luôn!',
    'unit 1': 'Unit 1 Global Success 8 nói về Leisure activities đúng không? Vocab: camping, fishing, hiking... Cậu cần luyện speaking hay grammar?',
    
    // Tâm sự Gen Z
    'chán': 'Chán vì bài vở ngập đầu hay crush không rep hả cậu? 😅 Kể tớ nghe, mình gỡ rối từng chút một!',
    'mệt': 'Nghe cậu mệt kiểu rút hết pin luôn á. Hôm nay học mấy tiết rồi? Nghỉ tí uống trà sữa với tớ không? 🧋',
    'crush': 'Crush chuyện hả cậu! 🔥 Kể tớ nghe coi, kiểu crush cùng lớp hay crush online? Tớ tư vấn chiến lược đây!',
  }
  
  for (const [key, response] of Object.entries(responses)) {
    if (lastUserMessage.includes(key)) return response
  }
  
  return 'Ừm, thú vị đấy cậu! Cậu đang nghĩ gì vậy? Tớ sẵn sàng
