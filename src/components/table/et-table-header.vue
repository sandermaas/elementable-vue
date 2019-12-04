<template>
    <th class="et-table-header"
        :style="[styles.th, hover && hoverStyle]"
        @click="clickElement"
        @mouseenter="toggleHover" 
        @mouseleave="toggleHover"
    >
        <span v-if="sortable" :style="styles.span">
            <slot></slot>
            <div v-if="active && sortDirection === 'down'" class="arrow-down" :style="styles.arrowDown"></div>
            <div v-else-if="active && sortDirection === 'up'" class="arrow-up" :style="styles.arrowUp"></div>
            <div v-else class="arrow-hidden" :style="styles.arrowHidden"></div>
        </span>
        <span v-else :style="styles.span">
            <slot></slot>
        </span>
    </th>
</template>

<script>
    export default {
        name: 'et-table-header',
        props: {
            active: Boolean,
            hoverStyle: {
                type: Object,
                default: function(){
                    return {
                        backgroundColor: '#4f5165',
                        color: '#f2f2f2'
                    };   
                }
            },
            sortDirection: String,
            sortable: Boolean
        },
        data(){
            return {
                hover: false
            };
        },
        computed: {
            styles: function(){
                return {
                    arrowDown: {
                        marginLeft: '20px',
                        width: '0', 
                        height: '0', 
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderTop: this.hover ? '8px solid ' + this.hoverStyle.color : '8px solid black'
                    },
                    arrowUp: {
                        marginLeft: '20px',
                        width: '0', 
                        height: '0', 
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderBottom: this.hover ? '8px solid ' + this.hoverStyle.color : '8px solid black'
                    },
                    arrowHidden: {
                        opacity: '0',
                        marginLeft: '20px',
                        width: '0', 
                        height: '0', 
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent'
                    },
                    span: {
                        display: 'flex',
                        alignItems: 'center'
                    },
                    th: {
                        borderRadius: '3px 3px 0 0',
                        cursor: 'pointer',
                        userSelect: 'none',
                        padding: '10px'
                    }
                }
            }
        },
        methods: {
            clickElement: function(event){
                this.$emit('click', event);
            },
            toggleHover: function(){
                this.hover = !this.hover;
            }
        }
    }
</script>