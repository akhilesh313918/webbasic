let invoiceForm = document.getElementById("upDateInvoiceForm");
let invoiceNum = document.getElementById("invoiceNum");
let customerName = document.getElementById("customerName");
let addressNPhone = document.getElementById("Address&Phone");
let gstNum = document.getElementById("gstNum");
let date = document.getElementById("date");
let tbody = document.querySelector("tbody");
let table = document.querySelector("table");
let customerList = document.getElementById("customerList");
let productList = document.getElementById("productList");
let productName = document.getElementById("productName");
let subtotal = document.getElementById("subtotal");
let cgst = document.getElementById("cgst");
let sgst = document.getElementById("sgst");
let igst = document.getElementById("igst");
let netotal = document.getElementById("nettotal");
let rowIndex;
let rowCount = 1;

let invoice = {
	id : Number,
	customerName : String,
	addressAndPhone : String,
	gstNum: String,
	date: String,
	subtotal : Number,
  cgst : Number,
  sgst : Number,
  igst : Number,
  netotal : Number,
	items : []
};

let item = {
	productName : String,
	description: String,
	hsncode: String,
	quantity: Number,
	price: Number,
	total: Number
};

function onPageLoad(){
	console.log("invoiceId - " + sessionStorage.getItem("invoiceId"));
      let id = sessionStorage.getItem("invoiceId");
      console.log("http://localhost:8080/api/invoice/" + id);
      fetch("http://localhost:8080/api/invoice/" + id)
        .then((res) => {
          console.log(res.json);
          return res.json();
        })
        .then((data) => {
          console.log(data);
		  invoiceNum.value = data.id;
		  customerName.value = data.customerName;
		  addressNPhone.value = data.addressAndPhone;
		  date.value = data.date;
		  gstNum.value = data.gstNum;
		  subtotal.value = data.subtotal;	
		  cgst.value = data.cgst;
		  sgst.value = data.sgst;
		  igst.value = data.igst;
		  netotal.value = data.netotal;

		  console.log("item arr lengths is "+data.items.length);
          //let rowCount = 1;
          for((item) of data.items){
            const markup = `<tr>
                <th scope="row">${rowCount}</th>
                <td><input name="productName" type="text" class="form-control" oninput="filterProducts(this)"
				onclick="loadProductsList(this);"  value="${item.productName}" /></td>
                <td><input name="description" type="text" class="form-control text-end" value="${item.description}" /></td>
                <td><input name="hsncode" type="number" class="form-control text-end" value="${item.hsncode}" /></td>
                <td><input name="qty" type="number" class="form-control text-end"  onchange="calc(this);" required value="${item.quantity}" /></td>
                <td><input name="rate" type="number" class="form-control text-end" onchange="calc(this);" required value="${item.price}" /></td>
                <td><input name="total" type="number" class="form-control text-end" required disabled value="${item.total}" /></td>
                <td><i class="fa-solid fa-trash" onclick="onDelete(this);"></i></td>
              </tr>`
              document
            .querySelector("tbody")
            .insertAdjacentHTML("beforeend", markup);
            rowCount++;	
		  }
		})
}
onPageLoad();

function update(){
invoiceForm.addEventListener("submit", (e) => {	
	console.log("inside modify");
	e.preventDefault();
  
	const formData = new FormData(invoiceForm);
	// for(item of formData){
	// 	console.log(item);
	// }
  
	invoice.id = invoiceNum.value;;
  
	invoice.customerName = formData.get("customerName");
	invoice.addressAndPhone = formData.get("Address&Phone");
	invoice.gstNum = formData.get("gstNum");
	invoice.date = formData.get("date").toString();
	invoice.subtotal = subtotal.value;
  invoice.cgst = cgst.value;
  invoice.sgst = sgst.value;
  invoice.igst = igst.value;
  invoice.netotal = netotal.value;
  
	let rowLegnth = table.rows.length;
	console.log("Table length is " + rowLegnth);
	for (let i = 1; i < rowLegnth; i++) {
		
	 let item = {};	
	  //gets cells of current row
	  let oCells = table.rows.item(i).cells;
	  console.log("Total num of cells -> " + oCells.length);
	  console.log("cells detail -> " + oCells.item(i).value);
  
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
  
	  invoice.items.push(item);
	}
  
	console.log("invoice data -> " + JSON.stringify(invoice));
	modify(invoice, invoice.id);
	item = {};
  });
}

  function delRow() {
	var table = document.getElementById("items").deleteRow(1);
  }  

const modify = async(invoice, id)=> {
    let bodydata = invoice;
    
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(bodydata)
    };
    const url = 'http://localhost:8080/api/invoice/update/'+id;
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

function onAdd(){
	let markup = `<tr>
	<th scope="row">${rowCount}</th>
	<td>
	  <input
		name="productName"
		type="text"
		class="form-control"
		oninput="filterProducts(this)"
        onclick="loadProductsList(this);"
		required
	  />
	</td>
	<td>
	  <input
		name="description"
		type="text"
		class="form-control text-end"
		required
	  />
	</td>
	<td>
	  <input
		name="hsncode"
		type="number"
		class="form-control text-end"
		required
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
	  />
	</td>
	<td>
	  <i class="fa-solid fa-trash" onclick="onDelete(this);"></i>
	</td>
  </tr>`;
  tbody = document.querySelector("tbody");
  tbody.insertAdjacentHTML('beforeend',markup);
  rowCount++;
}
	
function onDelete(e) {
	console.log(e);
	// if (!e.target.classList.contains("fa-trash")) {
	//   console.log("inside if");
	//   return;
	// }
	const btn = e;
	btn.closest("tr").remove();
	rowCount--;
  }
  
//table.addEventListener("click", onDelete);

// table = document.querySelector("table");
//table.addEventListener("click", onDelete())

function calc(e) {
	console.log("Inside on calc");
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
	customerList.innerHTML = "";
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
		li.onclick = function() { selectCustomer(this); };
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
  
  function selectCustomer(e){
	  //alert(e.innerText)
	  customerName.value = e.innerText;
	  customerList.style.display = "none";
	  populateAddressGst(customerName.value);
  }
  
  function populateAddressGst(customerName){
	  fetch("http://localhost:3000/customers")
	  .then((response) => response.json())
	  .then((customers) => setCustomerAddAndGst(customerName,customers));
  
	  function setCustomerAddAndGst(customerName, customers){
		  for(let customer of customers){
			  if (customer.customerName === customerName){
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
	//populateHsnCode(productName.value);
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