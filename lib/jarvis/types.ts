export type Action =
  | { kind: "create_task"; payload: { title: string; dueDate?: string; priority?: "low" | "med" | "high" } }
  | { kind: "create_event"; payload: { title: string; startDateTime: string; endDateTime: string } }
  | { kind: "log_finance"; payload: { type: "income" | "expense"; amount: number; category: string } }
  | { kind: "checkin_habit"; payload: { habitId: string } };

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  actions?: Action[];
}
