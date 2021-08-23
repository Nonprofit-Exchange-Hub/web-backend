import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InputAdornment from '@material-ui/core/InputAdornment';
import type { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

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
        },
    };
});
interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    placeholder: string;
    startAdornment?: boolean;
    error?: boolean;
}

function EmailInput({ onChange, value, placeholder, startAdornment = false, error = false }: Props) {
    const classes = useStyles();

    const emailErrorMessage = ()=>{
        if(error){
            // Signup form uses a start adornment. 
            // Different error message for signup vs login
            if(startAdornment){
                return <FormHelperText error>Email already exists.</FormHelperText>
            }
            else return <FormHelperText error>Email not found.</FormHelperText>
        }
        else return 
    }

    return (
        <FormControl fullWidth error={error}>
            <label className={classes.label} htmlFor="email">
                Email Address
            </label>
            {emailErrorMessage()}
            <Input
                className={classes.input}
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder={placeholder}
                fullWidth
                value={value}
                onChange={onChange}
                disableUnderline
                required
                error={error}
                startAdornment={
                    startAdornment && (
                        <InputAdornment position="start">
                            <MailOutlineIcon />
                        </InputAdornment>
                    )
                }
            />
        </FormControl>
    );
}

export default EmailInput;
