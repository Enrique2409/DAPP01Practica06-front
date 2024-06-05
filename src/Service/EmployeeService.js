import axios from "axios";

const employeeURL = "http://localhost:8080/empleado/";

export const getAllEmployee = async (setEmployee) => {
    try {
        const response = await axios.get(employeeURL);
        setEmployee(response.data);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    };

export const addEmployee = async (employee) => {
    try {
        const response = await axios.post(employeeURL, employee);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    }

export const updateEmployee = async (employee) => {
    try {
        const response = await axios.patch(URL, employee);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    }

export const deleteEmployee = async (employeeId) => {
    try {
        const response = await axios.delete(`${employeeURL}${employeeId}`);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    }   