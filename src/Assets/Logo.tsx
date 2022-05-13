import TelegramIcon from "@mui/icons-material/Telegram"
import { SxProps } from '@mui/material'
import { Theme } from '@mui/system'
interface Options {
    size: number,
    padding?: number,
    sx?: SxProps<Theme> | undefined
}
function Logo({ size, padding, sx }: Options) {
    return (
        <TelegramIcon sx={sx} style={{ width: size + 'px', height: size + 'px', borderRadius: '50%', background: '#0088cc', fill: '#ffffff', padding: padding ? padding + 'px' : '30px' }} />
    )
}
export default Logo