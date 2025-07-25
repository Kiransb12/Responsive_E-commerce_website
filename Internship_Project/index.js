let bar=document.getElementById("bar")
let nav=document.getElementById("navbar")
let close=document.getElementById("close")
if(bar)
{
    bar.addEventListener("click",()=>{
        nav.classList.add("active")
    })
}
if(close){
    close.addEventListener("click",()=>{
        nav.classList.remove("active")
    })
}
var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning') 

let timeRunning = 3000 
let timeAutoNext = 7000

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)


function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* trigger reflow */
    runningTime.style.animation = null 
    runningTime.style.animation = 'runningTime 7s linear 1 forwards'
}


function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)

    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)


    clearTimeout(runNextAuto)
    runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)

    resetTimeAnimation() // Reset the running time animation
}



























document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const img = button.getAttribute('data-img');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        let existingProduct = cart.find((item) => item.name === name);

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.push({ name, price, img, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(name + ' added to cart!');
      });
    });


    function loadCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const table = document.querySelector('table');

      // Remove old rows except the header (first row)
      let rows = table.querySelectorAll('tr');
      rows.forEach((row, i) => {
        if (i > 0) row.remove();
      });

      let subtotal = 0;

      cart.forEach((product) => {
        const tr = document.createElement('tr');

        // Product cell
        const tdProduct = document.createElement('td');
        tdProduct.innerHTML = `
          <div class="cart-info">
            <img src="${product.img}" alt="${product.name}" />
            <div>
              <p>${product.name}</p>
              <small>Price: $${product.price.toFixed(2)}</small><br />
              <a href="#" class="remove">Remove</a>
            </div>
          </div>
        `;

        // Quantity cell
        const tdQty = document.createElement('td');
        const inputQty = document.createElement('input');
        inputQty.type = 'number';
        inputQty.value = product.quantity;
        inputQty.min = 1;
        inputQty.addEventListener('change', (e) => {
          let newQty = parseInt(e.target.value);
          if (newQty < 1) newQty = 1;
          e.target.value = newQty;
          updateQuantity(product.name, newQty);
        });
        tdQty.appendChild(inputQty);

        // Subtotal cell
        const tdSubtotal = document.createElement('td');
        let productTotal = product.price * product.quantity;
        tdSubtotal.textContent = `$${productTotal.toFixed(2)}`;

        tr.appendChild(tdProduct);
        tr.appendChild(tdQty);
        tr.appendChild(tdSubtotal);

        table.appendChild(tr);

        subtotal += productTotal;
      });

      // Update totals
      const tax = subtotal * 0.15; // 15% tax
      const total = subtotal + tax;

      document.querySelector('.total-price table').innerHTML = `
        <tr><td>Subtotal</td><td>$${subtotal.toFixed(2)}</td></tr>
        <tr><td>Tax (15%)</td><td>$${tax.toFixed(2)}</td></tr>
        <tr><td><strong>Total</strong></td><td><strong>$${total.toFixed(2)}</strong></td></tr>
      `;

      // Remove item event
      document.querySelectorAll('.remove').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const productName = e.target.closest('div.cart-info').querySelector('p').textContent;
          removeProduct(productName);
        });
      });
    }

    function updateQuantity(name, quantity) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let product = cart.find((item) => item.name === name);
      if (product) {
        product.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
      }
    }

    function removeProduct(name) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart = cart.filter((item) => item.name !== name);
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCart();
    }

    window.onload = loadCart;
  



