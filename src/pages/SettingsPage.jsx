import { Link } from "react-router-dom";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, ArrowLeft, Palette } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200 pt-16 sm:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-5xl">
        {/* Back Button */}
        <Link 
          to="/" 
          className="btn btn-ghost btn-sm sm:btn-md mb-4 sm:mb-6 gap-2 hover:bg-base-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Back</span>
        </Link>

        <div className="bg-base-100 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start mb-2">
              <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-base-content">Settings</h1>
            </div>
            <p className="text-sm sm:text-base text-base-content/70">
              Customize your chat experience
            </p>
          </div>

          {/* Theme Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col gap-1 sm:gap-2">
              <h2 className="text-lg sm:text-xl font-semibold text-base-content">Theme</h2>
              <p className="text-sm sm:text-base text-base-content/70">
                Choose a theme for your chat interface
              </p>
            </div>

            {/* Theme Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    group flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-lg transition-all duration-200
                    ${theme === t 
                      ? "bg-primary/10 ring-2 ring-primary/30 scale-105" 
                      : "hover:bg-base-200/50 hover:scale-102"
                    }
                  `}
                  onClick={() => setTheme(t)}
                >
                  <div className="relative h-6 sm:h-8 w-full rounded-md overflow-hidden shadow-sm" data-theme={t}>
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-medium truncate w-full text-center">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                  {theme === t && (
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-base-content">Preview</h3>
            <div className="rounded-xl sm:rounded-2xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
              <div className="p-3 sm:p-4 lg:p-6 bg-base-200">
                <div className="max-w-lg mx-auto">
                  {/* Mock Chat UI */}
                  <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                    {/* Chat Header */}
                    <div className="px-3 sm:px-4 py-3 border-b border-base-300 bg-base-100">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium text-xs sm:text-sm">
                          J
                        </div>
                        <div>
                          <h3 className="font-medium text-xs sm:text-sm">John Doe</h3>
                          <p className="text-[10px] sm:text-xs text-base-content/70">Online</p>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-[150px] sm:min-h-[200px] max-h-[150px] sm:max-h-[200px] overflow-y-auto bg-base-100">
                      {PREVIEW_MESSAGES.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`
                              max-w-[85%] sm:max-w-[80%] rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-sm
                              ${message.isSent 
                                ? "bg-primary text-primary-content" 
                                : "bg-base-200"
                              }
                            `}
                          >
                            <p className="text-xs sm:text-sm">{message.content}</p>
                            <p
                              className={`
                                text-[9px] sm:text-[10px] mt-1 sm:mt-1.5
                                ${message.isSent 
                                  ? "text-primary-content/70" 
                                  : "text-base-content/70"
                                }
                              `}
                            >
                              12:00 PM
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-3 sm:p-4 border-t border-base-300 bg-base-100">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="input input-bordered flex-1 text-xs sm:text-sm h-8 sm:h-10 input-sm sm:input-md"
                          placeholder="Type a message..."
                          value="This is a preview"
                          readOnly
                        />
                        <button className="btn btn-primary h-6 sm:h-10 min-h-0 btn-sm sm:btn-md px-2 sm:px-4">
                          <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;