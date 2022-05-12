<template>
  <div>
    <svg viewBox="25 25 50 50" class="circular">
      <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style>
.circular {
  height: 42px;
  width: 42px;
  animation: loading-rotate 2s linear infinite;
}

.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #dc6c31;
  stroke-linecap: round;
}

@keyframes loading-rotate {
  100% {
    transform: rotate(1turn);
  }
}
</style>