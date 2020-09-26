function ListNhanVien() {
  this.arr = [];

  this.themNhanVien = function (nhanVien) {
    this.arr.push(nhanVien);
  };
  // this.timVitri = function (idnhanvien) {
  //   let i = -1;
  //   this.arr.forEach((ele, index) => {
  //     if (ele.maNV === idnhanvien) {
  //       i = index;
  //     }
  //   });
  //   return i;
  // };

  this.timViTri = function (idnhanvien) {
    return this.arr.findIndex((item) => {
      return item.maNV === idnhanvien;
    });
  };

  this.xoaNhanVien = function (idnhanvien) {
    let index = this.timViTri(idnhanvien);

    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };
  this.getInforbyId = function (idnhanvien) {
    // let nhanvieninfo;
    // this.arr.forEach((ele) => {
    //   if (ele.maNV === idnhanvien) {
    //     nhanvieninfo = ele;
    //   }
    // });
    // return nhanvieninfo;

    return this.arr.find((item) => {
      return item.maNV === idnhanvien;
    });
  };

  this.update = function (nhanviennew) {
    let vitri = this.timViTri(nhanviennew.maNV);
    if (vitri != -1) {
      this.arr[vitri] = nhanviennew;
    }
  };
}

ListNhanVien.prototype.timkiemnhanvien = function (keyword) {
  // let arrTimKiem = [];
  // this.arr.forEach((item) => {
  //   if (item.tenNV.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
  //     arrTimKiem.push(item);
  //   }
  // });

  // return arrTimKiem;

  return this.arr.filter((item) => {
    return item.tenNV.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
  });
};
