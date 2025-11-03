import { useMutation } from "@tanstack/react-query";
import { signupReq } from "../api/auth";

export default function useSignupRequest() {
  const signup = async (formValues) => {
    console.log("[useSignupRequest] formValues:", formValues);

    try {
      const { data, status } = await signupReq(formValues);
      //   console.log("[useSignupRequest] response, status", status);
      //   console.log("[useSignupRequest] response, data", data);

      if (status === 201 && data.success) {
        return data.data;
      } else {
        throw new Error("ثبت نام با خطا مواجه شد");
      }
    } catch (error) {
      console.error("[useSignupRequest] error", error);

      throw new Error(error.response?.data.error || "ثبت نام با خطا مواجه شد");
    }
  };

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: signup,
  });
}
