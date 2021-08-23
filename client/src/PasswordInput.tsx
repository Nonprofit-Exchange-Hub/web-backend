import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import type { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';
import * as React from 'react';
import StyledLink from './StyledLink';

const useStyles = makeStyles((theme: Theme) => {
    return {
        input: {
            height: 62,
            border: '1px solid #C4C4C4',
            boxSizing: 'border-box',
            padding: theme.spacing(1),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            fontSize: 18,
            marginBottom: 20,
        },
        label: {
            color: '#000000',
            textAlign: 'left',

            '& .MuiInput-formControl': {},
        },
    };
});

interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    error?: boolean;
    startAdornment?: boolean;
    showForgot?: boolean;
}

function PasswordInput({ onChange, value, error = false, startAdornment = false, showForgot = false }: Props) {
    const classes = useStyles();

    const [ showPassword, setShowPassword ] = React.useState(false);

    // Toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <FormControl fullWidth error={error}>
            <label className={classes.label} htmlFor="password">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Password
                    {showForgot && <StyledLink to="/forgot_password">Forgot Password?</StyledLink>}
                </div>
            </label>
            {error && <FormHelperText error>Invalid password.</FormHelperText>}
            <Input
                className={classes.input}
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                autoComplete={showForgot ? 'current-password' : 'new-password'}
                disableUnderline
                error={error}
                required
                startAdornment={
                    startAdornment && (
                        <InputAdornment position="start">
                            <LockIcon />
                        </InputAdornment>
                    )
                }
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}

export default PasswordInput;
