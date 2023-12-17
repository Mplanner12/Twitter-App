"use client";
import Image from "next/image";
import { Client, Databases, Account } from "appwrite";
import { useEffect, useState } from "react";
import conf from "@/conf/config";
import {
  userLogout,
  createUser,
  userLogin,
  getTweets,
  createTweets,
} from "./components/serverActions";
import { DocumentData } from "firebase/firestore";
// import Tweets from "./components/Tweets";

function Home() {
  const [user, setUser] = useState("");
  const [tweets, setTweets] = useState<any[]>([]);
  // const userData = userLogin;

  const logTweets = () => {
    // getTweets();
    let data = getTweets();
    setTweets((data) => data);
    console.log(data);
  };
  useEffect(() => {
    const client = new Client();
    const account = new Account(client);
    client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);

    const response = account.get();
    response.then(
      function (response) {
        console.log(response); //success
        setUser(response.$id);
      },
      function (error) {
        console.log(error); //error
      }
    );
    const clientTweet = new Client();
    client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);
    const database = new Databases(client);
    const tweet = database.listDocuments(
      conf.appwriteDatabase,
      conf.appwriteTweetCollection
    );
    let tweets = tweet.then(
      function (response) {
        setTweets(response.documents);
        console.log(response); //success
      },
      function (error) {
        console.log(error); //error
      }
    );
  }, []);
  useEffect(() => {
    // const client = new Client();
    // const account = new Account(client);
    // client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);

    // const response = account.get();
    // response.then(
    //   function (response) {
    //     console.log(response); //success
    //     setUser(response.$id);
    //   },
    //   function (error) {
    //     console.log(error); //error
    //   }
    // );
    const client = new Client();
    client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);
    const database = new Databases(client);
    const tweet = database.listDocuments(
      conf.appwriteDatabase,
      conf.appwriteTweetCollection
    );
    let tweets = tweet.then(
      function (response) {
        setTweets(response.documents);
        // console.log(response); //success
      },
      function (error) {
        console.log(error); //error
      }
    );
  }, [tweets]);

  const signUp = () => {
    createUser();
    let data = createUser;
    setUser((data) => data);
  };

  const logIn = () => {
    userLogin();
    let data = userLogin;
    setUser((data) => data);
  };

  const logOut = () => {
    userLogout();
    let data = userLogout;
    setUser((data) => data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full mx-auto flex justify-between"></div>
      <div className="flex justify-center gap-x-3">
        <button
          className="bg-gray-200 rounded-lg w-fit p-[1.35rem] font-bold text-lg"
          onClick={() => signUp()}
        >
          Sign Up
        </button>
        <button
          className="bg-gray-200 rounded-lg w-fit p-[1.35rem] font-bold text-lg"
          onClick={() => logIn()}
        >
          Log In
        </button>
        <button
          className="bg-gray-200 rounded-lg w-fit p-[1.35rem] font-bold text-lg"
          onClick={() => logOut()}
        >
          LogOut
        </button>
      </div>
      {user && (
        <h1 className="text-2xl font-bold text-gray-800">
          Hello welcome <span className="font-bold text-blue-500">{user}</span>
        </h1>
      )}
      <div>
        <h1>TWEEETS</h1>
        <div>
          {tweets.map((tweet) => (
            <div key={tweet.$id}>
              <h3>{tweet.text}</h3>
              <p>{tweet.$createdAt}</p>
            </div>
          ))}
        </div>
        <button
          className="bg-gray-200 rounded-lg w-fit p-[1.35rem] font-bold text-lg"
          onClick={() => createTweets()}
        >
          Tweet
        </button>
      </div>
    </main>
  );
}

export default Home;
