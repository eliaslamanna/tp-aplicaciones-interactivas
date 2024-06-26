import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { baseUrl, token } from "../../shared";

export const EditarPermisoModal = ({ refreshData }) => {
  const [show, setShow] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [buttonState, setButtonState] = useState({
    buttonColor: "",
    isButtonDisable: false,
  });
  const [usuario, setUsuario] = useState({
    nombre: "",
    contrasena: "",
    tipoUsuario: "",
    roleType: ""
  });

  const { buttonColor, isButtonDisable } = buttonState;

  const handleClose = () => {
    setShow(false);
    limpiarInputs();
  };

  const handleShow = () => {
    setShow(true);
  };

  const limpiarInputs = () => {
    setUsuario({
      nombre: "",
      contrasena: "",
      tipoUsuario: "",
      roleType: ""
    });
  };

  useEffect(() => {
    if (usuario.nombre === "" || usuario.contrasena === "" || usuario.tipoUsuario === "") {
      setButtonState({
        buttonColor: "secondary",
        isButtonDisable: true,
      });
    } else {
      setButtonState({
        buttonColor: "success",
        isButtonDisable: false,
      });
    }
  }, [usuario]);

  const handleSubmit = () => {
    setIsPending(true);


    console.log("Enviando Post: " + JSON.stringify(usuario));
    fetch(baseUrl + "usuarios/3", {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Methods": "POST, GET, PUT",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    }).then(() => {
      setIsPending(false);
      handleClose();
      refreshData();
    });
  };

  return (
    <div>
      <Button className="btn btn-primary" id="btn-nuevoUsuario" onClick={handleShow}>
        Modificar usuario
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="agregarUsuarioForm"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(usuario);
            }}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                name="nombre"
                value={usuario.nombre}
                onChange={(event) =>
                  setUsuario({
                    ...usuario,
                    nombre: event.target.value,
                  })
                }
              />
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese la contraseña"
                name="contrasena"
                value={usuario.contrasena}
                onChange={(event) =>
                  setUsuario({
                    ...usuario,
                    contrasena: event.target.value,
                  })
                }
              />
              <Form.Label>Tipo de Usuario</Form.Label>
              <Form.Select
                onChange={(event) => {
                  setUsuario({
                    ...usuario,
                    tipoUsuario: event.target.value,
                    roleType: (event.target.value === "PERSONAL_INTERNO" ? "ADMIN" : "NO_ADMIN") 
                  });
                }}
                aria-label="Default select example"
              >
                <option value=''>Seleccione el tipo de usuario</option>
                <option value="INQUILINO">Inquilino</option>
                <option value="PROPIETARIO">Propietario</option>
                <option value="PERSONAL_INTERNO">Personal interno</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {!isPending && (
            <Button
              variant={buttonColor}
              form="agregarUsuarioForm"
              disabled={isButtonDisable}
              type="submit"
            >
              Crear
            </Button>
          )}
          {isPending && (
            <Button disabled variant="secondary">
              Creando usuario...
            </Button>
          )}
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default EditarPermisoModal;
