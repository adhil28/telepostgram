import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import cc from "../../Assets/country-codes.json"
import { RoundSelect } from './RoundComponents';
interface Options {
    onChangeListener: (value: string) => any,
    disabled?: boolean
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};




function CountryCodePicker({ onChangeListener, disabled }: Options) {

    const [selectedCountry, setSelectedCountry] = useState('+91');
    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-multiple-name-label">Country code</InputLabel>
                <RoundSelect
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={selectedCountry}
                    disabled={disabled}
                    onChange={(event) => {
                        let selected: string = event.target.value as string
                        setSelectedCountry(selected)
                        onChangeListener(selected)
                    }}
                    input={<OutlinedInput label="Country code" />}
                    MenuProps={MenuProps}
                >
                    <MenuItem value="+54">🇦🇷 Argentina</MenuItem>
                    <MenuItem value="+61">🇦🇺 Australia</MenuItem>
                    <MenuItem value="+973">🇧🇭 Bahrain</MenuItem>
                    <MenuItem value="+375">🇧🇾 Belarus</MenuItem>
                    <MenuItem value="+32">🇧🇪 Belgium</MenuItem>
                    <MenuItem value="+1">🇨🇦 Canada</MenuItem>
                    <MenuItem value="+86">🇨🇳 China</MenuItem>
                    <MenuItem value="+385">🇭🇷 Croatia</MenuItem>
                    <MenuItem value="+372">🇪🇪 Estonia</MenuItem>
                    <MenuItem value="+33">🇫🇷 France</MenuItem>
                    <MenuItem value="+49">🇩🇪 Germany</MenuItem>
                    <MenuItem value="+30">🇬🇷 Greece</MenuItem>
                    <MenuItem value="+36">🇭🇺 Hungary</MenuItem>
                    <MenuItem value="+354">🇮🇸 Iceland</MenuItem>
                    <MenuItem value="+91">🇮🇳 India</MenuItem>
                    <MenuItem value="+62">🇮🇩 Indonesia</MenuItem>
                    <MenuItem value="+353">🇮🇪 Ireland</MenuItem>
                    <MenuItem value="+972">🇮🇱 Israel</MenuItem>
                    <MenuItem value="+39">🇮🇹 Italy</MenuItem>
                    <MenuItem value="+81">🇯🇵 Japan</MenuItem>
                    <MenuItem value="+370">🇱🇹 Lithuania</MenuItem>
                    <MenuItem value="+60">🇲🇾 Malaysia</MenuItem>
                    <MenuItem value="+52">🇲🇽 Mexico</MenuItem>
                    <MenuItem value="+977">🇳🇵 Nepal</MenuItem>
                    <MenuItem value="+31">🇳🇱 Netherlands</MenuItem>
                    <MenuItem value="+92">🇵🇰 Pakistan</MenuItem>
                    <MenuItem value="+63">🇵🇭 Philippines</MenuItem>
                    <MenuItem value="+48">🇵🇱 Poland</MenuItem>
                    <MenuItem value="+351">🇵🇹 Portugal</MenuItem>
                    <MenuItem value="+7">🇷🇺 Russia</MenuItem>
                    <MenuItem value="+421">🇸🇰 Slovakia</MenuItem>
                    <MenuItem value="+386">🇸🇮 Slovenia</MenuItem>
                    <MenuItem value="+34">🇪🇸 Spain</MenuItem>
                    <MenuItem value="+46">🇸🇪 Sweden</MenuItem>
                    <MenuItem value="+41">🇨🇭 Switzerland</MenuItem>
                    <MenuItem value="+66">🇹🇭 Thailand</MenuItem>
                    <MenuItem value="+90">🇹🇷 Turkey</MenuItem>
                    <MenuItem value="+380">🇺🇦 Ukraine</MenuItem>
                    <MenuItem value="+598">🇺🇾 Uruguay</MenuItem>

                </RoundSelect>
            </FormControl>
        </div>
    );
}

export default CountryCodePicker