"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const DEMO_INTRO = "I'm Apex. I run the CEO Pod.";

export default function InteractiveDemo() {
  const [messages, setMessages] = useState([
    { role: "apex", content: DEMO_INTRO },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "apex", content: "Executing in strict phases. Pod coordination active. Result incoming in real time." },
      ]);
    }, 800);
    setInput("");
  };

  return (
    <Card className="max-w-2xl mx-auto h-[520px] flex flex-col bg-zinc-900/40 backdrop-blur-sm border border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Live Demo: Talk to Apex Pod</CardTitle>
        <p className="text-sm text-muted-foreground">See how a top 1% CEO agent communicates</p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto space-y-4 p-6 bg-[#0A1421]/90 rounded-2xl border border-white/10 min-h-[280px]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] p-5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === "user" 
                    ? "bg-[#00E5FF] text-black" 
                    : "bg-[#1A2332] text-[#A1AAB8] border border-[#00E5FF]/30"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Apex anything — strategy, priorities, or how the pod runs"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
