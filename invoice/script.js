let invoiceForm = document.getElementById("invoiceForm");
let tbody = document.querySelector("tbody");
let table = document.querySelector("table");
let customerList = document.getElementById("customerList");
let customerName = document.getElementById("customerName");
let AddressNPhone = document.getElementById("Address&Phone");
let gstNum = document.getElementById("gstNum");
let invoiceNum = document.getElementById("invoiceNum");
let productList = document.getElementById("productList");
let productName = document.getElementById("productName");
let rowIndex;
let rowCount = 1;

let invoice = {
  id: Number,
  customerName: String,
  addressAndPhone: String,
  gstNum: String,
  date: String,
  subtotal : Number,
  cgst : Number,
  sgst : Number,
  igst : Number,
  netotal : Number,
  items: []
};

let item = {
  productName: String,
  description: String,
  hsncode: String,
  quantity: Number,
  price: Number,
  total: Number,
};

function getLatestInvoiceId() {
  fetch("http://localhost:3000/invoiceid")
    .then((response) => response.json())
    .then((data) => {
      let latestInvoiceNum = data[0].id;
      invoiceNum.value = +(latestInvoiceNum) + (+1);
      console.log("invoiceNum.value "+invoiceNum.value);
    });
}
getLatestInvoiceId();

function create(){
invoiceForm.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(invoiceForm);
  // for(item of formData){
  // 	console.log(item);
  // }

  invoice.id = invoiceNum.value;
  console.log("invoice.id  - " + invoice.id);

  invoice.customerName = formData.get("customerName");
  invoice.addressAndPhone = formData.get("Address&Phone");
  invoice.gstNum = formData.get("gstNum");
  invoice.date = formData.get("date").toString();
  console.log("subtotal  >>>>>>> "+ document.getElementById("subtotal").value);
  invoice.subtotal = document.getElementById("subtotal").value;
  invoice.cgst = document.getElementById("cgst").value;
  invoice.sgst = document.getElementById("sgst").value;
  invoice.igst = document.getElementById("igst").value;
  invoice.netotal = document.getElementById("nettotal").value;

  let rowLegnth = table.rows.length;
  console.log("Table length is " + rowLegnth);
  for (let i = 1; i < rowLegnth; i++) {
    //gets cells of current row
    item = {};
    let oCells = table.rows.item(i).cells;
    console.log("Total num of cells -> " + oCells.length);

    //gets amount of cells of current row
    var cellLength = oCells.length;
    //loops through each cell in current row
    // for(var j = 1; j < cellLength-1; j++){
    // 	/* get your cell info here */
    // 	var cellVal = oCells.item(j).firstChild.value;
    // 	console.log("j - "+j);
    console.log(
      "cell data - " + oCells.item(1).getElementsByTagName("input")[0].value
    );
    item.productName = oCells.item(1).getElementsByTagName("input")[0].value;

    console.log(
      "cell data - " + oCells.item(2).getElementsByTagName("input")[0].value
    );
    item.description = oCells.item(2).getElementsByTagName("input")[0].value;

    console.log(
      "cell data - " + oCells.item(3).getElementsByTagName("input")[0].value
    );
    item.hsncode = oCells.item(3).getElementsByTagName("input")[0].value;

    console.log(
      "cell data - " + oCells.item(4).getElementsByTagName("input")[0].value
    );
    item.quantity = oCells.item(4).getElementsByTagName("input")[0].value;

    console.log(
      "cell data - " + oCells.item(5).getElementsByTagName("input")[0].value
    );
    item.price = oCells.item(5).getElementsByTagName("input")[0].value;

    console.log(
      "cell data - " + oCells.item(6).getElementsByTagName("input")[0].value
    );
    item.total = oCells.item(6).getElementsByTagName("input")[0].value;

    // item.push(oCells.item(j).firstChild.value);
    // if(item.length > 6){
    // 	item.splice(0,item.length)
    // }
    // }
    // item.productName = formData.get("productName");
    // item.description = formData.get("description");
    // item.hsncode = formData.get("hsncode");
    // item.quantity = formData.get("qty");
    // item.price = formData.get("rate");
    // item.total = formData.get("total");
    invoice.items.push(item);
    item = {};
  }

  // invoice.items.push(item);

  console.log("invoice data -> " + JSON.stringify(invoice));
  createUser(invoice);
  console.log(e);
  alert(e);
  // e.preventDefault();
});
}

const createUser = async (invoice) => {
  let bodydata = invoice;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodydata),
  };
  const url = "http://localhost:3000/invoices";
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

function onAdd() {
  let rowLegnth = table.rows.length;
  console.log("Table length is " + rowLegnth);
  rowIndex = rowLegnth;

  let markup = `<tr>
	<th scope="row">${rowIndex}</th>
	<td>
	  <input
		name="productName"
                      id="productName"
                      type="text"
                      class="form-control"
                      oninput="filterProducts(this);"
                      onclick="loadProductsList(this);"
                      required
	  />
	</td>
	<td>
	  <input
		name="description"
		type="text"
		class="form-control text-end"
	  />
	</td>
	<td>
	  <input
		name="hsncode"
		type="number"
		class="form-control text-end"
	  />
	</td>
	<td>
	  <input
		name="qty"
		type="number"
		class="form-control text-end"
		onchange="calc(this);"
    required
	  />
	</td>
	<td>
	  <input
		name="rate"
		type="number"
		class="form-control text-end"
		onchange="calc(this);"
    required
	  />
	</td>
	<td>
	  <input
		name="total"
		type="number"
		class="form-control text-end"
		disabled
    required
	  />
	</td>
	<td>
	  <i class="fa-solid fa-trash"></i>
	</td>
  </tr>`;
  tbody.insertAdjacentHTML("beforeend", markup);
}

function onDelete(e) {
  if (!e.target.classList.contains("fa-trash")) {
    console.log("inside if");
    return;
  }
  const btn = e.target;
  btn.closest("tr").remove();
}

table.addEventListener("click", onDelete);

function calc(e) {
  let index = e.parentElement.parentElement.rowIndex - 1;
  console.log(e.parentElement.parentElement.rowIndex);
  let qty = document.getElementsByName("qty")[index].value;
  let price = document.getElementsByName("rate")[index].value;
  let total = qty * price;
  document.getElementsByName("total")[index].value = total;
  calcSubTotal();
}

function calcSubTotal() {
  let sum = 0;
  let totals = document.getElementsByName("total");
  console.log(totals);
  for (let i = 0; i < totals.length; i++) {
    sum = +sum + +totals[i].value;
  }
  console.log("sum - " + sum);
  document.getElementById("subtotal").value = sum.toFixed(2);
  calcCgst();
  calcSgst();
  calcIgst();
  calcNetTotal();
}

function calcCgst() {
  //console.log("calcCgst "+e.value);
  let subtotal = document.getElementById("subtotal").value;
  let cgstSelect = document.getElementById("cgstSelect").value;
  document.getElementById("cgst").value = (
    subtotal *
    (cgstSelect * 0.01)
  ).toFixed(2);
  calcNetTotal();
}

function calcSgst() {
  let subtotal = document.getElementById("subtotal").value;
  let sgstSelect = document.getElementById("sgstSelect").value;
  document.getElementById("sgst").value = (
    subtotal *
    (sgstSelect * 0.01)
  ).toFixed(2);
  calcNetTotal();
}

function calcIgst(e) {
  let subtotal = document.getElementById("subtotal").value;
  let igstSelect = document.getElementById("igstSelect").value;
  document.getElementById("igst").value = (
    subtotal *
    (igstSelect * 0.01)
  ).toFixed(2);
  calcNetTotal();
}

function calcNetTotal() {
  let subtotal = document.getElementById("subtotal").value;
  let cgst = document.getElementById("cgst").value;
  let sgst = document.getElementById("sgst").value;
  let igst = document.getElementById("igst").value;
  document.getElementById("nettotal").value = Math.floor(
    +subtotal + +cgst + +sgst + +igst
  );
}

function loadCustomer() {
  customerList.innerHTML = " ";
  customerList.style.display = "block";
  fetch("http://localhost:3000/customers")
    .then((response) => response.json())
    .then((customers) => showCustomers(customers));

  function showCustomers(customers) {
    const ul = document.createElement("ul");
    ul.className = "list-group";
    for (let customer of customers) {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerText = customer.customerName;
      li.onclick = function () {
        selectCustomer(this);
      };
      ul.appendChild(li);
      customerList.appendChild(ul);
    }
  }
}

customerName.oninput = filterUsers;
function filterUsers() {
  const liElements = document.getElementsByClassName("list-group-item");
  for (let li of liElements) {
    const currentCustName = li.innerText.toLowerCase();
    const searchedCustName = customerName.value.toLocaleLowerCase();
    if (!currentCustName.includes(searchedCustName))
      li.setAttribute("hidden", true);
    else li.removeAttribute("hidden");
  }
}

function selectCustomer(e) {
  //alert(e.innerText)
  customerName.value = e.innerText;
  customerList.style.display = "none";
  populateAddressGst(customerName.value);
}

function populateAddressGst(customerName) {
  fetch("http://localhost:3000/customers")
    .then((response) => response.json())
    .then((customers) => setCustomerAddAndGst(customerName, customers));

  function setCustomerAddAndGst(customerName, customers) {
    for (let customer of customers) {
      if (customer.customerName === customerName) {
        AddressNPhone.value = customer.addressAndPhone;
        gstNum.value = customer.gst;
      }
    }
  }
}

function loadProductsList(pEvent) {
  productList.innerHTML = " ";
  productList.style.display = "block";
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((products) => {
      console.log(products);
      showProducts(products, pEvent);
    });

  function showProducts(products, pEvent) {
    const ul = document.createElement("ul");
    ul.innerHTML = " ";
    ul.className = "list-group";
    for (let product of products) {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.id = "productList";
      li.innerText = product.name;
      li.onclick = function () {
        selectProduct(pEvent, this);
      };
      ul.appendChild(li);
      productList.appendChild(ul);
    }
  }
}

//productName.oninput = filterProducts;
function filterProducts(e) {
  const liElements = document.getElementsByClassName("list-group-item");
  for (let li of liElements) {
    const currentProductName = li.innerText.toLowerCase();
    const searchedProductName = e.value.toLocaleLowerCase();
    if (!currentProductName.includes(searchedProductName)){
      li.setAttribute("hidden", true);
    }
    else li.removeAttribute("hidden");
  }
}

function selectProduct(pEvent, e) {
  pEvent.value = e.innerText;
  productList.style.display = "none";
  populateHsnCode(productName.value);
}

function populateHsnCode(productName){
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((products) => setHsncode(productName, products));

  function setHsncode(productName, products) {
    for (let product of products) {
      if (product.name === productName) {
      }
    }
  }
}
