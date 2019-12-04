<template>
    <et-grid>
        <et-grid-row>
            <et-grid-column>
                <et-button-pagination @click="switchPage('first')">
                    &lt;&lt;
                </et-button-pagination>
            </et-grid-column>
            <et-grid-column>
                <et-button-pagination @click="switchPage('prev')">
                    &lt;
                </et-button-pagination>
            </et-grid-column>
            <et-grid-column>
                <et-button-pagination @click="switchPage('next')">
                    &gt;
                </et-button-pagination>
            </et-grid-column>
            <et-grid-column>
                <et-button-pagination @click="switchPage('last')">
                    &gt;&gt;
                </et-button-pagination>
            </et-grid-column>
        </et-grid-row>
    </et-grid>
</template>

<script>
    import EtButtonPagination from '../button/et-button-pagination'
    import EtGrid from '../grid/et-grid'
    import EtGridRow from '../grid/et-grid-row'
    import EtGridColumn from '../grid/et-grid-column'

    export default {
        name: 'et-pagination',
        components: {
            'et-button-pagination': EtButtonPagination,
            'et-grid': EtGrid,
            'et-grid-row': EtGridRow,
            'et-grid-column': EtGridColumn,
        },
        props: {
            totalPages: Number
        },
        data(){
            return {
                currentPage: 1     
            }
        },
        methods: {
            switchPage: function(to){
                if (to === 'first') this.currentPage = 1;
                if (to === 'prev'){
                    if (this.currentPage > 1) this.currentPage--;
                }
                if (to === 'next'){
                    if (this.currentPage < this.totalPages) this.currentPage++
                }
                if (to === 'last') this.currentPage = this.totalPages;

                this.$emit('change', this.currentPage);
            }
        }
    }
</script>