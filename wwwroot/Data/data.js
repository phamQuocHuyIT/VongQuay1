// Fake Data (dùng như một cơ sở dữ liệu)
window.fakeDB = {
  USER: [
    { Id: 1, Username: "admin", Password: "123456", FullName: "Quản trị viên" },
    { Id: 2, Username: "user1", Password: "abc123", FullName: "Nguyễn Văn A" },
    { Id: 3, Username: "user2", Password: "xyz789", FullName: "Trần Thị B" },
  ],
  CUSTOMER: [
    {
      ID: 1,
      CODE: "C001",
      NAME: "Khách hàng 1",
      RANK: "Vàng",
      "GIỚI TÍNH": "Nam",
      DOB: "1990-05-10",
      TOTAL: 1000000,
    },
    {
      ID: 2,
      CODE: "C002",
      NAME: "Khách hàng 2",
      RANK: "Bạc",
      "GIỚI TÍNH": "Nữ",
      DOB: "1995-11-22",
      TOTAL: 800000,
    },
  ],
  PRODUCT: [
    { ID: 1, CODE: "P001", NAME: "Dầu nhớt" },
    { ID: 2, CODE: "P002", NAME: "Khăn lau xe" },
  ],
  SPIN: [
    {
      ID: 1,
      NAME: "Vòng quay tháng 10",
      STARTDATE: "2025-10-01",
      ENDDATE: "2025-10-31",
      ISDEFAULT: true,
      PRODUCT: [
        { ID: 1, RATIO: 40, ISDEFAULT: true },
        { ID: 2, RATIO: 60, ISDEFAULT: false },
      ],
      CUSTOMER: [
        { ID: 1, NUMBEROFSPINS: 2 },
        { ID: 2, NUMBEROFSPINS: 1 },
      ],
    },
  ],
};

// Nếu có dữ liệu trong localStorage thì lấy từ đó (ưu tiên)
const localDB = localStorage.getItem("fakeDB");
if (localDB) {
  window.fakeDB = JSON.parse(localDB);
} else {
  localStorage.setItem("fakeDB", JSON.stringify(window.fakeDB));
}
