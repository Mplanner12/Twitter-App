// "use client";
// export { useUser } from "@/hooks/useUser";
import useUser from "@/hooks/useUser";
import React from "react";

// interface Props {
//   useUser: React.ReactNode;
// }

export function UseUser() {
  let currentAccount, isLoadingAccount;
  return ({ currentAccount, isLoadingAccount } = useUser());
}
