import { useState, useEffect, ChangeEvent } from "react"
import { Col, Container, Row, Form, Button, InputGroup, FormControl, Modal as ModalSpinner } from "react-bootstrap";
import {  FiAirplay, FiUser, FiUsers, FiAtSign, FiPhone, FiArrowRight, FiBriefcase } from "react-icons/fi";
import axios from "axios"
import { Modal } from "antd"

interface TipoIden {
    id:number,
    codigo:string,
    tipo_identificacion:string,
}

export default function FormCliente() {

    const [tipoIden, settipoIden] = useState<TipoIden[]>([])
    const [empresa, setempresa] = useState(null)
    const [Cliente, setCliente] = useState({
        id:null,
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
        localStorage.setItem("empresa", n_path)
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
    const handleTextImput = async(e: ChangeEvent<HTMLInputElement>) => {
        setCliente({
            ...Cliente,
            [e.target.name]:e.target.value
        })
        if(e.target.value.length == 10 || e.target.value.indexOf("001") == 10){
            let cedula = e.target.value
            let empresa = localStorage.getItem("empresa")
            const { data } = await axios.get(`api/ping/?empresa=${empresa}&cedula=${cedula}`)
            if(data){
                setCliente(data)
            }
            console.log(data)
        }
    }
    const handleTextImputSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setCliente({
            ...Cliente,
            [e.target.name]:e.target.value
        })
    }
    const btn_login_on_click =async()=>{
        if(Cliente.id != null){
            const { data } = await axios.put(`api/ping`,{Cliente})
            if(data){
                Modal.success({
                    title:'SISTEMABM',
                    content:'Datos Actualizado'
                })
            }
            console.log(data)
        }else{
            if(Cliente.tipo_identificacion_proveedor == "05"){
                if(Cliente.cedula.length == 10 ){
                    const { data } = await axios.post(`api/ping`,{Cliente})
                    if(data){
                        Modal.success({
                            title:'SISTEMABM',
                            content:'Listo datos creado'
                        })
                    }
                }else{
                    Modal.error({
                        title:'SISTEMABM',
                        content:'El CI. contiene 10 digitos del 0 al 9'
                    })
                }
            }else if(Cliente.tipo_identificacion_proveedor == "04"){
                if(Cliente.cedula.length == 13 && Cliente.cedula.indexOf("001") == 10){
                    const { data } = await axios.post(`api/ping`,{Cliente})
                    if(data){
                        Modal.success({
                            title:'SISTEMABM',
                            content:'Listo datos creado'
                        })
                    }
                }else{
                    Modal.error({
                        title:'SISTEMABM',
                        content:'El Ruc. contiene 13 digitos y termina en 001'
                    })
                }
            }else{
                const { data } = await axios.post(`api/ping`,{Cliente})
                if(data){
                    Modal.success({
                        title:'SISTEMABM',
                        content:'Listo datos creado'
                    })
                }
            }
        }
    }
    return (
        <Container>

            <Row className="m-0 vh-100 justify-content-center align-items-center">
                <Col lg={5} md={6} sm={12}
                    className="p-5 m-auto text-center shadow-lg rounded-lg "
                >
                    <h3 className="text-center">{empresa}</h3>
                    <i>Registrar datos para la emision de su factura electronico cuidando el ecosistema </i>
                    <Form>
                    <Form.Label className="d-flex text-start">Tipo de Documento</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon1"><FiAirplay /></InputGroup.Text>
                            <select name="tipo_identificacion_proveedor" id="" className="form-control" value={Cliente.tipo_identificacion_proveedor} onChange={handleTextImputSelect}>
                                <option value="">Seleccione un tipo de Documento</option>
                                {
                                    tipoIden.map((iten, index) =>(
                                        <option value={iten.codigo} key={index}>{iten.tipo_identificacion}</option>
                                    ))
                                }
                            </select>
                        </InputGroup>

                        <Form.Label className="d-flex text-start">Cedula/Ruc</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon1"><FiAirplay /></InputGroup.Text>
                            <FormControl
                                placeholder="Ingresar cedula o ruc"
                                name="cedula"
                                value={Cliente.cedula}
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label className="d-flex text-start">Nombres</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiUser /></InputGroup.Text>
                            <FormControl
                                placeholder="Ingresar nombres completo"
                                type="text"
                                name="nombres"
                                value={Cliente.nombres}
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label className="d-flex text-start">Apellido</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiUsers /></InputGroup.Text>
                            <FormControl
                                placeholder="ingresar apellidos completo"
                                type="text"
                                name="apellidos"
                                value={Cliente.apellidos}
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label className="d-flex text-start">Correo</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiAtSign /></InputGroup.Text>
                            <FormControl
                                placeholder="ingresar correo electronico"
                                type="email"
                                value={Cliente.correo}
                                name="correo"
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label className="d-flex text-start">Contacto</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiPhone /></InputGroup.Text>
                            <FormControl
                                placeholder="Numero de contacto"
                                type="number"
                                pattern="\([0-9]{3}\) [0-9]{3}[ -][0-9]{4}"
                                name="contacto_1"
                                value={Cliente.contacto_1}
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label className="d-flex text-start">Razon Social</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiBriefcase /></InputGroup.Text>
                            <FormControl
                                placeholder="Razon social o nombre comercial"
                                type="text"
                                name="razon_social"
                                value={Cliente.razon_social}
                                onChange={handleTextImput}
                            />
                        </InputGroup>

                        <Form.Label className="d-flex text-start">Direccion</Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon2"><FiArrowRight /></InputGroup.Text>
                            <FormControl
                                placeholder="ingresar una direccion"
                                type="text"
                                name="direccion"
                                value={Cliente.direccion}
                                onChange={handleTextImput}
                            />
                        </InputGroup>
                        <br />
                        <Button
                            variant="primary btn-block"
                            type="button"
                            className="form-control"
                            onClick={()=>btn_login_on_click()}
                        >
                            Registrar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
