import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, ArrowLeft, Calendar, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-base-200 pt-16 sm:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="btn btn-ghost btn-sm sm:btn-md mb-4 sm:mb-6 gap-2 hover:bg-base-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Back</span>
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="bg-base-100 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-base-content">Profile</h1>
              <p className="mt-2 text-sm sm:text-base text-base-content/70">Manage your profile information</p>
            </div>

            {/* Avatar Upload Section */}
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className="relative group">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-24 sm:size-32 lg:size-36 rounded-full object-cover border-4 border-primary/20 shadow-lg transition-all duration-300 group-hover:border-primary/40"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-0 right-0 
                    bg-primary hover:bg-primary-focus text-primary-content
                    p-2 sm:p-3 rounded-full cursor-pointer 
                    shadow-lg hover:shadow-xl hover:scale-110
                    transition-all duration-200
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <div className="text-center">
                <p className="text-xs sm:text-sm text-base-content/60">
                  {isUpdatingProfile
                    ? (
                      <span className="flex items-center gap-2 justify-center">
                        <span className="loading loading-spinner loading-sm"></span>
                        Uploading...
                      </span>
                    )
                    : "Click the camera icon to update your photo"}
                </p>
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-4 sm:space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Full Name
                  </span>
                </label>
                <div className="input input-bordered flex items-center bg-base-200 cursor-not-allowed">
                  <span className="text-sm sm:text-base">{authUser?.fullName}</span>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email Address
                  </span>
                </label>
                <div className="input input-bordered flex items-center bg-base-200 cursor-not-allowed">
                  <span className="text-sm sm:text-base">{authUser?.email}</span>
                </div>
              </div>
            </div>

            {/* Account Information Card */}
            <div className="bg-base-200 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-base-300">
              <h2 className="text-lg sm:text-xl font-semibold text-base-content mb-4 sm:mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Account Information
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between py-2 sm:py-3 border-b border-base-300">
                  <span className="text-sm sm:text-base text-base-content/70 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Member Since
                  </span>
                  <span className="text-sm sm:text-base font-medium">
                    {new Date(authUser.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 sm:py-3">
                  <span className="text-sm sm:text-base text-base-content/70">Account Status</span>
                  <div className="badge badge-success gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Active
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-primary/10">
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-medium text-base-content mb-2">
                  Welcome to VibeTalk! 🎧
                </h3>
                <p className="text-xs sm:text-sm text-base-content/60">
                  Start connecting with friends and enjoy seamless conversations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;