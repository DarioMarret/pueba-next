import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../util/database'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  try {    
    switch (method) {
      case "GET":
        await ObtenerExistenciaCedula(req, res)
        break;
        case "POST":
        await CrearNuevoCliente(req, res)
        break;
        case "PUT":
        await ActualizarCliente(req, res)
        break;
      default:
        res.status(400).json('invalid method')
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
async function ObtenerExistenciaCedula(req: NextApiRequest, res: NextApiResponse){
  const { empresa, cedula } = req.query;
  console.log(empresa, cedula)
  db.query("SELECT * FROM esq_cliente.cliente WHERE empresa ='"+empresa+"' AND cedula ='"+cedula+"'")
  .then(response => {
    if(response.rows){
      res.status(200).json(response.rows[0])
    }else{
      res.status(200).json(true)
    }
  }).catch(error => {
    console.log(error);
    res.status(500).json(error)
  })
}
async function CrearNuevoCliente(req: NextApiRequest, res: NextApiResponse){
  const { Cliente } = req.body;
  const { apellidos, nombres, cedula, contacto_1, correo, razon_social, direccion, tipo_identificacion_proveedor, empresa} = Cliente
  db.query("INSERT INTO esq_cliente.cliente (apellidos, nombres, cedula, contacto_1, correo, razon_social, direccion, fecha_creacion, tipo_identificacion_proveedor, empresa) VALUES "+
  "('"+apellidos+"','"+nombres+"','"+cedula+"','"+contacto_1+"','"+correo+"','"+razon_social+"','"+direccion+"',NOW(),'"+tipo_identificacion_proveedor+"','"+empresa+"')")
  .then(response => {
    if(response.rows){
      res.status(200).json(response.rows[0])
    }else{
      res.status(200).json(true)
    }
  }).catch(error => {
    console.log(error);
    res.status(500).json(error)
  })
}
async function ActualizarCliente(req: NextApiRequest, res: NextApiResponse){
  const { Cliente } = req.body;
  // console.log(Cliente);
  // return null
  const {id, apellidos, nombres, cedula, contacto_1, correo, razon_social, direccion, tipo_identificacion_proveedor, empresa} = Cliente
  db.query(`UPDATE esq_cliente.cliente SET apellidos='${apellidos}',nombres='${nombres}',cedula='${cedula}',contacto_1='${contacto_1}',correo='${correo}',razon_social='${razon_social}',direccion='${direccion}',tipo_identificacion_proveedor='${tipo_identificacion_proveedor}' WHERE id='${id}' AND empresa='${empresa}'`)
  .then(response => {
    console.log(response);
    if(response.rows){
      res.status(200).json(response)
    }else{
      res.status(200).json(true)
    }
  }).catch(error => {
    console.log(error);
    res.status(500).json(error)
  })
}