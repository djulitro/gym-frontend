import { Button, Card, Container, Grid, TextField, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSettingsContext } from '../../../components/settings';
import Page from '../../../components/Page';
// sections
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function AdminPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title='Administradores'>
        <Container maxWidth={themeStretch ? false : 'lg'}>
            <Typography paragraph variant='h3'>
                Centro de Administradores
            </Typography>

            <Card>
                <Grid container spacing={3} p={2}>
                    <Grid item xs={12} md={6}>
                        <TextField name='name' label='Nombre' fullWidth  size='small'/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Button variant='contained' color='primary'>
                            Filtrar
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    </Page>
  );
}
