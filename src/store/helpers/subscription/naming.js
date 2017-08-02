import Utils from '@/utils'

export const _listener = x => `${x}Listener`
export const _eventListener = x => `${x}EventListener`
export const _subscribeTo = x => `subscribeTo${Utils.toHuman(x)}Event`
