import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, otherUserTyping } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const getStatusText = () => {
    if (otherUserTyping) return "Typing...";
    return onlineUsers.includes(selectedUser._id) ? "Online" : "Offline";
  };

  return (
    <div className="p-3 sm:p-4 border-b border-base-300 bg-base-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-8 sm:size-10 rounded-full relative border border-base-300">
              <img 
                src={selectedUser.profilePic || "/avatar.png"} 
                alt={selectedUser.fullName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* User info */}
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-sm sm:text-base truncate">{selectedUser.fullName}</h3>
            <p className='text-xs sm:text-sm text-base-content/70'>
              {getStatusText()}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-sm p-1 sm:p-2 hover:bg-base-300 flex-shrink-0"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;