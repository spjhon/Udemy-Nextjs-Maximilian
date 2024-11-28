export interface messagesTypes {
  id: number;
  text: string;
}

interface messagesPropsTypes {
  messages: messagesTypes[]; 
}

export default function Messages({ messages }: messagesPropsTypes) {
  return (
    <ul className="messages">
      {messages.map((message) => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
}
