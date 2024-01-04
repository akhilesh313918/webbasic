const productForm = document.getElementById("productForm");
let product = {
    id: Number,
    productName : String,
    companyName : String,
    hsncode : Number
}

function addProduct(){
    productForm.addEventListener('click', e =>{
        e.preventDefault();
        const productFormData = new FormData(productForm);
        product.productName = document.getElementById("productName").value;
        product.companyName = document.getElementById("companyName").value;
        product.hsncode = document.getElementById("hsncode").value;     
        createProduct(product);
        console.log(JSON.stringify(product));
        alert();
    })
}

const createProduct = async (product) => {
    let bodydata = product;
    console.log(JSON.stringify(product));
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodydata),
    };
    const url = "http://localhost:3000/products";
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  };