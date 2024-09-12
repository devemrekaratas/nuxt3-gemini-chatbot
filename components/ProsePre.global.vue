<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})

const codeCopied = ref<boolean>(false);

const copyCode = (): void => {
  navigator.clipboard.writeText(props.code)
    .then(() => {
      codeCopied.value = true;
      setTimeout(function () {
        codeCopied.value = false;
      }, 5000);
    })
    .catch((e) => {
      console.error('Error: Unable to copy code.');
    });
}
</script>

<template>
  <div class="pre">
    <div class="pre-head">
      <span v-if="codeCopied" class="copy-success"><i>Copied</i></span>
      <UButton @click="copyCode" icon="i-mingcute:copy-2-fill" size="2xs" color="teal" variant="outline" label="Copy"
        :trailing="false" />
    </div>
    <pre class="pre-body" :class="$props.class"><slot/></pre>
  </div>
</template>

<style>
.pre {
  overflow-x: hidden;
  border-radius: 6px;
  margin-bottom: 3rem;
  background-color: var(--shiki-default-bg);
}

.pre-head {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;
}

.pre-head .copy-success{
  font-family: Arial, "sans-serif";
  font-size: 0.8rem;
  color: lightgreen;
  border-color: transparent;
  margin-right: 5px;
  color: var(--shiki-default);
  opacity: 0.5;
}

.pre-head .filename {
  margin-left: 0;
  margin-right: auto;
}

.pre-body {
  margin: 0;
  padding: 0.75rem 0 0.75rem 0;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  overflow-x: auto;
}

.pre-body code {
  display: inline-block;
  width: 100%;
}

.pre-body .line {
  padding: 0 0.75rem;
  line-height: 1.6;
}

.pre-body .line span {
  background-color: transparent !important;
}

.pre-body .line.highlight,
.pre-body .line.highlighted {
  background-color: color-mix(in srgb, var(--shiki-default-bg) 70%, #888888);
}

.pre-body .line::before {
  content: attr(line);
  padding-right: 1.25rem;
  display: inline-block;
  opacity: 0.8;
}

.pre-body .line.diff.remove {
  background-color: color-mix(in srgb, var(--shiki-default-bg) 65%, #F43F5E);
}

.pre-body .line.diff.add {
  background-color: color-mix(in srgb, var(--shiki-default-bg) 75%, #10B981);
}

pre code .line {
  display: block;
}
</style>