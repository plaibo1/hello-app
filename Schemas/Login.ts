import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "passwordShort")
    .minLowercase(
      1,
      "passwordLower"
    )
    .minUppercase(
      1,
      "passwordUpper"
    )
    .minNumbers(1, "passwordNum")
    .required("requiredFiled"),
});

export const phoneSchema = yup.object().shape({
  phone: yup.string().required("Обязательное поле"),
});

export const emailScheme = yup.object().shape({
  email: yup.string().email().required("Email Обязательное поле"),
})