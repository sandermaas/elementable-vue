<template>
    <div class="et-root">
        <et-grid :styling="{ marginBottom: '10px' }">
            <et-grid-row>
                <et-grid-column width=8>
                    <et-input-text @input="search" placeholder="Search.." :styling="{ width: '50%' }"></et-input-text>
                </et-grid-column>
                <et-grid-column width=8 align="right">
                    <et-button @click="showFilters" hoverColor="darkgray">Filter</et-button>
                </et-grid-column>
            </et-grid-row>
            <et-grid-row>
                <et-grid-column width=16>
                    <EtFilterSection
                        :columns="filterColumns"
                        :onFilterChange="filter"
                        :visible="filtersVisible"
                    ></EtFilterSection>
                </et-grid-column>
            </et-grid-row>
        </et-grid>

        <et-table>
            <et-table-head>
                <et-table-row :head="true">
                    <et-table-header v-for="column in columns" :key="column.name"
                        :active="activeColumn.name === column.name"
                        :sortDirection="sortDirection"
                        :sortable="column.sortable"
                        @click="activateColumn(column)"
                    >
                        {{ column.name }}
                    </et-table-header>
                </et-table-row>
            </et-table-head>
            <et-table-body>
                <et-table-row v-for="(row, i) in rows" :key="i">
                    <et-table-cell v-for="(column, j) in columns" :key="j">
                        {{ resolve(row, column.selector) }}
                    </et-table-cell>
                </et-table-row>
            </et-table-body>
        </et-table>

        <et-grid :styling="{ marginTop: '20px' }">
            <et-grid-row>
                <et-grid-space width=1 />
                <et-grid-column width=5>
                    <et-grid>
                        <et-grid-row>
                            <et-grid-column width=5>
                                <et-pagination-results
                                    :displayResults="rowsCount"
                                    :totalResults="resultsCount"
                                ></et-pagination-results>
                            </et-grid-column>
                            <et-grid-column width=5>
                                <et-pagination-pages
                                    :currentPage="page + 1"
                                    :lastPage="lastPage"
                                ></et-pagination-pages>
                            </et-grid-column>
                            <et-grid-column width=5>
                                <et-pagination-options
                                    :options="rowsPerPageOptions"
                                    @change="changeOptions"
                                >
                                </et-pagination-options>
                            </et-grid-column>
                        </et-grid-row>
                    </et-grid>
                </et-grid-column>
                <et-grid-space width=4 />
                <et-grid-column width=5>
                    <et-pagination
                        :totalPages="lastPage"
                        @change="switchPage"
                    ></et-pagination>
                </et-grid-column>
                <et-grid-space width=1 />
            </et-grid-row>
        </et-grid>
    </div>
</template>

<script>
    import get from 'lodash/get'
    import etService from '../common/elementable.service'
    import EtFilterSection from './ET-FilterSection'
    import EtButton from './button/et-button'
    import EtGrid from './grid/et-grid'
    import EtGridRow from './grid/et-grid-row'
    import EtGridColumn from './grid/et-grid-column'
    import EtGridSpace from './grid/et-grid-space'
    import EtInputText from './input/et-input-text'
    import EtPagination from './pagination/et-pagination'
    import EtPaginationResults from './pagination/et-pagination-results'
    import EtPaginationPages from './pagination/et-pagination-pages'
    import EtPaginationOptions from './pagination/et-pagination-options'
    import EtTable from './table/et-table'
    import EtTableHead from './table/et-table-head'
    import EtTableBody from './table/et-table-body'
    import EtTableRow from './table/et-table-row'
    import EtTableHeader from './table/et-table-header'
    import EtTableCell from './table/et-table-cell'

    export default {
        name: 'ElemenTable',
        components: {
            'et-button': EtButton,
            'et-grid': EtGrid,
            'et-grid-row': EtGridRow,
            'et-grid-column': EtGridColumn,
            'et-grid-space': EtGridSpace,
            'et-input-text': EtInputText,
            'et-pagination': EtPagination,
            'et-pagination-results': EtPaginationResults,
            'et-pagination-pages': EtPaginationPages,
            'et-pagination-options': EtPaginationOptions,
            'et-table': EtTable,
            'et-table-head': EtTableHead,
            'et-table-body': EtTableBody,
            'et-table-row': EtTableRow,
            'et-table-header': EtTableHeader,
            'et-table-cell': EtTableCell,
            EtFilterSection
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
            rowsPerPageOptions: {
                type: Array,
                default: function(){
                    return [10, 25, 50];
                }
            }
        },
        data(){
            return {
                activeFilters: [],
                filtersVisible: false,
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
            filterColumns: function(){
                return this.columns.filter(function(column){
                    return column.filterable;
                });
            },
            lastPage: function(){
                return Math.ceil(this.resultsCount / this.rowsPerPage);
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
            }
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
            filter: function(filters){
                this.page = 0;
                this.activeFilters = filters;
            },
            resolve: function(obj, prop){
                return get(obj, prop);
            },
            search: function(value){
                this.searchInput = value;
            },
            showFilters: function(){
                this.filtersVisible = !this.filtersVisible;
            },
            switchPage: function(newpage){
                this.page = newpage - 1;
            }
        }
    }
</script>