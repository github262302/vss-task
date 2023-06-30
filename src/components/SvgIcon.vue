<template>
    <svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <use :href="'#icon-' + icon"></use>
    </svg>
</template>
<script>
export default {
    props: ['icon']
}
</script>
<style lang="scss" scoped>
</style>
