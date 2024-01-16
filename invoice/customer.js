const customerForm = document.getElementById("customerForm");
let customer = {
    id: Number,
    customerName : String,
    address : String,
    mobileNumber : Number,
    gstNumber : Number
}

function addCustomer(){
    customerForm.addEventListener('click', e =>{
        e.preventDefault();
        const customerFormData = new FormData(customerForm);
        //customer.id = 10;
        customer.customerName = document.getElementById("customerName").value;
        customer.address = document.getElementById("address").value;
        customer.mobileNumber = document.getElementById("mobNumber").value;
        customer.gstNumber = document.getElementById("gstNumber").value;     
        createCustomer(customer);
        console.log(JSON.stringify(customer));
        //alert();
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
    const url = "http://localhost:8080/api/customer";
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  };