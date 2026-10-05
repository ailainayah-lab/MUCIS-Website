// ================================
// JAVASCRIPT MUCIS
// ================================


// MENU MOBILE
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("open");
});


// DARK / LIGHT MODE
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }

});


// MODAL PESAN
const modal = document.getElementById("orderModal");
const closeModal = document.getElementById("closeModal");

const orderButtons =
    document.querySelectorAll("[data-open-order]");

orderButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const product =
            button.dataset.productChoice;

        if (product) {
            document.getElementById(
                "productSelect"
            ).value = product;
        }

        modal.classList.add("show");

        updateOrderTotal();

    });

});


closeModal.addEventListener("click", function () {
    modal.classList.remove("show");
});


// DATA PRODUK
const productSelect =
    document.getElementById("productSelect");

const toppingSelect =
    document.getElementById("toppingSelect");

const quantity =
    document.getElementById("quantity");

const orderTotal =
    document.getElementById("orderTotal");


// HARGA PRODUK
function getBasePrice() {

    const prices = {
        Cheesecuit: 12000,
        Jasuke: 10000,
        Combo: 20000
    };

    return prices[productSelect.value];

}


// HITUNG TOTAL HARGA
function updateOrderTotal() {

    let total = getBasePrice();

    const selectedTopping =
        toppingSelect.selectedOptions[0];

    const extra =
        Number(selectedTopping.dataset.extra);

    // Topping hanya ditambahkan untuk Cheesecuit
    if (productSelect.value === "Cheesecuit") {
        total += extra;
    }

    total *= Number(quantity.value);

    orderTotal.textContent =
        formatRupiah(total);

}


// GANTI PRODUK
productSelect.addEventListener(
    "change",
    updateOrderTotal
);


// GANTI TOPPING
toppingSelect.addEventListener(
    "change",
    updateOrderTotal
);


// TAMBAH JUMLAH
document.getElementById(
    "modalPlus"
).addEventListener("click", function () {

    quantity.value =
        Number(quantity.value) + 1;

    updateOrderTotal();

});


// KURANGI JUMLAH
document.getElementById(
    "modalMinus"
).addEventListener("click", function () {

    quantity.value =
        Math.max(
            1,
            Number(quantity.value) - 1
        );

    updateOrderTotal();

});


// FORM PESANAN
const orderForm =
    document.getElementById("orderForm");

orderForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const name =
            document.getElementById(
                "customerName"
            ).value.trim();

        if (name === "") {

            showToast(
                "Nama wajib diisi!"
            );

            return;
        }

        modal.classList.remove("show");

        showToast(
            "Terima kasih, " +
            name +
            "! Pesanan berhasil dibuat 🎉"
        );

        orderForm.reset();

        quantity.value = 1;

        updateOrderTotal();

    }
);


// COMBO
let comboQty = 1;

const comboPrice = 20000;

const comboQtyText =
    document.getElementById("comboQty");

const comboTotal =
    document.getElementById("comboTotal");


function updateCombo() {

    comboQtyText.textContent =
        comboQty;

    comboTotal.textContent =
        "Total: " +
        formatRupiah(
            comboQty * comboPrice
        );

}


// TAMBAH COMBO
document.getElementById(
    "qtyPlus"
).addEventListener("click", function () {

    comboQty++;

    updateCombo();

});


// KURANGI COMBO
document.getElementById(
    "qtyMinus"
).addEventListener("click", function () {

    comboQty =
        Math.max(
            1,
            comboQty - 1
        );

    updateCombo();

});


// PESAN COMBO
document.getElementById(
    "comboBtn"
).addEventListener("click", function () {

    productSelect.value = "Combo";

    quantity.value = comboQty;

    updateOrderTotal();

    modal.classList.add("show");

});


// FORMAT RUPIAH
function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}


// NOTIFIKASI
function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}


// JALANKAN SAAT WEBSITE DIBUKA
updateCombo();
updateOrderTotal();