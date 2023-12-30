"use client";
import React from "react";
import { Client, Account } from "appwrite";
import appwriteClient from "@/libs/appwrite";
import { conf } from "@/conf/conf";
import { useRouter } from "next/navigation";
import { FETCH_STATUS } from "@/utils/constants";
import { useEffect } from "react";

export default function useUser() {
  const client = new Client();
  const account = new Account(appwriteClient);
  client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);
  const [currentAccount, setCurrentAccount] = React.useState();
  const [accountStatus, setAccountStatus] = React.useState(
    FETCH_STATUS.LOADING
  );
  const router = useRouter();

  const getSession = async () => {
    setAccountStatus(FETCH_STATUS.LOADING);

    let currentAccount = null;
    const promise = await account.get();

    promise
      .then((response) => {
        currentAccount = response;
        console.log(currentAccount);
        setCurrentAccount(currentAccount);
        setAccountStatus(FETCH_STATUS.SUCCESS);
      })
      .catch((error) => {
        console.log(error);
        setAccountStatus(FETCH_STATUS.FAIL);
      });
    // .finally(() => {
    //   setCurrentAccount(currentAccount);
    // });

    // try {
    //   currentAccount = promise;
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
    useEffect(() => {
      router.push("/auth/signin");
    }, []);
  };

  React.useEffect(() => {
    getSession();
  }, []);

  return {
    currentAccount,
    isLoadingAccount: accountStatus === FETCH_STATUS.LOADING,
    logout,
  };
}
