<template>
    <button type="button"
        :style="[styles, hover && hoverStyle]" 
        @click="clickButton" 
        @mouseenter="toggleHover" 
        @mouseleave="toggleHover"
    >
        <slot>X</slot>
    </button>
</template>

<script>
    export default {
        name: 'et-button-remove',
        props: {
            hoverStyle: {
                type: Object,
                default: function(){
                    return {
                        backgroundColor: '#de5959',
                        color: 'black'
                    };   
                }
            },
            styling: Object
        },
        data(){
            return {
                hover: false
            }
        },
        computed: {
            styles: function(){
                return {
                    ...this.styling,
                    backgroundColor: 'white',
                    border: '1px solid black',
                    borderRadius: '3px',
                    cursor: 'pointer'
                }
            }
        },
        methods: {
            clickButton: function(event){
                this.$emit('click', event);
            },
            toggleHover: function(){
                this.hover = !this.hover;
            }
        }
    }
</script>