# Chat App Frontend

A modern, real-time chat application built with React, Vite, and Socket.IO. This frontend provides a beautiful and responsive user interface for messaging with real-time communication capabilities.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using Socket.IO
- **User Authentication**: Secure login/signup functionality
- **Responsive Design**: Beautiful UI that works on all devices
- **Theme Support**: Light/dark theme switching
- **User Profiles**: Customizable user profiles with avatar support
- **Modern UI**: Built with Tailwind CSS and DaisyUI components
- **State Management**: Efficient state management with Zustand

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Socket.IO Client** - Real-time bidirectional communication
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful UI components for Tailwind
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Elegant notifications

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChatContainer.jsx    # Main chat interface
│   ├── ChatHeader.jsx      # Chat header with user info
│   ├── MessageInput.jsx    # Message input component
│   ├── Navbar.jsx          # Navigation bar
│   ├── NoChatSelected.jsx  # Empty state component
│   ├── Sidebar.jsx         # User list sidebar
│   └── skeletons/          # Loading skeleton components
├── pages/              # Page components
│   ├── HomePage.jsx        # Main chat page
│   ├── LoginPage.jsx       # User login
│   ├── ProfilePage.jsx     # User profile
│   ├── SettingsPage.jsx    # App settings
│   └── SignUpPage.jsx      # User registration
├── store/              # State management
│   ├── useAuthStore.js     # Authentication state
│   ├── useChatStore.js     # Chat state
│   └── useThemeStore.js    # Theme state
├── lib/                # Utility libraries
│   ├── axios.js            # Axios configuration
│   └── utils.js            # Helper functions
└── constants/          # App constants
    └── index.js
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend server running (for full functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SERVER_URL=http://localhost:5000
```

### Backend Integration

This frontend is designed to work with a corresponding backend server. Make sure your backend is running and accessible at the configured server URL.

## 🎨 Theming

The app supports multiple themes using DaisyUI. Users can switch between light and dark themes from the settings page.

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🔐 Authentication

The app includes:
- User registration with email validation
- Secure login system
- Protected routes
- Persistent authentication state

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Vercel/Netlify

1. Build the project
2. Upload the `dist/` folder to your hosting provider
3. Configure environment variables on your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the blazing fast build tool
- Socket.IO for real-time communication
- Tailwind CSS for the beautiful styling system
