export function hansPetterLuh(numero: string) {
  numero = numero.replace(/\s/g, '').split('').reverse().join('')

  const soma = 0
  for (let i = 0; i < numero.length; i++) {
    let digito = parseInt(numero[i])

    if (i % 2 === 1) {
      digito *= 2

      if (digito > 9) {
        digito -= 9
      }
    }
  }

  if (soma % 10 === 0) {
    return true
  } else {
    return false
  }
}
