"use client";
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import styles from './support.module.css';
// import Image from 'next/image';
import Link from 'next/link';

interface SupportData {
    destination: string;
    poc: string;
    email: string;
    phone: string;
}

const modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%',
    width: '100%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '5px',
    p: 2,
};

const modalheader = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    background: '#f3f3f3',
    borderRadius: '5px',
    padding: '8px 15px'
}

const createData = (destination: string, poc: string, email: string, phone: string): SupportData => {
    return { destination, poc, email, phone };
};

const rows: SupportData[] = [
    createData('United Kingdom and Ireland', 'Rohit Soni', 'psmukirl@metaapply.io', '+91-7428697326'),
    createData('United States of America', 'Srishti Sharma', 'psmusa@metaapply.io', '+91-7428697322'),
    createData('Canada', 'Anuradha Thapa', 'psmcanada@metaapply.io', '+91-7428697323'),
    createData('Europe', 'Bhumika Sharma', 'psmeurope@metaapply.io', '+91-7428697324'),
    createData('APAC-MENA', 'Anandita Jitt', 'apacmena@metaapply.io', '+91-7428697325'),
    createData('Finance and Loan', 'Renu', 'eduloan@metaapply.io', '+91-9667300849'),
    createData('Operational Escalation', '-', 'operations@metaapply.io', '+91-9560708184'),
    createData('Portal Query', 'Wasim Khan', 'portal@metaapply.io', '+91-7428697321'),
];

const Support = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Tooltip title="Support">
                <span className={styles.supportBtn} onClick={handleOpen}>
                    <HelpIcon />
                    {/* <Image src="/support.png" width={50} height={50} alt="" /> */}
                </span>
            </Tooltip>

            <Modal sx={{ padding: '10px', border: 'none' }} open={open} onClose={handleClose}>
                <Box sx={modalstyle}>
                    <Box sx={modalheader}>
                        <Box sx={{
                              maxWidth: { xs: '100%', md: '70%', },
                            }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Support
                            </Typography>
                            <Typography sx={{lineHeight:'1.2', fontSize:'.8rem', color:'#585858'}} variant="subtitle1" gutterBottom>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                            </Typography>
                        </Box>
                        <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1em',
                                position: { xs: 'absolute', sm: 'relative' }, 
                                background: '#fff',
                                right: { xs: '10px', sm: 'auto' }, 
                                top: { xs: '10px', sm: 'auto' },  
                                zIndex: 10, 
                             }}>
                            <Button onClick={handleClose} variant="outlined">
                                <CloseOutlinedIcon />
                            </Button>
                        </Box>
                    </Box>

                    <TableContainer className={styles.tablecontainer}>
                        <Table aria-label="support table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Location</strong></TableCell>
                                    <TableCell><strong style={{ whiteSpace: 'nowrap' }}>Point of Contact</strong></TableCell>
                                    <TableCell><strong>Email</strong></TableCell>
                                    <TableCell align="center"><strong>Whatsapp</strong></TableCell>
                                    <TableCell align="center"><strong>Phone</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => {
                                    const phoneNumber = row.phone.replace(/[^0-9]/g, ''); 
                                    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("I need assistance, please help me")}`;
                                    
                                    return (
                                        <TableRow
                                            key={row.destination}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.destination}
                                            </TableCell>
                                            <TableCell>{row.poc}</TableCell>
                                            <TableCell>
                                                <Link href={`mailto:${row.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    {row.email}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '8px', textDecoration: 'none', color: '#25D366' }}>
                                                    <WhatsAppIcon />
                                                </Link>
                                            </TableCell>
                                            <TableCell align="center"> 
                                                <Link href={`tel:${phoneNumber}`} style={{ textDecoration: 'none', color: 'inherit', whiteSpace:'nowrap' }}>
                                                    {row.phone}
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        </>
    );
}

export default Support;
