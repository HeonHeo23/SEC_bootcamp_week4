const Tweet = require('../model/Tweet');

const getAllTweets = async (req, res) => {
  const tweets = await Tweet.find();
  if (!tweets) return res.status(204).json({ 'message': 'No tweet found.' });
  res.json(tweets);
}

const createTweet = async (req, res) => {
  console.log(req);
  if (!req?.body?.username || !req?.body?.text) return res.status(400).json({ 'message': 'Username and text required.' });
  try {
    const result = await Tweet.create({
      username: req.body.username,
      text: req.body.text
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getAllTweets, createTweet };