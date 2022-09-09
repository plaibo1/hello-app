import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Пароль слишком короткий, минимум 8 символов.")
    .minLowercase(
      1,
      "Пароль должен содержать хотя бы 1 строчную латинскую букву"
    )
    .minUppercase(
      1,
      "Пароль должен содержать хотя бы 1 заглавную латинскую букву"
    )
    .minNumbers(1, "В пароле должна быть хотя бы 1 цифра")
    .required("Обязательное поле"),
});

export const phoneSchema = yup.object().shape({
  phone: yup.string().required("Обязательное поле"),
});
