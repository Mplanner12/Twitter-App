import React from "react";
import { Client, Account, Databases } from "appwrite";
import conf from "@/conf/config";

//  creating a user signup from appwrite
export const createUser = async () => {
  const client = new Client();
  const account = new Account(client);
  client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);

  const response = account.create(
    "plannorium",
    "mushhiu@gmail.com",
    "passwor53d77"
  );
  response.then(
    function (response) {
      return response;
      console.log(response); //success
    },
    function (error) {
      console.log(error); //error
    }
  );
  console.log(response);
};

//  creating a user login from appwrite
export const userLogin = async () => {
  const client = new Client();
  const account = new Account(client);
  client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);

  const response = account.createEmailSession(
    "mushhiu@gmail.com",
    "passwor53d77"
  );
  response.then(
    function (response) {
      return response.clientName;
      console.log(response); //success
    },
    function (error) {
      console.log(error); //error
    }
  );

  console.log(response);
};

//  Logging out User user from appwrite
export const userLogout = async () => {
  const client = new Client();
  client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);
  const account = new Account(client);
  const response = account.deleteSession("current");
  response.then(
    function (response) {
      return response;
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};

// //  getting Tweets from appwrite Database
export async function getTweets() {
  const client = new Client();
  client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);
  const database = new Databases(client);
  const tweet = database.listDocuments(
    conf.appwriteDatabase,
    conf.appwriteTweetCollection
  );
  let tweets = tweet.then(
    (response) => response.documents.at(0)?.text,
    function (error) {
      console.log(error); //error
    }
  );
  // setTweets((tweets) => tweets);
  return tweets;
}

export async function createTweets() {
  const client = new Client();
  client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);
  const database = new Databases(client);
  const tweets = await database.createDocument(
    conf.appwriteDatabase,
    conf.appwriteTweetCollection,
    "uniqueID3",
    { text: "docker" }
  );
}
