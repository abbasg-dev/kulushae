import { useState } from 'react';
import { DropzoneDialog } from 'react-mui-dropzone';
import { Button } from '@mui/material';
type DialogProps = {
    title?: string;
    onFilesChange?: (files: File[]) => void;
};
const CustomDropzoneDialog = (props: DialogProps) => {
    const { title, onFilesChange } = props;
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = (newFiles: File[]) => {
        onFilesChange(newFiles);
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <div>
            <Button onClick={handleOpen}>{title}</Button>
            <DropzoneDialog
                open={open}
                onSave={handleSave}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
                maxFileSize={5000000}
                onClose={handleClose}
            />
        </div>
    );
};
export default CustomDropzoneDialog;