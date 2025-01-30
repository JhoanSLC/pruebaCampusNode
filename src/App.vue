<template>
    <div id="app" class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>Personas</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <formulario-persona @add-persona="actualizarPersonas" />
          <tabla-personas :personas="personas" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TablaPersonas from '@/components/TablaPersonas.vue';
  import FormularioPersona from '@/components/FormularioPersona.vue';
  
  export default {
    name: 'app',
    components: {
      TablaPersonas,
      FormularioPersona,
    },
    data() {
      return {
        personas: [] 
      };
    },
    methods: {
      actualizarPersonas(persona) {
        this.personas = [...this.personas, persona];
      }
    },
  };
  </script>
  
  <style>
  body {
    background: #f9f9f9;
  }
  </style>