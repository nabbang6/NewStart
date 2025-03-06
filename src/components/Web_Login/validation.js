export const validateEmail = (value) => {
    if (!value) return " ";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "이메일 형식을 확인해 주세요";
    return "";
};

export const validatePassword = (value) => {
    if (!value) return " ";
    if (value.length < 8) return "8자 이상 비밀번호를 입력해 주세요";
    return "";
};