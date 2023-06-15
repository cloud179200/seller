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

export const resSuccessJson = (message = "Success") => {
  return {
    message
  }
}

export const resErrorJson = (message = "Error") => {
  return {
    error: 1,
    message
  }
}