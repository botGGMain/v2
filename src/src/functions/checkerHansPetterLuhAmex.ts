export function hansPetterLuhAmex(numero: string) {
  numero = numero.replace(/\s/g, '').split('').reverse().join('')

  let soma = 0
  for (let i = 0; i < numero.length; i++) {
    let digito = parseInt(numero[i])

    if (i % 2 === 1) {
      digito *= 2

      if (digito > 9) {
        digito -= 9
      }
    }

    soma += digito
  }

  if (soma % 10 === 0) {
    return true
  } else {
    return false
  }
}
