interface Props {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: Props) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm
        ${
          isUser
            ? "bg-black text-white rounded-br-sm"
            : "bg-white text-gray-800 border rounded-bl-sm"
        }`}
      >
        {content}
      </div>
    </div>
  );
};