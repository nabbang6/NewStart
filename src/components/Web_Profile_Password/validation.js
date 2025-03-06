
export const validatePassword = (value) => {
    if (!value) return " ";
    if (value.length < 8) return "8자 이상 비밀번호를 입력해 주세요";
    return "";
};

export const validateConfirmPassword = (value, password) => {
    if (!value) return " ";
    if (value !== password) return "같은 비밀번호를 입력해 주세요";
    return "";
};