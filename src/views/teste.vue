<template>
  <vueCountriesCities @country="selectedCountry = $event" @city="selectedCity = $event" />
</template>

<script>
import vueCountriesCities from "vue-countries-cities";
export default {
  data() {
    return {
      selectedCountry: "",
      selectedCity: "",
    };
  },
  components: { vueCountriesCities },
};
</script>
