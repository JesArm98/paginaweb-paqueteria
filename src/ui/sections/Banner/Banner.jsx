import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

function Banner() {
  return (
    <Box sx={{ position: 'relative', display:"flex", margin:"auto", width: {xs:"95%",sm:'90%', md:"1000px", lg:"1200px", xl:"1500px"}, height: {xs:"180px", sm: "350px", md:"400px", lg:"500px", xl:"550px"} }}>
      <Image
        fill
        sizes="(max-width: 600px) 95vw, (max-width: 900px) 90vw, (max-width: 1200px) 1000px, (max-width: 1536px) 1200px, 1500px"
        src={"/images/Banners/banners_myllos_web.webp"}
        alt="Banner principal Myllos"
      />
    </Box>
  )
}

export default Banner