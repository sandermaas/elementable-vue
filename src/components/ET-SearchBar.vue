<template>
    <input class="et-searchbar" type="text" placeholder="Search..." v-on:input="searchData" />
</template>

<script>
    export default {
        name: 'EtSearchBar',
        props: {
            onSearch: Function
        },
        methods: {
            searchData: function(event){
                this.onSearch(event.target.value);
            },
        }
    }
</script>

<style scoped>
    .et-searchbar {
        padding: 5px;
        width: 25%;
    }
</style>