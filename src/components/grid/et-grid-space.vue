<template>
    <span :style="styles"></span>
</template>

<script>
    export default {
        name: 'et-grid-space',
        props: {
            width: Number
        },
        data(){
            return {
                rowWidth: 16
            }
        },
        computed: {
            styles: function(){
                return {
                    width: (this.width / this.rowWidth) * 100 + '%'
                }
            }
        }
    }
</script>