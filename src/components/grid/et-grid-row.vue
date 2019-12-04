<template>
    <div :style="styles">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'et-grid-row',
        computed: {
            styles: function(){
                return {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }
            }
        }
    }
</script>