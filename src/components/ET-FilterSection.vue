<template>
    <div v-if="visible" class="et-filter-section" :style="styles.root">
        <ul :style="styles.ul">
            <li v-for="(filter, fI) in filters" :key="fI" :style="styles.filterItem">
                <select 
                    :style="{ ...styles.filterSelect }" 
                    v-model="filter.column"
                >
                    <option v-for="(column, cI) in columns" :key="cI" :value="column">
                        {{ column.name }}
                    </option>
                </select>
                <select 
                    v-if="filter.column.type === String" 
                    :style="{ ...styles.filterSelect }" 
                    v-model="filter.operator"
                >
                    <option value="contains">contains</option>
                    <option value="=">equals</option>
                </select>
                <select 
                    v-else-if="filter.column.type === Number" 
                    :style="{ ...styles.filterSelect }" 
                    v-model="filter.operator"
                >
                    <option value="=">equals</option>
                    <option value=">">greater than</option>
                    <option value="<">smaller than</option>
                </select>
                <input 
                    type="text" 
                    :style="{ ...styles.input, ...styles.filterInput }" 
                    v-model="filter.value" 
                />
                <button 
                    type="button" 
                    :style="{ ...styles.removeButton }" 
                    @click="removeFilter(fI)"
                >X</button>
            </li>
        </ul>
        <button 
            type="button" 
            :style="{ ...styles.button, marginLeft: '40px' }" 
            @click="createFilter"
        >Create</button>
    </div>
</template>

<script>
    import debounce from 'lodash/debounce'
    import get from 'lodash/get'
    import { button, input, ul } from '../common/elementable.styles.js'

    export default {
        name: 'EtFilterSection',
        props: {
            columns: Array,
            onFilterChange: Function,
            visible: Boolean
        },
        data(){
            return {
                filters: []
            };
        },
        computed: {
            styles: function(){
                return {
                    removeButton: {
                        backgroundColor: 'white',
                        border: '1px solid black',
                        borderRadius: '25px',
                        cursor: 'pointer'
                    },
                    filterItem: {
                        display: 'flex', 
                        paddingRight: '40px', 
                        marginBottom: '10px'
                    },
                    filterInput: {
                        width: '30%',
                        marginRight: '15px'
                    },
                    filterSelect: {
                        width: '20%',
                        marginRight: '15px'
                    },
                    root: {
                        marginTop: '10px',
                        paddingBottom: '15px',
                        border: '1px solid darkgray'
                    },
                    button,
                    input,
                    ul
                };
            },
            update: function(){
                return debounce(this.createFilterConditions, 500);
            }
        },
        watch: {
            filters: {
                deep: true, 
                handler(){
                    this.update();
                }
            }
        },
        methods: {
            createFilter: function(){
                this.filters.push({
                    column: this.columns[0],
                    operator: null,
                    value: null
                });
            },
            createFilterConditions: function(){
                const filterConditions = this.filters.filter(function(filter){
                    return filter.operator && filter.value;
                }).map(function(filter){
                    let condition = function(){ return true; };

                    if (filter.operator === 'contains'){
                        condition = function(row){
                            const value = get(row, filter.column.selector);
                            if (value){
                                if (value.toString().toLowerCase().indexOf(filter.value) !== -1) return true;
                            }
                            return false;
                        };
                    }
                    if (filter.operator === '='){
                        condition = function(row){
                            const value = get(row, filter.column.selector);
                            if (value){
                                if (value.toString().toLowerCase() === filter.value.toString().toLowerCase()) return true;
                            }
                            return false;
                        };
                    }
                    if (filter.operator === '<'){
                        condition = function(row){
                            const value = get(row, filter.column.selector);
                            if (value){
                                if (value < filter.value) return true;
                            }
                            return false;
                        };
                    }
                    if (filter.operator === '>'){
                        condition = function(row){
                            const value = get(row, filter.column.selector);
                            if (value){
                                if (value > filter.value) return true;
                            }
                            return false;
                        };
                    }

                    return {
                        filter: filter,
                        condition: condition
                    }
                });
                
                this.onFilterChange(filterConditions);
            },
            removeFilter: function(index){
                this.filters.splice(index, 1);
            }
        }
    }
</script>