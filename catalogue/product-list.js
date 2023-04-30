export function render(data) {
  console.log(data)

  const container = document.createElement('div');
  container.classList.add('contaner', 'd-flex', 'justife-content-between', 'flex-wrap', 'py-4');

  for (const product of data) {
    const productCard = document.createElement('div');
    const img = document.createElement('img');
    const cardBody = document.createElement('div');
    const title = document.createElement('h5');
    const price = document.createElement('p');
    const detailsBtn = document.createElement('a');

    productCard.style.width = '18%';
    productCard.classList.add('card', 'my-2');
    img.classList.add('card-img-top');
    cardBody.classList.add('card-body');
    title.classList.add('card-title');
    price.classList.add('card-text');
    detailsBtn.classList.add('btn', 'btn-primary');

    productCard.append(img, cardBody);
    cardBody.append(title, price, detailsBtn);

    img.src = product.image;
    img.alt = product.title;
    title.textContent = product.title;
    price.textContent = product.price;
    detailsBtn.textContent = 'Подробнее';
    detailsBtn.href = `?productId=${product.id}`;

    container.append(productCard)
  }

  return container;
}




