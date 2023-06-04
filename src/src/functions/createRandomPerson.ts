export interface Person {
  name: string
  surname: string
  address: string
  cpf: string
  phone: string
  email: string
}

export async function generateRandomData(): Promise<Person> {
  const names = [
    'Miguel',
    'Arthur',
    'Heitor',
    'Bernardo',
    'Davi',
    'Lorenzo',
    'Théo',
    'Pedro',
    'Gabriel',
    'Enzo',
    'Laura',
    'Alice',
    'Manuela',
    'Isabella',
    'Sophia',
    'Helena',
    'Valentina',
    'Mariana',
    'Giovanna',
    'Júlia',
    'Silva',
    'Santos',
    'Oliveira',
    'Souza',
    'Pereira',
    'Almeida',
    'Ferreira',
    'Costa',
    'Gomes',
    'Ribeiro',
  ]

  const addresses = [
    'Rua A',
    'Rua B',
    'Rua C',
    'Rua D',
    'Rua E',
    'Rua F',
    'Rua G',
    'Rua H',
    'Rua I',
    'Rua J',
    'Avenida A',
    'Avenida B',
    'Avenida C',
    'Avenida D',
    'Avenida E',
    'Avenida F',
    'Avenida G',
    'Avenida H',
    'Avenida I',
    'Avenida J',
    'Travessa A',
    'Travessa B',
    'Travessa C',
    'Travessa D',
    'Travessa E',
  ]

  const cpf = [
    '98070371749',
    '02358393703',
    '80663826349',
    '60390468215',
    '29992524715',
    '01832191800',
    '17835232391',
    '23076945874',
    '80835244504',
    '13646752858',
    '96372907704',
    '39644774515',
    '11959215515',
    '43972896549',
    '02426481501',
    '96406275187',
    '06871220828',
    '12345678909',
    '06057668600',
    '70805890882',
    '55824870691',
    '26873140805',
    '28502109863',
    '25417629847',
    '57866384215',
    '12428086120',
    '04273801620',
    '16517685871',
    '38694816920',
    '10155337874',
    '10854382879',
    '82167010982',
    '69379882149',
    '06905525804',
    '89777042868',
    '07463339602',
    '06698929638',
    '45953880200',
    '05946309919',
    '07644784780',
    '91911621572',
    '04066928749',
    '00935158049',
    '60976225700',
    '83316361120',
    '08993449848',
    '10385096372',
    '75491370991',
    '60121173704',
    '51623501920',
    '12345678909',
    '28203060803',
    '10618940618',
    '29259118620',
    '05003569394',
    '05727901804',
    '31110135882',
  ]

  const randomName = names[Math.floor(Math.random() * names.length)]
  const randomSurname = names[Math.floor(Math.random() * names.length)]
  const randomAddress = addresses[Math.floor(Math.random() * addresses.length)]
  const randomCpf = cpf[Math.floor(Math.random() * cpf.length)]

  const randomPhone = generateRandomPhone()
  const randomEmail = `${randomName.toLowerCase()}.${randomSurname.toLowerCase()}@example.com`

  return {
    name: randomName,
    surname: randomSurname,
    address: randomAddress,
    cpf: randomCpf,
    phone: randomPhone,
    email: randomEmail,
  }
}

function generateRandomPhone(): string {
  const randomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

  const phoneDigits = Array.from({ length: 9 }, () => randomNumber(0, 9))

  const phone = phoneDigits.join('')

  return phone
}
