import { ref } from 'vue'
import { apiFetch } from '@/api/client'
import { DEFAULT_SITE_CONFIG_ITEMS } from '@/data/siteConfigDefaults'
import { useAutoRefresh } from '@/composables/useAutoRefresh'

const config = ref({ items: [...DEFAULT_SITE_CONFIG_ITEMS] })

async function fetchConfig() {
  try {
    const data = await apiFetch('/api/config')
    const items = Array.isArray(data.items) ? data.items : []
    config.value = {
      items: items.length ? items : [...DEFAULT_SITE_CONFIG_ITEMS],
    }
  } catch {
    /* keep last known / defaults */
  }
}

/** Shared site config; call from component setup to enable auto-refresh. */
export function useSiteConfig(options = {}) {
  useAutoRefresh(fetchConfig, { intervalMs: options.intervalMs ?? 3000 })
  return { config, refreshConfig: fetchConfig }
}
