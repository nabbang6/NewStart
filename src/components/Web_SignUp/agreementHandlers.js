
export const handleAllToggle = (agreement, setAgreement) => { // 약관 - 전체 동의 함수
    const newState = !agreement.all;
    setAgreement({
      all: newState,
      age: newState,
      service: newState,
      privacy: newState,
    });
  };

  export const handleSingleToggle = (agreement, setAgreement, key) => { // 약관 - 개별 동의 함수
    const newAgreement = {
      ...agreement,
      [key]: !agreement[key],
    };

    newAgreement.all =
      newAgreement.age && newAgreement.service && newAgreement.privacy;
    setAgreement(newAgreement);
  };
