import { Select, TextField } from '@mui/material';
import { borderRadius, styled } from '@mui/system';

export const RoundTextFiled = styled(TextField)(() => ({
    '& fieldset': {
        borderRadius: `15px`,
    },
}));

export const RoundSelect = styled(Select)(() => ({
    '& fieldset': {
        borderRadius: `15px`,
    },
}));