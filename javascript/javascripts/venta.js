const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

function add() {
    const selectedOption = priceElement.options[priceElement.selectedIndex];
    const selectedProduct = selectedOption.getAttribute('data-descripcion');
    const price = parseInt(priceElement.value);
    const number = parseInt(numberElement.value);

    if (!selectedProduct || !price || !number) {
        window.alert("Por favor seleccione un producto y una cantidad válidos.");
        return;
    }

    let purchase = {
        product: selectedProduct,
        price: price,
        number: number,
    };

    const existingPurchaseIndex = purchases.findIndex((item) => item.product === purchase.product);

    if (existingPurchaseIndex === -1) {
        purchases.push(purchase);
    } else {
        purchases[existingPurchaseIndex].number += purchase.number;
    }

    window.alert(`${display()}\nSubtotal ${subtotal()} yenes`);

    priceElement.value = "0";
    numberElement.value = "";
}

function calc() {
    const sum = subtotal();
    const postage = calcPostageFromPurchase(sum);
    const total = sum + postage;

    const details = purchases.map(purchase =>
        `${purchase.product}, ${purchase.price} yenes: ${purchase.number} productos`).join('\n');

    window.alert(`${details}\n\nEl sub total ${sum} yenes\nLa tarifa de envio es ${postage} yenes\nEl total es ${total} yenes`);

    purchases = [];
    priceElement.value = "0";
    numberElement.value = "";
}

function subtotal() {
    return purchases.reduce((prev, purchase) => {
        return prev + purchase.price * purchase.number;
    }, 0);
}

function display() {
    return purchases.map(purchase => {
        return `${purchase.product}, ${purchase.price} yenes: ${purchase.number} productos`;
    }).join("\n");
}

function calcPostageFromPurchase(sum) {
    if (sum >= 3000) {
        return 0;
    } else if (sum >= 2000) {
        return 250;
    } else {
        return 500;
    }
}
