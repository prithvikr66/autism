// ReactionsModal.tsx
import React from "react";

interface ReactionsModalProps {
  visible: boolean;
  position: { x: number; y: number };
  onReactionClick: (reaction: string) => void;
}

const reactions = ["👍", "❤️", "😂", "😮", "😢", "👏"];

const ReactionsModal: React.FC<ReactionsModalProps> = ({
  visible,
  position,
  onReactionClick,
}) => {
  if (!visible) return null;

  return (
    <div
      className="absolute bg-white p-2 rounded shadow-lg flex space-x-2"
      style={{ top: position.y, left: position.x }}
    >
      {reactions.map((reaction) => (
        <button
          key={reaction}
          onClick={() => onReactionClick(reaction)}
          className="text-xl"
        >
          {reaction}
        </button>
      ))}
    </div>
  );
};

export default ReactionsModal;
