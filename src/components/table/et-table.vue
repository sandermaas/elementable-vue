<template>
    <table class="et-table" :style="styles">
        <slot></slot>
    </table>
</template>

<script>
    export default {
        name: 'et-table',
        computed: {
            styles: function(){
                return {
                    width: '100%',
                    textAlign: 'left',
                    borderCollapse: 'collapse'
                }
            }
        }
    }
</script>