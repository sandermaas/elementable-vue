<template>
    <tr class="et-table-row" 
        :style="[head && styles.head, hover && hoverStyles]" 
        @mouseenter="toggleHover" 
        @mouseleave="toggleHover"
    >
        <slot></slot>
    </tr>
</template>

<script>
    export default {
        name: 'et-table-row',
        props: {
            head: Boolean,
            hoverStyle: {
                type: Object,
                default: function(){
                    return { 
                        backgroundColor: '#cacfd6',
                        color: 'black'
                    };
                }
            }
        },
        data(){
            return {
                hover: false
            };
        },
        computed: {
            hoverStyles: function(){
                if (this.head) return {};
                return this.hoverStyle;
            },
            styles: function(){
                return {
                    head: {
                        borderBottom: '1px solid #cacfd6'
                    }
                }
            }
        },
        methods: {
            toggleHover: function(){
                this.hover = !this.hover;
            }
        }
    }
</script>