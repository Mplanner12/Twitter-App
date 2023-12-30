"use client";

import { Client } from "appwrite";
import { conf } from "@/conf/conf";

const client = new Client();

client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePublicProject);
//   .setKey(conf.appwriteApiKey);

export default client;
