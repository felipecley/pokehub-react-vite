import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { getPokemonByName, getSpecies } from '../services/pokeService.js'

export default function Details() {
  const { name } = useParams()
  const [data, setData] = useState(null)
  const [species, setSpecies] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      setLoading(true)
      setError('')
      try {
        const p = await getPokemonByName(name)
        const s = await getSpecies(p.id)
        if (!cancelled) {
          setData(p)
          setSpecies(s)
        }
      } catch (e) {
        if (!cancelled) setError('Não foi possível carregar os detalhes.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [name])

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}><CircularProgress /></Box>
  }
  if (error) return <Alert severity="error">{error}</Alert>
  if (!data) return null

  const img = data.sprites?.other?.['official-artwork']?.front_default || data.sprites?.front_default
  const flavor = species?.flavor_text_entries?.find(f => f.language.name === 'en')?.flavor_text?.replace(/\f/g, ' ')

  return (
    <Card>
      {img && <CardMedia component="img" image={img} alt={data.name} sx={{ maxHeight: 340, objectFit: 'contain' }} />}
      <CardContent>
        <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>{data.name}</Typography>
        <Box sx={{ my: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {data.types.map(t => <Chip key={t.type.name} label={t.type.name} />)}
        </Box>
        {flavor && <Typography sx={{ mt: 1 }}>{flavor}</Typography>}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Stats</Typography>
          {data.stats.map(s => (
            <Typography key={s.stat.name}>
              {s.stat.name}: {s.base_stat}
            </Typography>
          ))}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Habilidades</Typography>
          {data.abilities.map(a => (
            <Chip key={a.ability.name} label={a.ability.name} sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
