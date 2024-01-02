let invoiceForm = document.getElementById("upDateInvoiceForm");
let invoiceNum = document.getElementById("invoiceNum");
let customerName = document.getElementById("customerName");
let addressNPhone = document.getElementById("Address&Phone");
let gstNum = document.getElementById("gstNum");
let date = document.getElementById("date");
let tbody = document.querySelector("tbody");
let table = document.querySelector("table");
let customerList = document.getElementById("customerList");
let rowIndex;
let rowCount = 1;

function onPageLoad(){
	console.log("invoiceId - " + sessionStorage.getItem("invoiceId"));
      let id = sessionStorage.getItem("invoiceId");
      console.log("http://localhost:3000/invoices/" + id);
      fetch("http://localhost:3000/invoices/" + id)
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

		  console.log("item arr lengths is "+data.items.length);
          //let rowCount = 1;
          for((item) of data.items){
            const markup = `<tr>
                <th scope="row">${rowCount}</th>
                <td><input name="productName" type="text" class="form-control"  value="${item.productName}" /></td>
                <td><input name="description" type="text" class="form-control text-end" value="${item.description}" /></td>
                <td><input name="hsncode" type="number" class="form-control text-end" value="${item.hsncode}" /></td>
                <td><input name="qty" type="number" class="form-control text-end" value="${item.quantity}" /></td>
                <td><input name="rate" type="number" class="form-control text-end" value="${item.price}" /></td>
                <td><input name="total" type="number" class="form-control text-end" value="${item.total}" /></td>
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

invoiceForm.addEventListener('submit', (e) => {
	e.preventDefault();
	
	const formData = new FormData(invoiceForm);
	// for(item of formData){
	// 	console.log(item);
	// }

	invoice.id =  formData.get("invoiceNum");
	invoice.customerName =  formData.get("customerName");
	invoice.addressAndPhone =  formData.get("Address&Phone");
	invoice.gstNum =  formData.get("gstNum");
	invoice.date =  formData.get("date").toString();
	

	item.productName = formData.get("productName");
	item.description = formData.get("description");
	item.hsncode = formData.get("hsncode");
	item.quantity = formData.get("qty");
	item.price = formData.get("rate");
	item.total = formData.get("total");

	invoice.items.push(item);
	
	console.log("invoice data -> "+ JSON.stringify(invoice));
	createUser(invoice, invoice.id);
})

function addRow() {
	var table = document.getElementById("items");
	var row = table.insertRow(2);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	var cell6 = row.insertCell(5);
	var cell7 = row.insertCell(6);
	cell1.innerHTML = "<input type='text'>";
	cell2.innerHTML = "<input type='text'>";
	cell3.innerHTML = "<input type='text'>";
	cell4.innerHTML = "<input type='text'>";
	cell5.innerHTML = "<input type='text'>";
	cell6.innerHTML = "<input type='text'>";
	cell7.innerHTML = "<button onclick='delRow()'>-</button>";
  }

  function delRow() {
	var table = document.getElementById("items").deleteRow(1);
  }  

var invoice = {
	id : Number,
	customerName : String,
	addressAndPhone : String,
	gstNum: String,
	date: String,
	items : []
};

var item = {
	productName : String,
	description: String,
	hsncode: String,
	quantity: Number,
	price: Number,
	total: Number
};


const createUser = async(invoice, id)=> {
    let bodydata = invoice;
    
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(bodydata)
    };
    const url = 'http://localhost:3000/invoices/'+id;
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
}
	
function onDelete(e) {
	console.log(e);
	// if (!e.target.classList.contains("fa-trash")) {
	//   console.log("inside if");
	//   return;
	// }
	const btn = e;
	btn.closest("tr").remove();
  }
  
//table.addEventListener("click", onDelete);

// table = document.querySelector("table");
//table.addEventListener("click", onDelete())

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