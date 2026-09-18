"use strict";

const DAFTAR_FITUR = [
  {
    id: "html-dasar",
    nama: "HTML dari Nol",
    deskripsi:
      "Mengenal tag, atribut, dan struktur halaman sampai bisa menulis halaman pertama sendiri.",
    kategori: "Materi",
  },
  {
    id: "css-dasar",
    nama: "CSS Dasar",
    deskripsi:
      "Mewarnai, mengatur jarak, dan menata huruf supaya halaman enak dibaca.",
    kategori: "Materi",
  },
  {
    id: "latihan-terbimbing",
    nama: "Latihan Terbimbing",
    deskripsi:
      "Setiap materi langsung diikuti latihan dengan mentor yang mendampingi.",
    kategori: "Praktik",
  },
  {
    id: "proyek-nyata",
    nama: "Proyek Nyata",
    deskripsi: "Membangun satu landing page utuh dari rancangan sampai jadi.",
    kategori: "Praktik",
  },
  {
    id: "portofolio",
    nama: "Portofolio Siap Pakai",
    deskripsi:
      "Hasil proyek bisa langsung dipajang sebagai portofolio lamaran magang.",
    kategori: "Karier",
  },
  {
    id: "sertifikat",
    nama: "Sertifikat Kelulusan",
    deskripsi:
      "Sertifikat diberikan setelah proyek akhir selesai dan dikumpulkan.",
    kategori: "Karier",
  },
];

const tombolNav = document.querySelector("#tombol-nav");
const menuUtama = document.querySelector("#menu-utama");
const tombolTema = document.querySelector("#tombol-tema");
const filterFitur = document.querySelector("#filter-fitur");
const tombolFilter = document.querySelectorAll(".tombol-filter");
const daftarFitur = document.querySelector("#daftar-fitur");
const statusFitur = document.querySelector("#status-fitur");
const pesanKosong = document.querySelector("#pesan-fitur-kosong");
const daftarFaq = document.querySelector("#daftar-faq");
const formKontak = document.querySelector("#form-kontak");
const pesanSukses = document.querySelector("#pesan-sukses");
const tombolAtas = document.querySelector("#tombol-atas");

const inputNama = document.querySelector("#nama");
const inputEmail = document.querySelector("#email");
const inputMinat = document.querySelector("#minat");
const inputPesan = document.querySelector("#pesan");
const inputSetuju = document.querySelector("#setuju");

const errorNama = document.querySelector("#error-nama");
const errorEmail = document.querySelector("#error-email");
const errorMinat = document.querySelector("#error-minat");
const errorPesan = document.querySelector("#error-pesan");
const errorSetuju = document.querySelector("#error-setuju");

function toggleMenu() {
  const terbuka = menuUtama.classList.toggle("terbuka");
  tombolNav.setAttribute("aria-expanded", String(terbuka));
}

function buatKartu(fitur) {
  const kartu = document.createElement("li");
  kartu.className = "kartu-fitur";

  const kategori = document.createElement("span");
  kategori.className = "chip-kategori";
  kategori.textContent = fitur.kategori;

  const judul = document.createElement("h3");
  judul.textContent = fitur.nama;

  const deskripsi = document.createElement("p");
  deskripsi.textContent = fitur.deskripsi;

  kartu.append(kategori, judul, deskripsi);
  return kartu;
}

function tampilkanFitur(daftar) {
  const fragmen = document.createDocumentFragment();

  daftar.forEach(function (fitur) {
    fragmen.append(buatKartu(fitur));
  });

  daftarFitur.replaceChildren(fragmen);
  pesanKosong.hidden = daftar.length > 0;
  statusFitur.textContent = `Menampilkan ${daftar.length} dari ${DAFTAR_FITUR.length} fitur.`;
}

function pilihFilter(tombol) {
  tombolFilter.forEach(function (lain) {
    lain.setAttribute("aria-pressed", String(lain === tombol));
  });

  const kategori = tombol.dataset.kategori;
  const hasil =
    kategori === "Semua"
      ? DAFTAR_FITUR
      : DAFTAR_FITUR.filter(function (fitur) {
          return fitur.kategori === kategori;
        });

  tampilkanFitur(hasil);
}

function tanganiFilter(event) {
  const tombol = event.target.closest(".tombol-filter");

  if (tombol) {
    pilihFilter(tombol);
  }
}

function tanganiFaq(event) {
  const tombol = event.target.closest(".tombol-faq");

  if (!tombol) {
    return;
  }

  const jawaban = tombol.closest(".item-faq").querySelector(".jawaban-faq");
  const buka = tombol.getAttribute("aria-expanded") !== "true";

  daftarFaq.querySelectorAll(".tombol-faq").forEach(function (lain) {
    lain.setAttribute("aria-expanded", "false");
    lain.closest(".item-faq").querySelector(".jawaban-faq").hidden = true;
  });

  tombol.setAttribute("aria-expanded", String(buka));
  jawaban.hidden = !buka;
}

function tulisError(input, elemen, pesan) {
  elemen.textContent = pesan;

  if (pesan === "") {
    input.removeAttribute("aria-invalid");
  } else {
    input.setAttribute("aria-invalid", "true");
  }
}

function kirimForm(event) {
  event.preventDefault();

  let pertama = null;

  if (inputNama.value.trim().length < 3) {
    tulisError(inputNama, errorNama, "Nama minimal 3 karakter.");
    pertama = pertama || inputNama;
  } else {
    tulisError(inputNama, errorNama, "");
  }

  const email = inputEmail.value.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    tulisError(inputEmail, errorEmail, "Format email belum benar.");
    pertama = pertama || inputEmail;
  } else {
    tulisError(inputEmail, errorEmail, "");
  }

  if (inputMinat.value === "") {
    tulisError(inputMinat, errorMinat, "Pilih salah satu minat.");
    pertama = pertama || inputMinat;
  } else {
    tulisError(inputMinat, errorMinat, "");
  }

  if (inputPesan.value.trim().length < 10) {
    tulisError(inputPesan, errorPesan, "Pesan minimal 10 karakter.");
    pertama = pertama || inputPesan;
  } else {
    tulisError(inputPesan, errorPesan, "");
  }

  if (!inputSetuju.checked) {
    tulisError(inputSetuju, errorSetuju, "Centang persetujuan dulu.");
    pertama = pertama || inputSetuju;
  } else {
    tulisError(inputSetuju, errorSetuju, "");
  }

  if (pertama) {
    pesanSukses.hidden = true;
    pertama.focus();
    return;
  }

  pesanSukses.textContent = `Terima kasih, ${inputNama.value.trim()}. Pendaftaran minat "${inputMinat.value}" sudah kami terima dan akan dibalas ke ${email}.`;
  pesanSukses.hidden = false;
  formKontak.reset();
}

function gantiTema() {
  const gelap = document.documentElement.classList.toggle("tema-gelap");
  tombolTema.setAttribute("aria-pressed", String(gelap));
  tombolTema.textContent = gelap ? "Mode terang" : "Mode gelap";
}

tampilkanFitur(DAFTAR_FITUR);

tombolNav.addEventListener("click", toggleMenu);
tombolTema.addEventListener("click", gantiTema);
filterFitur.addEventListener("click", tanganiFilter);
daftarFaq.addEventListener("click", tanganiFaq);
formKontak.addEventListener("submit", kirimForm);
tombolAtas.addEventListener("click", function () {
  window.scrollTo(0, 0);
});
window.addEventListener(
  "scroll",
  function () {
    tombolAtas.hidden = window.scrollY < 400;
  },
  { passive: true },
);
