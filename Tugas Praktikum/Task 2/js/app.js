"use strict";
const peserta = [
  { id: 1, nama: "Alya", prodi: "Teknik Informatika" },
  { id: 2, nama: "Bima", prodi: "Sistem Informasi" },
];

const form = document.querySelector("#form-peserta");
const namaInput = document.querySelector("#nama");
const prodiInput = document.querySelector("#prodi");
const filterInput = document.querySelector("#filter-prodi");
const daftar = document.querySelector("#daftar-peserta");
const status = document.querySelector("#status");
const errorNama = document.querySelector("#error-nama");
const errorProdi = document.querySelector("#error-prodi");

function validasiPeserta(calon) {
  // TODO: return object { valid, errorNama, errorProdi }.
  const nama = calon.nama;
  const prodi = calon.prodi;
  if (nama.trim().length >= 3 && prodi != "")
    return { valid: true, errorNama: "", errorProdi: "" };
  else if (nama.trim().length < 3 && prodi != "")
    return {
      valid: false,
      errorNama: "Nama harus lebih dari 3 karakter",
      errorProdi: "",
    };
  else if (nama.trim().length >= 3 && prodi == "")
    return {
      valid: false,
      errorNama: "",
      errorProdi: "Program studi tidak boleh kosong",
    };
  else
    return {
      valid: false,
      errorNama: "Nama tidak boleh kosong",
      errorProdi: "Program studi tidak boleh kosong",
    };
}

function buatKartuPeserta(item) {
  // TODO: buat article, h2, dan p dengan createElement.
  // Isi teks dengan textContent, lalu return article.
  const article = document.createElement("article");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  h2.textContent = item.nama;
  p.textContent = item.prodi;
  article.appendChild(h2);
  article.appendChild(p);
  article.classList.add("kartu");
  return article;
}

function renderPeserta(data) {
  // TODO: kosongkan daftar, tangani data kosong, lalu append kartu.
  if (data.length == 0) {
    status.textContent = "Tidak ada peserta";
    daftar.replaceChildren();
    return;
  }
  const dFrag = document.createDocumentFragment();
  data.forEach(myFunction);
  function myFunction(item) {
    const kartu = buatKartuPeserta(item);
    dFrag.appendChild(kartu);
  }
  daftar.replaceChildren(dFrag);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // TODO: baca nilai, validasi, atur aria-invalid dan pesan error.
  // Jika valid, push object baru dengan id unik, reset, dan render.
  const nama = namaInput.value;
  const prodi = prodiInput.value;
  const calon = { nama, prodi };
  if (validasiPeserta(calon).valid) {
    errorNama.textContent = "";
    errorProdi.textContent = "";
    namaInput.setAttribute("aria-invalid", "false");
    prodiInput.setAttribute("aria-invalid", "false");
    peserta.unshift({ id: Date.now(), nama, prodi });
    renderPeserta(peserta);
    form.reset();
  } else {
    errorNama.textContent = validasiPeserta(calon).errorNama;
    errorProdi.textContent = validasiPeserta(calon).errorProdi;
    if (validasiPeserta(calon).errorNama != "")
      namaInput.setAttribute("aria-invalid", "true");
    else namaInput.setAttribute("aria-invalid", "false");
    if (validasiPeserta(calon).errorProdi != "")
      prodiInput.setAttribute("aria-invalid", "true");
    else prodiInput.setAttribute("aria-invalid", "false");
  }
});

filterInput.addEventListener("change", () => {
  // TODO: jika 'semua' gunakan seluruh peserta; selain itu filter.
  if (filterInput.value == "semua") renderPeserta(peserta);
  else {
    const filtered = peserta.filter((item) => item.prodi == filterInput.value);
    renderPeserta(filtered);
  }
});

renderPeserta(peserta);
