const API_URL = "https://script.google.com/macros/s/AKfycbznmIGglxr6Pb1QSTwcxe17zbyv6anYxjRIGYVa1TAJeYltKREKbC9RvItHmqIIWmGZ/exec";



/* ================= REGISTRO ================= */

async function registrar() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const legajo = document.getElementById("legajo").value;
  const apellido = document.getElementById("apellido").value;
  const nombre = document.getElementById("nombre").value;
  const jerarquia = document.getElementById("jerarquia").value;

  if (!email || !password || !apellido || !nombre) {
    alert("Completá todos los campos obligatorios");
    return;
  }

  // HASH de contraseña
  const passwordHash = bcrypt.hashSync(password, 10);

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "register",
      email,
      passwordHash,
      legajo,
      apellido,
      nombre,
      jerarquia
    })
  });

  const data = await response.json();

  if (data.success) {
    alert("Usuario registrado correctamente");
  } else {
    alert(data.error);
  }
}

/* ================= LOGIN ================= */

async function login() {

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const passwordHash = bcrypt.hashSync(password, 10);

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "login",
      email,
      passwordHash
    })
  });

  const data = await response.json();

  if (data.success) {
    alert("Bienvenido " + data.user.nombre);
  } else {
    alert(data.error);
  }
}
