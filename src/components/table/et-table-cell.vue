<template>
    <td class="et-table-cell" :style="styles">
        <slot></slot>
    </td>
</template>

<script>
    export default {
        name: 'et-table-cell',
        computed: {
            styles: function(){
                return {
                    padding: '5px 10px 5px 10px'
                }
            }
        }
    }
</script>