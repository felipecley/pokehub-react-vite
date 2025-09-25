import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export default function PokemonCard({ pokemon }) {
  const id = pokemon.id
  const name = pokemon.name
  const image = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default

  return (
    <Card>
      {image && <CardMedia component="img" height="180" image={image} alt={name} />}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{ textTransform: 'capitalize' }}>
          {id}. {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pokemon.types?.map(t => t.type.name).join(', ')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/pokemon/${name}`}>Detalhes</Button>
      </CardActions>
    </Card>
  )
}
