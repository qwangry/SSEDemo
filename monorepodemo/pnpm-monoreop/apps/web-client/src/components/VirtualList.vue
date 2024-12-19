<template>
    <div ref="container" class="container" @scroll="handleScroll($event)">
        <div class="placeholder" :style="{ height: listHeight + 'px' }"></div>
        <div class="list-wrapper" :style="{ transform: getTransform }">
            <div class="card-item" v-for="item in renderList" :key="item.id" :style="{
                height: itemSize + 'px',
                lineHeight: itemSize + 'px',
                backgroundColor: `rgba(0,0,0,${item.value / 100})`,
            }">
                {{ item.value + 1 }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
const { listData, itemSize } = defineProps({
    listData: {
        type: Array,
        default: () => [],
    },
    itemSize: {
        type: Number,
        default: 100,
    },
});

const container = ref(null);
const containerHeight = ref(0);
const renderCount = computed(() => Math.ceil(containerHeight.value / itemSize));
const start = ref(0);
const offset = ref(0);
const end = computed(() => start.value + renderCount.value);
const listHeight = computed(() => listData.length * itemSize);
const renderList = computed(() => listData.slice(start.value, end.value + 1));

const getTransform = computed(() => `translate3d(0,${offset.value}px,0)`);

onMounted(() => {
    containerHeight.value = container.value.clientHeight;
});

function handleScroll(e) {
    const scrollTop = e.target.scrollTop;
    start.value = Math.floor(scrollTop / itemSize);
    offset.value = scrollTop - (scrollTop % itemSize);
}
</script>

<style scoped>
.container {
    width: 800px;
    height: 100%;
    margin: 0 auto;
    overflow: auto;
    position: relative;
}

.placeholder {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}

.card-item {
    padding: 10px;
    color: #777;
    box-sizing: border-box;
    border-bottom: 1px solid #e1e1e1;
}
</style>