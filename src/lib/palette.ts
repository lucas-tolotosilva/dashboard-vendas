// Paleta categórica validada (skill de dataviz): ordem fixa, nunca ciclada por rank.
export const CATEGORIAS_ORDEM = ['Eletrônicos', 'Moda', 'Casa & Decoração', 'Beleza', 'Esporte & Lazer'] as const

export const CORES_LIGHT = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4']
export const CORES_DARK = ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181']

export function corCategoria(categoria: string, dark: boolean): string {
  const idx = CATEGORIAS_ORDEM.indexOf(categoria as (typeof CATEGORIAS_ORDEM)[number])
  const paleta = dark ? CORES_DARK : CORES_LIGHT
  return paleta[idx] ?? paleta[paleta.length - 1]
}

