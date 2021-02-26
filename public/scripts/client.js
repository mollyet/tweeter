/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//

$(document).ready(function() {
  $('form').submit(function (event) {
    event.preventDefault();
    //



    // checks if tweet is a valid tweet && sends appropriate error message

    console.log($("#tweet-text").val().length);
    if ($("#tweet-text").val().length > 140) {
      $('#error-message').text(errMessage("too long")).slideDown();
    } else if ($("#tweet-text").val().length === null || $("#tweet-text").val().length === 0) {
      $('#error-message').text(errMessage("null")).slideDown();
    } else {
      const localdata = $(this).serialize();
      $.ajax('/tweets', { method: 'POST', data: localdata })
        .then(function () {
          console.log("tweet success!");
          //removes old tweets and then reloads tweets 
          $(".tweet").remove();
          loadTweets();
          $('#tweet-text').val("");
          //hard "resets" the counter back to 140
          $("#error-message").slideUp();
          $(".counter").text(140);
        });
    }
  });

  // 

  const loadTweets = function() {
    $.ajax('/tweets', { method: "GET" })
      .then(function (tweets) {
        renderTweets(tweets);
        console.log('tweets loaded! success!', tweets);
      });
  };
  //

  // loads tweets when page is opened-- must live here, under the get and post requests. 

  loadTweets();

  //

  // renders tweets to be inserted in to index.html and then styled  by appropriate style-sheet


  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $(".tweet-container").prepend(createTweetElement(tweet));
    }
  };
  const createTweetElement = function(tweet) {
    const safeHTML = `<p>${escape(tweet.content.text)}<p>`;
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
        ${safeHTML}
      </div>
      <footer class="tweet-footer">
        <span class="date">${tweet.created_at}</span>
        <span class="icons"><i class="fa fa-flag"> </i> <i class="fas fa-heart"> </i> <i class="fas fa-crow"> </i></span>
      </footer>
    </article>`;
    return $tweet;
  };

  //

  // used to prevent xss attacks

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //

  // generates error messages; used in tweet validation as callback

  const errMessage = function(msg) {
    let $error = ``;
    if (msg === "too long") {
      $error = `Sorry! This tweet is too long! Please Try Again`;
    }
    if (msg === "null") {
      $error = `Sorry! You can't tweet an empty tweet. Please try again.`;
    }
    return $error;
  };

});

