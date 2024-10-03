const express = require("express");
const router = express.Router();
const employeeModel = require('../model/employeeData'); 

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static('public')); // Serve static files like CSS


router.get('/', async (req, res) => {
    try {
        const employees = await employeeModel.find();  
        res.status(200).render(employees);
    } catch (error) {
        res.status(404).send('Employees not found');
    }
});
// Route to display the Add Employee form
router.get('/new', (req, res) => {
    res.render('addEmployee');  // Render the 'addEmployee.ejs' form
});



router.post('/addEmployee', async (req, res) => {
    try {
        const employee = req.body;  // Get employee details from request body
        const newEmployee = new employeeModel(employee);  // Create a new employee object
        const savedEmployee = await newEmployee.save();  // Save employee to the database
        res.status(200).send('Employee added successfully');
    } catch (error) {
        res.status(400).send('Error adding employee');
    }
});

// PUT (UPDATE operation)
router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedEmployee = await employeeModel.findByIdAndUpdate(id, req.body, { new: true });  // Update employee details
        res.status(200).send('Employee updated successfully');
    } catch (error) {
        res.status(400).send('Error updating employee');
    }
});

// DELETE 
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEmployee = await employeeModel.findByIdAndDelete(id);  // Delete employee by ID
        res.status(200).send('Employee deleted successfully');
    } catch (error) {
        res.status(404).send('Error deleting employee');
    }
});

module.exports = router;


