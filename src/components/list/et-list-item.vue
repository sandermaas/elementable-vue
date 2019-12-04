<template>
    <li v-if="horizontal" :style="styles.horizontal">
        <slot></slot>
    </li>
    <li v-else :style="styles.default">
        <slot></slot>
    </li>
</template>

<script>
    export default {
        name: 'et-list-item',
        props: {
            horizontal: Boolean
        },
        data(){
            return {
                styles: {
                    default: {
                        marginBottom: '10px'
                    },
                    horizontal: {
                        display: 'flex',
                        marginBottom: '10px'
                    }   
                }
            }
        }    
    }
</script>