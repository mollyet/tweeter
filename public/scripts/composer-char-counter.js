$(document).ready(function () {
  const $text = $("#tweet-text");
  $text.on("input", function (e) {
    const $this = $(this);
    const $counter = $this.parent().find(".counter");
    const tweetLength = 140 - $this.val().length;
    $counter.val(tweetLength);
    if (tweetLength < 0) {
      $counter.addClass("counter-red");
    } else {
      $counter.removeClass("counter-red")
    }
  });

});

