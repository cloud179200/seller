export const HTTP_RESPONSE_STATUS = {
  OK: 200,                   // Successful response
  CREATED: 201,              // Resource created successfully
  ACCEPTED: 202,             // Request accepted, processing pending
  NO_CONTENT: 204,           // Request successful, no content to send


  MULTIPLE_CHOICES: 300,     // Request has multiple possible responses, user agent can choose one
  MOVED_PERMANENTLY: 301,    // Resource has permanently moved to a new URL
  FOUND: 302,                // Resource has temporarily moved to a different URL
  SEE_OTHER: 303,            // Resource can be found at a different URL using GET method
  NOT_MODIFIED: 304,         // Resource has not been modified since last requested
  USE_PROXY: 305,            // Deprecated, should use proxy defined in Location header
  TEMPORARY_REDIRECT: 307,   // Resource has temporarily moved to a different URL using the same method
  PERMANENT_REDIRECT: 308,   // Resource has permanently moved to a different URL using the same method

  BAD_REQUEST: 400,          // Malformed request or client error
  UNAUTHORIZED: 401,         // Unauthorized access, authentication required
  FORBIDDEN: 403,            // Authenticated, but access to the resource is forbidden
  NOT_FOUND: 404,            // Requested resource not found
  METHOD_NOT_ALLOWED: 405,   // Method not supported for requested resource

  INTERNAL_SERVER_ERROR: 500, // Server encountered an unexpected condition
  BAD_GATEWAY: 502,            // Server received an invalid response from an upstream server
  SERVICE_UNAVAILABLE: 503,    // Server temporarily unable to handle the request
  GATEWAY_TIMEOUT: 504         // Gateway did not receive a timely response
};

export const HTTP_REQUEST_METHOD = {
  GET: "GET",           // Retrieve data from the server
  POST: "POST",         // Send data to the server to create a new resource
  PUT: "PUT",           // Update an existing resource on the server
  DELETE: "DELETE",     // Delete a resource on the server
  PATCH: "PATCH",       // Apply partial modifications to a resource
  HEAD: "HEAD",         // Retrieve headers of a resource without the body content
  OPTIONS: "OPTIONS",   // Retrieve the supported methods for a resource
};


export const FORM_VALIDATE_ERROR_MESSAGE = {
  INVALID: "Invalid field",
  INVALID_LENGTH: "Insufficient field length",
  REQUIRED: "Field cannot be empty",
};

export const API_MESSAGE = {
  SERVER_ERROR: "Server Error",
  SUCCESS: "Success",
  FAIL: "Failure",
  UPDATE_SUCCESS: "Update successfully",
  UPDATE_FAIL: "Update failed",
};

export const USER_ROLE = {
  1: "Admin",
  2: "Student",
  3: "Teacher",
};

export const NAME_TRANS_EN = {
  SIGN_IN: "Sign In",
  SIGN_IN_WITH_GOOGLE: "Sign In With Google",
  SIGN_IN_WITH_FACEBOOK: "Sign In With Facebook",
  SIGN_UP: "Sign Up",
  SIGN_OUT: "Sign Out",
  SETTINGS: "Settings",
  FIRST_NAME: "First Name",
  LAST_NAME: "Last Name",
  PHONE_NUMBER: "Phone Number",
  ADDRESS: "Address",
  EMAIL: "Email",
  PASSWORD: "Password",
  NEW_PASSWORD: "New Password",
  OLD_PASSWORD: "Old Password",
  SEND_EMAIL: "Send Email",
  SEND: "Send",
  CONFIRM_PASSWORD: "Confirm Password",
  ALREADY_HAVE_ACCOUNT: "Already have an account?",
  DONT_HAVE_ACCOUNT: "Don't have an account?",
  FORGOT_PASSWORD: "Forgot Password",
  CHECK_EMAIL_FOR_VERIFY: "Check Email to Verify Account!",
  VERIFY_EMAIL_SUCCESS: "Verification Successful",
  VERIFY_EMAIL_FAILED: "Verification Failed",
  SIGN_IN_TITLE: "Sign In with Email",
  SIGN_UP_TITLE: "Sign Up with Email",
  TEACHER: "Teacher",
  TEACHER_NAME: "Teacher Name",
  TEACHER_DELETE: "Delete Teacher",
  TEACHER_INFO: "Teacher Information",
  STUDENT: "Student",
  STUDENT_NAME: "Student Name",
  STUDENT_DELETE: "Delete Student",
  STUDENT_INFO: "Student Information",
  ADMIN: "Administrator",
  HOME: "Home",
  NEW: "New",
  ID: "Id",
  CLASS: "Class",
  CLASS_NAME: "Class Name",
  CLASS_FEE: "Fee",
  CLASS_NEW: "New Class",
  CLASS_EDIT: "Edit Class",
  CLASS_DELETE: "Delete Class",
  CLASS_ADD: "Add Class",
  APPLY_FILTER: "Apply Filter",
  CLEAR_FILTER: "Clear Filter",
  TRANSACTION_HISTORY: "Transaction History",
  CHANGE_PASSWORD: "Change Password",
  INFORMATION: "Information",
  DESCRIPTION: "Description",
  PAYMENT: "Payment",
  STAGE_ADD: "Add Lesson",
  STAGE_EDIT: "Edit Lesson",
  STAGE_NAME: "Lesson Name",
  STAGE_DELETE: "Delete Lesson",
  SAVE: "Save",
  ADD: "Add",
  EDIT: "Edit",
  NAME: "Name",
  LANDING_PAGE: "Landing Page",
  MALE: "Male",
  FEMALE: "Female",
  GENDER: "Gender",
  GENDER_OTHER: "Other",
  DATE_OF_BIRTH: "Date of Birth",
  PAYROLL_NEW: "New Salary Level",
  PAYROLL_ADD: "Add Salary Level",
  PAYROLL_EDIT: "Edit Salary Level",
  PAYROLL_DELETE: "Delete Salary Level",
  PAYROLL: "Salary Level",
  PAYROLL_NAME: "Salary Level Name",
  PAYROLL_VALUE: "Salary Level Value",
  BACK_HOME_PAGE: "Back Home Page",
};

export const NAME_TRANS_VN = {
  SIGN_IN: "Đăng Nhập",
  SIGN_IN_WITH_GOOGLE: "Đăng Nhập Bằng Google",
  SIGN_IN_WITH_FACEBOOK: "Đăng Nhập Bằng Facebook",
  SIGN_UP: "Đăng Ký",
  SIGN_OUT: "Đăng Xuất",
  SETTINGS: "Cài Đặt",
  FIRST_NAME: "Họ",
  LAST_NAME: "Tên",
  PHONE_NUMBER: "Số Điện Thoại",
  ADDRESS: "Địa Chỉ",
  EMAIL: "Email",
  PASSWORD: "Mật Khẩu",
  NEW_PASSWORD: "Mật Khẩu Mới",
  SEND_EMAIL: "Gửi Email",
  SEND: "Gửi",
  CONFIRM_PASSWORD: "Xác Nhận Mật Khẩu",
  ALREADY_HAVE_ACCOUNT: "Đã Có Tài Khoản",
  DONT_HAVE_ACCOUNT: "Không Có Tài Khoản",
  FORGOT_PASSWORD: "Quên Mật Khẩu",
  CHECK_EMAIL_FOR_VERIFY: "Kiểm Tra Email Để Xác Minh Tài Khoản!",
  VERIFY_EMAIL_SUCCESS: "Xác Minh Thành Công",
  VERIFY_EMAIL_FAILED: "Xác Minh Thất Bại",
  SIGN_IN_TITLE: "Đăng Nhập Với Email",
  SIGN_UP_TITLE: "Đăng Ký Với Email",
  TEACHER: "Giảng Viên",
  TEACHER_NAME: "Tên Giảng Viên",
  TEACHER_DELETE: "Xóa Giảng Viên",
  TEACHER_INFO: "Thông Tin Giảng Viên",
  STUDENT: "Học Viên",
  STUDENT_NAME: "Tên Học Viên",
  STUDENT_DELETE: "Xóa Học Viên",
  STUDENT_INFO: "Thông Tin Học Viên",
  ADMIN: "Quản Trị Viên",
  HOME: "Trang Chủ",
  NEW: "Mới",
  ID: "Id",
  CLASS: "Lớp",
  CLASS_NAME: "Tên Lớp",
  CLASS_FEE: "Phí",
  CLASS_NEW: "Lớp Mới",
  CLASS_EDIT: "Sửa Lớp",
  CLASS_DELETE: "Xóa Lớp",
  CLASS_ADD: "Thêm Lớp",
  APPLY_FILTER: "Áp Dụng Bộ Lọc",
  CLEAR_FILTER: "Xóa Bộ Lọc",
  TRANSACTION_HISTORY: "Lịch Sử Giao Dịch",
  CHANGE_PASSWORD: "Đổi Mật Khẩu",
  INFORMATION: "Thông Tin",
  DESCRIPTION: "Ghi Chú",
  PAYMENT: "Nộp Tiền",
  STAGE_ADD: "Thêm Buổi Học",
  STAGE_EDIT: "Sửa Buổi Học",
  STAGE_NAME: "Tên Buổi Học",
  STAGE_DELETE: "Xóa Buổi Học",
  SAVE: "Lưu",
  ADD: "Thêm",
  EDIT: "Sửa",
  NAME: "Tên",
  LANDING_PAGE: "Trang Quảng Cảo",
  MALE: "Nam",
  FEMALE: "Nữ",
  GENDER: "Giới Tính",
  GENDER_OTHER: "Khác",
  DATE_OF_BIRTH: "Ngày Giờ Sinh",
  PAYROLL_NEW: "Bậc Lương Mới",
  PAYROLL_ADD: "Thêm Bậc Lương",
  PAYROLL_EDIT: "Sửa Bậc Lương",
  PAYROLL_DELETE: "Xóa Bậc Lương",
  PAYROLL: "Bậc Lương",
  PAYROLL_NAME: "Tên Bậc Lương",
  PAYROLL_VALUE: "Giá Trị Bậc Lương",
};

export const STATUS_VERIFY_EMAIL = {
  SENT: "SENT",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;
export const DEFAULT_BACKGROUND_IMAGE = "linear-gradient(120deg, rgba(200,31,255,1) 0%, rgba(124,77,255,1) 60%, rgba(33,150,243,1) 100%)";

export const NEXT_AUTH_STATUS = {
  LOADING: "loading",
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated"
};

export const BRAND_NAME = {
  GOOGLE: "google"
};

export const NOTIFICATION_KEYS: { [k: string]: string } = {
  ADVERTING_EMAIL: "ADVERTING_EMAIL",
  PASSWORD_CHANGED: "PASSWORD_CHANGED",
};