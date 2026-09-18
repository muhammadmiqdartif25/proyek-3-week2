"use strict";
const status = document.querySelector("#status");
const daftar = document.querySelector("#daftar-materi");
const tombolMuat = document.querySelector("#muat");
const tombolCobaLagi = document.querySelector("#coba-lagi");

function aturState(state, pesan) {
  status.setAttribute("data-state", state);
  status.textContent = pesan;
  tombolCobaLagi.hidden = state !== "error";
}

async function ambilMateri() {
  const response = await fetch("data/materi.json");
  if (!response.ok) {
    throw new Error(`Server merespons dengan status ${response.status}`);
  }
  return await response.json();
}

function renderMateri(data) {
  const dFrag = document.createDocumentFragment();

  data.forEach(createCard);
  function createCard(materi) {
    const kartu = document.createElement("article");
    kartu.className = "kartu";

    const judul = document.createElement("h2");
    judul.textContent = materi.judul;

    const durasi = document.createElement("p");
    durasi.textContent = `Durasi: ${materi.durasi} menit`;

    kartu.append(judul, durasi);
    dFrag.append(kartu);
  }

  daftar.replaceChildren(dFrag);
}

async function muatData() {
  aturState("loading", "Memuat data...");
  tombolMuat.disabled = true;
  daftar.replaceChildren();
  try {
    const data = await ambilMateri();

    if (!Array.isArray(data) || data.length === 0) {
      aturState("success", "Belum ada materi yang tersedia.");
      return;
    }

    renderMateri(data);
    aturState("success", `Berhasil memuat ${data.length} materi.`);
  } catch (error) {
    console.error(error);
    aturState(
      "error",
      "Gagal memuat data materi. Periksa koneksi lalu coba lagi.",
    );
  } finally {
    tombolMuat.disabled = false;
  }
}

tombolMuat.addEventListener("click", muatData);
tombolCobaLagi.addEventListener("click", muatData);
