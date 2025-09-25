import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import { useAuth } from '../providers/AuthContext.jsx'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { register } = useAuth()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await register(email, password)
      navigate('/profile')
    } catch (e) {
      setError('Não foi possível registrar.')
    }
  }

  return (
    <Box component="form" onSubmit={submit} sx={{ display: 'grid', gap: 2, maxWidth: 360, mx: 'auto' }}>
      <Typography variant="h5">Registrar</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextField label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit" variant="contained">Criar conta</Button>
      <Typography variant="body2">Já tem conta? <Link to="/login">Entrar</Link></Typography>
    </Box>
  )
}
