<template>
    <input 
        class="et-searchbar"
        :style="styles.searchbar.root"
        type="text" 
        placeholder="Search..." 
        v-on:input="searchData" 
    />
</template>

<script>
    import searchbar from '../common/elementable.styles.js'

    export default {
        name: 'EtSearchBar',
        props: {
            onSearch: Function
        },
        computed: {
            styles: function(){
                return searchbar;
            }
        },
        methods: {
            searchData: function(event){
                this.onSearch(event.target.value);
            },
        }
    }
</script>