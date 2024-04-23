import { Chat } from "./Chat";
import { Message } from "./Message";

export const getChatById = (
  chats: Chat[],
  chatId: string | undefined,
): Chat | undefined => {
  return chats.find((c) => c.id === chatId);
};

export const updateChatMessages = (
  chats: Chat[],
  chatId: string,
  updateFunc: (messages: Message[]) => Message[],
): Chat[] => {
  return chats.map((c) => {
    if (c.id === chatId) {
      c.messages = updateFunc(c.messages);
    }
    return c;
  });
};

// Copied from https://github.com/remarkjs/react-markdown/issues/785#issuecomment-1966495891
export const preprocessLaTeX = (content: string) => {
  // Replace block-level LaTeX delimiters \[ \] with $$ $$

  const blockProcessedContent = content.replace(
    /\\\[(.*?)\\\]/gs,
    (_, equation) => `$$${equation}$$`,
  );
  // Replace inline LaTeX delimiters \( \) with $ $
  const inlineProcessedContent = blockProcessedContent.replace(
    /\\\((.*?)\\\)/gs,
    (_, equation) => `$${equation}$`,
  );
  return inlineProcessedContent;
};

export interface SimpleNode {
  value?: string;
  children?: SimpleNode[];
}

export function collectNodeText(node: SimpleNode): string {
  if (node.value) {
    return node.value;
  }

  if (node.children) {
    return node.children.map(collectNodeText).join("");
  }

  return "";
}
