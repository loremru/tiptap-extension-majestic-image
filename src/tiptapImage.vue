<template>
  <node-view-wrapper class="relative">
    <mc-button-ultimate
      slot="only"
      class="absolute top-5 right-3 z-1"
      type="off-black"
      radius="pill"
      size="small"
      icon-name="trash"
      @click="props.deleteNode"
    />

    <img
      v-bind="props.node?.attrs"
      :style="{ transform: `rotateZ(${props.node.attrs.rotate}deg)` }"
      class="duration-300"
    />
    <p
      class="d-ss-text-xsmall"
      contenteditable="true"
      :class="{ 'text-transparent-grayscale-65 image-description': isEmpty }"
      @input="onInput"
      @keydown="onkeydown"
    >
      {{ props.node.attrs.title }}
    </p>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { ref, computed, watch, PropType, onMounted } from 'vue'
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'

const props = defineProps(nodeViewProps)
const emit = defineEmits([])

const isEmpty = computed(() => !props.node.attrs.title.replaceAll(' ', ''))
const onInput = (e) => {
  props.updateAttributes({ title: e.target.innerText.replaceAll('\n', '') })
}

const onkeydown = (e) => {
  if (e.code === 'Enter') e.preventDefault()
}
</script>

<style lang="scss">
.image-description:before {
  @apply w-full block cursor-text;
  content: 'Добавьте описание или укажите информацию об авторе или ресурсе откуда было взято изображение';
}
</style>
