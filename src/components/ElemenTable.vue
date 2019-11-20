<template>
    <div class="et-root">
        <div class="et-header">
            <input type=text placeholder="Search..." v-on:input="searchData" />
            <div class="et-header-section">
                <span v-for="filter in filters" :key="filter.name" v-on:click="selectFilter">
                    <input type="checkbox" :value="filter.name" />
                    {{ filter.name }}
                </span>
            </div>
        </div>
        <table class="et-table">
            <thead class="et-table-head">
                <tr>
                    <th v-for="column in columns" :key="column.name" v-on:click="sortColumn(column)">
                        <span>
                            {{ column.name }}
                            <div v-if="column.name === activeColumn.name" :class="[
                                sortDirection === 'down' ? 'arrow-down' : '',
                                sortDirection === 'up' ? 'arrow-up' : ''
                            ]"></div>
                            <div v-else class="arrow-hidden"></div>
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
        <div class="et-footer">
            <ul class="et-footer-section">
                <li>{{ resultCount }} of {{ data.length }}</li>
                <li>{{ page + 1 }} / {{ lastPage }}</li>
                <li>
                    <select v-on:change="changeRowsPerPage">
                        <option v-for="(option, i) in rowsPerPageOptions" :key="i" :value="option">
                            {{ option }}
                        </option>
                    </select>
                </li>
            </ul>
            <ul class="et-footer-section">
                <li class="et-paging" v-on:click="switchPage('first')">&lt; &lt;</li>
                <li class="et-paging" v-on:click="switchPage('prev')">&lt;</li>
                <li class="et-paging" v-on:click="switchPage('next')">&gt;</li>
                <li class="et-paging" v-on:click="switchPage('last')">&gt; &gt;</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import get from 'lodash/get'
    import etService from '../common/elementable.service'

    export default {
        name: 'ElemenTable',
        props: {
            columns: Array,
            data: Array,
            filters: Array,
            rowsPerPageOptions: Array
        },
        data(){
            return {
                activeColumn: {},
                activeFilters: [],
                page: 0,
                rowsPerPage: this.rowsPerPageOptions[0],
                searchInput: '',
                sortDirection: 'down'
            };
        },
        computed: {
            lastPage: function(){
                return Math.ceil(this.results.length / this.rowsPerPage);
            },
            resultCount: function(){
                return this.rows.length;
            },
            results: function(){
                let data = this.data;
                // ORDER BY
                if (this.activeColumn.name) data = etService.orderby(data, this.activeColumn.selector, this.sortDirection);
                // FILTER
                if (this.activeFilters.length > 0) data = etService.filter(data, this.filters, this.activeFilters);
                // SEARCH
                if (this.searchInput) data = etService.search(data, this.searchInput);
                this.$log.debug('rows', data);
                return data;
            },
            rows: function(){
                return this.results.slice(this.page * this.rowsPerPage, this.page * this.rowsPerPage + this.rowsPerPage);
            }
        },
        methods: {
            changeRowsPerPage: function(event){
                this.page = 0;
                this.rowsPerPage = event.target.value;
            },
            resolve: function(obj, prop){
                return get(obj, prop);
            },
            searchData: function(event){
                this.searchInput = event.target.value;
            },
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
            },
            sortColumn: function(column){
                if (this.activeColumn.name === column.name){
                    if (this.sortDirection === 'down') this.sortDirection = 'up';
                    else if (this.sortDirection === 'up') this.sortDirection = 'down';
                } else {
                    this.sortDirection = 'down';
                }

                this.activeColumn = column;
            },
            switchPage: function(to){
                switch (to){
                    case 'first':
                        this.page = 0;
                        break;
                    case 'prev':
                        if (this.page > 0) this.page--;
                        break;
                    case 'next':
                        if (this.page + 1 < this.lastPage) this.page++;
                        break;
                    case 'last':
                        this.page = this.lastPage - 1;
                        break;
                }
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
    .et-header input {
        padding: 5px;
        width: 25%;
    }
    .et-header-section {
        display: flex;
        justify-content: space-between;
        width: 30%;
    }
    .et-header-section span {
        display: flex;
        user-select: none;
    }
    .et-header-section span:hover {
        cursor: pointer;
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
    .et-footer {
        display: flex;
        justify-content: space-between;
    }
    .et-footer li {
        list-style: none;
    }
    .et-footer-section {
        display: flex;
        justify-content: space-evenly;
        width: 30%;
    }
    .et-paging {
        cursor: pointer;
        user-select: none;
        width: 20%;
        text-align: center;
        padding: 10px 0 10px 0;
    }
    .et-paging:hover {
        background-color: lightgrey;
        border-radius: 5px;
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