"use strict";
function validasiNilai(nilai) {
  if (Number.isFinite(nilai) && nilai >= 0 && nilai <= 100) {
    return true;
  }
  return false;
}

function tentukanKategori(nilai) {
  if (!validasiNilai(nilai)) return null;
  if (nilai >= 85) return "A";
  else if (nilai >= 70) return "B";
  else if (nilai >= 60) return "C";
  else return "D";
}

function tentukanStatus(nilai) {
  if (!validasiNilai(nilai)) return "Data tidak valid";
  else if (nilai >= 60) return "Lulus";
  else return "Tidak Lulus";
}

function buatRingkasan(nama, nilai) {
  return {
    nama: nama,
    nilai: nilai,
    kategori: tentukanKategori(nilai),
    status: tentukanStatus(nilai),
  };
}

const kasusUji = [
  { nama: "Alya", nilai: 0 },
  { nama: "Bima", nilai: 59 },
  { nama: "Citra", nilai: 60 },
  { nama: "Danu", nilai: 69 },
  { nama: "Eka", nilai: 84 },
  { nama: "Fani", nilai: 85 },
  { nama: "Gilang", nilai: 101 },
];

const hasilUji = kasusUji.map(({ nama, nilai }) => buatRingkasan(nama, nilai));
console.table(hasilUji);
