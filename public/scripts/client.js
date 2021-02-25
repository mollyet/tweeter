/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
 * temp. tweet obj. 
 * will be getting Real Tweet obj from an AJAX GET request, but for now
 * directly pulled from initial-tweets.json
 */


//

$(document).ready(function () {
  $('form').submit(function (event) {
    event.preventDefault();
    
    // checks if tweet is a valid tweet 

    if ($("#tweet-text").val().length > 140) {
      alert("tweet is too long!")
    } else if ($("#tweet-text").val().length === null || $("#tweet-text").val().length === 0){
      alert("tweet can't be empty!")
    } else {
    const localdata = $(this).serialize();
    $.ajax('/tweets', { method: 'POST', data: localdata })
    .then(function () {
        console.log(localdata)
        console.log("success!");
      });
    } 
  });
  //

  const loadTweets = function () {
    $.ajax('/tweets', { method: "GET" })
      .then(function(tweets) {
        renderTweets(tweets)
        console.log('tweets loaded! success!', tweets)
      });
  };
  loadTweets();

  //

  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      $(".tweet-container").append(createTweetElement(tweet));
    }
  };
  const createTweetElement = function (tweet) {
    //create DOM to fill in info like in index.html
    // tweet in html format, then append to tweet constainer class
    //use `template literals` to put variables in tweet data
    //  return `<tag class="class-name"> ${tweet.user.name} </tag>`;
    

    const $tweet = `
  
    <article class = "tweet">
      <header class="tweet-header" >
        <span class="author">
          <span class="author-avatar"> 
            <img src = "${tweet.user.avatars}" alt= "user avatar"> 
          </span>
          ${tweet.user.name}
        </span>
        <span class="author-handle">${tweet.user.handle}</span>
      </span>
      </header>
      <div class="tweet-content">
        ${tweet.content.text}
      </div>
      <footer class="tweet-footer">
        <!-- need to use proper tade tracker && those cute little retweet/etc buttons from font awesome -->
        <span class="date">${tweet.created_at}</span>
        <span class="icons">retrweet</span>
      </footer>
    </article>`;
    return $tweet;
  };

  // renderTweets(data);

});

