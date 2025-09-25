import { api } from './api.js'

export async function listPokemon(pageSize = 12, page = 1) {
  const offset = (page - 1) * pageSize
  const res = await api.get(`/pokemon?limit=${pageSize}&offset=${offset}`)
  const { results, count } = res.data
  const items = await Promise.all(results.map(r => api.get(r.url).then(d => d.data)))
  return { items, count }
}

export async function getPokemonByName(name) {
  const res = await api.get(`/pokemon/${name}`)
  return res.data
}

export async function getSpecies(idOrName) {
  const res = await api.get(`/pokemon-species/${idOrName}`)
  return res.data
}

export async function getAllTypes() {
  const res = await api.get('/type')
  return res.data.results.filter(t => !['unknown','shadow'].includes(t.name))
}

export async function listByType(typeName, pageSize = 12, page = 1) {
  const res = await api.get(`/type/${typeName}`)
  const all = res.data.pokemon.map(p => p.pokemon)
  const total = all.length
  const slice = all.slice((page-1)*pageSize, (page-1)*pageSize + pageSize)
  const items = await Promise.all(slice.map(p => api.get(p.url).then(d => d.data)))
  return { items, total }
}
