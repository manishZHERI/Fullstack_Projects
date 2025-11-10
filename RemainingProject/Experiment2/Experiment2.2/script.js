document.getElementById("category").addEventListener("change", function () {
    const selectedCategory = this.value;
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        if (selectedCategory === "All" || product.dataset.category === selectedCategory) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});
