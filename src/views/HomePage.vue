<template>
  <main>
    <div>Weather</div>
    <div>Content</div>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class HomePage extends Vue {}
</script>
