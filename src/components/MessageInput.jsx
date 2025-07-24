import { useRef, useState, useCallback } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const typingTimeoutRef = useRef(null);

  const { setTyping, isTyping, emitTyping } = useChatStore();
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleTypingStart = useCallback(() => {
    if (!isTyping) {
      setTyping(true);
      emitTyping(true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing after 3 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
      emitTyping(false);
    }, 3000);
  }, [isTyping, setTyping, emitTyping]);

  const handleTypingStop = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setTyping(false);
    emitTyping(false);
  }, [setTyping, emitTyping]);

  const handleTextInput = (e) => {
    e.preventDefault();
    setText(e.target.value);
    
    if (e.target.value.trim()) {
      handleTypingStart();
    } else {
      handleTypingStop();
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    // Stop typing when sending message
    handleTypingStop();

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-3 sm:p-4 w-full bg-base-200 border-t border-base-300">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-base-300"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-error text-error-content
              flex items-center justify-center hover:bg-error/80 transition-colors"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2 sm:gap-3">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md focus:input-primary"
            placeholder="Type a message..."
            value={text}
            onChange={handleTextInput}
            onBlur={handleTypingStop}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`btn btn-ghost btn-sm sm:btn-md btn-circle flex-shrink-0
                     ${imagePreview ? "text-primary" : "text-base-content/60"}
                     hover:bg-base-300 transition-colors`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="size-4 sm:size-5" />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-sm sm:btn-md btn-circle flex-shrink-0 disabled:btn-disabled"
          disabled={!text.trim() && !imagePreview}
        >
          <Send className="size-4 sm:size-5" />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;