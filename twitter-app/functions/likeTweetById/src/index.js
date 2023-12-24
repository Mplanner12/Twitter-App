// import { Client } from 'node-appwrite';
const sdk = require("node-appwrite")
// This is your Appwrite function
// It's executed each time we get a request
module.exports = async ({ req, res, log, error }) => {
  // Why not try the Appwrite SDK?
  const client = new sdk.Client()
  const database = new sdk.Databases(client)

  const {tweetId, likes} = JSON.parse(req.payload)

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    console.warn('Environment variables are not set. Function cannot use Appwrite SDK.');
  }else{
    client
    .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT']) 
    .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(req.variables['APPWRITE_FUNCTION_API_KEY']) 
    .setSelfSigned(true);
  
    let newTweet = {}
    if (tweetId) {
      try {
        newTweet = await database.updateDocument('656cdda86c42f28c2740' , '656cdddd6ce9f91fd77d', tweetId, {likes: likes})
        return res.json({
          success: true,
          data: newTweet
        })
      } catch (error) {
        console.log(error)
        return res.json({
          success: false,
          message: error.message
        })
      }
    }    
  }
  

  res.json({
    success: true,
  })

  //})

  // // const client = new Client()
  //   .setEndpoint(req.variables[]'https://cloud.appwrite.io/v1')
  //   .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
  //   .setKey(process.env.APPWRITE_API_KEY);

  // You can log messages to the console
  log('Hello, Logs!');

  // If something goes wrong, log an error
  error('Hello, Errors!');

  // The `req` object contains the request data
  if (req.method === 'GET') {
    // Send a response with the res object helpers
    // `res.send()` dispatches a string back to the client
    return res.send('Hello, World!');
  }

  // `res.json()` is a handy helper for sending JSON
  return res.json({
    motto: 'Build like a team of hundreds_',
    learn: 'https://appwrite.io/docs',
    connect: 'https://appwrite.io/discord',
    getInspired: 'https://builtwith.appwrite.io',
  });
};
