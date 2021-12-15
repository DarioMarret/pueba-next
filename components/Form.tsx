import { useState, useEffect, ChangeEvent } from "react"
import { Col, Container, Row, Form, Button, InputGroup, FormControl, Modal as ModalSpinner } from "react-bootstrap";
import { FiUser, FiKey } from "react-icons/fi";
import axios from "axios"

export default function FormCliente() {
    const [Cliente, setCliente] = useState({
        cedula:null,
        nombres:null,
        apellidos:null,
        email:null,
        telefono:null,
        direccion:null,
        razon_social:null,
        tipo_identificacion_proveedor:null,
    })

    const handleTextImput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'cedula' && e.target.value.length === 10){
            axios.get(`https://turnos.manta.gob.ec/consultacedula/`+e.target.value,
            {
                headers: {
                    'Accept':'*/*',
                }
            })
            .then(response =>{
                console.log(response)
            }).catch(err=>{
                console.log(err)
            })
        }
    }
    return (
        <Container>
            {/* <SpinnerCargando visible={cargando}/> */}
            <h1 className="d-flex justify-content-end shadow-lg text-primary mt-5 p-3 text-center rounded">
                <b>Registrar</b>
                <b>Menu</b>
            </h1>
            <Row className="mt-5 justify-content-center align-items-center">
                <Col lg={5} md={6} sm={12}
                    className="p-5 m-auto shadow-lg rounded-lg "
                >
                    <i>Registrar datos para la emision de su factura electronico cuidando el ecosistema </i>
                    <Form>
                        <Form.Label>Cedula/Ruc:</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon1"><FiUser /></InputGroup.Text>
                            <FormControl
                                placeholder="Ingresar cedula o ruc"
                                name="cedula"
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label>Nombres:</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiKey /></InputGroup.Text>
                            <FormControl
                                placeholder="Ingresar nombres completo"
                                type="text"
                                name="nombres"
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label>Apellido:</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiKey /></InputGroup.Text>
                            <FormControl
                                placeholder="ingresar apellidos completo"
                                type="text"
                                name="apellidos"
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label>Correo:</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiKey /></InputGroup.Text>
                            <FormControl
                                placeholder="ingresar coreo electronico"
                                type="email"
                                name="correo"
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label>Contacto:</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiKey /></InputGroup.Text>
                            <FormControl
                                placeholder="Numero de contacto"
                                type="text"
                                name="contacto_1"
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label>Razon Social:</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiKey /></InputGroup.Text>
                            <FormControl
                                placeholder="Razon social o nombre comercial"
                                type="text"
                                name="razon_social"
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label>Direccion:</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiKey /></InputGroup.Text>
                            <FormControl
                                placeholder="ingresar una direccion"
                                type="text"
                                name="direccion"
                                onChange={handleTextImput}
                            />
                        </InputGroup>
                        <br />
                        <Button
                            variant="primary btn-block"
                            type="button"
                            className="form-control"
                        //   onClick={(e)=>btn_login_on_click(e)}
                        >
                            Registrar
                        </Button>
                    </Form>
                </Col>
            </Row>
            {/* ) : (
        //   <ConfirmacionValidacion /> */}
            {/* )} */}

        </Container>
    )
}