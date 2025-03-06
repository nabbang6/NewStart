export const validateNickname = (value) => {
    const koreanRegex = /^[가-힣]+$/; // 한글만 허용
    const englishRegex = /^[a-zA-Z]{2,}$/; // 영어는 최소 2글자
    const invalidCharacters = /[\s~`!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/]/; // 특수문자 및 공백 금지

    if (invalidCharacters.test(value)) {
        return "특수문자 및 공백은 사용할 수 없습니다.";
    }
    if (koreanRegex.test(value) || englishRegex.test(value)) {
        return ""; // 유효한 경우
    }
    return "닉네임은 1글자 이상의 한글 또는 2글자 이상의 영문이어야 합니다.";
};