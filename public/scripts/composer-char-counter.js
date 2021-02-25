$(document).ready(function () {
  $("#tweet-text").on("input" , function (e) {
    const $counter = $(this).parent().find(".counter");
    const tweetLength = 140 - $(this).val().length;
    $counter.val(tweetLength);
    if (tweetLength < 0) {
      $counter.addClass("counter-red");
    } else {
      $counter.removeClass("counter-red")
    }
  });
  
});

