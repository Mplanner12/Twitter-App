import React from "react";
import { useState, useEffect } from "react";
import conf from "@/conf/config";
import { Client, Databases } from "appwrite";

const Tweets = () => {
  const [tweet, setTweets] = useState("");
  //  getting Tweets from appwrite Database
  useEffect(() => {
    async function getTweets() {
      const client = new Client();
      client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwritePublicProject);
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
  }, []);
  //   const tweets = getTweets();
  //   return <div onClick={console.log(tweet)}>{tweet}</div>;
};

export default Tweets;
