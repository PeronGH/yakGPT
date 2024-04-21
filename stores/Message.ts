import { getEncoding } from "js-tiktoken";

const encoder = getEncoding("cl100k_base");

export const countTokens = (text: string) => encoder.encode(text).length;

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  loading?: boolean;
}

// Truncate messages
export function truncateMessages(
  messages: Message[],
  modelMaxTokens: number,
  userMaxTokens: number,
): Message[] {
  if (messages.length <= 1) return messages;

  if (!userMaxTokens) {
    // Try to reserve some room for the model output by default
    userMaxTokens = 1024;
  }
  const targetTokens = modelMaxTokens - userMaxTokens;

  // Never remove the system message
  let accumulatedTokens = 0;
  const ret = [];
  let startIdx = 0;

  if (messages[0].role === "system") {
    accumulatedTokens = countTokens(messages[0].content);
    ret.push(messages[0]);
    startIdx = 1;
  }

  // Try to truncate messages as is
  for (let i = messages.length - 1; i >= startIdx; i--) {
    const message = messages[i];
    const tokens = countTokens(message.content);
    if (accumulatedTokens + tokens > targetTokens) {
      break;
    }
    accumulatedTokens += tokens;
    // Insert at position 1
    ret.splice(1, 0, message);
  }
  return ret;
}
