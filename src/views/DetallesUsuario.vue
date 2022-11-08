<template>
    <div>
        <v-card>
					<v-card-title>
						{{usuario.nombre}}
					</v-card-title>
					<v-card-text>
						<div>
							<p>{{usuario.numero_documento}}</p>
						</div>
						<div>
							<span><p>Monto mensual: ${{usuario.monto_mensual}}</p></span>
							<p>Ahorro: ${{usuario.ahorro_total}}</p>
						</div>
					</v-card-text>
				</v-card>

				<template>
					<v-card class="primario">
						<v-tabs
							v-model="tab"
							background-color="primary"
							dark
						>
							<v-tab>
								Cuotas
							</v-tab>
							<v-tab>
								Inversiones 
							</v-tab>
							<v-tab>
								Prestamos
							</v-tab>
						</v-tabs>

						<v-tabs-items v-model="tab">
							<v-tab-item
							>
								<v-card flat>
									<v-card-text>
										<template>
											<v-data-table
												:headers="headers"
												:items="cuotas"
												:items-per-page="6"
												class="elevation-1"
											>
											<template v-slot:item.estado="{ item }">
												<v-chip
													:color="getColor(item.estado)"
													dark
												>
													{{ item.estado }}
												</v-chip>
											</template>
											<template  v-slot:item.pago="{ item }">
												<v-btn small fab outlined color="success" class="ma-1" v-if="item.estado == 0">
													<v-icon
													small
														class="mr-2"
														color="green"
													>
														mdi-cash-sync
													</v-icon>
												</v-btn>
   										 </template>
										</v-data-table>
										</template>	
									</v-card-text>
								</v-card>
							</v-tab-item>

							<v-tab-item
							>
								<v-card flat>
									<v-card-text>
										Innversiones Usuario
									</v-card-text>
								</v-card>
							</v-tab-item>

							<v-tab-item
							>
								<v-card flat>
									<v-card-text>
										Prestamos Usuario
									</v-card-text>
								</v-card>
							</v-tab-item>
						</v-tabs-items>
					</v-card>
				</template>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getData} from "@/request/Request.js";

export default defineComponent({
    name: 'DetallesUsuario',
    data: () => ({
			usuario: {},
			cuotas: [],
			tab: null,
			headers: [
          {
            text: 'Usuario',
            align: 'start',
            sortable: false,
            value: 'usuario_id',
          },
          { text: 'Id', value: 'id' },
          { text: 'Fecha', value: 'fecha' },
          { text: 'Estado', value: 'estado' },
          { text: 'Pago', value: 'pago' },
        ],
    }),
    methods: {
			async getUsuario() {
				await getData(`usuarios/${this.$route.params.id}`)
					.then(res => {
						this.usuario = res[0];
					})
					.catch(error => {
						console.log(" Error ", error);
					});
			},
			async getCuotas() {
				await getData(`pagos/usuario/${this.$route.params.id}`)
					.then(res => {
						this.cuotas = res;
					})
					.catch(error => {
						console.log(" Error ", error);
					});
			},
			getColor (estado) {
        if (estado == 0) return 'red'
        else if (estado == 1) return 'green'
      },
    },
    async created() {
			await this.getUsuario();
			await this.getCuotas();
    }
})
</script>

<style lang="scss" scoped>
@import "@/scss/variables-globales.scss";

</style>
