import React from 'react'
import { Box, Button, Modal, Typography } from '@mui/material/'
import { SubTitle } from '../common/typografy/SubTitle'
import { useMockData } from '../../hooks/useMockData'
import UploadIcon from '@mui/icons-material/Upload'

const style = {
  modalWindow: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
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
export const ModalDownload = ({ setDownloadFB, isDownload }) => {
  const { error, initialize, progress, status } = useMockData()
  const handleClick = () => {
    initialize()
  }

  return (
    <div>
      <Modal
        open={isDownload}
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

// import React from 'react'
// import './ModalDownload.scss'
// import { SubTitle } from '../common/typografy/SubTitle'
// import { useMockData } from '../../hooks/useMockData'

// export const ModalDownload = ({ setDownloadFB }) => {
//   const { error, initialize, progress, status } = useMockData()
//   const handleClick = () => {
//     initialize()
//   }
//   return (
//     <div className="modal-window">
//       <div className="modal_container">
//         <SubTitle>Выгрузка в Firebase</SubTitle>
//         <ul>
//           <li>Status: {status}</li>
//           <li>Progress: {progress}%</li>
//           { error && <li>Error: {error}</li> }
//         </ul>
//         <div className="actions-block">
//           <button className="btn btn-primary" onClick={handleClick}>Загрузить в FB</button>
//           <button className="btn btn-cansel" onClick={setDownloadFB}>Отмена</button>
//         </div>
//       </div>
//     </div>
//   )
// }