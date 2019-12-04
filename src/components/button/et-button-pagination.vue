<template>
    <button type="button" 
        :style="[styles, hover && hoverStyle]"
        @click="clickButton"
        @mouseenter="toggleHover"
        @mouseleave="toggleHover"
    >
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'et-button-pagination',
        props: {
            hoverStyle: {
                type: Object,
                default: function(){
                    return {
                        backgroundColor: '#4f5165',
                        color: '#f2f2f2'
                    }
                }
            }
        },
        data(){
            return {
                hover: false
            };
        },
        computed: {
            styles: function(){
                return {
                    backgroundColor: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '10px 30px 10px 30px'
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