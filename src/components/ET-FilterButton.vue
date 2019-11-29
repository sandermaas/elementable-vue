<template>
    <button type="button" 
        v-on:click="click" 
        :style="styles.filterbutton.button"
        @mouseenter="hoverStart"
        @mouseleave="hoverStop"
    >Filter</button>
</template>

<script>
    import filterbutton from '../common/elementable.styles.js'

    export default {
        name: 'EtFilterButton',
        props: {
            onClick: Function
        },
        computed: {
            styles: function(){
                return filterbutton;
            }
        },
        methods: {
            click: function(){
                this.onClick();
            },
            hoverStart: function(event){
                event.target.style.backgroundColor = 'lightgray';
            },
            hoverStop: function(event){
                event.target.style.backgroundColor = 'white';
            }
        }
    }
</script>