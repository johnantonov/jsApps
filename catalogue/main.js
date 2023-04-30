let cssPromises = {};

function loadResource(src) {
  
  if (src.endsWith('.js')) {
    return import(src);
  }

  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve())
      });
      document.head.append(link)
    }
    return cssPromises[src]
  }
  
  return fetch(src).then(res => res.json());
}

const app = document.getElementById('app');
const searchParams = new URLSearchParams(location.search)

const productId = searchParams.get('productId')
if (productId) {
  console.log(productId)
  Promise.all([
      './product-details.js',
      `https://fakestoreapi.com/products/${productId}`,
      './bootstrap.min.css'
    ].map(src => loadResource(src))).then(([pageModule, data]) => {
      app.innerHTML = ''
      app.append(pageModule.render(data));
    });
} else {
  Promise.all([
    './product-list.js',
    'https://fakestoreapi.com/products',
    './bootstrap.min.css'
  ].map(src => loadResource(src))).then(([pageModule, data]) => {
    app.innerHTML = ''
    app.append(pageModule.render(data));
  });
}