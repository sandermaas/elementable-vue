<template>
    <div class="et-filter-section">
        <span v-for="filter in filters" :key="filter.name" v-on:click="selectFilter">
            <input v-if="filter.active" type="checkbox" :value="filter.name" checked />
            <input v-else type="checkbox" :value="filter.name" />
            {{ filter.name }}
        </span>
    </div>
</template>

<script>
    export default {
        name: 'EtFilterSection',
        props: {
            filters: Array,
            onFilter: Function
        },
        data(){
            return {
                activeFilters: []
            };
        },
        created: function(){
            this.filters.forEach((filter) => {
                if (filter.active) this.activeFilters.push(filter.name);
            });
        },
        methods: {
            selectFilter: function(event){
                let input = null;
                
                if (event.target.nodeName === 'INPUT'){
                    input = event.target;
                } else {
                    input = event.target.querySelector('input');
                    if (input.checked) input.checked = false;
                    else input.checked = true;
                }

                const filterIndex = this.activeFilters.indexOf(input.value);

                if (input.checked){
                    if (filterIndex !== -1) this.activeFilters.splice(filterIndex, 1);
                    this.activeFilters.push(input.value);
                } else {
                    if (filterIndex !== -1) this.activeFilters.splice(filterIndex, 1);
                }

                this.onFilter(this.activeFilters);
            }
        }
    }
</script>

<style scoped>
    .et-filter-section {
        display: flex;
        justify-content: space-between;
        width: 30%;
    }
    .et-filter-section span {
        display: flex;
        user-select: none;
    }
    .et-filter-section span:hover {
        cursor: pointer;
    }
</style>