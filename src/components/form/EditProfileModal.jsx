import useUserStore from "../../stores/userStore";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const EditProfileModal = ({ isOpen, onClose, user }) => {
  const [username, setUsername] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  const updateProfile = useUserStore((state) => state.updateProfile);

  // เมื่อ user prop เปลี่ยน (เช่น เปิด modal ครั้งแรก) ให้ตั้งค่า state เริ่มต้น
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setImagePreview(user.image || "");
      setImageFile(null); // รีเซ็ตไฟล์ทุกครั้งที่เปิด
    }
  }, [user, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // สร้าง URL ชั่วคราวสำหรับ preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData();
    // เพิ่ม username เข้าไปถ้ามีการเปลี่ยนแปลงจากเดิม
    if (username !== user.username) {
      formData.append("username", username);
    }
    // เพิ่มไฟล์รูปเข้าไปถ้ามีการเลือกไฟล์ใหม่
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // ถ้าไม่มีอะไรเปลี่ยนแปลงเลย ก็ไม่ต้องยิง API
    if (!imageFile && username === user.username) {
      toast.info("No changes to save.");
      setIsSaving(false);
      onClose();
      return;
    }

    const result = await updateProfile(formData);

    if (result.success) {
      toast.success(result.message);
      onClose(); // ปิด modal เมื่อสำเร็จ
    } else {
      toast.error(result.message);
    }
    setIsSaving(false);
  };

  if (!isOpen) return null;

  return (
    <dialog id="edit_profile_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Edit Profile</h3>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Image Preview and Upload */}
            <div className="flex flex-col items-center gap-4">
              <div className="avatar">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-gray-300 shadow-md">
                  {
                    imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
                        No Image
                      </span>
                    )
                  }
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                accept="image/png, image/jpeg, image/gif"
                onChange={handleImageChange}
              />
            </div>

            {/* Username Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter new username"
                className="input input-bordered w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-action mt-6">
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditProfileModal;
