<template>
    <section :style="styles">
        <slot></slot>
    </section>
</template>

<script>
    export default {
        name: 'et-grid',
        props: {
            styling: Object
        },
        computed: {
            styles: function(){
                return {
                    ...this.styling
                }
            }
        }
    }
</script>