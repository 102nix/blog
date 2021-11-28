import React from 'react'
import { Box, Button, Modal, Typography } from '@mui/material/'
import { SubTitle } from '../common/typografy/SubTitle'
import { useMockData } from '../../hooks/useMockData'
import UploadIcon from '@mui/icons-material/Upload'
import { useAdmin } from '../../hooks/useAdmin'

const style = {
  modalWindow: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 700,
    width: '100%',
    bgcolor: 'rgb(190, 190, 190)',
    boxShadow: 24,
    p: 10
  },
  blockActions: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '30px'
  }
}
export const ModalDownload = () => {
  const { setDownloadFB, isDownload } = useAdmin()
  const { error, initialize, progress, status } = useMockData()
  const handleClick = () => {
    initialize()
  }

  return (
    <div>
      <Modal
        open={!!isDownload}
        onClose={setDownloadFB}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.modalWindow}>
          <SubTitle>Выгрузка в Firebase</SubTitle>
          <Typography variant="h6" gutterBottom component="div" sx={{ textAlign: 'center' }}>
            Status: {status}
          </Typography>
          <Typography variant="h6" gutterBottom component="div" sx={{ textAlign: 'center' }}>
            Progress: {progress}%
          </Typography>
          { error && <Typography variant="h6" gutterBottom component="div">Error: {error}</Typography> }
          <Box sx={style.blockActions}>
            <Button variant="contained" endIcon={<UploadIcon />} onClick={handleClick}>Загрузить в FB</Button>
            <Button variant="outlined" onClick={setDownloadFB}>Отмена</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}