const Twitter = require("twitter-api-v2");

const twitterClient = new Twitter.TwitterApi(process.env.TWITTER_BEARER_TOKEN);

async function getProfilePicture(handle) {
    const user = await twitterClient.v2.userByUsername(handle, { "user.fields": "profile_image_url" });
    return user.data.profile_image_url.replace("_normal", "");
}

module.exports = { getProfilePicture };
