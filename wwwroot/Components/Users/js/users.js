$(document).ready(function () {
  // 🔹 Lấy dữ liệu từ localStorage
  let db = JSON.parse(localStorage.getItem("fakeDB")) || window.fakeDB;

  // 🔹 Hàm hiển thị danh sách người dùng
  function renderUserTable() {
    const tbody = $("#userTableBody");
    tbody.empty();

    db.USER.forEach((user) => {
      tbody.append(`
        <tr>
          <td>${user.Id}</td>
          <td>${user.Username}</td>
          <td>${user.FullName}</td>
          <td>${user.Password}</td>
          <td>
            <button class="btn btn-sm btn-warning btnEdit" data-id="${user.Id}">Sửa</button>
            <button class="btn btn-sm btn-danger btnDelete" data-id="${user.Id}">Xóa</button>
          </td>
        </tr>
      `);
    });
  }

  renderUserTable();

  // 🔹 Mở modal thêm mới
  $("#btnAddUser").click(function () {
    $("#modalTitle").text("Thêm người dùng");
    $("#userForm")[0].reset();
    $("#userId").val("");
    $("#userModal").modal("show");
  });

  // 🔹 Mở modal chỉnh sửa
  $(document).on("click", ".btnEdit", function () {
    const id = $(this).data("id");
    const user = db.USER.find((u) => u.Id === id);
    if (!user) return;

    $("#modalTitle").text("Chỉnh sửa người dùng");
    $("#userId").val(user.Id);
    $("#userUsername").val(user.Username);
    $("#userFullName").val(user.FullName);
    $("#userPassword").val(user.Password);
    $("#userModal").modal("show");
  });

  // 🔹 Lưu người dùng (thêm mới hoặc cập nhật)
  $("#userForm").submit(function (e) {
    e.preventDefault();

    const id = $("#userId").val();
    const username = $("#userUsername").val().trim();
    const fullname = $("#userFullName").val().trim();
    const password = $("#userPassword").val().trim();

    if (!username || !fullname || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (id) {
      // 🔸 Cập nhật người dùng
      const user = db.USER.find((u) => u.Id == id);
      if (user) {
        user.Username = username;
        user.FullName = fullname;
        user.Password = password;
      }
    } else {
      // 🔸 Thêm mới
      const newId =
        db.USER.length > 0 ? Math.max(...db.USER.map((u) => u.Id)) + 1 : 1;
      db.USER.push({
        Id: newId,
        Username: username,
        FullName: fullname,
        Password: password,
      });
    }

    // 🔸 Cập nhật localStorage
    localStorage.setItem("fakeDB", JSON.stringify(db));

    $("#userModal").modal("hide");
    renderUserTable();
  });

  // 🔹 Xóa người dùng
  $(document).on("click", ".btnDelete", function () {
    const id = $(this).data("id");
    if (confirm("Bạn có chắc muốn xóa người dùng này?")) {
      db.USER = db.USER.filter((u) => u.Id !== id);
      localStorage.setItem("fakeDB", JSON.stringify(db));
      renderUserTable();
    }
  });
});
