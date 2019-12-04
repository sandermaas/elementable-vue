<template>
    <input type="text" :style="styles" @input="changeInput" :placeholder="placeholder"/>
</template>

<script>
    export default {
        name: 'et-input-text',
        props: {
            placeholder: String,
            styling: Object
        },
        computed: {
            styles: function(){
                return {
                    ...this.styling,
                    padding: '5px 10px 5px 10px'
                }
            }
        },
        methods: {
            changeInput: function(event){
                this.$emit('input', event.target.value);
            }
        }
    }
</script>