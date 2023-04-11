<template>
    <div class="comparaison">
        <Comparaison />
    </div>
</template>
  
<script>
// @ is an alias to /src
import Comparaison from '@/components/Comparaisons/Comparaison.vue'
export default {
    name: 'ComparaisonView',
    components: {
        Comparaison
    }, mounted() {
        document.title = "TRIvial"
    }
}
</script>