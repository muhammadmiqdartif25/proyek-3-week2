"use strict";
const statusEl = document.querySelector("#status");
const cobaLagi = document.querySelector("#coba-lagi");
const kartu = document.querySelector("#kartu-profil");
const tombolDetail = document.querySelector("#tombol-detail");
const panelDetail = document.querySelector("#panel-detail");
const tombolTema = document.querySelector("#tombol-tema");
const bagian = document.querySelector("#bagian-keterampilan");
const form = document.querySelector("#form-keterampilan");
const input = document.querySelector("#input-keterampilan");
const pilihLevel = document.querySelector("#pilih-level");
const pesanForm = document.querySelector("#pesan-form");
const pesanKosong = document.querySelector("#pesan-kosong");
const daftar = document.querySelector("#daftar-keterampilan");

let keterampilan = [];
let tema = "terang";

function aturState(state, pesan) {
  statusEl.setAttribute("data-state", state);
  statusEl.textContent = pesan;
  statusEl.hidden = state === "sukses";
  cobaLagi.hidden = state !== "error";
  kartu.hidden = state !== "sukses";
  bagian.hidden = state !== "sukses";
}

function renderKeterampilan() {
  const fragmen = document.createDocumentFragment();

  keterampilan.forEach((skill, i) => {
    const item = document.createElement("li");

    const nama = document.createElement("span");
    nama.textContent = skill.nama;

    const hapus = document.createElement("button");
    hapus.type = "button";
    hapus.className = "tombol";
    hapus.setAttribute("aria-label", `Hapus keterampilan ${skill.nama}`);
    hapus.textContent = "Hapus";
    hapus.addEventListener("click", () => {
      keterampilan.splice(i, 1);
      renderKeterampilan();
    });

    item.append(nama);
    if (skill.level) {
      const level = document.createElement("span");
      level.className = "level";
      level.textContent = skill.level;
      item.append(level);
    }
    item.append(hapus);
    fragmen.append(item);
  });

  daftar.replaceChildren(fragmen);
  pesanKosong.hidden = keterampilan.length > 0;
}

function renderProfil(profil) {
  document.querySelector("#avatar").textContent = profil.inisial;
  document.querySelector("#nama").textContent = profil.nama;
  document.querySelector("#prodi").textContent = profil.prodi;
  document.querySelector("#bio").textContent = profil.bio;
  document.querySelector("#email").textContent = profil.email;
  document.querySelector("#lokasi").textContent = profil.lokasi;
}

async function muatData() {
  aturState("loading", "Memuat data profil...");
  try {
    const response = await fetch("data/profile.json");
    if (!response.ok) {
      throw new Error(`Server merespons dengan status ${response.status}`);
    }
    const data = await response.json();

    const adaIsiProfil = Object.values(data.profil || {}).some(
      (nilai) => String(nilai ?? "").trim() !== "",
    );
    if (!adaIsiProfil) {
      aturState(
        "kosong",
        "Data profil kosong. Belum ada isi yang bisa ditampilkan.",
      );
      return;
    }

    renderProfil(data.profil);
    keterampilan = Array.isArray(data.keterampilan) ? data.keterampilan : [];
    renderKeterampilan();
    aturState(
      "sukses",
      "Data berhasil dimuat. Silakan lihat detail atau tambah keterampilan baru.",
    );
  } catch (error) {
    console.error(error);
    aturState(
      "error",
      "Gagal memuat data profil. Periksa path JSON atau koneksi, lalu tekan Coba Lagi.",
    );
  }
}

function toggleDetail() {
  const terbuka = panelDetail.classList.toggle("terbuka");
  tombolDetail.setAttribute("aria-expanded", String(terbuka));
  tombolDetail.textContent = terbuka ? "Tutup detail" : "Lihat detail";
}

function gantiTema() {
  tema = tema === "gelap" ? "terang" : "gelap";
  document.documentElement.setAttribute("data-tema", tema);
  tombolTema.textContent = tema === "gelap" ? "Mode terang" : "Mode gelap";
}

function tambahKeterampilan() {
  const nama = input.value.trim();

  if (nama === "") {
    pesanForm.textContent = "Nama keterampilan tidak boleh kosong.";
    input.focus();
    return;
  }
  if (keterampilan.some((s) => s.nama.toLowerCase() === nama.toLowerCase())) {
    pesanForm.textContent = `Keterampilan "${nama}" sudah ada di daftar.`;
    input.focus();
    return;
  }

  keterampilan.push({ nama, level: pilihLevel.value });
  pesanForm.textContent = "";
  input.value = "";
  input.focus();
  renderKeterampilan();
}

tombolDetail.addEventListener("click", toggleDetail);
tombolTema.addEventListener("click", gantiTema);
cobaLagi.addEventListener("click", muatData);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  tambahKeterampilan();
  pilihLevel.selectedIndex = 0;
});

input.addEventListener("input", () => {
  pesanForm.textContent = "";
});

muatData();
