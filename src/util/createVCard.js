import FileSaver from 'file-saver'

const createVCard = ({
  firstName,
  lastName,
  company,
  title,
  email,
  phone,
  location,
}) => {
  console.log('creating vCard')

  var file = new Blob(
    [
      `BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
N:${lastName};${firstName};;;
TITLE:${title};
EMAIL;type=INTERNET;type=pref:${email}
TEL;TYPE=main:${phone}
ADR;TYPE=work;TYPE=pref:;;;Valley Forge;;;
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
}

export default createVCard
