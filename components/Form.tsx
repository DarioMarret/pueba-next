import { useState, useEffect, ChangeEvent } from "react"
import { Col, Container, Row, Form, Button, InputGroup, FormControl, Modal as ModalSpinner } from "react-bootstrap";
import {  FiAirplay, FiUser, FiUsers, FiAtSign, FiPhone, FiArrowRight, FiBriefcase } from "react-icons/fi";
import axios from "axios"

interface TipoIden {
    id:number,
    codigo:string,
    tipo_identificacion:string,
}

export default function FormCliente() {

    const [tipoIden, settipoIden] = useState<TipoIden[]>([])
    const [empresa, setempresa] = useState(null)
    const [Cliente, setCliente] = useState({
        cedula:null,
        nombres:null,
        apellidos:null,
        correo:null,
        contacto_1:null,
        direccion:null,
        razon_social:null,
        tipo_identificacion_proveedor:null,
        empresa:null,
    })
    useEffect(() => {
        var pathname = window.location.search;
        let n_path = pathname.split("?empresa=")[1].split("%20").join(',').replaceAll(',', ' ')
        setCliente({
            ...Cliente,
            ['empresa']:n_path
        })
        setempresa(n_path)
        Init()
    }, [])

    const Init=async() => {
        const { data } = await axios.get(`https://sistemabmdigital.com:4000/listar_tipo_identificacion`)
        var n_tipo = data.data.filter(iten => iten.codigo != "07")
        
       settipoIden(n_tipo)
    }
    const handleTextImput = (e: ChangeEvent<HTMLInputElement>) => {
        setCliente({
            ...Cliente,
            [e.target.name]:e.target.value
        })
    }
    const handleTextImputSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setCliente({
            ...Cliente,
            [e.target.name]:e.target.value
        })
    }
    return (
        <Container>
            {/* <SpinnerCargando visible={cargando}/> */}
            {/* <h1 className="d-flex justify-content-end shadow-lg text-primary mt-5 p-3 text-center rounded">
                <b>Registrar</b>
                <b>Menu</b>
            </h1> */}
            <Row className="mt-5 justify-content-center align-items-center">
                <Col lg={5} md={6} sm={12}
                    className="p-5 m-auto shadow-lg rounded-lg "
                >
                    <h3 className="text-center">{empresa}</h3>
                    <i>Registrar datos para la emision de su factura electronico cuidando el ecosistema </i>
                    <Form>
                    <Form.Label>Tipo de Indentificacion:</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon1"><FiAirplay /></InputGroup.Text>
                            <select name="tipo_identificacion_proveedor" id="" className="form-control" onChange={handleTextImputSelect}>
                                <option value={null}>Seleccione un tipo de identificacion</option>
                                {
                                    tipoIden.map((iten, index) =>(
                                        <option value={iten.codigo} key={index}>{iten.tipo_identificacion}</option>
                                    ))
                                }
                            </select>
                        </InputGroup>


                        <Form.Label>Cedula/Ruc:</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon1"><FiAirplay /></InputGroup.Text>
                            <FormControl
                                placeholder="Ingresar cedula o ruc"
                                name="cedula"
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label>Nombres:</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiUser /></InputGroup.Text>
                            <FormControl
                                placeholder="Ingresar nombres completo"
                                type="text"
                                name="nombres"
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label>Apellido:</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiUsers /></InputGroup.Text>
                            <FormControl
                                placeholder="ingresar apellidos completo"
                                type="text"
                                name="apellidos"
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label>Correo:</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiAtSign /></InputGroup.Text>
                            <FormControl
                                placeholder="ingresar coreo electronico"
                                type="email"
                                name="correo"
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label>Contacto:</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiPhone /></InputGroup.Text>
                            <FormControl
                                placeholder="Numero de contacto"
                                type="text"
                                name="contacto_1"
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label>Razon Social:</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiBriefcase /></InputGroup.Text>
                            <FormControl
                                placeholder="Razon social o nombre comercial"
                                type="text"
                                name="razon_social"
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label>Direccion:</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiArrowRight /></InputGroup.Text>
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
                        //onClick={(e)=>btn_login_on_click(e)}
                        >
                            Registrar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
export async function getStaticProps({params}) {
    try {
        console.log(params);
        
    } catch (error) {
        console.log(error);
    }
}