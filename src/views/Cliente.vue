<template>
    <div>
        <Menu />
        <v-container>
            <v-card elevation="10" style="height:500px">
            </v-card>
        </v-container>
        <Footer />
    </div>
</template>

<script>
import Menu from '../components/Menu.vue'
import Footer from '../components/Footer.vue'
export default {
    name: 'Cliente',
    components: {
        Menu,
        Footer
    }
}
</script>

<style>

</style>