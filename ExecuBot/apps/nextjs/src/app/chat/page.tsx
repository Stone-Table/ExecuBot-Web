"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setMessages(prev => [...prev, {role: "user", content: input}]);
    setInput("");

    try {
      const response = await fetch("http://0.0.0.0:8001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, {role: "assistant", content: data.answer}]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        role: "assistant", 
        content: "Sorry, there was an error processing your request."
      }]);
    }

    setLoading(false);
  };

  const handleNewConversation = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border px-8 py-6 sm:px-48 md:px-48 xl:px-48">
        <h1 className="text-center text-2xl font-bold dark:text-zinc-100">ExecuBot</h1>
        <p className="mt-2 text-center text-sm text-zinc-500">
          Your AI executive assistant powered by GitLab and Jira analytics
        </p>
        <p className="mt-1 text-center text-xs text-zinc-500">
          Ask questions about team productivity, project progress, and development metrics
        </p>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 p-4">
        <div className="flex justify-end">
          <button
            onClick={handleNewConversation}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            New Conversation
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-auto">
          {messages.length === 0 && (
            <div className="mt-8 text-center text-zinc-500">
              <p className="text-lg font-medium">Welcome to ExecuBot</p>
              <p className="mt-2 text-sm">
                I analyze your team's GitLab commits, merge requests, and Jira tickets to help you understand project progress and team performance.
              </p>
              <div className="mt-8 flex justify-center">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  className="max-w-md rounded-lg"
                >
                  <source src="https://s3.amazonaws.com/v.comb.io/8fTGAUqP/NEhPZv.mp4?1583343882424" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`rounded-lg border border-border p-4 ${
                message.role === "user" 
                  ? "ml-auto max-w-[80%] bg-background" 
                  : "mr-auto max-w-[80%] bg-zinc-50 dark:bg-zinc-900"
              }`}
            >
              {message.content}
            </div>
          ))}
          {loading && (
            <div className="mr-auto max-w-[80%] rounded-lg border border-border bg-zinc-50 p-4 dark:bg-zinc-900">
              <div className="flex gap-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: '150ms' }}></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your team's activities..."
            className="flex-1 rounded-lg border border-border bg-background p-2 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg border border-border bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </main>
    </div>
  );
}
