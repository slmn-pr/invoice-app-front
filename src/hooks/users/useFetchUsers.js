import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchUsersReq } from "../../api/users";

export default function useFetchUsers(params = { page: 1, limit: 10 }) {
  return useQuery({
    queryKey: ["fetch-users", params],
    queryFn: async () => {
      const { data } = await fetchUsersReq(params);
      if (!data?.success) {
        throw new Error(data?.error || "خطا در دریافت کاربران");
      }
      return {
        users: data.data.users,
        meta: data.data.meta,
      };
    },
    onError: (error) => {
      toast.error(error.message || "خطا در دریافت کاربران");
    },
  });
}

