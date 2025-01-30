import { User } from "../models/Users.model.js";

// Get all users ordered alphabetically
export const getAllUsers = async (req,res) => {
    try {
        const users = await User.findAll({ order: [["nombre", "ASC"]] });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Error listando a los usuarios", description: error.message});
    }
}

// Update user validating empty values and unique email
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email } = req.body;
    try {
        if (!nombre || !apellido || !email) {
            return res.status(400).json({message: "Todos los campos son obligatorios"});
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        await user.update({ nombre, apellido, email });
        res.status(200).json(user);
        
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                message: "El email ya está en uso",
                error: error.errors[0].message
            });
        }
        res.status(500).json({ message: "Error actualizando al usuario, por favor verifique los campos", error: error.message });
    }
}

// Delete user validating that it can only be deleted if its state is 0
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        if (user.estado === 1) {
            return res.status(400).json({message: "No se puede eliminar un usuario activo"});
        }

        await user.destroy();
        res.status(200).json({message: "Usuario eliminado correctamente"});
    } catch (error) {
        res.status(404).json({message: "Error eliminando al usuario", error: error.message});
    }
}

// Create user validating that email is unique and all fields are filled
export const createUser = async (req, res) => {
    const { nombre, apellido, email } = req.body;
    try {
        if (!nombre || !apellido || !email) {
            return res.status(400).json({message: "Todos los campos son obligatorios"});
        }

        if ((await User.count({ where: { email } }))) {
            return res.status(400).json({message: "El email ya está en uso"});
        }

        const user = await User.create({ nombre, apellido, email });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: "Error creando al usuario", error: error.message});
    }
}

// Update user validating empty values and unique email
export const updateUserStatus = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    try {
        if (estado === undefined || estado === null) {
            return res.status(400).json({message: "Por favor ingrese un estado para actualizar"});
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        await user.update({ estado});
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({ message: "Error actualizando el estado del usuario", error: error.message });
    }
}