<template>
    <div class="et-filter-section" :style="styles.filtersection.root">
        <span v-for="filter in filters" :key="filter.name" :style="styles.filtersection.span" v-on:click="selectFilter">
            <input v-if="filter.active" type="checkbox" :value="filter.name" checked :style="styles.filtersection.input" />
            <input v-else type="checkbox" :value="filter.name" :style="styles.filtersection.input" />
            {{ filter.name }}
        </span>
    </div>
</template>

<script>
    import filtersection from '../common/elementable.styles.js'

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
        computed: {
            styles: function(){
                return filtersection;
            }
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