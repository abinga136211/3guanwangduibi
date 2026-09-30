import { onMounted, onUnmounted, ref, watch } from 'vue'

/**
 * Auto-refresh while the page is visible.
 * @param {() => void | Promise<void>} loadFn
 * @param {{ intervalMs?: number, immediate?: boolean, paused?: import('vue').Ref<boolean> }} [options]
 */
export function useAutoRefresh(loadFn, options = {}) {
  const intervalMs = options.intervalMs ?? 3000
  const immediate = options.immediate !== false
  const paused = options.paused
  const refreshing = ref(false)
  let timer = null

  async function tick() {
    if (paused?.value) return
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return
    if (refreshing.value) return
    refreshing.value = true
    try {
      await loadFn()
    } finally {
      refreshing.value = false
    }
  }

  function start() {
    stop()
    timer = window.setInterval(() => {
      tick()
    }, intervalMs)
  }

  function stop() {
    if (timer != null) {
      clearInterval(timer)
      timer = null
    }
  }

  function onVisibility() {
    if (document.visibilityState === 'visible') {
      tick()
      start()
    } else {
      stop()
    }
  }

  onMounted(() => {
    if (immediate) tick()
    start()
    document.addEventListener('visibilitychange', onVisibility)
  })

  onUnmounted(() => {
    stop()
    document.removeEventListener('visibilitychange', onVisibility)
  })

  if (paused) {
    watch(paused, (v) => {
      if (!v) tick()
    })
  }

  return { refreshing, tick, start, stop }
}
