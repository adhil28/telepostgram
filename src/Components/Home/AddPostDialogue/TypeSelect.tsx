import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { RoundSelect } from '../../SpecialComponents/RoundComponents';
interface Options {
    onSelected: (value: string) => any
}
export default function TypeSelect(options: Options) {
    const [type, setType] = React.useState('txt');

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
        options.onSelected(event.target.value as string)
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Post type</InputLabel>
                <RoundSelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Post type"
                    onChange={(e) => { handleChange(e as React.ChangeEvent<HTMLInputElement>) }}
                >
                    <MenuItem value='txt' >Text</MenuItem>
                    <MenuItem value='img'>Image</MenuItem>
                    <MenuItem value='vid'>Video</MenuItem>
                </RoundSelect>
            </FormControl>
        </Box>
    );
}


