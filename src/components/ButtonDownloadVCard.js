import { Download } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Typography } from '@mui/material'
import React from 'react'

const ButtonDownloadVCard = ({ profile }) => {
  const { firstName, lastName, company, title, email, phone, linkedinUrl } =
    profile || {}

  var file = new Blob(
    [
      `BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
N:${lastName};${firstName};;;${!!title ? `\nTITLE:${title};` : ''}${
        !!email ? `\nEMAIL;type=INTERNET;type=pref:${email}` : ''
      }${!!phone ? `\nTEL;TYPE=main:${phone}` : ''}${
        !!company ? `\nORG:${company};` : ''
      }${!!linkedinUrl ? `\nURL:${linkedinUrl};` : ''}
ADR;TYPE=work;TYPE=pref:;;;Valley Forge;PA;;
NOTE:Meet Montco Showcase
END:VCARD
`,
    ],
    { type: 'text/vcard;charset=utf-8' }
  )

  // let a = document.createElement('a')
  // a.download = `${firstName}${lastName}.vcf`
  // a.href = URL.createObjectURL(file)

  // var reader = new FileReader()
  // if (navigator.userAgent.match('CriOS')) {
  //   reader.onloadend = e => {
  //     window.open(reader.result)
  //   }
  //   reader.readAsDataURL(file)
  // } else if (navigator.userAgent.match(/iPad|iPhone|Android/i)) {
  //   reader.onload = e => {
  //     window.location.href = reader.result
  //   }
  //   reader.readAsDataURL(file)
  // } else {
  //   FileSaver.saveAs(file, `${firstName}${lastName}.vcf`, true)
  // }

  return (
    <LoadingButton
      type="submit"
      variant="outlined"
      size="large"
      fullWidth
      endIcon={<Download />}
      download={`${firstName}${lastName}.vcf`}
      href={URL.createObjectURL(file)}
      // onClick={handleDownloadVCard}
    >
      <Typography letterSpacing={1} style={{ fontWeight: 900 }}>
        Add to Contacts
      </Typography>
    </LoadingButton>
  )
}

export default ButtonDownloadVCard
