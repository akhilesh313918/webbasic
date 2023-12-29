let invoiceForm = document.getElementById("upDateInvoiceForm");
let tbody = document.querySelector("tbody");
let table = document.querySelector("table");
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
	<th scope="row">1</th>
	<td>
	  <input
		name="productName"
		type="text"
		class="form-control"
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
	  />
	</td>
	<td>
	  <input
		name="rate"
		type="number"
		class="form-control text-end"
	  />
	</td>
	<td>
	  <input
		name="total"
		type="number"
		class="form-control text-end"
	  />
	</td>
	<td>
	  <i class="fa-solid fa-trash"></i>
	</td>
  </tr>`;
  tbody.insertAdjacentHTML('beforeend',markup)
}
	
function onDelete(e){
	if(!e.target.classList.contains("fa-trash")){
		console.log("inside if");
		return;
	}
	const btn = e.target;
	btn.closest("tr").remove();

}

table.addEventListener("click", onDelete)