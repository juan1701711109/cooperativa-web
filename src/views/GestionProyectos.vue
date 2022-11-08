<template>
    <div>
        <h1>Gestion Proyectos</h1>

        <v-row>
            <v-col cols="12">
                <v-btn
                    tile
                    :style="{'width':'100%'}"
                    class="primario texto-blanco"
                    :to="{name: 'detalles-proyecto', params: {id: 1}}" 
                > 
                    Detalles
                    <i class="fa-solid fa-arrow-up-right-from-square ml-2 "></i>
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<style lang="scss" scoped>
@import "@/scss/variables-globales.scss";

</style>