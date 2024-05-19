const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Créer un étudiant
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email
  });

  try {
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Lire tous les étudiants
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    console.log("Test",students);
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lire un étudiant par ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mettre à jour un étudiant
router.patch('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (req.body.name != null) {
      student.name = req.body.name;
    }
    if (req.body.age != null) {
      student.age = req.body.age;
    }
    if (req.body.email != null) {
      student.email = req.body.email;
    }

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un étudiant
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await student.remove();
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
