<template>
    <div id="formulario-persona">
      <form @submit.prevent="enviarFormulario">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label>Nombre</label>
                <input
                  ref="nombre"
                  v-model="persona.nombre"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': procesando && nombreInvalido }"
                  @focus="resetEstado"
                  @keypress="resetEstado"
                />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label>Apellido</label>
                <input
                  v-model="persona.apellido"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': procesando && apellidoInvalido }"
                  @focus="resetEstado"
                />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label>Email</label>
                <input
                  v-model="persona.email"
                  type="email"
                  :class="{ 'is-invalid': procesando && emailInvalido }"
                  class="form-control"
                  @focus="resetEstado"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <button class="btn btn-primary" :disabled="procesando">Añadir persona</button>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div v-if="error && procesando" class="alert alert-danger" role="alert">
                Debes rellenar todos los campos!
              </div>
              <div v-if="correcto" class="alert alert-success" role="alert">
                La persona ha sido agregada correctamente!
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; 
  
  export default {
    name: 'formulario-persona',
    data() {
      return {
        procesando: false,
        correcto: false,
        error: false,
        persona: {
          nombre: '',
          apellido: '',
          email: '',
        }
      };
    },
    methods: {
      async enviarFormulario() {
        this.procesando = true;
        this.resetEstado();
  
        if (this.nombreInvalido || this.apellidoInvalido || this.emailInvalido) {
          this.error = true;
          this.procesando = false;
          return;
        }
  
        try {
          const response = await axios.post('http://localhost:4000/users', this.persona);
          
          this.correcto = true;
          this.$emit('add-persona', response.data); 
          this.persona = { nombre: '', apellido: '', email: '' };  
        } catch (err) {
          this.error = true;
          console.error('Error al agregar persona:', err.response?.data || err.message);
        } finally {
          this.procesando = false;
        }
      },
      resetEstado() {
        this.correcto = false;
        this.error = false;
      }
    },
    computed: {
      nombreInvalido() {
        return this.persona.nombre.length < 1;
      },
      apellidoInvalido() {
        return this.persona.apellido.length < 1;
      },
      emailInvalido() {
        return this.persona.email.length < 1;
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    margin-bottom: 2rem;
  }
  </style>