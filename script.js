let stok = {
  "Big Boss": 20,
  "Small Boss": 30,
  "Red Poison": 25
};

let harga = {
  "Big Boss": 7000,
  "Small Boss": 4000,
  "Red Poison": 4000
};

let penjualan = [];

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function passwordPrompt(page) {
  let pass = prompt("Masukkan password untuk membuka halaman ini:");
  if (pass === "KELOMPOK1KEREN") {
    showPage(page);
  } else {
    alert("Password salah!");
  }
}

// Kasir
document.getElementById("kasirForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let produk = document.getElementById("produk").value;
  let jumlah = parseInt(document.getElementById("jumlah").value);

  if (stok[produk] < jumlah) {
    alert("Stok " + produk + " tidak cukup!");
    return;
  }

  stok[produk] -= jumlah;
  let total = harga[produk] * jumlah;

  let transaksi = {
    produk: produk,
    jumlah: jumlah,
    total: total,
    waktu: new Date().toLocaleString()
  };
  penjualan.push(transaksi);

  // Tampilkan struk
  let strukHTML = `
    <div class="struk">
      <h3>Struk Pembelian - Mafia Jawa</h3>
      <p>Produk: ${produk}</p>
      <p>Jumlah: ${jumlah}</p>
      <p>Total: Rp${total}</p>
      <p>Waktu: ${transaksi.waktu}</p>
      <p>Terima kasih telah membeli di Mafia Jawa 🍴</p>
    </div>
  `;
  document.getElementById("strukArea").innerHTML = strukHTML;

  tampilkanDataPenjualan();
});

function tampilkanDataPenjualan() {
  let list = document.getElementById("dataPenjualan");
  list.innerHTML = "";
  penjualan.forEach((p, i) => {
    let li = document.createElement("li");
    li.textContent = `${p.waktu} - ${p.produk} x${p.jumlah} = Rp${p.total}`;
    list.appendChild(li);
  });
}

function hapusData() {
  if (confirm("Yakin ingin menghapus semua data penjualan?")) {
    penjualan = [];
    tampilkanDataPenjualan();
    alert("Data penjualan berhasil dihapus!");
  }
}

