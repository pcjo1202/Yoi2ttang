import { Payload } from "@/types/auth/auth.type"

export const checkNicknameValidity = (nickname: string) => {
  // 한글, 영어, 숫자만 입력 가능한 정규표현식
  const validCharRegex = /^[가-힣a-zA-Z0-9]+$/

  if (
    nickname.length < 2 ||
    nickname.length > 16 ||
    !validCharRegex.test(nickname)
  ) {
    return false
  }

  return true
}

export const getPayload = () => {
  // const accessToken = getCookie("accessToken")
  // if (!accessToken) {
  //   return null
  // }

  // const decoded = jwtDecode<Payload>(accessToken)

  // return decoded

  const mock_data: Payload = {
    sub: "1234567890",
    nickname: "test",
    zodiacId: "1",
    zodiacTeam: "test",
    iat: 1719000000,
    exp: 1719000000,
  }
  return mock_data
}

export const checkSelf = (memberId: number) => {
  const payload = getPayload()
  return payload ? payload.sub === String(memberId) : false
}
