"use client";

import { create } from "zustand";
import { loadState, saveState } from "@/lib/storage/localStorageAdapter";
import { Action, ChatMessage } from "@/lib/jarvis/types";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "med" | "high";
  status: "todo" | "done";
  tags: string[];
}

export interface EventItem {
  id: string;
  title: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  notes: string;
}

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly" | "custom";
  targetPerPeriod: number;
  reminderTime?: string;
  streak: number;
  bestStreak: number;
  consistency: number;
  lastCheckin?: string;
}

export interface FinanceEntry {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
  description: string;
}

interface AppState {
  tasks: Task[];
  events: EventItem[];
  habits: Habit[];
  finances: FinanceEntry[];
  messages: ChatMessage[];
  hydrated: boolean;
  hydrate: () => void;
  addTask: (task: Omit<Task, "id">) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  upsertEvent: (event: Omit<EventItem, "id"> & { id?: string }) => void;
  deleteEvent: (id: string) => void;
  upsertHabit: (habit: Omit<Habit, "id" | "streak" | "bestStreak" | "consistency"> & { id?: string }) => void;
  checkinHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
  addFinance: (entry: Omit<FinanceEntry, "id">) => void;
  deleteFinance: (id: string) => void;
  pushMessage: (message: ChatMessage) => void;
  applyAction: (action: Action) => void;
}

const id = () => Math.random().toString(36).slice(2, 10);

const seed = {
  tasks: [{ id: id(), title: "Planejar sprint", description: "Backlog técnico", dueDate: new Date().toISOString(), priority: "high" as const, status: "todo" as const, tags: ["produto"] }],
  events: [{ id: id(), title: "Review semanal", startDateTime: new Date().toISOString(), endDateTime: new Date(Date.now() + 3600000).toISOString(), location: "Sala virtual", notes: "Revisar métricas" }],
  habits: [{ id: id(), name: "Leitura técnica", frequency: "daily" as const, targetPerPeriod: 1, reminderTime: "08:00", streak: 4, bestStreak: 8, consistency: 0.76 }],
  finances: [{ id: id(), type: "expense" as const, amount: 120, category: "Software", date: new Date().toISOString(), description: "Assinatura" }],
  messages: []
};

const persist = (state: Pick<AppState, "tasks" | "events" | "habits" | "finances" | "messages">) => saveState(state);

export const useAppStore = create<AppState>((set, get) => ({
  ...seed,
  hydrated: false,
  hydrate: () => {
    const restored = loadState(seed);
    set({ ...restored, hydrated: true });
  },
  addTask: (task) => set((state) => {
    const tasks = [{ id: id(), ...task }, ...state.tasks];
    persist({ ...state, tasks });
    return { tasks };
  }),
  toggleTask: (taskId) => set((state) => {
    const tasks = state.tasks.map((task) => task.id === taskId ? { ...task, status: task.status === "done" ? "todo" : "done" } : task);
    persist({ ...state, tasks });
    return { tasks };
  }),
  deleteTask: (taskId) => set((state) => {
    const tasks = state.tasks.filter((task) => task.id !== taskId);
    persist({ ...state, tasks });
    return { tasks };
  }),
  upsertEvent: (event) => set((state) => {
    const events = event.id ? state.events.map((ev) => ev.id === event.id ? { ...ev, ...event, id: ev.id } : ev) : [{ ...event, id: id() }, ...state.events];
    persist({ ...state, events });
    return { events };
  }),
  deleteEvent: (eventId) => set((state) => {
    const events = state.events.filter((ev) => ev.id !== eventId);
    persist({ ...state, events });
    return { events };
  }),
  upsertHabit: (habit) => set((state) => {
    const habits = habit.id
      ? state.habits.map((h) => h.id === habit.id ? { ...h, ...habit, id: h.id } : h)
      : [{ id: id(), ...habit, streak: 0, bestStreak: 0, consistency: 0 }, ...state.habits];
    persist({ ...state, habits });
    return { habits };
  }),
  checkinHabit: (habitId) => set((state) => {
    const habits = state.habits.map((habit) => {
      if (habit.id !== habitId) return habit;
      const streak = habit.streak + 1;
      return { ...habit, streak, bestStreak: Math.max(streak, habit.bestStreak), consistency: Math.min(1, habit.consistency + 0.03), lastCheckin: new Date().toISOString() };
    });
    persist({ ...state, habits });
    return { habits };
  }),
  deleteHabit: (habitId) => set((state) => {
    const habits = state.habits.filter((habit) => habit.id !== habitId);
    persist({ ...state, habits });
    return { habits };
  }),
  addFinance: (entry) => set((state) => {
    const finances = [{ id: id(), ...entry }, ...state.finances];
    persist({ ...state, finances });
    return { finances };
  }),
  deleteFinance: (entryId) => set((state) => {
    const finances = state.finances.filter((entry) => entry.id !== entryId);
    persist({ ...state, finances });
    return { finances };
  }),
  pushMessage: (message) => set((state) => {
    const messages = [...state.messages, message];
    persist({ ...state, messages });
    return { messages };
  }),
  applyAction: (action) => {
    const state = get();
    if (action.kind === "create_task") {
      state.addTask({ title: action.payload.title, description: "Criada via JARVIS", dueDate: action.payload.dueDate ?? new Date().toISOString(), priority: action.payload.priority ?? "med", status: "todo", tags: ["jarvis"] });
    }
    if (action.kind === "create_event") {
      state.upsertEvent({ title: action.payload.title, startDateTime: action.payload.startDateTime, endDateTime: action.payload.endDateTime, location: "", notes: "Criado via JARVIS" });
    }
    if (action.kind === "log_finance") {
      state.addFinance({ type: action.payload.type, amount: action.payload.amount, category: action.payload.category, date: new Date().toISOString(), description: "Registrado via JARVIS" });
    }
    if (action.kind === "checkin_habit") {
      state.checkinHabit(action.payload.habitId);
    }
  }
}));
