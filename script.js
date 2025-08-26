// Data stok awal
let stok = {
  corndogKecil: 20,
  corndogBesar: 20,
  redPoison: 20
};

// Data hasil penjualan
let penjualan = [];

// Password
const PASSWORD = "KELOMPOK1KEREN";

// Fungsi tampilkan section
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Akses kasir
function aksesKasir() {
  let pass = prompt("Masukkan Password:");
  if (pass === PASSWORD) {
    showSection('kasir');
    loadKasir();
  } else {
    alert("Password salah!");
  }
}

// Akses hasil penjualan
function aksesPenjualan() {
  let pass = prompt("Masukkan Password:");
  if (pass === PASSWORD) {
    showSection('penjualan');
    loadPenjualan();
  } else {
    alert("Password salah!");
  }
}

// Isi konten kasir
function loadKasir() {
  let kasirDiv = document.getElementById("kasirContent");
  kasirDiv.innerHTML = `
    <h3>Pilih Produk</h3>
    <div class="kasir-grid">
      <button onclick="beli('Corndog Kecil', 4000, 'corndogKecil')">Corndog Kecil - Rp4.000</button>
      <button onclick="beli('Corndog Besar', 7000, 'corndogBesar')">Corndog Besar - Rp7.000</button>
      <button onclick="beli('Red Poison', 4000, 'redPoison')">Red Poison - Rp4.000</button>
    </div>
    <h3>Stok Saat Ini</h3>
    <ul>
      <li>Corndog Kecil: ${stok.corndogKecil}</li>
      <li>Corndog Besar: ${stok.corndogBesar}</li>
      <li>Red Poison: ${stok.redPoison}</li>
    </ul>
    <div id="struk"></div>
  `;
}

// Proses pembelian
function beli(nama, harga, key) {
  if (stok[key] > 0) {
    stok[key]--;
    let transaksi = {
      produk: nama,
      harga: harga,
      waktu: new Date().toLocaleString()
    };
    penjualan.push(transaksi);

    // Tampilkan struk
    document.getElementById("struk").inn
