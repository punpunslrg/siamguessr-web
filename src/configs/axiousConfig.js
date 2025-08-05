import axios from "axios";
import useUserStore from "../stores/userStore";

// สร้าง Instance พร้อมตั้งค่าพื้นฐาน
const apiClient = axios.create({
  baseURL: 'http://localhost:8890/api', // <-- Base URL ของ API ทั้งหมด
});

// *** ส่วนที่ทรงพลังที่สุด: Interceptors ***

// 1. Request Interceptor: ทำงาน "ก่อน" ที่ Request จะถูกส่งออกไป
apiClient.interceptors.request.use(
  (config) => {
    // ดึง token จาก store หรือ local storage
    const token = useUserStore.getState().token;
    if (token) {
      // ถ้ามี token, ให้แนบไปกับทุก Request โดยอัตโนมัติ
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Response Interceptor: ทำงาน "หลัง" จากที่ได้รับ Response กลับมา
apiClient.interceptors.response.use(
  (response) => response, // ถ้าสำเร็จ (2xx) ก็ส่ง response กลับไป
  (error) => {
    // ถ้าล้มเหลว (4xx, 5xx), เราจะจัดการ Error ที่นี่ที่เดียว
    const errorMessage = 
      error.response?.data?.error || 
      error.response?.data?.message || 
      'An unexpected error occurred.';
    
    // ส่งต่อ Error ที่มีข้อความที่สะอาดแล้วออกไป
    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;