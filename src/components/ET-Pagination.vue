<template>
    <div class="et-pagination" :style="styles.pagination.root">
        <ul class="et-pagination-section" :style="styles.pagination.section">
            <li>{{ pageCount }} of {{ totalCount }}</li>
            <li>{{ currentPage + 1 }} / {{ lastPage }}</li>
            <li>
                <select v-model="rowsPerPage" v-on:change="changeRowsPerPage">
                    <option v-for="(option, i) in rowsPerPageOptions" :key="i" :value="option">
                        {{ option }}
                    </option>
                </select>
            </li>
        </ul>
        <ul class="et-pagination-section" :style="styles.pagination.section">
            <li class="paging-item" :style="styles.pagination.pagingItem" v-on:click="switchPage('first')">&lt; &lt;</li>
            <li class="paging-item" :style="styles.pagination.pagingItem" v-on:click="switchPage('prev')">&lt;</li>
            <li class="paging-item" :style="styles.pagination.pagingItem" v-on:click="switchPage('next')">&gt;</li>
            <li class="paging-item" :style="styles.pagination.pagingItem" v-on:click="switchPage('last')">&gt; &gt;</li>
        </ul>
    </div>
</template>

<script>
    import pagination from '../common/elementable.styles.js'

    export default {
        name: 'EtPagination',
        props: {
            currentPage: Number,
            onPageChange: Function,
            onSwitch: Function,
            pageCount: Number,
            rowsPerPageOptions: Array,
            totalCount: Number
        },
        data(){
            return {
                rowsPerPage: this.rowsPerPageOptions[0]
            };
        },
        computed: {
             lastPage: function(){
                return Math.ceil(this.totalCount / this.rowsPerPage);
            },
            styles: function(){
                return pagination;
            }
        },
        methods: {
            changeRowsPerPage: function(){
                this.onPageChange(this.rowsPerPage);
            },
            switchPage: function(to){
                if (to === 'first') this.onSwitch(0);
                if (to === 'prev'){
                    if (this.currentPage > 0) this.onSwitch(this.currentPage - 1);
                    else this.onSwitch(this.currentPage);
                }
                if (to === 'next'){
                    if (this.currentPage + 1 < this.lastPage) this.onSwitch(this.currentPage + 1);
                    else this.onSwitch(this.currentPage);
                }
                if (to === 'last') this.onSwitch(this.lastPage - 1);
            }
        }
    }
</script>

<!--
<style module>
    .et-pagination {
        display: flex;
        justify-content: space-between;
    }
    .et-pagination-section {
        list-style: none;
        display: flex;
        justify-content: space-evenly;
        width: 30%;
    }
    .et-pagination-section > li.paging-item {
        cursor: pointer;
        user-select: none;
        width: 20%;
        text-align: center;
        padding: 10px 0 10px 0;
    }
    .et-pagination-section > li.paging-item:hover {
        background-color: lightgrey;
        border-radius: 5px;
    }
</style>
-->