function Validation() {
  this.kiemTraRong = function (input, spanId) {
    if (input.trim() === "") {
      getEle(spanId).style.display = "block";
      getEle(spanId).innerText = "(*) Vui long nhap thong tin !";
      return false;
    }
    getEle(spanId).style.display = "none";
    getEle(spanId).innerHTML = "";
    return true;
  };
  this.kiemTraDoDaiKyTu = function (input, spanId) {
    if (input.length >= 4 && input.length <= 10) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerText = "";
      return true;
    }
    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = "Ky tu phai nhap tu 4 den 10";
    return false;
  };

  this.kiemTraChuoi = function (input, spanId, mes) {
    let letters = /^[A-Za-z ]+$/;

    if (input.match(letters)) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerText = "";
      return true;
    }
    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = mes;
    return false;
  };
  // sử dụng biểu thức chính quy RegExp
  this.kiemTraEmail = function (input, spanId, mes) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(mailformat)) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerText = "";
      return true;
    }
    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = mes;
    return false;
  };
  this.kiemTraSelect = function (element, spanId, mes) {
    if (getEle(element).selectedIndex !== 0) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerText = "";
      return true;
    }
    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = mes;
    return false;
  };

  this.kiemTraMaTrung = function (input, spanId, mes, arNhanvien) {
    var status = true;
    // foreach khong return trong vong lap dc;
    // arNhanvien.forEach((item, index) => {
    //   if (item.maNV === input) {
    //     status = false;
    //   }

    // });

    status = !arNhanvien.some((item) => {
      return item.maNV === input;
    });

    if (!status) {
      getEle(spanId).style.display = "block";
      getEle(spanId).innerHTML = mes;
      return false;
    }
    getEle(spanId).style.display = "none";
    getEle(spanId).innerText = "";
    return true;
  };
}
