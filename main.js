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
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    // Ensure color is never white
    if (r === 255 && g === 255 && b === 255) {
      r = Math.floor(Math.random() * 255);
    }

    return { r, g, b };
  };

  const getComplementaryColor = ({ r, g, b }) => {
    return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
  };

  $(".get-quote").on("click", (e) => {
    e.preventDefault();
    getNewQuote();

    let color = newColor();
    let mainColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    let compColor = getComplementaryColor(color);

    $("#text").css("color", mainColor);
    $("#author").css("color", mainColor);
    $("body").css("background-color", mainColor);

    $("#quote-box").css("background-color", compColor);
  });

  $(".share-quote").on("click", (e) => {
    e.preventDefault();
    window.open(
      "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(quote + `\n -` + author)
    );
  });
});
