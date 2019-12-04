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
        name: 'et-button',
        props: {
            hoverStyle: {
                type: Object,
                default: function(){
                    return {
                        backgroundColor: '#4f5165',
                        color: '#f2f2f2'
                    }
                }
            },
            styling: Object
        },
        data(){
            return {
                hover: false
            };
        },
        computed: {
            styles: function(){
                return {
                    ...this.styling,
                    cursor: 'pointer',
                    padding: '5px 50px 5px 50px',
                    backgroundColor: 'white',
                    border: '1px solid black'
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