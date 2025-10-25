<template>
    <div>
        <NuxtLinkLocale :to="{ name: 'index' }">
            to index
        </NuxtLinkLocale>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ name: 'page' });
</script>

<style scoped lang="scss">

</style>
