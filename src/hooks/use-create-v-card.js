import { useCallback } from 'react'
import FileSaver from 'file-saver'

const useCreateVCard = () => {
  const createVCard = useCallback(
    ({ firstName, lastName, company, title, email, phone, location }) => {
      console.log('creating vCard')

      var file = new Blob(
        [
          `BEGIN:VCARD
          VERSION:3.0
          N:${lastName};${firstName};;;
          FN:${firstName} ${lastName}
          TITLE:${title};
          EMAIL;type=INTERNET;type=pref:${email}
          TEL;type=MAIN:${phone}
          ADR;type=WORK;type=pref:;;;${location};;;
          END:VCARD
          `,
        ],
        { type: 'text/vcard;charset=utf-8' }
      )

      let a = document.createElement('a')
      a.download = `${firstName}${lastName}.vcf`
      a.href = URL.createObjectURL(file)

      var reader = new FileReader()
      if (navigator.userAgent.match('CriOS')) {
        reader.onloadend = e => {
          window.open(reader.result)
        }
        reader.readAsDataURL(file)
      } else if (navigator.userAgent.match(/iPad|iPhone|Android/i)) {
        reader.onload = e => {
          window.location.href = reader.result
        }
        reader.readAsDataURL(file)
      } else {
        FileSaver.saveAs(file, `${firstName}${lastName}.vcf`, true)
      }
    },
    []
  )

  return { createVCard }
}

export default useCreateVCard
