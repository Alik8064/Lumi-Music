import React, { useState } from 'react';
import { User, Settings, Globe, Bot, Sparkles, Send } from 'lucide-react';

export default function ProfilePage() {
  const [language, setLanguage] = useState('Русский');
  const [aiQuery, setAiQuery] = useState('');
  const [aiChat, setAiChat] = useState([
    { role: 'ai', text: 'Привет! Я Lumi AI, твой персональный помощник в приложении. Чем могу помочь?' }
  ]);

  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    const userMsg = aiQuery;
    setAiChat(prev => [...prev, { role: 'user', text: userMsg }, { role: 'ai', text: `Lumi AI думает над запросом: "${userMsg}"... Всё под контролем, боксёр!` }]);
    setAiQuery('');
  };

  return (
    <div className="p-4 space-y-6 pb-24 text-white">
      {/* Шапка профиля */}
      <div className="flex items-center gap-3 bg-gray-900/80 p-4 rounded-xl border border-gray-800">
        <div className="w-12 h-12 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-full flex items-center justify-center font-bold text-lg">
          🥊
        </div>
        <div>
          <h2 className="text-base font-bold">Боксёр</h2>
          <p className="text-xs text-gray-400">Премиум аккаунт активен</p>
        </div>
      </div>

      {/* Настройки языка */}
      <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-800 space-y-3">
        <h3 className="text-xs font-semibold text-pink-400 flex items-center gap-1.5">
          <Globe className="w-4 h-4" /> Язык приложения
        </h3>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-gray-950 text-xs px-3 py-2 rounded-lg border border-gray-700 outline-none text-white"
        >
          <option>Русский</option>
          <option>English</option>
          <option>Türkçe</option>
          <option>Oʻzbekcha</option>
        </select>
      </div>

      {/* Lumi AI Чат */}
      <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-800 space-y-3">
        <h3 className="text-xs font-semibold text-pink-400 flex items-center gap-1.5">
          <Bot className="w-4 h-4 text-purple-400" /> Lumi AI Ассистент
        </h3>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
          {aiChat.map((msg, idx) => (
            <div key={idx} className={`p-2 rounded-lg text-xs ${msg.role === 'user' ? 'bg-pink-600/20 text-pink-200 ml-4' : 'bg-gray-950 text-gray-300 mr-4 border border-gray-800'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleAiSend} className="flex gap-1.5 pt-1">
          <input 
            type="text" 
            placeholder="Спросить Lumi AI..." 
            value={aiQuery} 
            onChange={(e) => setAiQuery(e.target.value)}
            className="flex-1 bg-gray-950 text-xs px-3 py-2 rounded-lg border border-gray-700 outline-none text-white"
          />
          <button type="submit" className="bg-pink-600 px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center">
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
