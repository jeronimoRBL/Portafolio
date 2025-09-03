
        let notas = JSON.parse(localStorage.getItem('notas')) || [];
        let indiceNotaActual = null;

        const contenedorNotas = document.getElementById('notes-container');
       
        const btnAgregarNota = document.getElementById('add-note-btn');
        
        const modalNota = document.getElementById('note-modal');
        
        const btnGuardarNota = document.getElementById('save-note');
        
        const btnCancelarNota = document.getElementById('cancel-note');
       
        const inputBuscar = document.getElementById('search');
       
        const btnsCategoria = document.querySelectorAll('.category-btn');

   
        
        function mostrarNotas(notasFiltradas = notas) {
        
            contenedorNotas.innerHTML = '';
        
            notasFiltradas.forEach((nota, indice) => {
        
                const divNota = document.createElement('div');
        
                divNota.className = 'nota';
        
                divNota.innerHTML = `
        
                <h3>${nota.titulo}</h3>
        
                <p><strong>Categoria:</strong> ${nota.categoria}</p>
        
                <p>${nota.contenido}</p>
        
                <button onclick="editarNota(${indice})">editar</button>
        
                <button onclick="borrarNota(${indice})">borrar</button>
        
                `;
                contenedorNotas.appendChild(divNota);
        
            });
        }

        btnAgregarNota.addEventListener('click', () => {
       
            indiceNotaActual = null;
       
            document.getElementById('modal-title').textContent = 'agregar Nueva Nota';
       
            document.getElementById('note-title').value = '';
       
            document.getElementById('note-category').value = 'html';
       
            document.getElementById('note-content').value = '';
            modalNota.style.display = 'flex';
       
        });

        btnGuardarNota.addEventListener('click', () => {
       
            const titulo = document.getElementById('note-title').value.trim();
       
            const categoria = document.getElementById('note-category').value;
       
            const contenido = document.getElementById('note-content').value.trim();
       
            if (!titulo || !contenido) return alert('el titulo y contenido son obligatorios');


            
            if (indiceNotaActual !== null) {
            
                notas[indiceNotaActual] = { titulo, categoria, contenido };
            
            } else {
            
                notas.push({ titulo, categoria, contenido });
            
            }
            
            localStorage.setItem('notas', JSON.stringify(notas));
            
            mostrarNotas();
            
            modalNota.style.display = 'none';
        });

        btnCancelarNota.addEventListener('click', () => {
        
            modalNota.style.display = 'none';
        
        });

        function editarNota(indice) {
        
            indiceNotaActual = indice;
        
            const nota = notas[indice];
        
            document.getElementById('modal-title').textContent = 'editar Nota';
        
            document.getElementById('note-title').value = nota.titulo;
        
            document.getElementById('note-category').value = nota.categoria;
        
            document.getElementById('note-content').value = nota.contenido;
        
            modalNota.style.display = 'flex';
        
        }
        function borrarNota(indice) {
        
            if (confirm('quieres borra esta nota?')) {
        
                notas.splice(indice, 1);
        
                localStorage.setItem('notas', JSON.stringify(notas));
        
                mostrarNotas();
        
            }
        
        }
        inputBuscar.addEventListener('input', (e) => {
        
            const busqueda = e.target.value.toLowerCase();
        
            const filtradas = notas.filter(nota =>
        
                nota.titulo.toLowerCase().includes(busqueda) ||
        
                nota.contenido.toLowerCase().includes(busqueda)
        
            );
        
            mostrarNotas(filtradas);
        
        });

        btnsCategoria.forEach(btn => {
        
            btn.addEventListener('click', (e) => {
        
                btnsCategoria.forEach(b => b.classList.remove('active'));
        
                e.target.classList.add('active');
        
                const categoria = e.target.dataset.category;
        
                const filtradas = categoria === 'all' ? notas : notas.filter(nota => nota.categoria === categoria);
        
                mostrarNotas(filtradas);
        
            });
        
        });

        mostrarNotas();