export type Phase = "idle" | "lagging" | "enabling" | "ready";

export interface ChatMessage {
  id: number;
  role: "user" | "ai";
  lines: number;
}

// A long, fixed fake conversation. The content is skeleton bars rather than
// text, so the demo never needs invented chat messages.
function buildConversation(total: number): ChatMessage[] {
  const messages: ChatMessage[] = [];
  for (let i = 0; i < total; i += 1) {
    const role: ChatMessage["role"] = i % 2 === 0 ? "user" : "ai";
    const lines = role === "user" ? 1 + (i % 2) : 2 + (i % 4);
    messages.push({ id: i, role, lines });
  }
  return messages;
}

export const conversation = buildConversation(44);

// How many messages the live demo shows before you load older ones.
export const initialWindow = 12;
export const loadStep = 8;
