<template>
    <div class="et-root">
        <div class="et-header">
            <EtSearchBar 
                :onSearch="search"
            ></EtSearchBar>
            <EtFilterSection 
                :filters="filters"
                :onFilter="filter"
            ></EtFilterSection>
        </div>

        <table class="et-table">
            <thead class="et-table-head">
                <tr>
                    <th v-for="column in columns" :key="column.name" v-on:click="activateColumn(column)">
                        <span v-if="column.sortable">
                            {{ column.name }}
                            <div v-if="column.name === activeColumn.name" :class="[
                                sortDirection === 'down' ? 'arrow-down' : '',
                                sortDirection === 'up' ? 'arrow-up' : ''
                            ]"></div>
                            <div v-else class="arrow-hidden"></div>
                        </span>
                        <span v-else>
                            {{ column.name }}
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody class="et-table-body">
                <tr v-for="(row, i) in rows" :key="i">
                    <td v-for="(column, j) in columns" :key="j">
                        {{ resolve(row, column.selector) }}
                    </td>
                </tr>
            </tbody>
        </table>

        <EtPagination
            :currentPage="page"
            :onPageChange="changeOptions"
            :onSwitch="switchPage"
            :pageCount="rowsCount"
            :rowsPerPageOptions="rowsPerPageOptions"
            :totalCount="resultsCount"
        ></EtPagination>
    </div>
</template>

<script>
    import get from 'lodash/get'
    import etService from '../common/elementable.service'
    import EtSearchBar from './ET-SearchBar'
    import EtFilterSection from './ET-FilterSection'
    import EtPagination from './ET-Pagination'

    export default {
        name: 'ElemenTable',
        components: {
            EtSearchBar,
            EtFilterSection,
            EtPagination
        },
        props: {
            columns: {
                type: Array,
                required: true
            },
            data: {
                type: Array,
                required: true
            },
            filters: {
                type: Array,
                default: function(){
                    return [];
                }
            },
            rowsPerPageOptions: {
                type: Array,
                default: function(){
                    return [10, 25, 50];
                }
            }
        },
        data(){
            return {
                page: 0,
                rowsPerPage: this.rowsPerPageOptions[0],
                searchInput: '',
                sortDirection: 'down'
            };
        },
        computed: {
            activeColumn: function(){
                const active = this.columns.find(function(column){
                    return column.active;
                });

                if (active) return active;
                return {};
            },
            activeFilters: function(){
                return this.filters.filter(function(filter){ 
                    return filter.active;
                });
            },
            results: function(){
                let data = this.data;
                // ORDER
                if (this.activeColumn.name) data = etService.orderby(data, this.activeColumn.selector, this.sortDirection);
                // FILTER
                if (this.activeFilters.length > 0) data = etService.filter(data, this.activeFilters);
                // SEARCH
                if (this.searchInput) data = etService.search(data, this.searchInput);
                return data;
            },
            resultsCount: function(){
                return this.results.length;
            },
            rows: function(){
                return this.results.slice(this.page * this.rowsPerPage, this.page * this.rowsPerPage + this.rowsPerPage);
            },
            rowsCount: function(){
                return this.rows.length;
            },
        },
        methods: {
            activateColumn: function(column){
                if (column.sortable){
                    if (this.activeColumn.name === column.name){
                        if (this.sortDirection === 'down') this.sortDirection = 'up';
                        else if (this.sortDirection === 'up') this.sortDirection = 'down';
                    }

                    this.columns.forEach((col) => {
                        if (col.name === column.name) col.active = true;
                        else col.active = false;
                    });
                }
            },
            changeOptions: function(rowsperpage){
                this.page = 0;
                this.rowsPerPage = rowsperpage;
            },
            filter: function(actives){
                this.page = 0;
                this.filters.forEach((filter) => {
                    if (actives.includes(filter.name)) filter.active = true;
                    else filter.active = false;
                });
            },
            resolve: function(obj, prop){
                return get(obj, prop);
            },
            search: function(input){
                this.searchInput = input;
            },
            switchPage: function(newpage){
                this.page = newpage;
            }
        }
    }
</script>

<style scoped>
    .et-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .et-table {
        border-collapse:collapse;
        width: 100%;
        text-align: left;
    }
    .et-table-head tr {
        border-bottom: 1px solid black;
    }
    .et-table-head th {
        user-select: none;
        padding: 10px;
    }
    .et-table-head th:hover {
        background-color: lightgrey;
    }
    .et-table-head th > span {
        display: flex;
        align-items: center;
    }
    .et-table-body td {
        padding: 5px 10px 5px 10px;
    }
    .et-table-body tr:hover {
        background-color: lightgrey;
    }
    .arrow-down {
        margin-left: 20px;
        width: 0; 
        height: 0; 
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 8px solid black;
    }
    .arrow-up {
        margin-left: 20px;
        width: 0; 
        height: 0; 
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 8px solid black;
    }
    .arrow-hidden {
        opacity: 0;
        margin-left: 20px;
        width: 0; 
        height: 0; 
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
    }
</style>