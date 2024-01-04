const customerForm = document.getElementById("customerForm");
let customer = {
    id: Number,
    productName : String,
    address : String,
    mobNumber : Number,
    gstNum : Number
}

function addCustomer(){
    customerForm.addEventListener('click', e =>{
        e.preventDefault();
        const customerFormData = new FormData(customerForm);
        customer.id = 10;
        customer.customerName = document.getElementById("customerName").value;
        customer.address = document.getElementById("address").value;
        customer.mobNumber = document.getElementById("mobNumber").value;
        customer.gstNum = document.getElementById("gstNumber").value;     
        createCustomer(customer);
        console.log(JSON.stringify(customer));
        alert();
    })
}

const createCustomer = async (customer) => {
    let bodydata = customer;
    console.log(JSON.stringify(customer));
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodydata),
    };
    const url = "http://localhost:3000/customers";
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  };