export async function checkerReturCodeRandom(
  returnCode: string,
): Promise<boolean> {
  if (returnCode === '1011') {
    return false
  } else if (returnCode === '1040') {
    return false
  } else if (returnCode === '9113') {
    return false
  } else if (returnCode === '1025') {
    return false
  } else if (returnCode === '1050') {
    return false
  } else if (returnCode === '2000') {
    return false
  } else if (returnCode === '1001') {
    return false
  } else if (returnCode === '1015') {
    return false
  } else if (returnCode === '0000') {
    return false
  } else if (returnCode === '1022') {
    return false
  } else if (returnCode === '2008') {
    return false
  } else if (returnCode === '1019') {
    return false
  } else if (returnCode === '1004') {
    return false
  } else if (returnCode === '1000') {
    return false
  } else {
    return true
  }
}

export async function checkerReturCode0000(
  returnCode: string,
): Promise<Boolean> {
  if (returnCode === '0000') {
    return true
  }
  return false
}

export async function checkerReturCodeAmex0000(
  returnCode: string,
): Promise<Boolean> {
  if (returnCode === '0000') {
    return true
  } else if (returnCode === '1045') {
    return true
  }
  return false
}
