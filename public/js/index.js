window.addEventListener('load', (event) => {
  alert('Hey');
  init();
});
const init = () => {
  loadTweets();
}

const loadTweets = async () => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  alert(response)
}

const postTweet = async (username, text) => {
  const tweet = {
    username: username,
    text: text,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(tweet),
  });
}