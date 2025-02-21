import React, { useState } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Paper,
    Typography
} from '@mui/material';
import { Upload as UploadIcon, List as ListIcon } from '@mui/icons-material';
import DeliveryNoteList from '../components/deliveryNote/DeliveryNoteList';
import DeliveryNoteUploader from '../components/delivery-notes/DeliveryNoteUploader';

const DeliveryNotesPage: React.FC = () => {
    const [view, setView] = useState<'list' | 'upload'>('list');

    return (
        <Box sx={{ p: 2 }}>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" component="h1">
                        Albaranes
                    </Typography>
                    <ButtonGroup variant="contained">
                        <Button
                            onClick={() => setView('list')}
                            color={view === 'list' ? 'primary' : 'inherit'}
                            startIcon={<ListIcon />}
                        >
                            Lista
                        </Button>
                        <Button
                            onClick={() => setView('upload')}
                            color={view === 'upload' ? 'primary' : 'inherit'}
                            startIcon={<UploadIcon />}
                        >
                            Subir Albarán
                        </Button>
                    </ButtonGroup>
                </Box>
            </Paper>

            {view === 'list' ? (
                <DeliveryNoteList />
            ) : (
                <DeliveryNoteUploader />
            )}
        </Box>
    );
};

export default DeliveryNotesPage;
