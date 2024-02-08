export type MessageType = {
  message: string
  ok?: boolean
  data?: {[key: string]: any},
  errorCode?: number
}

export const Message = (msg:MessageType)=>{
  return msg
}