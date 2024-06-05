import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

const EmployeeForm = ({ onEmployeeAdded, employeeToEdit, onEmployeeUpdated, setEmployeeToEdit }) => {
  const [employee, setEmployee] = useState({
    nombre: '',
    direccion: '',
    telefono: ''
  });

  useEffect(() => {
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
    } else {
      setEmployee({ nombre: '', direccion: '', telefono: '' });
    }
  }, [employeeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employeeToEdit) {
        const response = await axios.put(`http://localhost:8080/api/v1/empleado/${employee.id}`, employee);
        onEmployeeUpdated(response.data);
        alert('Empleado actualizado correctamente');
      } else {
        const response = await axios.post('http://localhost:8080/api/v1/empleado', employee);
        onEmployeeAdded(response.data);
        alert('Empleado agregado correctamente');
      }
      setEmployee({ nombre: '', direccion: '', telefono: '' });
      setEmployeeToEdit(null);
    } catch (error) {
      console.error('Error al agregar o actualizar empleado', error);
      alert('Error al agregar o actualizar empleado');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="nombre">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={employee.nombre}
          onChange={handleChange}
          placeholder="Ingrese el nombre"
        />
      </Form.Group>
      <Form.Group controlId="direccion">
        <Form.Label>Dirección:</Form.Label>
        <Form.Control
          type="text"
          name="direccion"
          value={employee.direccion}
          onChange={handleChange}
          placeholder="Ingrese la dirección"
        />
      </Form.Group>
      <Form.Group controlId="telefono">
        <Form.Label>Teléfono:</Form.Label>
        <Form.Control
          type="text"
          name="telefono"
          value={employee.telefono}
          onChange={handleChange}
          placeholder="Ingrese el teléfono"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {employeeToEdit ? 'Actualizar Empleado' : 'Agregar Empleado'}
      </Button>
    </Form>
  );
};

const EmployeeList = ({ employees, onDelete, onEdit }) => {
  return (
    <ListGroup>
      {employees.map((employee) => (
        <ListGroup.Item key={employee.id}>
          <Row>
            <Col>{employee.nombre}</Col>
            <Col>{employee.direccion}</Col>
            <Col>{employee.telefono}</Col>
            <Col className="text-right">
              <Button variant="warning" onClick={() => onEdit(employee)}>Editar</Button>
              <Button variant="danger" onClick={() => onDelete(employee.id)}>Eliminar</Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/empleado');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error al obtener empleados', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/empleado/${id}`);
      setEmployees(employees.filter((employee) => employee.id !== id));
      alert('Empleado eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar empleado', error);
      alert('Error al eliminar empleado');
    }
  };

  const handleEmployeeAdded = (employee) => {
    setEmployees([...employees, employee]);
  };

  const handleEmployeeUpdated = (updatedEmployee) => {
    setEmployees(
      employees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee))
    );
  };

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
  };

  return (
    <Container>
      <h2 className="mt-4">Formulario de Empleados</h2>
      <EmployeeForm
        onEmployeeAdded={handleEmployeeAdded}
        employeeToEdit={employeeToEdit}
        onEmployeeUpdated={handleEmployeeUpdated}
        setEmployeeToEdit={setEmployeeToEdit}
      />
      <h2 className="mt-4">Lista de Empleados</h2>
      <EmployeeList employees={employees} onDelete={handleDelete} onEdit={handleEdit} />
    </Container>
  );
};

export default EmployeeManagement;
