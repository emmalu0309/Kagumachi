// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // 開發客服聊天室中，開StrictMode會影響到websocket連線，先讓我關一陣子，謝謝。 (by HongJun)
  // <StrictMode>
    <App />
  // </StrictMode>
)