$(document).ready(function () {
  $.get("https://jsonplaceholder.typicode.com/posts", function (data) {
    $.each(data, function (index, post) {
      let bodyText = post.body;
      if (bodyText.length > 30) {
        bodyText = bodyText.substring(0, 30) + "...";
      }
      $("#postsTable tbody").append(`
                  <tr>
                      <td>${post.id}</td>
                      <td>${post.title}</td>
                      <td class="shorten">${bodyText}</td>
                      <td class="commentsColumn">Loading...</td> 
                  </tr>
              `);

      $.ajax({
        url: `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`,
        type: "GET",
        beforeSend: function () {
          $(`#postsTable tbody tr:eq(${index}) .commentsColumn`).html(
            '<div class="loader"></div>'
          );
        },
        success: function (comments) {
          let commentsHtml = "<ul>";

          for (let i = 0; i < 3 && i < comments.length; i++) {
            commentsHtml += `<li>${comments[i].body}</li>`;
          }
          commentsHtml += "</ul>";
          $(`#postsTable tbody tr:eq(${index}) .commentsColumn`).html(
            commentsHtml
          );
        },
        error: function () {
          $(`#postsTable tbody tr:eq(${index}) .commentsColumn`).html(
            "Failed to load comments"
          );
        },
      });
    });

    $(".shorten").each(function () {
      let fullText = $(this).text();
      if (fullText.length > 30) {
        $(this).text(fullText.substring(0, 30) + "...");
      }
    });
  });
});
