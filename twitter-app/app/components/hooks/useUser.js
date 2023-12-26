"use client";
import React from "react";
import { Client, Account } from "appwrite";
// import appwriteClient from "@/libs/appwrite";
import { conf } from "@/conf/conf";
import { useRouter } from "next/navigation";
import { FETCH_STATUS } from "@/utils/constants";

export default function useUser() {
  const client = new Client();
  client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);
  const account = new Account(client);
  const [currentAccount, setCurrentAccount] = React.useState();
  const [accountStatus, setAccountStatus] = React.useState(
    FETCH_STATUS.LOADING
  );
  const router = useRouter();

  const getSession = async () => {
    setAccountStatus(FETCH_STATUS.LOADING);

    let currentAccount = null;
    const promise = account.get(client);

    promise
      .then((response) => {
        currentAccount = response;
        console.log(currentAccount);
        setAccountStatus(FETCH_STATUS.SUCCESS);
      })
      .catch((error) => {
        console.log(error);
        setAccountStatus(FETCH_STATUS.FAIL);
      })
      .finally(() => {
        setCurrentAccount(currentAccount);
      });

    // try {
    //   currentAccount = await promise;
    //   console.log(currentAccount);
    //   setAccountStatus(FETCH_STATUS.SUCCESS);
    // } catch (error) {
    //   console.log(error);
    //   setAccountStatus(FETCH_STATUS.FAIL);
    // } finally {
    //   setCurrentAccount(currentAccount);
    // }
  };

  const logout = async () => {
    const promise = await account.deleteSession("current");
    promise.then((response) => {
      console.log(response);
    });
    await account.delete();
    setCurrentAccount(null);
    router.push("/auth/signin");
  };

  React.useEffect(() => {
    getSession();
  }, [currentAccount]);

  return {
    currentAccount,
    isLoadingAccount: accountStatus === FETCH_STATUS.LOADING,
    logout,
  };
}
