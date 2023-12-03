const ocultarSecciones = () => {
  document.getElementById('explore-section').style.display = 'none';
  document.getElementById('boards-section').style.display = 'none';
  document.getElementById('users-section').style.display = 'none';
  document.getElementById('board-detail-section').style.display = 'none';
  
}

const explorar = () => {
  ocultarSecciones();
  document.getElementById('explore-section').style.display = 'block';
}

const misTableros = () => {
  ocultarSecciones();
  document.getElementById('boards-section').style.display = 'block';
}

const listaUsuarios = () => {
  ocultarSecciones();
  document.getElementById('users-section').style.display = 'block';
}

const mostrarDetallesTablero = () => {
  ocultarSecciones();
  document.getElementById('board-detail-section').style.display = 'block';
}

//____________________________________________________________________________________________________________________________________________

var usuarios = []; // usuarios del backend
var pines = []; // pines del backend
var pinesUsuarioSeleccionado=[]; // pines del usuario seleccionado
var tableros=[];
var tableroUsuarioseleccionado =[];

const urlUsuarios = 'http://localhost:4000/pinterest/usuarios'
const urlPines = 'http://localhost:4000/pinterest/pines'
const urlTablerosconDetalle = 'http://localhost:4000/pinterest/board'
const urlTablerosDeUsuario='http://localhost:4000/pinterest/usuarios/boards/'





//obtener usuarios
const getUsuarios = async () => {
  try {
    const response = await fetch(`${urlUsuarios}`);

    if (response.ok) {
      const usuariosBackend = await response.json();
      console.log('lista de usuarios del backed:', usuariosBackend);
      usuarios = usuariosBackend;

      //funcion para renderizar usuarios
      renderizarUsuarios();

    } else {
      console.error('error al obtener la lista de usuarios:', response.status);
    }
  } catch (error) {
    console.error('error en la solicitud:', error);
  }
};

getUsuarios();

//renderizar usuarios
const renderizarUsuarios = async () => {
  let contenedorUsuarios = document.getElementById('users-container');
  contenedorUsuarios.innerHTML = ""; 

  usuarios.forEach(usuario => {
       contenedorUsuarios.innerHTML += ` 
      <div class="user-card" onclick ="getTablerosDeUsuario('${usuario._id}')">
        <img src="${usuario.imagenPerfil}" />
      </div>`;
  });
};

const getPines = async () => {
  try {
    const response = await fetch(`${urlPines}`);

    if (response.ok) {
      const pinesBackend = await response.json();
      console.log('pines del backed:', pinesBackend);
      pines = pinesBackend;

      renderizarPines();

    } else {
      console.error('error al obtener la lista de pines:', response.status);
    }
  } catch (error) {
    console.error('error en la solicitud:', error);
  }
};

getPines();

const renderizarPines = async () => {
  let contenedorPines = document.querySelector('#explore-section .container');
  contenedorPines.innerHTML = ""; 

  pines.forEach(pin => {
        contenedorPines.innerHTML += `
        <div class="box">
          <img src=${pin.img} alt=""/>
          <div class="hover">
            <select class="board-select">
              <option>Tablero 1</option>
              <option>Tablero 2</option>
              <option>Tablero 3</option>
            </select>
            <button type="button">Guardar</button>
          </div>
          <div><h3 class="pin-title">${pin.title}</h3></div>
          <div class="pin-description">${pin.description}</div>
        </div>
        `;
  });
};





const getTablerosDeUsuario = async (id) => {
  try {
    const response = await fetch(`${urlTablerosDeUsuario}${id}`);

    if (response.ok) {
      const tablerosDeUsuariId = await response.json();
      console.log('tableros(id):', tablerosDeUsuariId);
      tableroUsuarioseleccionado = tablerosDeUsuariId;

      renderizarTablerosdeUsuario();
    } else {
      console.error('error al obtener los tablerosId:', response.status);
    }
  } catch (error) {
    console.error('error en la solicitud:', error);
  }
};


const renderizarTablerosdeUsuario = async () => {
  let contenedorTablerosUsuario = document.querySelector('#boards-section .board-container');
  contenedorTablerosUsuario.innerHTML = ""; 

  tableroUsuarioseleccionado.forEach(tablero => {
       contenedorTablerosUsuario.innerHTML += ` 
       
       <div class="board-card" onclick="mostrarDetallesTablero()">
       <div class="board-img-container" style="background-image: url(${tablero.boardImage});"></div>
       <h3>${tablero.boardTitle}</h3>
       <h5>5 ${tablero.pins.length}</h5>
       </div>       
       
       
       `;
  });
};