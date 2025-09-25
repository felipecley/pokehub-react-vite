import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { useAuth } from '../providers/AuthContext.jsx'
//import { getAllTypes } from '../services/pokeService.js'
import { getAllTypes } from '../services/pokeService'



export default function Header() {
  const [params, setParams] = useSearchParams()
  const [types, setTypes] = useState([])
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const search = params.get('q') || ''
  const type = params.get('type') || ''

  useEffect(() => {
    getAllTypes().then(setTypes).catch(() => setTypes([]))
  }, [])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    next.delete('page')
    setParams(next)
  }

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none', mr: 2 }}>
          PokeHub
        </Typography>

        <TextField
          size="small"
          placeholder="Buscar por nome (ex: pikachu)"
          value={search}
          onChange={(e) => updateParam('q', e.target.value)}
        />

        <TextField
          size="small"
          select
          label="Tipo"
          value={type}
          onChange={(e) => updateParam('type', e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">Todos</MenuItem>
          {types.map((t) => (
            <MenuItem key={t.name} value={t.name}>{t.name}</MenuItem>
          ))}
        </TextField>

        <Box sx={{ flexGrow: 1 }} />

        {user ? (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" component={Link} to="/profile">Perfil</Button>
            <Button color="inherit" onClick={logout}>Sair</Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" component={Link} to="/login">Entrar</Button>
            <Button color="inherit" component={Link} to="/register">Registrar</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
