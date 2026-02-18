import { ChatMessage } from "@/lib/jarvis/types";
import { cn } from "@/lib/utils/cn";

export const MessageBubble = ({ message }: { message: ChatMessage }) => (
  <div className={cn("max-w-[80%] rounded-2xl px-3 py-2 text-sm", message.role === "user" ? "ml-auto bg-neon/20 text-neon" : "bg-white/10 text-slate-100") }>
    {message.content}
  </div>
);
