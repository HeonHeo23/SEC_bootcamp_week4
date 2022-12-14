window.addEventListener('load', (event) => {
  init();
});

const init = () => {
  loadFeed();
  const form = document.getElementById("form");
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      const username = document.getElementById('username').value;
      const text = document.getElementById('text').value;
      if (!username || !text) {
        alert('Username and text are required.');
      } else {
        const response = postTweet(username, text);
      }
    } catch (err) {
      console.error(err);
    } finally {
      loadFeed();
    }
  });
}

const loadFeed = async () => {
  const url = '/tweet';
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.status == 204) {
    alert('No tweets');
    return;
  }

  const tweets = await response.json();
  let feed = '';
  for (let i = tweets.length - 1; i >= 0; i--) {
    feed += `
    <div class="tweet-container">
      <div class="profile-img">
        <img src="/img/profile.png" alt="profile">
      </div>
      <div class="tweet">
        <div class="tweet-username">${tweets[i].username}</div>
        <div class="tweet-text">${tweets[i].text}</div>
      </div>
    </div>
    `
  }
  document.getElementById('tweets').innerHTML = feed;
}

const postTweet = async (username, text) => {
  const url = '/tweet';

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