// Datos de los gatos (simulando una base de datos)
const catBreeds = [
    {
        id: 1,
        name: "Rigby",
        description: "Pelaje largo y sedoso, cara plana y carácter tranquilo. Ideales para departamentos.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRzJsS2WQUAcUGn4yZULXGYfHgvE8mzzzQCA&s",
        badges: ["Gato negro", "ojos amarillos"],
        filter: "longhair",
        popular: true
    },
    {
        id: 2,
        name: "Uni",
        description: "Elegantes, vocales y muy cariñosos. Pelaje corto con puntos de color característicos.",
        image: "https://lh3.googleusercontent.com/chat_attachment/AP1Ws4sZYVf_z-X0-PpIiKZ4oqEO1zlj9cmdGMuaOU3yKUZFH90Yjfzj7S-eX65c9e6oz8sVfsLzNes-PGNRca-D4my2yc1GNBVlD_2Ypz5mE7LXsjlahK86JoRlRoFh7Aw3n4KpVLanPd7U2hNTBFxA4IP28slyO5350JRkR5HKXd_0mAorqzfeYivoGQrHEs3qI_Vi9Dwt-WbQi857ryWNWspH-r8-Pq6bAxSu2gipQmssqbz55sY04xfEAX5pmFqjV4nZhp7R8_ajJNGyIF8I92fWXAb6ZIvtD7uXSyMvEdHyx9_QbyD7OEXP7dM-umHhNRw=w512-k",
        badges: ["naranjo", "zzz"],
        filter: "shorthair",
        popular: true
    },
    {
        id: 3,
        name: "Mei Mei",
        description: "Aspecto salvaje con manchas como leopardos. Muy activos y juguetones.",
        image: "https://lh3.googleusercontent.com/chat_attachment/AP1Ws4v3EZWnW3imVEkulmV2zRi45gYachRxJ34V5fqZcRDPBeoEBRt7OeAIVhYORFKUnqMP-ZKeSDc0C0Cp1P3dtKNHzUjPLu0S31eBxrDZ1u7TgPzWWLrzVBWwLNLqZSTO8hJDswgfNkiPf9x4R5jBINb8jynKh3_yw0Ylfrh6tQ9UG5Lnho9M-ZvBW_irDNZo-3Mz2Qc5JQxSrj338seK-coUFqmfRRJw7MCxZDLTtlecggH0wDYYki6qzzql7-VBUrLrv3X1LPVyN71MwLHuE5hS03sJ_0iQ85SNDr9UpVaaYeejOp236ma1XHF91t942Ss=w512-k",
        badges: ["Cara de weta", "puro perkin"],
        filter: "shorthair",
        popular: true
    },
    {
        id: 4,
        name: "uncle bao",
        description: "Sin pelo, piel arrugada y muy sociables. Ideales para alérgicos.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1JOntI48SezrTsI8q7aZOUuJ6QHsQ9z9P0A&s",
        badges: ["Sin pelo", "Sociable"],
        filter: "hairless",
        popular: true
    },
    {
        id: 5,
        name: "Dou dou",
        description: "Gigantes gentiles, pelaje largo y denso. Muy inteligentes y amigables.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwdZ_bV3mBn1x-g1HgudifwH3kAZ0l0rH1CA&s",
        badges: ["Pelaje largo", "Gigante"],
        filter: "longhair",
        popular: true
    }
];

// Elementos del DOM
const catsContainer = document.getElementById('catsContainer');
const quickFilters = document.querySelectorAll('.category-badge');
const searchButton = document.getElementById('searchButton');
const categorySearch = document.getElementById('categorySearch');
const mainSearch = document.getElementById('mainSearch');
const searchForm = document.getElementById('searchForm');

// Función para renderizar las tarjetas de gatos
function renderCats(filteredCats) {
    catsContainer.innerHTML = '';
    
    filteredCats.forEach(cat => {
        const badges = cat.badges.map(badge => 
            `<span class="badge bg-primary me-1">${badge}</span>`
        ).join('');
        
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 col-xl-2-4';
        col.innerHTML = `
            <div class="card cat-card" data-filter="${cat.filter}">
                <img src="${cat.image}" class="card-img-top" alt="${cat.name}">
                <div class="card-body">
                    <h5 class="card-title">
                        <i class="bi bi-star-fill text-warning"></i> ${cat.name}
                    </h5>
                    <p class="card-text">${cat.description}</p>
                    <div class="d-flex flex-wrap gap-1">
                        ${badges}
                    </div>
                </div>
            </div>
        `;
        catsContainer.appendChild(col);
    });
}

// Función para filtrar gatos
function filterCats(filter) {
    if (filter === 'all') {
        return catBreeds;
    } else if (filter === 'popular') {
        return catBreeds.filter(cat => cat.popular);
    } else {
        return catBreeds.filter(cat => cat.filter === filter);
    }
}

// Función para buscar gatos por texto
function searchCats(searchTerm) {
    if (!searchTerm.trim()) {
        return catBreeds;
    }
    
    const term = searchTerm.toLowerCase().trim();
    return catBreeds.filter(cat => 
        cat.name.toLowerCase().includes(term) || 
        cat.description.toLowerCase().includes(term) ||
        cat.badges.some(badge => badge.toLowerCase().includes(term))
    );
}

// Función para actualizar la clase active en los filtros
function setActiveFilter(activeElement) {
    quickFilters.forEach(filter => {
        filter.classList.remove('active');
    });
    activeElement.classList.add('active');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    renderCats(catBreeds);
});

// Filtros rápidos
quickFilters.forEach(filter => {
    filter.addEventListener('click', (e) => {
        const filterValue = e.currentTarget.dataset.filter;
        const filteredCats = filterCats(filterValue);
        renderCats(filteredCats);
        setActiveFilter(e.currentTarget);
        
        // Limpiar búsqueda
        if (categorySearch) categorySearch.value = '';
        if (mainSearch) mainSearch.value = '';
    });
});

// Búsqueda por botón
if (searchButton) {
    searchButton.addEventListener('click', () => {
        const searchTerm = categorySearch.value;
        const searchedCats = searchCats(searchTerm);
        renderCats(searchedCats);
        
        // Remover active de los filtros
        quickFilters.forEach(filter => {
            filter.classList.remove('active');
        });
    });
}

// Búsqueda por formulario principal
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = mainSearch.value;
        const searchedCats = searchCats(searchTerm);
        renderCats(searchedCats);
        
        // Remover active de los filtros
        quickFilters.forEach(filter => {
            filter.classList.remove('active');
        });
    });
}

// Búsqueda en tiempo real (opcional)
if (categorySearch) {
    categorySearch.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = categorySearch.value;
            const searchedCats = searchCats(searchTerm);
            renderCats(searchedCats);
            
            quickFilters.forEach(filter => {
                filter.classList.remove('active');
            });
        }
    });
}

// Manejar el evento de búsqueda desde cualquier input
[categorySearch, mainSearch].forEach(input => {
    if (input) {
        input.addEventListener('input', () => {
            // Si el input está vacío, mostrar todos los gatos
            if (!input.value.trim()) {
                renderCats(catBreeds);
                
                quickFilters.forEach(filter => {
                    filter.classList.remove('active');
                });
            }
        });
    }
});

// Animación suave al cargar
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});