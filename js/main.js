function getEle(id) {
  return document.getElementById(id);
}

document.getElementById("btnThem").addEventListener("click", function () {
  getEle("btnCapNhat").style.display = "none";
  getEle("btnThemNV").style.display = "block";
  getEle("msnv").removeAttribute("disabled");
});

let listnhanvien = new ListNhanVien();
getLocalStorage();

document.getElementById("btnThemNV").addEventListener("click", function () {
  let manv = getEle("msnv").value;
  let tennv = getEle("name").value;
  let emailnv = getEle("email").value;
  let passwordnv = getEle("password").value;
  let ngaylam = getEle("datepicker").value;
  let chucvunv = getEle("chucvu").value;

  let isvalid = true;
  let validation = new Validation();

  isvalid &=
    validation.kiemTraRong(manv, "tbMaNV") &&
    validation.kiemTraDoDaiKyTu(manv, "tbMaNV") &&
    validation.kiemTraMaTrung(
      manv,
      "tbMaNV",
      "vui long nhap khac ma so",
      listnhanvien.arr
    );
  isvalid &=
    validation.kiemTraRong(tennv, "tbTen") &&
    validation.kiemTraChuoi(tennv, "tbTen", "vui long nhap chuoi");
  isvalid &=
    validation.kiemTraRong(emailnv, "tbEmail") &&
    validation.kiemTraEmail(emailnv, "tbEmail", "vui long nhap @");
  isvalid &= validation.kiemTraRong(passwordnv, "tbMatKhau");
  isvalid &= validation.kiemTraRong(ngaylam, "tbNgay");
  isvalid &= validation.kiemTraSelect(
    "chucvu",
    "tbChucVu",
    "Vui long Chon Chuc Vu"
  );
  if (!isvalid) {
    return;
  }

  let nhanvien = new NhanVien(
    manv,
    tennv,
    emailnv,
    passwordnv,
    ngaylam,
    chucvunv
  );
  listnhanvien.themNhanVien(nhanvien);
  console.log(listnhanvien.arr);

  taoBang(listnhanvien.arr);
  setLocalStorage();
});

// function taoBang(arr) {
//   let i = arr.length - 1;
//   let tagTr = document.createElement("tr");
//   let tagTdmaNV = document.createElement("td");
//   let tagTdtenNV = document.createElement("td");
//   let tagTdemailNV = document.createElement("td");
//   let tagTdngaylamNV = document.createElement("td");
//   let tagTdchucvuNV = document.createElement("td");

//   tagTdmaNV.innerHTML = arr[i].maNV;
//   tagTdtenNV.innerText = arr[i].tenNV;
//   tagTdemailNV.innerText = arr[i].emailNV;
//   tagTdngaylamNV.innerText = arr[i].dateNV;
//   tagTdchucvuNV.innerText = arr[i].rankNV;
//   tagTr.appendChild(tagTdmaNV);
//   tagTr.appendChild(tagTdtenNV);
//   tagTr.appendChild(tagTdemailNV);
//   tagTr.appendChild(tagTdngaylamNV);
//   tagTr.appendChild(tagTdchucvuNV);

//   getEle("tableDanhSach").appendChild(tagTr);
// }

function taoBang(arr) {
  let contentHTML = "";
  arr.forEach((item) => {
    contentHTML += `
    <tr>
      <td>${item.maNV}</td>
      <td>${item.tenNV}</td>
      <td>${item.emailNV}</td>
      <td>${item.dateNV}</td>
      <td>${item.rankNV}</td>
    </tr>
    `;
  });
  getEle("tableDanhSach").innerHTML = contentHTML;
  // getEle("tableDanhSach").appendChild(contentHTML);
}

function taoBang(arr) {
  let contentHTML = "";
  arr.forEach((item) => {
    contentHTML += `
    <tr>
      <td>${item.maNV}</td>
      <td>${item.tenNV}</td>
      <td>${item.emailNV}</td>
      <td>${item.dateNV}</td>
      <td>${item.rankNV}</td>
      <td>
        <button class="btn btn-success"  data-toggle="modal" data-target="#myModal" onclick ="editNV('${item.maNV}')" >Edit</button>
        <button class="btn btn-danger" onclick ="deleteNV('${item.maNV}')">Delete</button>
      </td>

    </tr>
    `;
  });
  getEle("tableDanhSach").innerHTML = contentHTML;
  // getEle("tableDanhSach").appendChild(contentHTML);
}

function setLocalStorage() {
  localStorage.setItem("listNhanVien", JSON.stringify(listnhanvien.arr));
}

function getLocalStorage() {
  if (localStorage.getItem("listNhanVien")) {
    listnhanvien.arr = JSON.parse(localStorage.getItem("listNhanVien"));
    taoBang(listnhanvien.arr);
  }
}

function deleteNV(manhanvien) {
  listnhanvien.xoaNhanVien(manhanvien);
  taoBang(listnhanvien.arr);
  setLocalStorage();
}

function editNV(manhanvien) {
  getEle("btnThemNV").style.display = "none";
  getEle("btnCapNhat").style.display = "block";

  let nhanvienInfo = listnhanvien.getInforbyId(manhanvien);

  getEle("msnv").value = nhanvienInfo.maNV;
  getEle("msnv").setAttribute("disabled", true);

  getEle("name").value = nhanvienInfo.tenNV;
  getEle("email").value = nhanvienInfo.emailNV;
  getEle("password").value = nhanvienInfo.passNV;
  getEle("datepicker").value = nhanvienInfo.dateNV;
  getEle("chucvu").value = nhanvienInfo.rankNV;
}

document.getElementById("btnCapNhat").addEventListener("click", function () {
  let manv = getEle("msnv").value;
  let tennv = getEle("name").value;
  let emailnv = getEle("email").value;
  let passwordnv = getEle("password").value;
  let ngaylam = getEle("datepicker").value;
  let chucvunv = getEle("chucvu").value;

  let nhanvien = new NhanVien(
    manv,
    tennv,
    emailnv,
    passwordnv,
    ngaylam,
    chucvunv
  );

  listnhanvien.update(nhanvien);
  taoBang(listnhanvien.arr);
  getEle("btnDong").click();
});

// tim kiem
getEle("searchName").addEventListener("keyup", function () {
  let keyword = getEle("searchName").value;

  let mangTimKiem = listnhanvien.timkiemnhanvien(keyword);
  taoBang(mangTimKiem);
});
