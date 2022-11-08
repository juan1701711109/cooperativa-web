<template>
  <div class="ml-2">
    <v-row>
			<v-col>
				<h1>Gestion de Roles</h1>
			</v-col>
    </v-row>
		<v-row>
      <v-col>
        <v-btn
          class="primario btn-normal ml-3"
					@click="prepararCreacion"
        >
        <v-icon>
			    mdi-plus
        </v-icon>
       </v-btn>
      </v-col>
    </v-row>

		<!-- Get Roles -->
		<v-row wrap class="mx-2">
			<v-col cols="12" sm="6" md="4" lg="3" v-for="rol in roles" :key="rol.id">
				<v-card
				class="mx-auto my-1"
					max-width="374"
					color="#ececec"
					hover
					link
				>
					<v-card-text>
						<h2>{{rol.nombre}}</h2>
					</v-card-text>
					<v-card-actions>
              <v-row>
                <v-col cols="6">
                  <v-btn
                    tile
                    color="success"
										@click="cargarDatosRolEditar(rol.id)"
                  >
                    <v-icon left>
                      mdi-pencil
                    </v-icon>
                    Editar
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    color="error"
										@click="deletedSelect(rol.id)"
                  >
                    <v-icon left>
                      mdi-delete
                    </v-icon>
                    Eliminar
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
				</v-card>
			</v-col>
		</v-row>

		<!-- Modal Crear/Editar Rol -->
		<template>
    <v-row  justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        
      >
        <v-card class="main">
          <v-card-title>
            <span class="text-h5 texto-blanco ml-5 mt-1">
              {{editando ? 'Editar Rol' : 'Crear Rol'}}
            </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <form @submit.prevent="verificarFormulario" novalidate="true">
								<v-row>
									<v-col
                    cols="12"
                  >
									<input
                      class="input"
                      v-model="rol.nombre"
                      placeholder="Nombre"
                      required
                    />
                    <template v-if="errors.rol">
                      <p class="errorF">*{{ errors.rol }}</p>
                    </template>
                  </v-col>
								</v-row>
                <v-spacer></v-spacer>
                <v-row>
                  <v-container class="d-flex justify-center">
                    <input class="btn secundario mx-5" type="submit" value="Guardar">
                    <input class="btn rojo mx-3" type="button" value="Cancelar" @click="resetForm">
                  </v-container>
                </v-row>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

	<!-- Modal Eliinar -->
	<template>
    <v-row  justify="center">
      <v-dialog
        v-model="dialogDelete"
        persistent
      >
        <v-container class="main">
          <v-container>
            <span class="text-h5 text-center texto-blanco mt-1">¿Seguro que desea eliminar el rol?</span>
          </v-container>
          <v-container>
                <v-spacer></v-spacer>
                <v-row>
                  <v-container class="d-flex justify-center">
                    <input class="btn secundario mr-5" type="button" value="Confirmar" @click="eliminarRol(true)">
                    <input class="btn rojo " type="button" value="Cancelar" @click="dialogDelete = false">
                  </v-container>
                </v-row>
          </v-container>
        </v-container>
      </v-dialog>
    </v-row>
  </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getData, postData, deleteData, putData } from "@/request/Request.js";
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'gestionRoles',
	data: () => ({
		roles: [],
		rol: {
			id: null,
			nombre: '',
		},
		dialog: false,
		dialogDelete: false,
		deleteId: 0,
		editId: 0,
		editando: false,
		errors: {},
	}),
	methods: {
		prepararCreacion() {
			this.dialog = true;
			this.editando = false;
			this.getRoles();
		},
		async verificarFormulario() {
				this.errors = {};
				if (!this.rol.nombre) {
          this.errors.rol = "Debe ingresar el nombre del rol";
        }
				if (Object.keys(this.errors).length == 0) {
          if(this.editando){
						await this.editarRol();
          } else {
						await this.crearRol();
          }
          this.resetForm();
        } else{
          console.log(this.errors)
        }
			},
			resetForm() {
				this.dialog = false;
				this.editando = false;
				this.errors = {};
				this.usuarrolio = {
					nombre: "",
				}
				this.getRoles();
			},
			async getRoles() {
          await getData(`roles`)
              .then(res => {
                  this.roles = res;
              })
              .catch(error => {
                  Swal.fire({
                      title: "¡Error!",
                      text: error,
                      icon: "error",
                      confirmButtonText: "Aceptar",
                  });
              })
      },
			deletedSelect(id) {
        this.deleteId = id;
        this.dialogDelete = true;
      },
			async eliminarRol(eliminar) {
        if(eliminar){
          await deleteData(`roles/${this.deleteId}`, this.deleteId)
            .then(res => {
                Swal.fire({
                title: "¡Rol eliminado Exitosamente!",
                text: res.message,
                icon: "success",
                confirmButtonText: "Aceptar",
              });
            })
            .catch(error => {
              	Swal.fire({
                title: "¡Error eliminando el rol!",
                text: error,
                icon: "error",
                confirmButtonText: "Aceptar",
              }); 
            })
            this.dialogDelete = false;
            this.deleteId = 0;
            this.resetForm();
            this.getRoles();
        }
      },
			async crearRol() {
				this.editando = false;
        this.dialog = false;
        await postData("roles", this.rol, false)
          .then(res => {
              	Swal.fire({
                title: "¡Rol creado Exitosamente!",
                text: res.message,
                icon: "success",
                confirmButtonText: "Aceptar",
              }) 
            })
          .catch(error => {
            	Swal.fire({
              title: "¡Error al crear el rol!",
              text: error,
              icon: "error",
              confirmButtonText: "Aceptar",
            }); 
          });
        this.getRoles();
      },
			cargarDatosRolEditar(id) {
        this.dialog = true;
        this.roles.forEach(rol => {
          if(rol.id == id) {
            this.rol = rol;
          }
        });
        this.editId = id;
        this.editando = true;
      },
			async editarRol() {
          this.dialog = false;
        await putData(`roles/${this.editId}`, this.rol)
          .then(res => {
              	Swal.fire({
                title: "¡Rol editado Exitosamente!",
                text: res.message,
                icon: "success",
                confirmButtonText: "Aceptar",
              }); 
          })
          .catch(error => {
            	Swal.fire({
                title: "¡Error editando el rol!",
                text: error,
                icon: "error",
                confirmButtonText: "Aceptar",
              }); 
          })

					this.resetForm();
      },
	},
	created() {
		this.getRoles();
	}
    
})
</script>

<style lang="scss" scoped>
@import "@/scss/variables-globales.scss";

</style>
