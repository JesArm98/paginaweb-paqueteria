import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

function Banner() {
  return (
    <Box sx={{ position: 'relative', display:"flex", margin:"auto", width: {xs:"95%",sm:'90%', md:"1000px", lg:"1200px", xl:"1500px"}, height: {xs:"180px", sm: "350px", md:"400px", lg:"500px", xl:"550px"} }}>
                  <Image
fill
                    src={"/images/Banners/banners_myllos_web.png"}
                    alt={"Banner Myllos"}
                  />
    </Box>
  )
}

export default Banner
