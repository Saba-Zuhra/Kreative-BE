export const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

export const validateAge = (age) => {
  const regex = /^[0-9]{1,2}$/;
  return regex.test(age);
}