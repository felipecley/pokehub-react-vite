import { useAuth } from '../providers/AuthContext.jsx'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default function Profile() {
  const { user, logout } = useAuth()

  return (
    <Box sx={{ display: 'grid', gap: 2, maxWidth: 480, mx: 'auto' }}>
      <Typography variant="h5">Perfil</Typography>
      <Typography>Logado como: {user?.email}</Typography>
      <Button variant="outlined" onClick={logout}>Sair</Button>
    </Box>
  )
}
