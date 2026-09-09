let productos = [];

// Elementos de la página
const contenedor = document.getElementById('contenedorProductos');
const filtroMarca = document.getElementById('filtroMarca');
const filtroCategoria = document.getElementById('filtroCategoria');
const filtroPrecio = document.getElementById('filtroPrecio');
const precioValor = document.getElementById('precioValor');

// Cargar el archivo JSON
fetch('productos.json?v=2')
  .then(response => response.json())
  .then(data => {
    productos = data;
    poblarFiltros();
    mostrarProductos(productos);
  })
  .catch(error => console.error('Error al cargar productos:', error));

// Mostrar las tarjetas en la página
function mostrarProductos(lista) {
  contenedor.innerHTML = '';
  if (lista.length === 0) {
    contenedor.innerHTML = '<p class="text-center text-muted">No hay productos con esos criterios.</p>';
    return;
  }
  lista.forEach(prod => {
    contenedor.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card product-card h-100 shadow-sm">
          <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text text-muted mb-1"><strong>Marca:</strong> ${prod.marca}</p>
            <p class="card-text text-muted mb-2"><strong>Categoría:</strong> ${prod.categoria}</p>
            <h6 class="text-primary fw-bold">$${prod.precio.toFixed(2)}</h6>
          </div>
        </div>
      </div>
    `;
  });
}

// Cargar opciones en los menús desplegables
function poblarFiltros() {
  const marcas = [...new Set(productos.map(p => p.marca))];
  const categorias = [...new Set(productos.map(p => p.categoria))];

  marcas.forEach(m => filtroMarca.innerHTML += `<option value="${m}">${m}</option>`);
  categorias.forEach(c => filtroCategoria.innerHTML += `<option value="${c}">${c}</option>`);
}

// Aplicar filtros en tiempo real
function aplicarFiltros() {
  const marcaSel = filtroMarca.value;
  const catSel = filtroCategoria.value;
  const precioMax = parseFloat(filtroPrecio.value);

  precioValor.textContent = precioMax;

  const filtrados = productos.filter(p => {
    const cumpleMarca = marcaSel === '' || p.marca === marcaSel;
    const cumpleCat = catSel === '' || p.categoria === catSel;
    const cumplePrecio = p.precio <= precioMax;
    return cumpleMarca && cumpleCat && cumplePrecio;
  });

  mostrarProductos(filtrados);
}

// Escuchar cuando el usuario mueve los filtros
filtroMarca.addEventListener('change', aplicarFiltros);
filtroCategoria.addEventListener('change', aplicarFiltros);
filtroPrecio.addEventListener('input', aplicarFiltros);