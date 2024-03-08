//Href
//SignIn
export const SIGN_IN_LINK = "/signin";
//SignUp
export const SIGN_UP_LINK = "/signup";
//SignUp
export const SIGN_OUT_LINK = "/signout";

//Validation
//SignIn

//SignUp
//Username
export const VAL_USERNAME_LENGTH = {min: 4, max: 50};
export const VAL_USERNAME_REGEX = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
//Password
export const VAL_PASS_LENGTH = {min: 8, max: 50};
export const VAL_PASS_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;

//Message
//SignIn

//SignUp
//==Username
export const MES_USERNAME_EMPTY="Tên đăng nhập không được để trống";
export const MES_USERNAME_EXIST="Tên đăng nhập đã tồn tại";
export const MES_USERNAME_LENGTH = {
    min: `Tên đăng nhập phải có ít nhất ${VAL_USERNAME_LENGTH.min} ký tự`,
    max: `Tên đăng nhập không được quá ${VAL_USERNAME_LENGTH.max} ký tự`
};
export const MES_USERNAME_REGEX = "Tên đăng nhập không đúng định dạng";

//==Email
export const MES_EMAIL_EMPTY="Địa chỉ email không được để trống";
export const MES_EMAIL_EXIST="Địa chỉ email đã tồn tại";
export const MES_EMAIL_INVALID="Địa chỉ email không đúng định dạng";

//Password
export const MES_PASS_EMPTY="Mật khẩu không được để trống";
export const MES_PASS_LENGTH = {
    min: `Mật khẩu phải có ít nhất ${VAL_PASS_LENGTH.min} ký tự`,
    max: `Mật khẩu phải có ít nhất ${VAL_PASS_LENGTH.max} ký tự`
};
export const MES_PASS_REGEX = `Mật khẩu không đúng định dạng`;
//RePassword
export const MES_REPASS_EMPTY="Nhập lại mật khẩu không được để trống";
export const MES_REPASS_NOT_EQUAL = `Mật khẩu không trùng khớp`;

//Environment variable
export const Backend_URL = process.env.BACKEND_URL || "http://localhost:3001";
