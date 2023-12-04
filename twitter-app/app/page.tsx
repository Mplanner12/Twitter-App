"use client";
import Image from "next/image";
import { Client, Databases, Account } from "appwrite";
import { useEffect, useState } from "react";
import conf from "@/conf/config";
import { error } from "console";

//  getting server from appwrite
export async function getServer() {
  const client = new Client();
  client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);
  const database = new Databases(client);
  const tweets = await database.listDocuments(
    conf.appwriteDatabase,
    conf.appwriteTweetCollection
  );
  console.log(tweets.documents);
}

//  creating a user login from appwrite
const createUser = async () => {
  const client = new Client();
  const account = new Account(client);
  client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);

  const response = account.create(
    "username",
    "mssuy76g=jio=-7e6rssqx82@gmail.com",
    "pass664525d"
  );
  response.then(
    function (response) {
      console.log(response); //success
    },
    function (error) {
      console.log(error); //error
    }
  );

  console.log(response);
};
//  creating a user login from appwrite
const UserLogin = async () => {
  const client = new Client();
  const account = new Account(client);
  client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);

  const response = account.createEmailSession(
    "almussa32@gmail.com",
    "mypassword"
  );
  response.then(
    function (response) {
      console.log(response); //success
    },
    function (error) {
      console.log(error); //error
    }
  );

  console.log(response);
};
//  getting loggedin user from appwrite

export default async function Home() {
  // getServer();
  // createUser();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const client = new Client();
    const account = new Account(client);
    client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);

    const response = account.get();
    response.then(
      function (response) {
        console.log(response); //success
        setUser(response.email);
      },
      function (error) {
        console.log(error); //error
      }
    );

    console.log(response);
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full mx-auto flex justify-between">
        <button
          onClick={createUser}
          className="w-[5rem] rounded-xl p-2 bg-slate-100"
        >
          Create User
        </button>
        <button
          onClick={UserLogin}
          className="w-[5rem] rounded-xl p-2 bg-slate-100"
        >
          Login
        </button>
      </div>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold">Hello welcome {user}</h1>
      </div>
    </main>
  );
}
