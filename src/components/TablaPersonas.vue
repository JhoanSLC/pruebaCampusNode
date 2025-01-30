<template>
    <div id="tabla-personas">
        <div v-if="!personas.length" class="alert alert-info" role="alert">
            No se han agregado personas
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="persona in personas" :key="persona.id">
                    <td v-if="editando === persona.id">
                        <input type="text" class="form-control" v-model="persona.nombre" />
                    </td>
                    <td v-else>
                        {{ persona.nombre }}
                    </td>
                    <td v-if="editando === persona.id">
                        <input type="text" class="form-control" v-model="persona.apellido" />
                    </td>
                    <td v-else>
                        {{ persona.apellido }}
                    </td>
                    <td v-if="editando === persona.id">
                        <input type="email" class="form-control" v-model="persona.email" />
                    </td>
                    <td v-else>
                        {{ persona.email }}
                    </td>
                    <td v-if="editando === persona.id">
                        <button class="btn btn-success" @click="saveChanges(persona)">💾 Guardar</button>
                        <button class="btn btn-secondary ml-2" @click="cancelEdit">❌ Cancelar</button>
                    </td>
                    <td v-else>
                        <button class="btn btn-info" @click="editPerson(persona)">✏️ Editar</button>
                        <button class="btn btn-danger ml-2" @click="deletePerson(persona.id)">🗑️ Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { getAllUsers, updateUser, deleteUser } from '../services/userService.js'; 

export default {
    name: 'tabla-personas',
    data() {
        return {
            personas: [],
            editando: null, 
        };
    },
    mounted() {
        this.fetchUsers(); 
    },
    methods: {
        
        async fetchUsers() {
            try {
                const response = await getAllUsers();
                this.personas = response.data; 
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        },
        editPerson(persona) {
            this.editando = persona.id;
        },
        cancelEdit() {
            this.editando = null;
        },
        async saveChanges(persona) {
    try {
        
        const response = await updateUser(persona.id, {
            nombre: persona.nombre,
            apellido: persona.apellido,
            email: persona.email,
        });
        console.log('Usuario actualizado:', response.data);
        this.editando = null;  
    } catch (error) {
        console.error('Error al guardar los cambios:', error.response?.data || error.message);
    }
},
        async deletePerson(id) {
            try {
                await deleteUser(id);
                this.fetchUsers(); 
            } catch (error) {
                console.error('Error al eliminar la persona:', error);
            }
        }
    }
};
</script>

<style scoped>
</style>