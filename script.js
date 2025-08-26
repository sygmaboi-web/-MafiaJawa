let currentPage = "home";
let keranjang = [];
let penjualan = [];
let stok = { "Big Boss": 50, "Small Boss": 50, "Red Poison": 50 }; // stok awal

function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  currentPage = page;
}

function authPage(page) {
  let pass = prompt("Masukkan password:");
  if (pass === "KELOMPOK1KEREN") {
    showPage(page);
  } else {
    alert("Password salah!");
  }
}

function tambahKeranjang() {
  let produk = document.getElementById("produkSelect").value;
  let jumlah = parseInt(document.getElementById("jumlah").value);

  if (stok[produk] < jumlah) {
    alert("Stok tidak cukup untuk " + produk);
    return;
  }

  keranjang.push({ produk, jumlah });
  updateKeranjang();
}

function updateKeranjang() {
  let list = document.getElementById("keranjang");
  list.innerHTML = "";
  keranjang.forEach((item, i) => {
    let li = document.createElement("li");
    li.textContent = `${item.produk} x${item.jumlah}`;
    list.appendChild(li);
  });
}

function checkout() {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let total = 0;
  let strukText = "=== STRUK MAFIA JAWA ===\n";
  keranjang.forEach(item => {
    let harga = item.produk === "Big Boss" ? 7000 : (item.produk === "Small Boss" ? 4000 : 4000);
    let subtotal = harga * item.jumlah;
    total += subtotal;
    stok[item.produk] -= item.jumlah;
    strukText += `${item.produk} x${item.jumlah} = Rp${subtotal}\n`;
  });
  strukText += `Total: Rp${total}\nTerima kasih!\n`;

  document.getElementById("struk").textContent = strukText;
  penjualan.push(strukText);
  keranjang = [];
  updateKeranjang();
  updatePenjualan();
}

function updatePenjualan() {
  let list = document.getElementById("daftar-penjualan");
  list.innerHTML = "";
  let total = 0;
  penjualan.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item.split("\n")[1]; // ambil baris pertama produk
    list.appendChild(li);
    let match = item.match(/Total: Rp(\d+)/);
    if (match) total += parseInt(match[1]);
  });
  document.getElementById("total-penjualan").textContent = "Total Penjualan: Rp" + total;
}

function hapusData() {
  if (confirm("Yakin ingin menghapus semua data penjualan?")) {
    penjualan = [];
    updatePenjualan();
    alert("Data penjualan sudah dihapus!");
  }
}

