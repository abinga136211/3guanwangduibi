import { ref } from 'vue'
import { apiFetch } from '@/api/client'
import { DEFAULT_SITE_CONFIG } from '@/data/siteConfigDefaults'
import { useAutoRefresh } from '@/composables/useAutoRefresh'

const config = ref({ ...DEFAULT_SITE_CONFIG })

async function fetchConfig() {
  try {
    const data = await apiFetch('/api/config')
    config.value = {
      customer_email: data.customer_email || DEFAULT_SITE_CONFIG.customer_email,
      partnership_email: data.partnership_email || DEFAULT_SITE_CONFIG.partnership_email,
      office_address: data.office_address || DEFAULT_SITE_CONFIG.office_address,
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
