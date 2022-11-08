<template>
  <div class="ml-5 mt-3">
    <v-row>
      <h1>Gestion Usuarios</h1>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          class="primario btn-normal ml-3 mt-2"
					@click="prepararCreacion"
        >
        <v-icon>
			    mdi-plus
        </v-icon>
       </v-btn>
      </v-col>
    </v-row>

		<!-- Usuarios -->
		<v-row wrap class="mx-2">
			<v-col cols="12" sm="6" md="4" lg="3" v-for="usuario in usuarios" :key="usuario.id">
				<v-card
				class="mx-auto my-1"
					max-width="374"
					color="#ececec"
					hover
					link
				>
					<v-card-text>
						<h2>{{usuario.nombre}}</h2>
						<div>
							<p>{{usuario.numero_documento}}</p>
						</div>
						<div>
							<span><p>Monto mensual: ${{usuario.monto_mensual}}</p></span>
							<p>Ahorro: ${{usuario.ahorro_total}}</p>
						</div>
					</v-card-text>
					<v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-btn
                    tile
                    :style="{'width':'100%'}"
                    class="primario texto-blanco"
                    :to="{name: 'usuario', params: {id: usuario.id}}" 
                  > 
                    Detalles
                    <i class="fa-solid fa-arrow-up-right-from-square ml-2 "></i>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
					<v-card-actions>
              <v-row>
                <v-col cols="6">
                  <v-btn
                    tile
                    color="success"
										@click="cargarDatosUsuarioEditar(usuario.id)"
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
										@click="deletedSelect(usuario.id)"
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

		<!-- Modal Crear/Editar Usuario -->
		<template>
    <v-row  justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        
      >
        <v-card class="main">
          <v-card-title>
            <span class="text-h5 texto-blanco ml-5 mt-1">
              {{editando ? 'Editar Usuario' : 'Crear Usuario'}}
            </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <form @submit.prevent="verificarFormulario" novalidate="true">
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <input
                      class="input"
                      v-model="usuario.nombre"
                      placeholder="Nombre"
                      required
                    />
                      <template v-if="errors.nombre">
                        <p class="errorF">*{{ errors.nombre }}</p>
                      </template>
                  </v-col>
									<v-col
                    cols="12"
                    sm="6"
                  >
                    <select v-model="usuario.rol_id"  class="select" name="rol">
                        <option value="0" selected disabled hidden>Seleccione el rol</option>
                        <option v-for="rol in roles" :key="rol.id" :value="rol.id">{{rol.nombre}}</option>
                    </select>
                    <template v-if="errors.rol">
                      <p class="errorF">*{{ errors.rol }}</p>
                    </template>
                  </v-col>
                </v-row>
								<v-row>
									<v-col
                    cols="12"
                    sm="6"
                  >
                    <select v-model="usuario.tipo_documento_id"  class="select" name="tipo_doc">
                        <option value="0" selected disabled hidden>Seleccione el tipo de documento</option>
                        <option v-for="tdoc in tiposDocumento" :key="tdoc.id" :value="tdoc.id">{{tdoc.nombre}}</option>
                    </select>
                    <template v-if="errors.tipo_documento">
                      <p class="errorF">*{{ errors.tipo_documento }}</p>
                    </template>
                  </v-col>
									<v-col
                    cols="12"
                    sm="6"
                  >
                    <input
                      class="input"
                      v-model="usuario.numero_documento"
                      placeholder="Numero Documento"
                      required
                    />
                      <template v-if="errors.numero_documento">
                        <p class="errorF">*{{ errors.numero_documento }}</p>
                      </template>
                  </v-col>
								</v-row>
								<v-row>
									<v-col
                    cols="12"
                    sm="6"
                  >
                    <input
                      class="input"
                      v-model="usuario.monto_mensual"
                      placeholder="Monto Mensual"
                      required
                    />
                      <template v-if="errors.monto_mensual">
                        <p class="errorF">*{{ errors.monto_mensual }}</p>
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
            <span class="text-h5 text-center texto-blanco mt-1">¿Seguro que desea eliminar el usuario?</span>
          </v-container>
          <v-container>
                <v-spacer></v-spacer>
                <v-row>
                  <v-container class="d-flex justify-center">
                    <input class="btn secundario mr-5" type="button" value="Confirmar" @click="eliminarUsuario(true)">
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
import { defineComponent } from "vue";
import { getData, postData, deleteData, putData } from "@/request/Request.js";
import { getRoles, getTiposDocumento, getTipoDocumento } from '@/config/datosParametrizados';
	export default defineComponent({
		name: 'GestionUsuarios',
		data: () => ({
			usuarios: [],
			usuario: {
        nombre: "",
        numero_documento: "",
        monto_mensual: null,
        ahorro_total: 0,
        tipo_documento_id: 0,
        rol_id: 0,
      },
			errors: {},
			roles: {},
			dialog: false,
			dialogDelete: false,
			deleteId: 0,
			editando: false,
			roles: [],
			tiposDocumento: [], 
			tipo: ""
		}),
		methods: {
			prepararCreacion() {
				this.dialog = true;
				this.editando = false;
				this.getUsuarios();
				this.obtenerRoles();
				this.obtenerTiposDocumento();
			},
			async verificarFormulario() {
				this.errors = {};
        if (!this.usuario.nombre) {
          this.errors.nombre = "El nombre es requerido.";
        }
        else if (this.usuario.nombre.length < 3) {
          this.errors.nombre = "Tamaño incorrecto";
        }
				if (this.usuario.rol_id == 0) {
          this.errors.rol = "Debe seleccionar un rol.";
        }
				if (this.usuario.tipo_documento_id == 0) {
          this.errors.tipo_documento = "Debe seleccionar un documento.";
        }
				if (!this.usuario.numero_documento) {
          this.errors.numero_documento = "El documento es requerido.";
        }
				if (!this.usuario.monto_mensual) {
          this.errors.monto_mensual = "El monto es requerido.";
        }
				else if (this.usuario.monto_mensual < 30000) {
          this.errors.monto_mensual = "El monto debe ser mayor a $30.000";
        }
				if (Object.keys(this.errors).length == 0) {
          if(this.editando){
            await this.editarUsario();
          } else {
            await this.crearUsuario();
          }
          this.resetForm();
        } else{
          console.log(this.errors)
        }
			},
			resetForm() {
				this.dialog = false;
				this.errors = {};
				this.usuario = {
					nombre: "",
					numero_documento: "",
					monto_mensual: null,
					ahorro_total: 0,
					tipo_documento_id: 0,
					rol_id: 0
				}
			},
			async getUsuarios() {
          await getData(`usuarios`)
              .then(res => {
                  this.usuarios = res;
              })
              .catch(error => {
                  this.$swal.fire({
                      title: "¡Error!",
                      text: error,
                      icon: "error",
                      confirmButtonText: "Aceptar",
                  });
              })
				console.table(this.usuarios);
      },
			deletedSelect(id) {
        this.deleteId = id;
        this.dialogDelete = true;
      },
			async eliminarUsuario(eliminar) {
        if(eliminar){
          await deleteData(`usuarios/${this.deleteId}`, this.deleteId)
            .then(res => {
              /* if(!res.isSuccess) {
                this.$swal.fire({
                  title: "¡Error al eliminar el espacio!",
                  text: res.message,
                  icon: "error",
                  confirmButtonText: "Aceptar",
                });
              }
              this.$swal.fire({
                title: "¡Espacio eliminado Exitosamente!",
                text: res.message,
                icon: "success",
                confirmButtonText: "Aceptar",
              }); */
							console.log(res);
            })
            .catch(error => {
              /*  this.$swal.fire({
                title: "¡Error eliminando el espacio!",
                text: error,
                icon: "error",
                confirmButtonText: "Aceptar",
              }); */
							console.log(error)
            })
            this.dialogDelete = false;
            this.deleteId = 0;
            this.resetForm();
            this.getUsuarios();
        }
      },
			async crearUsuario() {
        this.dialog = false;
          /* this.$swal.fire({
          title: "¡Validando!",
          allowOutsideClick: false,
          didOpen: () => {
            this.$swal.showLoading();
          },
        }); */
        await postData("usuarios", this.usuario, false)
          .then(res => {
              /* if(!res.isSuccess) {
                this.$swal.fire({
                  title: "¡Error al crear el espacio!",
                  text: res.message,
                  icon: "error",
                  confirmButtonText: "Aceptar",
                });
              } */
              /* this.$swal.fire({
                title: "¡Espacio creado Exitosamente!",
                text: res.message,
                icon: "success",
                confirmButtonText: "Aceptar",
              }) */
							console.log('Creado', res);
            })
          .catch(error => {
            /* this.$swal.fire({
              title: "¡Error al crear el espacio!",
              text: error,
              icon: "error",
              confirmButtonText: "Aceptar",
            }); */
						console.log(error)
          });
        this.getUsuarios();
      },
			cargarDatosUsuarioEditar(id) {
				this.obtenerTiposDocumento();
				this.obtenerRoles();
        this.dialog = true;
        this.usuarios.forEach(usuario => {
          if(usuario.id == id) {
            this.usuario = usuario;
          }
        });
				console.log(this.usuario)
        this.editId = id;
        this.editando = true;
      },
			async editarUsario() {
          this.dialog = false;
          /* this.$swal.fire({
          title: "¡Validando!",
          allowOutsideClick: false,
          didOpen: () => {
            this.$swal.showLoading();
          },
        }); */
        await putData(`usuarios/${this.editId}`, this.usuario)
          .then(res => {
              /* if(!res.isSuccess) {
                this.$swal.fire({
                  title: "¡Error al editar el espacio!",
                  text: res.message,
                  icon: "error",
                  confirmButtonText: "Aceptar",
                });
              }
              this.$swal.fire({
                title: "¡Espacio editado Exitosamente!",
                text: res.message,
                icon: "success",
                confirmButtonText: "Aceptar",
              }); */
							console.log(res)
          })
          .catch(error => {
            /* this.$swal.fire({
                title: "¡Error editando el espacio!",
                text: error,
                icon: "error",
                confirmButtonText: "Aceptar",
              }); */
							console.log(error);
          })
      },
			async obtenerRoles() {
        await getRoles()
          .then(res => {
            if(res) {
              this.roles = res
            }
          })
      },
			async obtenerTiposDocumento() {
        await getTiposDocumento()
          .then(res => {
            if(res) {
							console.log("res: ",res)
              this.tiposDocumento = res
            }
          })
				console.log(this.tiposDocumento)
      },
			async obtenerTipoDocumento(id) {
        await getTipoDocumento(id)
          .then(res => {
            if(res) {
							this.usuario.nombre_documento = res;
            }
          })
      },


		},
		async created() {
			await this.getUsuarios();
		}
	})
</script>

<style lang="scss" scoped>
@import "@/scss/variables-globales.scss";
.ancho-modal {
	width: 60vw;
}
</style>