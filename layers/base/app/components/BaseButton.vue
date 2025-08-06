<script setup lang="ts">
defineOptions({
  inheritAttrs: true,
})
defineProps<{
  leadingIcon?: string
  trailingIcon?: string
}>()
</script>

<template>
  <button
    v-bind="$attrs"
    class="mb-4 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] px-3 py-2 text-[11px] font-bold flex items-center gap-2 hover:bg-[#e0e0e0] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white h-8"
  >
    <span v-if="leadingIcon" className="text-xl leading-none">{{
      leadingIcon
    }}</span>
    <slot />
    <span v-if="trailingIcon" className="text-[16px] leading-none">{{
      trailingIcon
    }}</span>
  </button>
</template>
