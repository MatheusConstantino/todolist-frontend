<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click')"
  >
    <svg 
      v-if="loading" 
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    {{ loading ? loadingText : text }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: Boolean,
  loading: Boolean,
  loadingText: {
    type: String,
    default: 'Carregando...'
  }
})

defineEmits(['click'])

const buttonClasses = computed(() => [
  'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  // Variants
  {
    'bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-cyan-500': props.variant === 'primary',
    'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500': props.variant === 'secondary',
    'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500': props.variant === 'danger'
  },
  // Sizes
  {
    'px-3 py-2 text-sm': props.size === 'sm',
    'px-4 py-2 text-base': props.size === 'md',
    'px-6 py-3 text-lg': props.size === 'lg'
  },
  // States
  {
    'opacity-50 cursor-not-allowed': props.disabled || props.loading
  }
])
</script>