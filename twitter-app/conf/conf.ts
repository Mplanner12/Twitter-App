export const conf = {
  appwriteUrl: String(process.env.NEXT_PUBLIC_ENDPOINT),
  appwritePublicProject: String(process.env.NEXT_PUBLIC_PROJECT),
  appwriteDatabase: String(process.env.NEXT_PUBLIC_DATABASE),
  appwriteTweetCollection: String(process.env.NEXT_PUBLIC_TWEETS_COLLECTION),
  appwriteApiKey: String(process.env.NEXT_PUBLIC_APPWRITE_KEY),
};
