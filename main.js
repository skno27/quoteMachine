$(document).ready(function () {
  const route = "http://api.forismatic.com/api/1.0/";

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

  $(".get-quote").on("click", (e) => {
    e.preventDefault();
    getNewQuote();
  });
});
