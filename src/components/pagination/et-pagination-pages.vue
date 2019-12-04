<template>
    <p>{{ currentPage }} / {{ lastPage }}</p>
</template>

<script>
    export default {
        name: 'et-pagination-pages',
        props: {
            currentPage: Number,
            lastPage: Number
        }
    }
</script>