function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// Data penjualan
let sales = {
  "Big Boss": { price: 7000, sold: 0 },
  "Small Boss": { price: 4000, sold: 0 },
  "Red Poison": { price: 4000, sold: 0 }
};

document.getElementById('kasirForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  let produk = document.getElementById('produk').value;
  let jumlah = parseInt(document.getElementById('jumlah').value);
  let total = sales[produk].price * jumlah;
  
  // Update data
  sales[produk].sold += jumlah;
  
  // Generate struk
  let strukId = Math.floor(Math.random() * 100000);
  let struk = `
    <div class="struk">
      <h3>Struk Mafia Jawa</h3>
      <p>No Struk: #${strukId}</p>
      <p>Produk: ${produk}</p>
      <p>Jumlah: ${jumlah}</p>
      <p>Total: Rp${total.toLocaleString()}</p>
      <p>Terima kasih sudah berbelanja 🙏</p>
    </div>
  `;
  
  document.getElementById('strukContainer').innerHTML = struk;
  
  updatePenjualan();
});

function updatePenjualan() {
  let tbody = document.querySelector('#penjualanTable tbody');
  tbody.innerHTML = "";
  let grandTotal = 0;
  
  for (let item in sales) {
    let jumlah = sales[item].sold;
    let total = jumlah * sales[item].price;
    grandTotal += total;
    
    let row = `<tr>
      <td>${item}</td>
      <td>${jumlah}</td>
      <td>Rp${total.toLocaleString()}</td>
    </tr>`;
    tbody.innerHTML += row;
  }
  
  document.getElementById('grandTotal').innerText = "Total Penjualan: Rp" + grandTotal.toLocaleString();
}

