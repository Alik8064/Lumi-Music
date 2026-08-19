import React, { useState } from 'react';
import { Radio, Users, Send, UserPlus, ShieldAlert, MessageSquare } from 'lucide-react';

export default function StreamPage({ onBack }) {
  // Сообщения глобального чата
  const [messages, setMessages] = useState([
    { id: 1, user: "Алекс", text: "Всем привет в этом эфире! 🔥", strike: false },
    { id: 2, user: "Тимур", text: "Отличный трек играет", strike: false }
  ]);
  const [inputText, setInputText] = useState("");

  // Список друзей и личные чаты
  const [friends, setFriends] = useState([
    { id: 1, name: "Макс", status: "В сети" },
    { id: 2, name: "Бек", status: "Слушает Lumi Music" }
  ]);
  const [newFriendName, setNewFriendName] = useState("");
  const [activeChatFriend, setActiveChatFriend] = useState(null); // Если выбран друг, открывается личный чат
  const [friendMessages, setFriendMessages] = useState({});
  const [friendInput, setFriendInput] = useState("");

  // ИИ-модератор (список запрещенных слов для примера)
  const badWords = ["мат", "хер", "блять", "сука", "епт"];

  const checkAiModeration = (text) => {
    const lower = text.toLowerCase();
    return badWords.some(word => lower.includes(word));
  };

  // Отправка в глобальный чат с ИИ-страйком
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (checkAiModeration(inputText)) {
      setMessages([
        ...messages, 
        { id: Date.now(), user: "AI Модератор", text: "⚠️ Нарушение правил! Сообщение удалено, выдан Strike.", strike: true }
      ]);
      setInputText("");
      return;
    }

    setMessages([...messages, { id: Date.now(), user: "Ты (Боксёр)", text: inputText, strike: false }]);
    setInputText("");
  };

  // Добавление друга
  const addFriend = () => {
    if (!newFriendName.trim()) return;
    setFriends([...friends, { id: Date.now(), name: newFriendName, status: "Новый друг" }]);
    setNewFriendName("");
  };

  // Отправка в личный чат с другом
  const sendFriendMessage = (e) => {
    e.preventDefault();
    if (!friendInput.trim() || !activeChatFriend) return;

    const currentChat = friendMessages[activeChatFriend.id] || [];
    setFriendMessages({
      ...friendMessages,
      [activeChatFriend.id]: [...currentChat, { sender: "Ты", text: friendInput }]
    });
    setFriendInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-[#0D0D12] text-white">
      
      {/* Шапка эфира */}
      <div className="p-3 border-b border-gray-800 flex items-center justify-between">
        <h1 className="text-sm font-bold flex items-center gap-2">
          <Radio className="w-4 h-4 text-pink-500 animate-pulse" /> Прямой эфир и Друзья
        </h1>
        <button onClick={onBack} className="text-xs text-gray-400">Назад</button>
      </div>

      {/* Верхняя часть (30%): Плеер / Видеоэфир */}
      <div className="h-[30%] bg-gradient-to-r from-purple-900/40 to-pink-900/40 p-4 flex flex-col justify-between border-b border-gray-800 shrink-0">
        <div className="flex justify-between items-center">
          <span className="bg-pink-600 text-[10px] px-2 py-0.5 rounded-full font-semibold">LIVE Эфир</span>
          <span className="text-[10px] text-gray-300 flex items-center gap-1">
            <Users className="w-3 h-3" /> 342 зрителя
          </span>
        </div>
        <div>
          <h2 className="text-base font-bold">Глобальный музыкальный поток</h2>
          <p className="text-[11px] text-gray-400">Слева друзья и личные чаты, справа — общий чат с ИИ-модерированием</p>
        </div>
      </div>

      {/* Нижняя часть (70%): Разделение на Друзей и Глобальный чат */}
      <div className="h-[70%] flex overflow-hidden">
        
        {/* Левая колонка: Друзья */}
        <div className="w-1/3 border-r border-gray-800 p-2 flex flex-col overflow-y-auto bg-gray-950/40">
          <h3 className="text-xs font-semibold text-pink-400 mb-2 flex items-center gap-1">
            👤 Друзья
          </h3>
          <div className="space-y-1.5 mb-2">
            {friends.map(f => (
              <div 
                key={f.id} 
                onClick={() => setActiveChatFriend(f)}
                className={`p-2 rounded-lg text-[11px] cursor-pointer border ${activeChatFriend?.id === f.id ? 'bg-pink-600/20 border-pink-500' : 'bg-gray-900 border-gray-800 hover:border-gray-700'}`}
              >
                <div className="font-semibold">{f.name}</div>
                <div className="text-[9px] text-gray-400">{f.status}</div>
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-1">
            <input 
              type="text" placeholder="Имя друга..." value={newFriendName} onChange={(e) => setNewFriendName(e.target.value)}
              className="w-full bg-gray-900 text-[10px] px-2 py-1.5 rounded border border-gray-700 outline-none text-white"
            />
            <button onClick={addFriend} className="w-full bg-pink-600 py-1.5 rounded text-[10px] font-semibold flex items-center justify-center gap-1">
              <UserPlus className="w-3 h-3" /> Добавить
            </button>
          </div>
        </div>

        {/* Правая колонка: Глобальный чат ИЛИ личный чат с другом */}
        <div className="w-2/3 flex flex-col justify-between p-2 overflow-hidden">
          
          {activeChatFriend ? (
            /* Личный чат с другом */
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center pb-2 border-b border-gray-800 mb-2">
                <span className="text-xs font-bold text-pink-400">Чат с: {activeChatFriend.name}</span>
                <button onClick={() => setActiveChatFriend(null)} className="text-[10px] text-gray-400">В общий чат</button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1.5 mb-2">
                {(friendMessages[activeChatFriend.id] || []).map((msg, idx) => (
                  <div key={idx} className="bg-gray-900 p-2 rounded text-[11px]">
                    <span className="font-bold text-gray-400 mr-1">{msg.sender}:</span> {msg.text}
                  </div>
                ))}
              </div>
              <form onSubmit={sendFriendMessage} className="flex gap-1">
                <input 
                  type="text" placeholder="Сообщение другу..." value={friendInput} onChange={(e) => setFriendInput(e.target.value)}
                  className="flex-1 bg-gray-900 text-[11px] px-2 py-1.5 rounded border border-gray-700 outline-none text-white"
                />
                <button type="submit" className="bg-pink-600 px-3 py-1.5 rounded text-[11px] font-semibold"><Send className="w-3 h-3" /></button>
              </form>
            </div>
          ) : (
            /* Глобальный чат с ИИ-модератором */
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-semibold text-gray-400 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-pink-400" /> Глобальный чат (AI контроль мата)
                  </span>
                </div>
                <div className="space-y-1.5 overflow-y-auto max-h-[160px] pr-1">
                  {messages.map((m) => (
                    <div key={m.id} className={`p-2 rounded border text-[11px] ${m.strike ? 'bg-red-950/40 border-red-800 text-red-300' : 'bg-gray-900/80 border-gray-800 text-gray-200'}`}>
                      <span className={`font-bold mr-2 ${m.strike ? 'text-red-400' : 'text-pink-400'}`}>{m.user}:</span>
                      <span>{m.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-1 mt-2">
                <input 
                  type="text" placeholder="Написать в эфир (AI следит за порядком)..." value={inputText} onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-gray-900 text-white text-[11px] px-2.5 py-2 rounded border border-gray-700 outline-none"
                />
                <button type="submit" className="bg-pink-600 px-3 py-2 rounded text-[11px] font-semibold flex items-center justify-center">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
