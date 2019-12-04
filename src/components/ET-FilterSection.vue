<template>
    <div v-if="visible" class="et-filter-section" :style="styles.root">
        <et-list>
            <et-list-item v-for="(filter, fI) in filters" :key="fI" horizontal>
                <select 
                    v-model="filter.column"
                    :style="{ ...styles.filterSelect }"
                >
                    <option v-for="(column, cI) in columns" :key="cI" :value="column">
                        {{ column.name }}
                    </option>
                </select>
                <select 
                    v-if="filter.column.type === String" 
                    v-model="filter.operator"
                    :style="{ ...styles.filterSelect }"
                >
                    <option value="contains">contains</option>
                    <option value="=">equals</option>
                </select>
                <select 
                    v-else-if="filter.column.type === Number" 
                    v-model="filter.operator"
                    :style="{ ...styles.filterSelect }"
                >
                    <option value="=">equals</option>
                    <option value=">">greater than</option>
                    <option value="<">smaller than</option>
                </select>
                <et-input-text v-model="filter.value" :styling="{ width: '30%', marginRight: '15px' }"></et-input-text>
                <et-button-remove @click="removeFilter(fI)" />
            </et-list-item>
        </et-list>
        <et-button :styling="{ marginLeft: '40px' }" @click="createFilter">Create</et-button>
    </div>
</template>

<script>
    import debounce from 'lodash/debounce'
    import get from 'lodash/get'
    import EtButton from './button/et-button'
    import EtButtonRemove from './button/et-button-remove'
    import EtInputText from './input/et-input-text'
    import EtList from './list/et-list'
    import EtListItem from './list/et-list-item'

    export default {
        name: 'EtFilterSection',
        components: {
            'et-button': EtButton,
            'et-button-remove': EtButtonRemove,
            'et-input-text': EtInputText,
            'et-list': EtList,
            'et-list-item': EtListItem
        },
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
                    filterSelect: {
                        width: '20%',
                        marginRight: '15px'
                    },
                    root: {
                        marginTop: '10px',
                        paddingBottom: '15px',
                        border: '1px solid #cacfd6'
                    }
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