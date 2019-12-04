<template>
    <p>{{ displayResults }} of {{ totalResults }}</p>
</template>

<script>
    export default {
        name: 'et-pagination-results',
        props: {
            displayResults: Number,
            totalResults: Number
        }
    }
</script>