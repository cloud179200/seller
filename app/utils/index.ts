export const _sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const sortStudentFunc = (a: any, b: any) =>
  a.student_Name > b.student_Name
    ? 1
    : a.student_Name < b.student_Name
      ? -1
      : 0;

export const sortTeacherFunc = (a: any, b: any) =>
  a.teacher_Name > b.teacher_Name
    ? 1
    : a.teacher_Name < b.teacher_Name
      ? -1
      : 0;

export const sortClassFunc = (a: any, b: any) =>
  a.class_Name > b.class_Name ? 1 : a.class_Name < b.class_Name ? -1 : 0;

export const fileToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const resSuccessJson: (message?: string, data?: any) => {
  data: any;
  message: string;
} = (message = "Success", data = true) => {
  return {
    data,
    message
  };
};


export const resErrorJson: (message?: string) => { error: number, message: string } = (message = "Error") => {
  return {
    error: 1,
    message
  };
};

export const formatCreditCardNumber = (input: string) => {
  let formattedNumber = input.replace(/\D/g, "");
  const cardHiddenCharacter = "*";
  formattedNumber = formattedNumber.replace(/(\d{4})/g, "$1 ");
  const result = formattedNumber.trim().split(" ");
  result[1] = cardHiddenCharacter.repeat(4);
  result[2] = cardHiddenCharacter.repeat(4);
  return result.join(" ");
};

export const getPasswordStrengthCssClass = (strength: number) => {
  if (strength === 0) {
    return "border-red-500";
  } else if (strength <= 1) {
    return "border-orange-400";
  } else if (strength <= 2) {
    return "border-blue-500";
  } else if (strength <= 3) {
    return "border-green-500";
  } else if (strength <= 4) {
    return "border-purple-500";
  }
};