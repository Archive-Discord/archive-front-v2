import Day from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

Day.extend(relativeTime)
Day.extend(localizedFormat)
Day.locale('ko')
export const formatDate = (date: Date, format: string = 'MM월 DD일 HH시 mm분') => {
    return Day(date).format(format)
}
export default Day