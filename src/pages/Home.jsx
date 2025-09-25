import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Grid from '@mui/material/Grid2'
import Pagination from '@mui/material/Pagination'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import PokemonCard from '../components/PokemonCard.jsx'
import { listPokemon, getPokemonByName, listByType } from '../services/pokeService.js'

const PAGE_SIZE = 12

export default function Home() {
  const [params, setParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)

  const page = Number(params.get('page') || 1)
  const q = params.get('q')?.toLowerCase() || ''
  const type = params.get('type') || ''

  useEffect(() => {
    let cancelled = false
    const fetchData = async () => {
      setLoading(true)
      setError('')
      try {
        if (q) {
          const data = await getPokemonByName(q)
          if (!cancelled) {
            setItems([data])
            setTotal(1)
          }
        } else if (type) {
          const { items, total } = await listByType(type, PAGE_SIZE, page)
          if (!cancelled) {
            setItems(items)
            setTotal(total)
          }
        } else {
          const { items, count } = await listPokemon(PAGE_SIZE, page)
          if (!cancelled) {
            setItems(items)
            setTotal(count)
          }
        }
      } catch (e) {
        if (!cancelled) setError('Falha ao carregar dados da API. Tente novamente.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchData()
    return () => { cancelled = true }
  }, [page, q, type])

  const handlePageChange = (_e, value) => {
    const next = new URLSearchParams(params)
    if (value > 1) next.set('page', String(value))
    else next.delete('page')
    setParams(next)
  }

  return (
    <Box>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {!loading && !error && (
        <>
          <Grid container spacing={2}>
            {items.map(p => (
              <Grid key={p.name} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <PokemonCard pokemon={p} />
              </Grid>
            ))}
          </Grid>

          {total > PAGE_SIZE && !q && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={Math.ceil(total / PAGE_SIZE)}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  )
}
