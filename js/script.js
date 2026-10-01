var productNameInput = document.getElementById("productNameInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productPriceInput = document.getElementById("productPriceInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");
var tableData = document.getElementById("tableData");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
 var productsContainer ;
 if( localStorage.getItem("myproducts") != null){
    productsContainer= JSON.parse(localStorage.getItem("myproducts"))
    console.log(productsContainer);
    displayProducts(productsContainer);
 }else{
     var productsContainer = [];
 }


 function addProduct(){

    if(validateProdactsName()==true){


            var product = {
    productName: productNameInput.value,
    productCategory: productCategoryInput.value,
    productPrice: productPriceInput.value,
    productDescription: productDescriptionInput.value,
};
    productsContainer.push(product);
    localStorage.setItem("myproducts",JSON.stringify(productsContainer))
    clearForm();
    displayProducts(productsContainer);



    }else{
        alert("enter the valid name")
    }

};



function clearForm(){
    productNameInput.value="";
    productCategoryInput.value="";
    productPriceInput.value="";
    productDescriptionInput.value="";
};
function displayProducts(productlist){
    var cartona= ``;
    for(var i=0 ; i<productlist.length ; i++){
        cartona +=` 
        <tr>
          <td>${i}</td>
          <td>${productlist[i].productName}</td>
          <td>${productlist[i].productCategory}</td>
          <td>${productlist[i].productPrice}</td>
          <td>${productlist[i].productDescription}</td>
          <td><button  onclick="updateProducts(${i})" class="btn btn-warning bt-sm">update</button></td>
          <td><button  onclick="deleteProducts(${i})" class="btn btn-danger bt-sm">delete</button></td>
        </tr>`;
    }
    tableData.innerHTML = cartona;
};


function searchProducts(searchTerm){
    if(searchTerm.length >1){
        var searchResult =[];
    for(var i=0 ; i < productsContainer.length ;i++){
        if(productsContainer[i].productName.toLowerCase().includes(searchTerm.toLowerCase()) == true){
            searchResult.push(productsContainer[i])
        }
    }
    displayProducts(searchResult);
}
}

function deleteProducts(deletedItem){
    productsContainer.splice(deletedItem,1)
    localStorage.setItem("myproducts", JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}
var currentIndex ;
function updateProducts(updatedItem){
    currentIndex = updatedItem ;
    
    productNameInput.value = productsContainer[updatedItem].productName;
    productPriceInput.value = productsContainer[updatedItem].productPrice;
    productCategoryInput.value = productsContainer[updatedItem].productCategory;
    productDescriptionInput.value = productsContainer[updatedItem].productDescription;
    updateBtn.classList.replace("d-none","d-inline-block");
    addBtn.classList.add("d-none");
}


function productAfterUpdate(){
//     var product = {
//     productName: productNameInput.value,
//     productCategory: productCategoryInput.value,
//     productPrice: productPriceInput.value,
//     productDescription: productDescriptionInput.value,
// }; 
//     productsContainer[currentIndex]= product;      //de sah w kman elta7tha sah 

    productsContainer[currentIndex].productName = productNameInput.value ;
    productsContainer[currentIndex].productPrice = productPriceInput.value ;
    productsContainer[currentIndex].productCategory = productCategoryInput.value;
    productsContainer[currentIndex].productDescription = productDescriptionInput.value;

    localStorage.setItem("myproducts", JSON.stringify(productsContainer));
    displayProducts(productsContainer);
    clearForm();
    addBtn.classList.replace("d-none","d-inline-block");
    updateBtn.classList.add("d-none");
}

function validateProdactsName(){
    var regex= /^[A-Z][a-z]{3,10}$/ ;
    if(regex.test(productNameInput.value)==true){
        productNameInput.classList.replace("is-invalid","is-valid");
        return true;
    }else{
         productNameInput.classList.add("is-invalid");
        return false;
    };
}
function validateProdactsPrice(){
    var regex= /^[1-90]{3,6}$/ ;
    if(regex.test(productPriceInput.value)==true){
        productPriceInput.classList.replace("is-invalid","is-valid");
        return true;
    }else{
         productPriceInput.classList.add("is-invalid");
        return false;
    };
}