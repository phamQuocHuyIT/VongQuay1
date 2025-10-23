$(document).ready(function () {
  // Hiển thị tên user đang đăng nhập
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "../../../index.html";
    return;
  }
  $("#currentUser").text("Xin chào, " + user.FullName);

  // Load mặc định Users
  loadPage("../../Components/Users/users.html");

  // Xử lý click nav
  $(".sidebar a[data-page]").click(function (e) {
    e.preventDefault();
    $(".sidebar a").removeClass("active");
    $(this).addClass("active");

    const page = $(this).data("page");
    loadPage("../../Components/" + page);
  });

  // Đăng xuất
  $("#btnLogout").click(function () {
    localStorage.removeItem("currentUser");
    window.location.href = "../../../index.html";
  });

  // Hàm load nội dung
  function loadPage(pageUrl) {
    $("#mainContent").load(pageUrl, function (response, status) {
      if (status === "error") {
        $("#mainContent").html(
          "<p class='text-danger'>Không thể tải nội dung.</p>"
        );
      }
    });
  }
});
