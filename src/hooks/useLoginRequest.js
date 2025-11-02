import { useMutation } from "@tanstack/react-query";
import { loginReq } from "../api/auth";

export default function useLoginRequest() {
  const login = async (formValues) => {
    console.log("[useLoginRequest] formValues:", formValues);

    try {
      const { data, status } = await loginReq(formValues);

      //   console.log("[useLoginRequest] result status:", status);
      //   console.log("[useLoginRequest] result login:", data);

      if (status === 200 && data.success) {
        return data.data;
      } else {
        throw new Error("ورود با خطا مواجه شد");
      }
    } catch (error) {
      throw new Error(error.response.data.error || "ورود با خطا مواجه شد");
    }
  };

  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
}
