<template>
    <div class="well well-sm">
        <div class="comment">
            {{commentData}}
        </div>
    </div>
</template>


<script>
    export default {
        name: 'comment',
        //props recieves data
        props: ["commentProp", "commentIndex"],
        data() {
            return {}
        },
        computed: {
            comment() {

            }
        },
        methods: {
            removeComment(comment) {
                this.$store.dispatch('removeComment', comment)
            }
        },
        components: {
        }
    }

</script>


<style scoped>

</style>