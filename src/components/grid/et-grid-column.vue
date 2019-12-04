<template>
    <div :style="styles">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'et-grid-column',
        props: {
            align: String,
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
                    textAlign: this.align,
                    width: (this.width / this.rowWidth) * 100 + '%'
                }
            }
        }
    }
</script>