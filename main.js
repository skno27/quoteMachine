$(document).ready(function () {
  const route = "https://api.forismatic.com/api/1.0/";

  //   const reqString = `${route}method=getQuote&format=json&lang=en`;

  var quote;
  var author;

  const getNewQuote = () => {
    $.ajax({
      url: route,
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote", // GET
        lang: "en",
        format: "jsonp",
      },
      success: (response) => {
        console.log(response.quoteText);
        console.log(response.quoteAuthor);

        quote = response.quoteText;
        author = response.quoteAuthor;
        $("#text").text(quote);
        if (!author) author = "Unknown...";
        $("#author").text("- " + author);
      },
    });
  };
  getNewQuote();

  const newColor = () => {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    if (r === 255 && g === 255 && b === 255) {
      r = Math.floor(Math.random() * 255);
      b = Math.floor(Math.random() * 255);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  $(".get-quote").on("click", (e) => {
    e.preventDefault();
    getNewQuote();

    let color = newColor();
    $("#text").css("color", color);
    $("#author").css("color", color);
    $("body").css("background-color", color);

    $("#quote-box").css("background-color", newColor());
  });

  $(".share-quote").on("click", (e) => {
    e.preventDefault();
    window.open(
      "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(quote + `\n -` + author)
    );
  });
});
