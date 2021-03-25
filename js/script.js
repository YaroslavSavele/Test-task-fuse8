const cards = document.querySelector('.cards');

const temp = document.querySelector('#element-card');
const link = temp.content.querySelector('.cards__link');
const img = temp.content.querySelector('.card__img');
const adr = temp.content.querySelector('.card__address');
const title = temp.content.querySelector('.card__title');
const type = temp.content.querySelector('.card__type');
const price = temp.content.querySelector('.card__price');

function getArr() {
   fetch('https://603e38c548171b0017b2ecf7.mockapi.io/homes')
      .then(response => response.json())
      .then(data => createCard(data))
}
getArr()

function createCard(arr) {
   for (let item of arr) {
      img.src = `https://via.placeholder.com/377x227.jpg?text=House ${item.id}`
      title.textContent = item.title;
      adr.textContent = item.address;
      type.textContent = item.type;
      if (type.textContent == "IndependentLiving") {
         type.textContent = "Independent living";
         type.classList.remove('card__type_support');
         type.classList.add('card__type_independent');
      } else if (type.textContent == "SupportAvailable") {
         type.textContent = "Restaurant & Support available";
         type.classList.remove('card__type_independent');
         type.classList.add('card__type_support');
      }
      price.textContent = `£${thousandSeparator(item.price)}`;
      let card = temp.content.cloneNode(true);
      cards.append(card);
   }
}
function thousandSeparator(str) {
   let parts = (str + '').split('.'),
      main = parts[0],
      len = main.length,
      output = '',
      i = len - 1;

   while (i >= 0) {
      output = main.charAt(i) + output;
      if ((len - i) % 3 === 0 && i > 0) {
         output = ',' + output;
      }
      --i;
   }

   if (parts.length > 1) {
      output += '.' + parts[1];
   }
   return output;
};


document.querySelector('#fltr').oninput = function () {
   let val = this.value.trim().toLowerCase();
   let cardItems = document.querySelectorAll('.cards__link');

   if (val.length > 3) {
      cardItems.forEach(function (elem) {
         let title = elem.querySelector('.card__title');
         if (title.innerText.toLowerCase().search(val) == -1) {
            elem.classList.add('hide');
         } else {
            elem.classList.remove('hide');
         }
      });
   } else if (val == '') {
      cardItems.forEach(function (elem) {
         elem.classList.remove('hide');
      });
   }
}