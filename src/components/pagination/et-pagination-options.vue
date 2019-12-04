<template>
    <select v-model="activeOption" @change="changeOption">
        <option v-for="(option, oI) in options" :key="oI" :value="option">
            {{ option }}
        </option>
    </select>
</template>

<script>
    export default {
        name: 'et-pagination-options',
        props: {
            options: Array
        },
        data(){
            return {
                activeOption: this.options[0]
            }
        },
        methods: {
            changeOption: function(){
                this.$emit('change', this.activeOption);
            }
        }
    }
</script>