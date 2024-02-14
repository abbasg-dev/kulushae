import { Button, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { ReactNode } from "react";
type props = {
    open?: boolean;
    title?: string;
    description?: string | ReactNode;
    buttonText?: string;
    icon?: ReactNode;
    handleClose?: () => void;
    handleConfirm?: () => void;
}
const Toaster = (props: props) => {
    const { open, title, description, buttonText, icon, handleClose, handleConfirm } = props;
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                ".MuiDialog-container": {
                    justifyContent: 'center',
                    padding: '20px !important'
                },
                ".MuiDialog-paperScrollPaper": {
                    margin: "auto 0",
                    padding: "25px 12px",
                    alignItems: "center"
                }
            }}
        >  
            {icon}
            <DialogTitle id="alert-dialog-title">
                <Stack direction="row" spacing={1} color="#000" fontSize={21} fontWeight={700}>
                    <span>{title}</span>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="alert-dialog-description"
                    color="#000"
                    fontSize={18}
                    fontWeight={400}
                    textAlign={'center'}
                >
                    {description}
                </DialogContentText>
            </DialogContent>
            {buttonText && (
                <DialogActions sx={{ justifyContent: 'flex-start', ml: 6 }}>
                    <Button
                        variant="contained"
                        onClick={handleConfirm}
                        autoFocus
                        sx={{ mb: 1 }}
                    >
                        {buttonText}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    )
}
export default Toaster