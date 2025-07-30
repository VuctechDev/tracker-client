import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../utils/api";

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  // add other session fields
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) =>
      request("/auth/start-session", "POST", { code }) as Promise<{
        data: SessionUser;
      }>,

    onSuccess: (data) => {
      queryClient.setQueryData(["session"], data);
      localStorage.setItem("session", JSON.stringify(data));
    },
  });
};
// 2
// import { useEffect } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import { SessionUser } from "./useLoginMutation";

// export const useHydrateSession = () => {
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     const cached = localStorage.getItem("session");
//     if (cached) {
//       try {
//         const parsed: { data: SessionUser } = JSON.parse(cached);
//         queryClient.setQueryData(["session"], parsed);
//       } catch (e) {
//         console.error("Failed to hydrate session:", e);
//         localStorage.removeItem("session");
//       }
//     }
//   }, [queryClient]);
// };

// 3
// import { useQuery } from "@tanstack/react-query";
// import { SessionUser } from "./useLoginMutation";

// export const useSession = () => {
//   return useQuery<{ data: SessionUser }>({
//     queryKey: ["session"],
//     queryFn: () => Promise.reject("Session is hydrated manually"),
//     enabled: false, // prevent auto fetch
//   });
// };

// 4
// import React from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useHydrateSession } from "./hooks/useHydrateSession";

// const queryClient = new QueryClient();

// function App() {
//   useHydrateSession();

//   return (
//     <QueryClientProvider client={queryClient}>
//       {/* Your routes/components */}
//     </QueryClientProvider>
//   );
// }

// export default App;

// 5
// import React, { useState } from "react";
// import { useLoginMutation } from "../hooks/useLoginMutation";

// const LoginPage = () => {
//   const [code, setCode] = useState("");
//   const { mutateAsync, isLoading, error } = useLoginMutation();

//   const handleLogin = async () => {
//     try {
//       await mutateAsync(code);
//       // navigate or show success
//     } catch (e) {
//       console.error("Login failed:", e);
//     }
//   };

//   return (
//     <div>
//       <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" />
//       <button onClick={handleLogin} disabled={isLoading}>
//         Login
//       </button>
//       {error && <p>Login error</p>}
//     </div>
//   );
// };

// export default LoginPage;

// 6
// import { useSession } from "../hooks/useSession";

// const Dashboard = () => {
//   const { data } = useSession();
//   const user = data?.data;

//   return <div>Welcome, {user?.name}</div>;
// };

// 7
// import { useQueryClient } from "@tanstack/react-query";

// export const useLogout = () => {
//   const queryClient = useQueryClient();

//   return () => {
//     localStorage.removeItem("session");
//     queryClient.removeQueries({ queryKey: ["session"] });
//   };
// };
