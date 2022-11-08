<template>
    <div>
			<h1>Historial Pagos</h1>
		
			<v-card flat>
									<v-card-text>
										<template>
											<v-data-table
												:headers="headers"
												:items="pagos"
												:items-per-page="10"
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
										</v-data-table>
										</template>	
									</v-card-text>
								</v-card>
		</div>

</template>

<script>
import { defineComponent } from 'vue'
import { getData} from "@/request/Request.js";

export default defineComponent({
    name: 'HistorialPagos',
    data: () => ({
        pagos: [],
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
        ],
    }),
    methods: {
			async getPagos() {
				await getData(`pagos`)
					.then(res => {
						this.pagos = res;
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
    created() {
			this.getPagos();
    }
})
</script>
