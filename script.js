let keranjang = [];
let total = 0;

let rekap = { kecil: 0, besar: 0, toxic: 0, total: 0 };

function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(page).classList.remove('hidden');
}

function authKasir() {
  let pass = prompt("Masukkan Password:");
  if (pass === "KELOMPOK1KEREN") {
    showPage('kasir');
  } else {
    alert("Password salah!");
  }
}

function authKasirHasil() {
  let pass = prompt("Masukkan Password:");
  if (pass === "KELOMPOK1KEREN") {
    showPage('hasil');
    updateRekap();
  } else {
    alert("Password salah!");
  }
}

function tambahPenjualan() {
  let produk = document.getElementById("produk").value;
  let jumlah = parseInt(document.getElementById("jumlah").value);

  let namaProduk, harga;
  if (produk === "kecil") { namaProduk = "Corndog Kecil"; harga = 4000; }
  if (produk === "besar") { namaProduk = "Corndog Besar"; harga = 7000; }
  if (produk === "toxic") { namaProduk = "Toxic Red"; harga = 4000; }

  keranjang.push({ nama: namaProduk, harga: harga, jumlah: jumlah });
  total += harga * jumlah;

  tampilkanKeranjang();
}

function tampilkanKeranjang() {
  let list = document.getElementById("keranjang");
  list.innerHTML = "";
  keranjang.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.nama} x${item.jumlah} = Rp${item.harga * item.jumlah}`;
    list.appendChild(li);
  });
  document.getElementById("total").textContent = total;
}

function checkout() {
  if (keranjang.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  keranjang.forEach(item => {
    if (item.nama === "Corndog Kecil") rekap.kecil += item.jumlah;
    if (item.nama === "Corndog Besar") rekap.besar += item.jumlah;
    if (item.nama === "Toxic Red") rekap.toxic += item.jumlah;
  });
  rekap.total += total;

  let pembayaran = document.querySelector('input[name="bayar"]:checked').value;
  let strukBox = document.getElementById("struk");
  strukBox.classList.remove("hidden");
  strukBox.innerHTML = `<h4>Struk Pembelian</h4>
    ${keranjang.map(i => `<p>${i.nama} x${i.jumlah} = Rp${i.harga * i.jumlah}</p>`).join("")}
    <p><b>Total: Rp${total}</b></p>
    <p>Pembayaran: ${pembayaran}</p>
    <p>Terima kasih sudah membeli di Mafia Jawa!</p>`;

  keranjang = [];
  total = 0;
  tampilkanKeranjang();
  document.getElementById("total").textContent = "0";
}

function updateRekap() {
  document.getElementById("rekapKecil").textContent = rekap.kecil;
  document.getElementById("rekapBesar").textContent = rekap.besar;
  document.getElementById("rekapToxic").textContent = rekap.toxic;
  document.getElementById("rekapTotal").textContent = rekap.total;
}

// QRIS toggle
document.querySelectorAll('input[name="bayar"]').forEach(r => {
  r.addEventListener('change', () => {
    document.getElementById("qrisBox").classList.toggle("hidden", r.value !== "QRIS" || !r.checked);
  });
});
