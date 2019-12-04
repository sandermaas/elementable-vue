<template>
    <ul :style="styles">
        <slot></slot>
    </ul>
</template>

<script>
    export default {
        name: 'et-list',
        data(){
            return {
                styles: {
                    listStyle: 'none'
                }
            };
        }
    }
</script>